from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite:///./crystal_gems.db"
    APP_NAME: str = "Crystal Gems API"

settings = Settings()
