from pydantic import BaseModel
from typing import Optional, List, Any

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
