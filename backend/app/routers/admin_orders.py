from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .. import models, schemas
from ..auth.dependencies import get_current_admin
from ..database import get_db

router = APIRouter(prefix="/admin/orders", tags=["admin-orders"])


def _validate_status(status_value: str) -> str:
    normalized = status_value.strip().lower()
    if normalized not in schemas.ALLOWED_ORDER_STATUSES:
        raise HTTPException(status_code=400, detail="Invalid order status")
    return normalized


@router.get("/", response_model=List[schemas.OrderResponse])
def list_orders(
    status: Optional[str] = None,
    db: Session = Depends(get_db),
    _: models.AdminUser = Depends(get_current_admin),
):
    query = db.query(models.Order)
    if status:
        query = query.filter(models.Order.status == _validate_status(status))
    return query.order_by(models.Order.created_at.desc()).all()


@router.post("/", response_model=schemas.OrderResponse)
def create_order(
    payload: schemas.OrderCreate,
    db: Session = Depends(get_db),
    current_admin: models.AdminUser = Depends(get_current_admin),
):
    db_order = models.Order(
        **payload.dict(exclude={"inquiry_id"}),
        inquiry_id=payload.inquiry_id,
        status="new",
        updated_by_admin_id=current_admin.id,
    )
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order


@router.post("/from-inquiry/{inquiry_id}", response_model=schemas.OrderResponse)
def create_order_from_inquiry(
    inquiry_id: int,
    db: Session = Depends(get_db),
    current_admin: models.AdminUser = Depends(get_current_admin),
):
    inquiry = db.query(models.Inquiry).filter(models.Inquiry.id == inquiry_id).first()
    if inquiry is None:
        raise HTTPException(status_code=404, detail="Inquiry not found")

    existing_order = db.query(models.Order).filter(models.Order.inquiry_id == inquiry_id).first()
    if existing_order is not None:
        return existing_order

    db_order = models.Order(
        inquiry_id=inquiry.id,
        customer_first_name=inquiry.first_name,
        customer_last_name=inquiry.last_name,
        customer_email=inquiry.email,
        customer_phone=inquiry.phone,
        service=inquiry.service,
        details=inquiry.message,
        status="new",
        updated_by_admin_id=current_admin.id,
    )
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order


@router.get("/{order_id}", response_model=schemas.OrderResponse)
def get_order(
    order_id: int,
    db: Session = Depends(get_db),
    _: models.AdminUser = Depends(get_current_admin),
):
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if order is None:
        raise HTTPException(status_code=404, detail="Order not found")
    return order


@router.patch("/{order_id}/status", response_model=schemas.OrderResponse)
def update_order_status(
    order_id: int,
    payload: schemas.OrderStatusUpdate,
    db: Session = Depends(get_db),
    current_admin: models.AdminUser = Depends(get_current_admin),
):
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if order is None:
        raise HTTPException(status_code=404, detail="Order not found")

    order.status = _validate_status(payload.status)
    if payload.admin_note is not None:
        order.admin_note = payload.admin_note
    order.updated_by_admin_id = current_admin.id

    db.commit()
    db.refresh(order)
    return order


@router.put("/{order_id}", response_model=schemas.OrderResponse)
def update_order(
    order_id: int,
    payload: schemas.OrderUpdate,
    db: Session = Depends(get_db),
    current_admin: models.AdminUser = Depends(get_current_admin),
):
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if order is None:
        raise HTTPException(status_code=404, detail="Order not found")

    update_data = payload.dict(exclude_unset=True)
    if "status" in update_data and update_data["status"] is not None:
        update_data["status"] = _validate_status(update_data["status"])

    for key, value in update_data.items():
        setattr(order, key, value)

    order.updated_by_admin_id = current_admin.id
    db.commit()
    db.refresh(order)
    return order


@router.delete("/{order_id}")
def delete_order(
    order_id: int,
    db: Session = Depends(get_db),
    _: models.AdminUser = Depends(get_current_admin),
):
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if order is None:
        raise HTTPException(status_code=404, detail="Order not found")

    db.delete(order)
    db.commit()
    return {"detail": "Order deleted"}
