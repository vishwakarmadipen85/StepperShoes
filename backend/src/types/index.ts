import { Types } from 'mongoose';

export interface AuthRequest extends Request {
    user?: {
        id: string;
        role: string;
    };
}

export interface ApiResponse<T = any> {
    status: string;
    data?: T;
    message?: string;
    error?: any;
}
