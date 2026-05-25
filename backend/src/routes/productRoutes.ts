import { Router } from 'express';
import { getAllProducts, getProductById, getProductBySlug, createProduct, updateProduct, searchProducts } from '../controllers/productController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

router.get('/search', searchProducts);
router.get('/', getAllProducts);
router.get('/slug/:slug', getProductBySlug);
router.get('/:id', getProductById);
router.post('/', protect, authorize('vendor', 'admin'), createProduct);
router.put('/:id', protect, authorize('vendor', 'admin'), updateProduct);

export default router;
