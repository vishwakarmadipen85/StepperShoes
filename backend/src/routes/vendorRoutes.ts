import { Router } from 'express';
import { registerVendor, getVendorProfile, updateKyc } from '../controllers/vendorController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

router.post('/register', protect, registerVendor);
router.get('/profile', protect, authorize('vendor'), getVendorProfile);
router.put('/:vendorId/kyc', protect, authorize('admin'), updateKyc);

export default router;
