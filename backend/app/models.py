from sqlalchemy import Column, Integer, String, Float, JSON, DateTime, Boolean, ForeignKey
from sqlalchemy.sql import func
from .database import Base

class Service(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)
    category_id = Column(String(255), index=True)
    title = Column(String(255), index=True)
    description = Column(String(255))
    price = Column(Float, nullable=True)
    type = Column(String(255), index=True) # e.g., 'package', 'product'
    tag = Column(String(255), nullable=True)
    extra_data = Column(JSON, nullable=True) # For any category-specific details

class Inquiry(Base):
    __tablename__ = "inquiries"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(255), index=True)
    last_name = Column(String(255), index=True)
    email = Column(String(255), index=True)
    phone = Column(String(255), nullable=True)
    service = Column(String(255))
    message = Column(String(255))
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class AdminUser(Base):
    __tablename__ = "admin_users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=True)
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    inquiry_id = Column(Integer, ForeignKey("inquiries.id"), nullable=True, index=True)
    customer_first_name = Column(String(255), nullable=False)
    customer_last_name = Column(String(255), nullable=False)
    customer_email = Column(String(255), index=True, nullable=False)
    customer_phone = Column(String(255), nullable=True)
    service = Column(String(255), nullable=False)
    details = Column(String(1000), nullable=True)
    amount = Column(Float, nullable=True)
    status = Column(String(50), default="new", index=True, nullable=False)
    admin_note = Column(String(1000), nullable=True)
    updated_by_admin_id = Column(Integer, ForeignKey("admin_users.id"), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), server_default=func.now())
