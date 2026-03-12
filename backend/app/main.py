from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routers import services, health, contacts
from .core.config import settings

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Crystal Gems API")

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        settings.FRONTEND_URL,
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(services.router)
app.include_router(health.router)
app.include_router(contacts.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Crystal Gems API"}
