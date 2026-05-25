import { Request, Response, NextFunction } from 'express';
import redisClient from '../config/redis';

const CART_EXPIRE_TIME = 60 * 60 * 24 * 7; // 7 days in seconds

export const getCart = async (req: any, res: Response, next: NextFunction) => {
    try {
        const userId = req.user ? req.user.id : req.query.sessionId;
        if (!userId) {
            return res.status(400).json({ message: 'User ID or Session ID is required' });
        }
        
        const cartKey = `cart:${userId}`;
        const cartData = await redisClient.get(cartKey);
        
        if (!cartData) {
            return res.status(200).json({ items: [] });
        }

        res.status(200).json(JSON.parse(cartData));
    } catch (error) {
        next(error);
    }
};

export const updateCart = async (req: any, res: Response, next: NextFunction) => {
    try {
        const userId = req.user ? req.user.id : req.body.sessionId;
        if (!userId) {
            return res.status(400).json({ message: 'User ID or Session ID is required' });
        }

        const cartKey = `cart:${userId}`;
        const { items } = req.body; // Expecting an array of cart items

        if (!Array.isArray(items)) {
            return res.status(400).json({ message: 'Items must be an array' });
        }

        const cartData = { items };
        
        // Save to Redis with expiration
        await redisClient.set(cartKey, JSON.stringify(cartData), 'EX', CART_EXPIRE_TIME);

        res.status(200).json(cartData);
    } catch (error) {
        next(error);
    }
};

export const clearCart = async (req: any, res: Response, next: NextFunction) => {
    try {
        const userId = req.user ? req.user.id : req.body.sessionId;
        if (!userId) {
            return res.status(400).json({ message: 'User ID or Session ID is required' });
        }

        const cartKey = `cart:${userId}`;
        await redisClient.del(cartKey);

        res.status(200).json({ message: 'Cart cleared' });
    } catch (error) {
        next(error);
    }
};
