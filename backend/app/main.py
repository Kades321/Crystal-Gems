from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routers import services, health

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Crystal Gems API")

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(services.router)
app.include_router(health.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Crystal Gems API"}
