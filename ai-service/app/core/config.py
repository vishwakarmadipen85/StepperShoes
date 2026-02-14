import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "AEROSTEP AI Service"
    model_version: str = "1.0.0"
    backend_url: str = os.getenv("BACKEND_URL", "http://localhost:5000")
    
    # AI Specific Settings
    prediction_confidence_threshold: float = 0.85
    
    class Config:
        env_file = ".env"

settings = Settings()
