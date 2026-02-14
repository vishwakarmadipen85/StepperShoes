import mongoose, { Schema, Document } from 'mongoose';

export interface IVendor extends Document {
    userId: mongoose.Types.ObjectId;
    businessName: string;
    gstNumber: string;
    kycStatus: 'pending' | 'approved' | 'rejected' | 'not_submitted';
    commissionRate: number; // Percentage e.g. 10 for 10%
    isApproved: boolean;
    description?: string;
    logo?: string;
    banner?: string;
    socialLinks?: {
        instagram?: string;
        website?: string;
    };
    payoutDetails: {
        accountNumber: string;
        ifscCode: string;
        bankName: string;
    };
}

const VendorSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    businessName: { type: String, required: true },
    gstNumber: { type: String, required: true },
    kycStatus: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'not_submitted'],
        default: 'not_submitted'
    },
    commissionRate: { type: Number, default: 10 },
    isApproved: { type: Boolean, default: false },
    description: { type: String },
    logo: { type: String },
    banner: { type: String },
    socialLinks: {
        instagram: { type: String },
        website: { type: String }
    },
    payoutDetails: {
        accountNumber: { type: String, required: true },
        ifscCode: { type: String, required: true },
        bankName: { type: String, required: true }
    }
}, { timestamps: true });

export default mongoose.model<IVendor>('Vendor', VendorSchema);
