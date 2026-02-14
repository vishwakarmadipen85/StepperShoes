import Vendor from '../models/Vendor';

export class CommissionService {
    /**
     * Calculate the split between platform and vendor.
     * @param price Total price of the item
     * @param vendorId ID of the vendor
     */
    static async calculatePayout(price: number, vendorId: string) {
        const vendor = await Vendor.findById(vendorId);
        const commissionRate = vendor?.commissionRate || 10; // Default 10%

        const platformFee = (price * commissionRate) / 100;
        const vendorPayout = price - platformFee;

        return {
            platformFee,
            vendorPayout,
            commissionRate
        };
    }

    /**
     * Batch calculation for an entire order
     */
    static async calculateOrderSplit(items: any[]) {
        const splitDetails = await Promise.all(items.map(async (item) => {
            const { platformFee, vendorPayout } = await this.calculatePayout(item.price * item.quantity, item.vendor);
            return {
                ...item,
                platformFee,
                vendorPayout
            };
        }));

        return splitDetails;
    }
}
