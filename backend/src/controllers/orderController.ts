import { Request, Response, NextFunction } from 'express';
import Order, { IOrder } from '../models/Order';

export const getMyOrders = async (req: any, res: Response, next: NextFunction) => {
    try {
        const orders = await Order.find({ user: req.user.id }).populate('items.product');
        res.status(200).json({ status: 'success', orders });
    } catch (error) {
        next(error);
    }
};

export const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orders = await Order.find().populate('user', 'name email');
        res.status(200).json({ status: 'success', orders });
    } catch (error) {
        next(error);
    }
};

export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email').populate('items.product');
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json({ status: 'success', order });
    } catch (error) {
        next(error);
    }
};

export const updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true, runValidators: true }
        );
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json({ status: 'success', order });
    } catch (error) {
        next(error);
    }
};
