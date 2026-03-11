from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from .. import models, schemas
import smtplib
from email.mime.text import MIMEText
from ..core.config import settings

router = APIRouter(
    prefix="/contacts",
    tags=["contacts"]
)

def send_contact_email(inquiry: models.Inquiry):
    """
    Sends an email notification to the business about a new inquiry.
    In a real-world scenario, you would use a secure SMTP configuration.
    """
    # Placeholder for email sending logic
    # To enable: Fill in SMTP settings in config.py
    if not all([settings.SMTP_SERVER, settings.SMTP_USER, settings.SMTP_PASSWORD]):
        print(f"Skipping email send: SMTP settings not configured. New inquiry from {inquiry.email}")
        return

    try:
        msg = MIMEText(f"New inquiry from {inquiry.first_name} {inquiry.last_name} ({inquiry.email}):\n\n{inquiry.message}")
        msg['Subject'] = f"New Inquiry: {inquiry.service}"
        msg['From'] = settings.SMTP_USER
        msg['To'] = settings.BUSINESS_EMAIL

        with smtplib.SMTP(settings.SMTP_SERVER, settings.SMTP_PORT) as server:
            server.starttls()
            server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
            server.send_message(msg)
        print("Inquiry email sent successfully.")
    except Exception as e:
        print(f"Failed to send inquiry email: {e}")

@router.post("/", response_model=schemas.InquiryResponse)
def create_inquiry(inquiry: schemas.InquiryCreate, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    db_inquiry = models.Inquiry(**inquiry.dict())
    db.add(db_inquiry)
    db.commit()
    db.refresh(db_inquiry)
    
    # Add email sending to background tasks
    background_tasks.add_task(send_contact_email, db_inquiry)
    
    return db_inquiry

@router.get("/", response_model=List[schemas.InquiryResponse])
def get_inquiries(db: Session = Depends(get_db)):
    # For tax purposes/admin review
    return db.query(models.Inquiry).all()
