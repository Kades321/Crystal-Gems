from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite:///./crystal_gems.db"
    APP_NAME: str = "Crystal Gems API"
    
    # SMTP Settings (Optional for local testing)
    SMTP_SERVER: str = ""
    SMTP_PORT: int = 587
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""
    BUSINESS_EMAIL: str = "rhetts@gmail.com"

settings = Settings()
