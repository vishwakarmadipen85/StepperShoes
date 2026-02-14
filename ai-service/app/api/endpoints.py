from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import logging
from app.services.recommendation import recommendation_engine
from app.services.size_prediction import size_predictor
from app.services.forecasting import revenue_forecaster

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()

class SizeRequest(BaseModel):
    height: float
    weight: float
    current_size: float
    brand_name: str

class RecRequest(BaseModel):
    user_id: str
    product_ids: List[str]

@router.post("/predict-size")
async def predict_size(data: SizeRequest):
    try:
        logger.info(f"Predicting size for brand: {data.brand_name}")
        result = size_predictor.predict_size(data.height, data.weight, data.current_size, data.brand_name)
        return {"status": "success", "data": result}
    except Exception as e:
        logger.error(f"Error predicting size: {str(e)}")
        raise HTTPException(status_code=500, detail="Size prediction failed")

@router.post("/recommendations")
async def get_recommendations(data: RecRequest):
    try:
        logger.info(f"Getting recommendations for user: {data.user_id}")
        result = recommendation_engine.predict(data.user_id, data.product_ids)
        return {"status": "success", "data": result}
    except Exception as e:
        logger.error(f"Error getting recommendations: {str(e)}")
        raise HTTPException(status_code=500, detail="Recommendation engine failed")

@router.post("/forecast-revenue")
async def forecast_revenue(historical_data: List[dict]):
    try:
        logger.info(f"Forecasting revenue with historical data length: {len(historical_data)}")
        result = revenue_forecaster.forecast_revenue(historical_data)
        return {"status": "success", "data": result}
    except Exception as e:
        logger.error(f"Error forecasting revenue: {str(e)}")
        raise HTTPException(status_code=500, detail="Revenue forecasting failed")
