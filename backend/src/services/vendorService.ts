import Vendor, { IVendor } from '../models/Vendor';
import User from '../models/User';
import mongoose from 'mongoose';

export class VendorService {
    static async registerVendor(userId: string, vendorData: Partial<IVendor>) {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            // 1. Create Vendor profile
            const vendor = new Vendor({
                userId,
                ...vendorData,
                kycStatus: 'pending',
                isApproved: false
            });
            await vendor.save({ session });

            // 2. Update User role
            await User.findByIdAndUpdate(userId, { role: 'vendor' }, { session });

            await session.commitTransaction();
            return vendor;
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }

    static async getVendorProfile(userId: string) {
        return await Vendor.findOne({ userId }).populate('userId', 'name email avatar');
    }

    static async updateVendorKyc(vendorId: string, status: IVendor['kycStatus']) {
        return await Vendor.findByIdAndUpdate(
            vendorId,
            { kycStatus: status, isApproved: status === 'approved' },
            { new: true }
        );
    }
}
