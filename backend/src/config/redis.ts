import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

let redisClient: any;

const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

// Setup connection with a max retry limit to prevent infinite loops
const memoryStore: Record<string, string> = {};
let isUsingFallback = false;

try {
    redisClient = new Redis(REDIS_URL, {
        maxRetriesPerRequest: 1,
        connectTimeout: 2000,
        retryStrategy(times) {
            // Stop retrying after 2 attempts to trigger error callback and fallback
            if (times > 2) {
                return null;
            }
            return 200;
        }
    });

    redisClient.on('connect', () => {
        console.log('Connected to Redis successfully');
    });

    redisClient.on('error', (err: any) => {
        if (!isUsingFallback) {
            console.error('⚠️ Redis connection failed. Falling back to In-Memory store:', err.message);
            isUsingFallback = true;
        }
        
        // Inject fallback methods into the client
        redisClient.get = async (key: string) => {
            return memoryStore[key] || null;
        };
        redisClient.set = async (key: string, value: string, option?: string, duration?: number) => {
            memoryStore[key] = value;
            return 'OK';
        };
        redisClient.del = async (key: string) => {
            const existed = key in memoryStore;
            delete memoryStore[key];
            return existed ? 1 : 0;
        };
    });
} catch (error: any) {
    console.error('⚠️ Failed to initialize Redis client. Using in-memory fallback:', error.message);
    isUsingFallback = true;
    redisClient = {
        get: async (key: string) => memoryStore[key] || null,
        set: async (key: string, value: string) => {
            memoryStore[key] = value;
            return 'OK';
        },
        del: async (key: string) => {
            const existed = key in memoryStore;
            delete memoryStore[key];
            return existed ? 1 : 0;
        },
        on: (event: string, callback: Function) => {}
    };
}

export default redisClient;

