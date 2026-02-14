import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product';

dotenv.config();

const products = [
    {
        name: "AERO-X1 GENESIS",
        description: "The peak of performance engineering. Features reactive carbon-fiber plates and biometric-adaptive cushioning.",
        price: 249.99,
        category: "performance",
        stock: 50,
        images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000"],
        vendor: "AEROSTEP AI",
        ratings: 4.9,
        ai_tags: ["reactive", "carbon-fiber", "biometric"]
    },
    {
        name: "NEBULA FLOW",
        description: "Minimalist aesthetic meets maximum comfort. Designed for the urban explorer.",
        price: 159.99,
        category: "lifestyle",
        stock: 120,
        images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1000"],
        vendor: "AEROSTEP AI",
        ratings: 4.7,
        ai_tags: ["minimalist", "breathable", "vibrant"]
    },
    {
        name: "TITAN HOOP",
        description: "Engineered for explosive verticality and lateral stability on the court.",
        price: 189.99,
        category: "basketball",
        stock: 35,
        images: ["https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&q=80&w=1000"],
        vendor: "AEROSTEP AI",
        ratings: 4.8,
        ai_tags: ["explosive", "stability", "court-grip"]
    },
    {
        name: "CYBER PULSE",
        description: "Neon-infused style with integrated LED sync technology. The future of streetware.",
        price: 199.99,
        category: "lifestyle",
        stock: 25,
        images: ["https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=1000"],
        vendor: "AEROSTEP AI",
        ratings: 4.6,
        ai_tags: ["exclusive", "neon", "tech-wear"]
    },
    {
        name: "ZENITH RUNNER",
        description: "Ultra-lightweight racer built for breaking personal records.",
        price: 219.99,
        category: "performance",
        stock: 40,
        images: ["https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=1000"],
        vendor: "AEROSTEP AI",
        ratings: 4.9,
        ai_tags: ["ultralight", "racing", "propulsion"]
    },
    {
        name: "ORBIT CHILL",
        description: "Recovery slide with AI-mapped pressure relief zones.",
        price: 79.99,
        category: "lifestyle",
        stock: 200,
        images: ["https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&q=80&w=1000"],
        vendor: "AEROSTEP AI",
        ratings: 4.5,
        ai_tags: ["recovery", "ergonomic", "plush"]
    },
    {
        name: "VOLT TRAINER",
        description: "Versatile gym sneaker for high-intensity interval training.",
        price: 139.99,
        category: "training",
        stock: 80,
        images: ["https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&q=80&w=1000"],
        vendor: "AEROSTEP AI",
        ratings: 4.7,
        ai_tags: ["versatile", "hiit", "durable"]
    },
    {
        name: "APEX CLIMB",
        description: "Rugged outdoor hybrid for technical trails and rocky terrain.",
        price: 169.99,
        category: "outdoor",
        stock: 60,
        images: ["https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=1000"],
        vendor: "AEROSTEP AI",
        ratings: 4.8,
        ai_tags: ["rugged", "waterproof", "all-terrain"]
    },
    {
        name: "STEALTH VOID",
        description: "All-black tactical silhouette with impact-absorbing soles.",
        price: 179.99,
        category: "lifestyle",
        stock: 45,
        images: ["https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=1000"],
        vendor: "AEROSTEP AI",
        ratings: 4.6,
        ai_tags: ["tactical", "shadow", "impact"]
    },
    {
        name: "NOVA BLAST",
        description: "Colorful, high-energy running shoe for daily mileage.",
        price: 149.99,
        category: "performance",
        stock: 90,
        images: ["https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&q=80&w=1000"],
        vendor: "AEROSTEP AI",
        ratings: 4.7,
        ai_tags: ["daily", "cushioned", "breathable"]
    },
    {
        name: "ECLIPSE VELOCITY",
        description: "Speed-focused design with an aerodynamic upper.",
        price: 229.99,
        category: "performance",
        stock: 30,
        images: ["https://images.unsplash.com/photo-1515955656352-a1fe3ff2115e?auto=format&fit=crop&q=80&w=1000"],
        vendor: "AEROSTEP AI",
        ratings: 4.9,
        ai_tags: ["aerodynamic", "sprint", "lightweight"]
    },
    {
        name: "PRISM STRIDE",
        description: "Dynamic color-shifting material that reacts to movement.",
        price: 209.99,
        category: "lifestyle",
        stock: 50,
        images: ["https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=1000"],
        vendor: "AEROSTEP AI",
        ratings: 4.8,
        ai_tags: ["color-shift", "dynamic", "bold"]
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || '');
        console.log("Connected to MongoDB for seeding...");

        await Product.deleteMany({});
        await Product.insertMany(products);

        console.log("✅ Database Seeded Successfully!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Seeding failed:", error);
        process.exit(1);
    }
};

seedDB();
