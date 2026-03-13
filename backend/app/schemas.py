from pydantic import BaseModel
from typing import Optional, List, Any


ALLOWED_ORDER_STATUSES = {
    "new",
    "confirmed",
    "in_progress",
    "ready_for_pickup",
    "completed",
    "cancelled",
}

class ServiceBase(BaseModel):
    category_id: str
    title: str
    description: str
    price: Optional[float] = None
    type: str
    tag: Optional[str] = None
    extra_data: Optional[Any] = None

class ServiceCreate(ServiceBase):
    pass

class ServiceUpdate(BaseModel):
    category_id: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    type: Optional[str] = None
    tag: Optional[str] = None
    extra_data: Optional[Any] = None

class ServiceResponse(ServiceBase):
    id: int

    class Config:
        from_attributes = True

class InquiryBase(BaseModel):
    first_name: str
    last_name: str
    email: str
    phone: Optional[str] = None
    service: str
    message: str

class InquiryCreate(InquiryBase):
    pass

class InquiryResponse(InquiryBase):
    id: int
    created_at: Any # Using Any for datetime serialization for now

    class Config:
        from_attributes = True


class AdminLoginRequest(BaseModel):
    email: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class AdminUserResponse(BaseModel):
    id: int
    email: str
    full_name: Optional[str] = None
    is_active: bool

    class Config:
        from_attributes = True


class OrderBase(BaseModel):
    customer_first_name: str
    customer_last_name: str
    customer_email: str
    customer_phone: Optional[str] = None
    service: str
    details: Optional[str] = None
    amount: Optional[float] = None
    admin_note: Optional[str] = None


class OrderCreate(OrderBase):
    inquiry_id: Optional[int] = None


class OrderStatusUpdate(BaseModel):
    status: str
    admin_note: Optional[str] = None


class OrderUpdate(BaseModel):
    customer_first_name: Optional[str] = None
    customer_last_name: Optional[str] = None
    customer_email: Optional[str] = None
    customer_phone: Optional[str] = None
    service: Optional[str] = None
    details: Optional[str] = None
    amount: Optional[float] = None
    status: Optional[str] = None
    admin_note: Optional[str] = None


class OrderResponse(OrderBase):
    id: int
    inquiry_id: Optional[int] = None
    status: str
    updated_by_admin_id: Optional[int] = None
    created_at: Any
    updated_at: Any

    class Config:
        from_attributes = True
