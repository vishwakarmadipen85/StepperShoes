import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from typing import Dict, Any

class SizePredictor:
    def __init__(self):
        self.model = RandomForestRegressor(n_estimators=100)
        self._is_trained = False

    def train_on_synthetic_data(self):
        # Generate synthetic data for training
        # Features: height (cm), weight (kg), foot_length (cm), brand_id (0-3)
        np.random.seed(42)
        n_samples = 1000
        
        height = np.random.normal(170, 10, n_samples)
        weight = np.random.normal(70, 15, n_samples)
        foot_length = 0.15 * height + np.random.normal(0, 0.5, n_samples)
        brand_id = np.random.randint(0, 4, n_samples)
        
        # Target: Size (US)
        # Simple heuristic: foot_length / 2.54 * 3 - 22 (very rough approximation)
        sizes = (foot_length / 2.54) * 3 - 22 + (brand_id * 0.5) + np.random.normal(0, 0.2, n_samples)
        
        X = pd.DataFrame({
            'height': height,
            'weight': weight,
            'foot_length': foot_length,
            'brand_id': brand_id
        })
        y = sizes
        
        self.model.fit(X, y)
        self._is_trained = True

    def predict(self, data: Dict[str, Any]) -> Dict[str, Any]:
        if not self._is_trained:
            self.train_on_synthetic_data()
            
        X_new = pd.DataFrame([data])
        prediction = self.model.predict(X_new)[0]
        
        # Simple confidence score based on variance of trees (heuristic)
        all_tree_preds = np.array([tree.predict(X_new.values)[0] for tree in self.model.estimators_])
        std_dev = np.std(all_tree_preds)
        confidence = max(0, min(100, 100 - (std_dev * 50)))
        
        return {
            "recommended_size": round(prediction * 2) / 2, # Round to nearest 0.5
            "confidence_score": round(confidence, 2),
            "raw_value": prediction
        }

predictor = SizePredictor()
