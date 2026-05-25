import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product';
import Vendor from './models/Vendor';
import User from './models/User';

dotenv.config();

const baseProducts = [
    {
        name: "AERO-X1 GENESIS",
        slug: "aero-x1-genesis",
        description: "The peak of performance engineering. Features reactive carbon-fiber plates and biometric-adaptive cushioning.",
        price: 249.99,
        category: "performance",
        images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000"],
        ratings: [], // Will populate properly if needed later
        averageRating: 4.9,
        aiMetadata: {
            fitScore: 98,
            popularity: 100,
            forecastedDemand: 500
        }
    },
    {
        name: "NEBULA FLOW",
        slug: "nebula-flow",
        description: "Minimalist aesthetic meets maximum comfort. Designed for the urban explorer.",
        price: 159.99,
        category: "lifestyle",
        images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1000"],
        averageRating: 4.7,
        aiMetadata: {
            fitScore: 95,
            popularity: 80,
            forecastedDemand: 300
        }
    },
    {
        name: "TITAN HOOP",
        slug: "titan-hoop",
        description: "Engineered for explosive verticality and lateral stability on the court.",
        price: 189.99,
        category: "basketball",
        images: ["https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&q=80&w=1000"],
        averageRating: 4.8,
        aiMetadata: { fitScore: 90, popularity: 75, forecastedDemand: 250 }
    },
    {
        name: "CYBER PULSE",
        slug: "cyber-pulse",
        description: "Neon-infused style with integrated LED sync technology. The future of streetware.",
        price: 199.99,
        category: "lifestyle",
        images: ["https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=1000"],
        averageRating: 4.6,
        aiMetadata: { fitScore: 88, popularity: 90, forecastedDemand: 400 }
    },
    {
        name: "ZENITH RUNNER",
        slug: "zenith-runner",
        description: "Ultra-lightweight racer built for breaking personal records.",
        price: 219.99,
        category: "performance",
        images: ["https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=1000"],
        averageRating: 4.9,
        aiMetadata: { fitScore: 96, popularity: 85, forecastedDemand: 350 }
    },
    {
        name: "ORBIT CHILL",
        slug: "orbit-chill",
        description: "Recovery slide with AI-mapped pressure relief zones.",
        price: 79.99,
        category: "lifestyle",
        images: ["https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&q=80&w=1000"],
        averageRating: 4.5,
        aiMetadata: { fitScore: 92, popularity: 95, forecastedDemand: 600 }
    }
];

// Helper to generate variants for a product
const generateVariants = (baseSku: string) => {
    const sizes = [7, 8, 9, 10, 11, 12];
    const colors = [
        { name: "Black", hex: "#000000" },
        { name: "White", hex: "#FFFFFF" }
    ];
    
    const variants = [];
    for (const size of sizes) {
        for (const color of colors) {
            variants.push({
                sku: `${baseSku}-${size}-${color.name.toUpperCase().substring(0, 3)}`,
                size: size,
                color: color,
                stock: Math.floor(Math.random() * 50) + 10 // Random stock between 10-60
            });
        }
    }
    return variants;
};

export const seedDatabase = async () => {
    try {
        await Product.deleteMany({});
        await Vendor.deleteMany({});
        await User.deleteMany({});

        // Create a default vendor user
        const vendorUser = await User.create({
            name: "AEROSTEP Official",
            email: "vendor@aerostep.ai",
            password: "password123",
            role: "vendor",
            isVerified: true
        });

        // Create a default vendor profile
        const defaultVendor = await Vendor.create({
            userId: vendorUser._id,
            businessName: "AEROSTEP AI",
            gstNumber: "22AAAAA0000A1Z5",
            isApproved: true,
            kycStatus: 'approved',
            payoutDetails: {
                bankName: "HDFC Bank",
                ifscCode: "HDFC0001234",
                accountNumber: "50100012345678"
            }
        });

        // Add vendor and variants to products
        const productsWithDetails = baseProducts.map(p => ({
            ...p,
            vendor: defaultVendor._id,
            isApproved: true,
            variants: generateVariants(p.slug.toUpperCase())
        }));

        await Product.insertMany(productsWithDetails);

        console.log("✅ Database Seeded Successfully!");
    } catch (error) {
        console.error("❌ Seeding failed:", error);
        throw error;
    }
};

const runStandalone = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/stepper');
        console.log("Connected to MongoDB for seeding...");
        await seedDatabase();
        process.exit(0);
    } catch (error) {
        console.error("❌ Seeding failed:", error);
        process.exit(1);
    }
};

// Check if run directly via ts-node
if (require.main === module) {
    runStandalone();
}

