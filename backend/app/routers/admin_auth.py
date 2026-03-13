from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from .. import models, schemas
from ..auth.dependencies import get_current_admin
from ..auth.security import create_access_token, verify_password
from ..database import get_db

router = APIRouter(prefix="/admin/auth", tags=["admin-auth"])


@router.post("/login", response_model=schemas.TokenResponse)
def login_admin(payload: schemas.AdminLoginRequest, db: Session = Depends(get_db)):
    admin = db.query(models.AdminUser).filter(models.AdminUser.email == payload.email).first()
    if admin is None or not verify_password(payload.password, admin.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid admin credentials",
        )

    if not admin.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin account is inactive",
        )

    token = create_access_token({"sub": str(admin.id), "role": "admin", "email": admin.email})
    return schemas.TokenResponse(access_token=token)


@router.get("/me", response_model=schemas.AdminUserResponse)
def get_admin_profile(current_admin: models.AdminUser = Depends(get_current_admin)):
    return current_admin
