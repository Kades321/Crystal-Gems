from app.database import SessionLocal, engine, Base
from app import models

# Sample data based on new requirements
INITIAL_SERVICES = [
    # Photography
    {
        "category_id": "photography",
        "title": "Portrait Session",
        "description": "Professional 1-hour studio session. Perfect for graduation, corporate, or personal branding. Includes 5 retouched digital photos.",
        "price": 1500.0,
        "type": "service",
        "tag": "Popular"
    },
    {
        "category_id": "photography",
        "title": "Product Photography",
        "description": "High-quality images for your e-commerce or menu. Clean white background or lifestyle setup available.",
        "price": 300.0,
        "type": "service",
        "tag": None
    },
    {
        "category_id": "photography",
        "title": "Family Package",
        "description": "Capture precious memories with the whole family. Outdoor or indoor locations. Includes a free 8R print.",
        "price": 2500.0,
        "type": "service",
        "tag": "New"
    },
    # Printing Services
    {
        "category_id": "printing",
        "title": "T-Shirt Printing",
        "description": "Custom full-color prints on any shirt style. Perfect for teams, events, and giveaways. Minimum order of 5 pieces.",
        "price": 250.0,
        "type": "product",
        "tag": "Popular"
    },
    {
        "category_id": "printing",
        "title": "Photo Printing",
        "description": "Standard 4R, 5R, and custom sizes. Professional color calibration on premium glossy or matte paper.",
        "price": 10.0,
        "type": "product",
        "tag": None
    },
    {
        "category_id": "printing",
        "title": "Large Format Banners",
        "description": "Tarpaulins, posters, and banners up to 10ft wide. Weatherproof materials available.",
        "price": 500.0,
        "type": "product",
        "tag": "New"
    },
    # Event Documentation
    {
        "category_id": "event-docs",
        "title": "Full Event Coverage",
        "description": "Comprehensive photo and video coverage for weddings, birthdays, or corporate events. Minimum 4 hours.",
        "price": 8000.0,
        "type": "service",
        "tag": "Fast"
    },
    {
        "category_id": "event-docs",
        "title": "Instant Print Photo Booth",
        "description": "On-site instant print photo booths for events. Includes backdrop, props, and operator.",
        "price": 3500.0,
        "type": "service",
        "tag": None
    }
]

def seed_db():
    # Create tables if they don't exist
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    # Clear existing data to ensure clean slate
    print("Clearing existing services...")
    db.query(models.Service).delete()
    db.commit()

    print("Seeding new services...")
    for service_data in INITIAL_SERVICES:
        service = models.Service(**service_data)
        db.add(service)
    
    db.commit()
    print("Database successfully seeded with new services!")
    db.close()

if __name__ == "__main__":
    seed_db()
