import Product, { IProduct } from '../models/Product';
import Vendor from '../models/Vendor';

export class ProductCatalogService {
    static async submitProductForApproval(vendorId: string, productData: Partial<IProduct>) {
        const vendor = await Vendor.findOne({ userId: vendorId });
        if (!vendor || !vendor.isApproved) {
            throw new Error('Only approved vendors can submit products.');
        }

        const product = new Product({
            ...productData,
            vendor: vendor._id,
            isApproved: false // Requires admin moderation
        });

        return await product.save();
    }

    static async approveProduct(productId: string) {
        return await Product.findByIdAndUpdate(productId, { isApproved: true }, { new: true });
    }

    static async getMarketplaceProducts(query: any = {}, page: number = 1, limit: number = 10) {
        const skip = (page - 1) * limit;
        const products = await Product.find({ ...query, isApproved: true })
            .populate('vendor', 'businessName logo')
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await Product.countDocuments({ ...query, isApproved: true });

        return {
            products,
            total,
            page,
            pages: Math.ceil(total / limit)
        };
    }
}
