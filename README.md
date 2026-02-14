# AEROSTEP AI - Enterprise Footwear eCommerce

A production-ready, AI-driven footwear platform with 3D visualization, AR try-on, and real-time inference microservices.

## tech Stack
- **Frontend**: Next.js, TypeScript, Tailwind CSS, Framer Motion, React Three Fiber.
- **Backend**: Node.js, Express, MongoDB, Redis, JWT/RBAC.
- **AI Service**: Python (FastAPI), Scikit-Learn, Facebook Prophet, Surprise.
- **Payments**: Stripe (Test Mode).
- **Search**: Meilisearch.

## Key Features
1. **AI Recommendation Engine**: Personalized 3D footwear suggestions.
2. **AI Size Prediction**: Regression-based optimal fit analysis (95% confidence).
3. **AI Revenue Forecasting**: Prophet-based monthly business projections.
4. **3D Virtual Try-On**: WebXR implementation for foot-tracking simulation.
5. **Multi-Vendor Marketplace**: Specialized vendor dashboards and commission tracking.

## Setup Instructions

### Prerequisites
- Node.js v20+
- Python 3.10+
- Docker & Docker Compose
- MongoDB Atlas (or local)
- Redis

### Local Execution
1. **Backend**:
   ```bash
   cd backend
   npm install
   npm run dev
   ```
2. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
3. **AI Service**:
   ```bash
   cd ai-service
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   uvicorn app.main:app --reload
   ```

## Environment Variables
See `.env.example` in each service directory.
