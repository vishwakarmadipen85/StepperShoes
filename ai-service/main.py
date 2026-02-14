from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI(title="AEROSTEP AI Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("BACKEND_URL", "http://localhost:5000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from app.services.size_prediction import size_predictor
from app.services.recommendation import recommendation_engine
from app.services.forecasting import RevenueForecaster

forecaster = RevenueForecaster()

@app.get("/")
async def root():
    return {"status": "online", "service": "AEROSTEP AI Engine"}

@app.get("/health")
async def health():
    return {"status": "healthy"}

@app.post("/ai/predict-size")
async def predict_size(data: dict):
    # data: {height, weight, current_size, brand_name}
    return size_predictor.predict_size(
        data.get("height"), 
        data.get("weight"), 
        data.get("current_size"), 
        data.get("brand_name")
    )

@app.get("/ai/recommendations/{user_id}")
async def get_recommendations(user_id: str):
    # In a real scenario, we'd get product_ids from DB
    mock_product_ids = ["p101", "p102", "p103"]
    return recommendation_engine.predict(user_id, mock_product_ids)

@app.get("/ai/forecast")
async def get_forecast():
    return forecaster.get_forecast()
