try:
    import pandas as pd
    import numpy as np
    from surprise import Dataset, Reader, SVD
    HAS_SURPRISE = True
except ImportError:
    HAS_SURPRISE = False

class RecommendationEngine:
    def __init__(self):
        self.model = None
        self.is_trained = False
        if HAS_SURPRISE:
            self.model = SVD()

    def train(self, data):
        if not HAS_SURPRISE:
            print("Surprise not installed. Skipping training.")
            return
        df = pd.DataFrame(data, columns=['user_id', 'product_id', 'rating'])
        reader = Reader(rating_scale=(1, 5))
        dataset = Dataset.load_from_df(df[['user_id', 'product_id', 'rating']], reader)
        trainset = dataset.build_full_trainset()
        self.model.fit(trainset)
        self.is_trained = True

    def predict(self, user_id, product_ids):
        if not HAS_SURPRISE or not self.is_trained:
            # Simple heuristic fallback
            return [{"product_id": pid, "score": 3.5} for pid in product_ids]
        
        predictions = []
        for pid in product_ids:
            est = self.model.predict(user_id, pid).est
            predictions.append({"product_id": pid, "score": est})
        
        predictions.sort(key=lambda x: x['score'], reverse=True)
        return predictions

recommendation_engine = RecommendationEngine()
