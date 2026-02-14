import { Request, Response, NextFunction } from 'express';
import Product from '../models/Product';

import { ProductCatalogService } from '../services/productCatalogService';

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const category = req.query.category;

        const query: any = {};
        if (category) query.category = category;

        const result = await ProductCatalogService.getMarketplaceProducts(query, page, limit);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await Product.findById(req.params.id).populate('vendor', 'name email');
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ product });
    } catch (error) {
        next(error);
    }
};

export const createProduct = async (req: any, res: Response, next: NextFunction) => {
    try {
        const product = await ProductCatalogService.submitProductForApproval(req.user.id, req.body);
        res.status(201).json({
            message: 'Product submitted for approval',
            product
        });
    } catch (error) {
        next(error);
    }
};

export const updateProduct = async (req: any, res: Response, next: NextFunction) => {
    try {
        let product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        if (product.vendor.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to update this product' });
        }

        product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(200).json({ product });
    } catch (error) {
        next(error);
    }
};
