import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { seedDatabase } from '../seed';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/aerostep';
let mongoServer: MongoMemoryServer | null = null;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 2000 // 2 seconds timeout
        });
        console.log(`📦 MongoDB Connected: ${conn.connection.host}`);
    } catch (error: any) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        console.log('🔄 Spinning up in-memory MongoDB Server fallback...');
        try {
            mongoServer = await MongoMemoryServer.create();
            const mongoUri = mongoServer.getUri();
            await mongoose.connect(mongoUri);
            console.log(`📦 In-Memory MongoDB Connected: ${mongoUri}`);
            
            // Seed the in-memory database
            console.log('🌱 Seeding in-memory database with default products and vendors...');
            await seedDatabase();
        } catch (memError: any) {
            console.error('❌ Failed to start In-Memory MongoDB:', memError.message);
            console.warn('⚠️  Server starting in "Offline Mode" (No Database). Some features will not work.');
        }
    }
};

export default connectDB;

