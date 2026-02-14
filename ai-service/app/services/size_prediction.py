try:
    from sklearn.linear_model import LinearRegression
    import joblib
    HAS_SKLEARN = True
except ImportError:
    HAS_SKLEARN = False

import numpy as np
import os

class SizePredictor:
    def __init__(self):
        self.model = None
        self.HAS_SKLEARN = HAS_SKLEARN
        if HAS_SKLEARN:
            # Try loading existing model
            model_path = os.path.join(os.path.dirname(__file__), '..', 'models', 'size_model.joblib')
            if os.path.exists(model_path):
                self.model = joblib.load(model_path)
            else:
                # Basic initialization if no model found
                self.model = LinearRegression()
                X = np.array([[170, 65, 8, 1], [180, 80, 10, 1], [160, 55, 6, 2]])
                y = np.array([8.5, 10.2, 6.5])
                self.model.fit(X, y)

    def predict_size(self, height, weight, current_size, brand_name):
        if not self.model:
            # Total fallback
            predicted = (height / 20) + (weight / 50) + (current_size * 0.5)
            confidence = 0.7
        else:
            brand_map = {"nike": 1, "adidas": 2, "puma": 3}
            brand_idx = brand_map.get(brand_name.lower(), 1)
            input_data = np.array([[height, weight, current_size, brand_idx]])
            predicted = self.model.predict(input_data)[0]
            confidence = 0.95 if 150 <= height <= 200 else 0.85
        
        return {
            "recommended_size": round(predicted, 1),
            "confidence": confidence,
            "message": f"Size {round(predicted, 1)} is recommended based on your biometrics."
        }

size_predictor = SizePredictor()
