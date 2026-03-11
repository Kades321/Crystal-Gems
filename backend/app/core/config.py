from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite:///./crystal_gems.db"
    APP_NAME: str = "Crystal Gems API"
    
    # SMTP Settings (Optional for local testing)
    SMTP_SERVER: str = "smtp.gmail.com"
    SMTP_PORT: int = 465
    SMTP_USER: str = "siniganghakdog11@gmail.com"
    SMTP_PASSWORD: str = "vfia wgrh dxqn wgod"
    BUSINESS_EMAIL: str = "siniganghakdog11@gmail.com"

settings = Settings()
