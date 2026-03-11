from sqlalchemy import Column, Integer, String, Float, JSON, DateTime
from sqlalchemy.sql import func
from .database import Base

class Service(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)
    category_id = Column(String, index=True)
    title = Column(String, index=True)
    description = Column(String)
    price = Column(Float, nullable=True)
    type = Column(String, index=True) # e.g., 'package', 'product'
    tag = Column(String, nullable=True)
    extra_data = Column(JSON, nullable=True) # For any category-specific details

class Inquiry(Base):
    __tablename__ = "inquiries"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, index=True)
    last_name = Column(String, index=True)
    email = Column(String, index=True)
    phone = Column(String, nullable=True)
    service = Column(String)
    message = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
