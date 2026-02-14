import { Router } from 'express';
import { protect, authorize } from '../middleware/auth';
import * as orderController from '../controllers/orderController';

const router = Router();

router.get('/my-orders', protect, orderController.getMyOrders);
router.get('/all', protect, authorize('admin'), orderController.getAllOrders);
router.get('/:id', protect, orderController.getOrderById);
router.patch('/:id/status', protect, authorize('admin'), orderController.updateOrderStatus);

export default router;
