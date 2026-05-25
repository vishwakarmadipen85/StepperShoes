import { Router } from 'express';
import { getCart, updateCart, clearCart } from '../controllers/cartController';
import { optionalProtect } from '../middleware/auth';

const router = Router();

// Notice we do not strictly enforce `protect` middleware so guest users (via sessionId) can use the cart.
router.get('/', optionalProtect, getCart);
router.post('/', optionalProtect, updateCart);
router.delete('/', optionalProtect, clearCart);

export default router;

