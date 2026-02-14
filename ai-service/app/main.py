from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import router as ai_router
from app.core.config import settings

app = FastAPI(title=settings.app_name, version=settings.model_version)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include AI routes
app.include_router(ai_router, prefix="/ai", tags=["AI Inference"])

@app.get("/")
async def root():
    return {"status": "AI Service Online", "message": "Ready for inference"}

@app.get("/health")
async def health():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
