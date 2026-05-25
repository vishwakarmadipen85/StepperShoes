from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI(title="AEROSTEP AI Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.getenv("BACKEND_URL", "http://localhost:5000"),
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001"
    ],
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

@app.post("/ai/recommend-by-quiz")
async def recommend_by_quiz(data: dict):
    use_case = data.get("useCase", "").lower()
    color = data.get("color", "").lower()
    priority = data.get("priority", "").lower()
    
    # Matching rules to return a real product seeded in the DB
    match_score = 90
    
    # 1. Resolve product slug
    if "running" in use_case or "athletic" in use_case:
        slug = "aero-x1-genesis"
        name = "AERO-X1 GENESIS"
        description = "The peak of performance engineering. Features reactive carbon-fiber plates and biometric-adaptive cushioning."
        if "comfort" in priority:
            match_score += 4
        if "durability" in priority:
            match_score += 6
    elif "work" in use_case or "office" in use_case or "casual" in use_case:
        slug = "nebula-flow"
        name = "NEBULA FLOW"
        description = "Minimalist aesthetic meets maximum comfort. Designed for the urban explorer."
        if "comfort" in priority:
            match_score += 8
        if "trend" in priority:
            match_score += 4
    elif "gym" in use_case or "train" in use_case:
        slug = "titan-hoop"
        name = "TITAN HOOP"
        description = "Engineered for explosive verticality and lateral stability on the court."
        if "durability" in priority:
            match_score += 5
        if "comfort" in priority:
            match_score += 3
    else:
        slug = "cyber-pulse"
        name = "CYBER PULSE"
        description = "Neon-infused style with integrated LED sync technology. The future of streetware."
        if "trend" in priority:
            match_score += 8

    # Clamp match score
    match_score = min(99, max(80, match_score))

    return {
        "slug": slug,
        "name": name,
        "description": description,
        "matchScore": match_score,
        "details": {
            "useCase": data.get("useCase"),
            "color": data.get("color"),
            "priority": data.get("priority")
        }
    }

@app.get("/ai/forecast")
async def get_forecast():
    return forecaster.get_forecast()

@app.post("/ai/chat")
async def chat_assistant(data: dict):
    query = data.get("message", "").lower()
    
    matched_products = []
    
    all_known_products = [
        {
            "id": "m1",
            "name": "Pro Pacer",
            "price": 19785,
            "category": "Men",
            "color": "red",
            "image": "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&q=80&w=1000"
        },
        {
            "id": "m2",
            "name": "Ultra High-Top",
            "price": 16168,
            "category": "Men",
            "color": "black",
            "image": "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=1000"
        },
        {
            "id": "m3",
            "name": "Flex Boot",
            "price": 23280,
            "category": "Men",
            "color": "white",
            "image": "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=1000"
        },
        {
            "id": "m4",
            "name": "Street Slip-On",
            "price": 9703,
            "category": "Men",
            "color": "white",
            "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000"
        },
        {
            "id": "w36",
            "name": "Cloud Bootie",
            "price": 10466,
            "category": "Women",
            "color": "white",
            "image": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=1000"
        },
        {
            "id": "w38",
            "name": "Bella Runner",
            "price": 11282,
            "category": "Women",
            "color": "red",
            "image": "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&q=80&w=1000"
        }
    ]
    
    # Filter products
    for p in all_known_products:
        color_match = p["color"] in query
        type_match = any(word in query for word in [p["name"].lower(), p["category"].lower(), "shoe", "sneaker", "boot", "runner"])
        
        has_color_keyword = any(c in query for c in ["red", "black", "white"])
        if has_color_keyword:
            if color_match:
                matched_products.append(p)
        else:
            if type_match:
                matched_products.append(p)
                
    if matched_products:
        p_names = ", ".join([p["name"] for p in matched_products[:3]])
        text = f"Sure! I found some great options matching your request: {p_names}."
    else:
        # Check general matching keywords
        if "hello" in query or "hi" in query:
            text = "Hello! How can I help you elevate your shoe game today?"
            matched_products = []
        elif "size" in query:
            text = "I can help with sizing! Just click the 'AI Predictor' button on any product page, and I'll calculate your perfect fit based on your height, weight, and favorite brands."
            matched_products = []
        elif "order" in query or "track" in query:
            text = "You can track your order by clicking the 'Track Order' link in the top menu. You'll need your Order ID!"
            matched_products = []
        elif "return" in query or "exchange" in query:
            text = "We offer a 30-day hassle-free return policy. You can initiate a return from your account dashboard."
            matched_products = []
        else:
            text = "I couldn't find any exact matches for that in our current collection. Would you like to see our best sellers instead?"
            matched_products = all_known_products[:2]
        
    return {
        "text": text,
        "products": matched_products[:3]
    }

