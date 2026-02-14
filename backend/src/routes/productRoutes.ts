import { Router } from 'express';
import { getAllProducts, getProductById, createProduct, updateProduct } from '../controllers/productController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', protect, authorize('vendor', 'admin'), createProduct);
router.put('/:id', protect, authorize('vendor', 'admin'), updateProduct);

export default router;
