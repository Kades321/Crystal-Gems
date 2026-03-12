from sqlalchemy import Column, Integer, String, Float, JSON, DateTime
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
