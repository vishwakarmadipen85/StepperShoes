import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    category: string;
    vendor: mongoose.Types.ObjectId;
    images: string[];
    sizes: number[];
    colors: { name: string, hex: string }[];
    stock: number;
    ratings: { user: mongoose.Types.ObjectId, score: number, comment: string }[];
    averageRating: number;
    slug: string;
    discountPrice?: number;
    isApproved: boolean;
    aiMetadata: {
        fitScore: number;
        popularity: number;
        forecastedDemand: number;
    };
}

const ProductSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    vendor: { type: Schema.Types.ObjectId, ref: 'Vendor', required: true },
    slug: { type: String, required: true, unique: true },
    discountPrice: { type: Number },
    isApproved: { type: Boolean, default: false },
    images: [{ type: String }],
    sizes: [{ type: Number }],
    colors: [{
        name: { type: String },
        hex: { type: String }
    }],
    stock: { type: Number, default: 0 },
    ratings: [{
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        score: { type: Number, min: 1, max: 5 },
        comment: { type: String }
    }],
    averageRating: { type: Number, default: 0 },
    aiMetadata: {
        fitScore: { type: Number, default: 0 },
        popularity: { type: Number, default: 0 },
        forecastedDemand: { type: Number, default: 0 }
    }
}, { timestamps: true });

export default mongoose.model<IProduct>('Product', ProductSchema);
