from app.database import SessionLocal, engine
from app import models

# Sample data based on current frontend
INITIAL_SERVICES = [
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
        "title": "Large Format",
        "description": "Tarpaulins, posters, and banners up to 10ft wide. Weatherproof materials available.",
        "price": 500.0,
        "type": "product",
        "tag": "New"
    },
    # ID & Event Documentation
    {
        "category_id": "id-docs",
        "title": "Passport & Visa Photos",
        "description": "Government-compliant passport photos. Printed and ready in 15 minutes.",
        "price": 150.0,
        "type": "service",
        "tag": "Fast"
    },
    {
        "category_id": "id-docs",
        "title": "School & Company IDs",
        "description": "PVC card printing with custom layouts. Laminated, durable, and professional.",
        "price": 100.0,
        "type": "product",
        "tag": None
    },
    {
        "category_id": "id-docs",
        "title": "Event Photo Booths",
        "description": "On-site instant print photo booths for events. Includes backdrop, props, and operator.",
        "price": 3500.0,
        "type": "service",
        "tag": None
    }
]

def seed_db():
    db = SessionLocal()
    # Check if we already have services
    if db.query(models.Service).count() > 0:
        print("Database already seeded.")
        return

    for service_data in INITIAL_SERVICES:
        service = models.Service(**service_data)
        db.add(service)
    
    db.commit()
    print("Database successfully seeded!")
    db.close()

if __name__ == "__main__":
    seed_db()
