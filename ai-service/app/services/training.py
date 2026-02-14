import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.neighbors import NearestNeighbors
import joblib
import os

# Ensure models directory exists
MODEL_DIR = os.path.join(os.path.dirname(__file__), '..', 'models')
os.makedirs(MODEL_DIR, exist_ok=True)

def train_size_predictor():
    print("Training Size Predictor...")
    data_path = os.path.join(os.path.dirname(__file__), '../../data/size_training_data.csv')
    df = pd.read_csv(data_path)
    
    X = df[['height_cm', 'weight_kg', 'current_brand_size', 'brand_index']]
    y = df['recommended_size']
    
    model = LinearRegression()
    model.fit(X, y)
    
    joblib.dump(model, os.path.join(MODEL_DIR, 'size_model.joblib'))
    print("Size model saved.")

def train_recommender():
    print("Training Recommender...")
    data_path = os.path.join(os.path.dirname(__file__), '../../data/recommendations.csv')
    df = pd.read_csv(data_path)
    
    # Simple mapping for style recommendation
    # In a real scenario, this would be more complex
    X = df[['style_score']]
    model = NearestNeighbors(n_neighbors=1)
    model.fit(X)
    
    joblib.dump(model, os.path.join(MODEL_DIR, 'recommendation_model.joblib'))
    print("Recommendation model saved.")

if __name__ == "__main__":
    train_size_predictor()
    train_recommender()
