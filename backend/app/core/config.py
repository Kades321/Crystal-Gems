from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    DATABASE_URL: str
    APP_NAME: str = "Crystal Gems API"
    FRONTEND_URL: str = "http://localhost:5173"
    
    # SMTP Settings (Optional for local testing)
    SMTP_SERVER: str = "smtp.gmail.com"
    SMTP_PORT: int = 465
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""
    BUSINESS_EMAIL: str = ""

settings = Settings()
#