import logging
import time
from functools import wraps

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger("AEROSTEP-AI")

def time_it(func):
    """Decorator to measure execution time of AI inference."""
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        logger.info(f"Method {func.__name__} took {end - start:.4f}s")
        return result
    return wrapper

def preprocess_features(features):
    """Normalize input features for the model."""
    # Example normalization logic
    return [float(f) for f in features]
