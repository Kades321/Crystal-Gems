from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    DATABASE_URL: str
    APP_NAME: str = "Crystal Gems API"
    FRONTEND_URL: str = "http://localhost:5173"

    JWT_SECRET_KEY: str = "change-me-in-production"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    ADMIN_EMAIL: str = "admin@crystalgems.local"
    ADMIN_PASSWORD: str = "admin123"
    
    # SMTP Settings (Optional for local testing)
    SMTP_SERVER: str = "smtp.gmail.com"
    SMTP_PORT: int = 465
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""
    BUSINESS_EMAIL: str = ""

settings = Settings()
