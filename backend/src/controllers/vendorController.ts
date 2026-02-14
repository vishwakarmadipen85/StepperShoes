import { Request, Response, NextFunction } from 'express';
import { VendorService } from '../services/vendorService';

export const registerVendor = async (req: any, res: Response, next: NextFunction) => {
    try {
        const vendor = await VendorService.registerVendor(req.user.id, req.body);
        res.status(201).json({
            message: 'Vendor registration submitted successfully',
            vendor
        });
    } catch (error) {
        next(error);
    }
};

export const getVendorProfile = async (req: any, res: Response, next: NextFunction) => {
    try {
        const vendor = await VendorService.getVendorProfile(req.user.id);
        if (!vendor) return res.status(404).json({ message: 'Vendor profile not found' });
        res.status(200).json({ vendor });
    } catch (error) {
        next(error);
    }
};

export const updateKyc = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { vendorId } = req.params;
        const { status } = req.body;
        const vendor = await VendorService.updateVendorKyc(vendorId, status);
        res.status(200).json({
            message: `Vendor KYC status updated to ${status}`,
            vendor
        });
    } catch (error) {
        next(error);
    }
};
