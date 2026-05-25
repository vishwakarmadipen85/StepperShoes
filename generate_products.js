const fs = require('fs');

const generateProducts = () => {
    const products = [];
    
    const menAdjectives = ["Classic", "Urban", "Pro", "Tech", "Elite", "Street", "Essential", "Premium", "Core", "Max", "Ultra", "Flex", "Air"];
    const womenAdjectives = ["Cloud", "Breeze", "Chic", "Luxe", "Glide", "Nova", "Aura", "Luna", "Grace", "Bella", "Stella", "Bloom", "Halo"];
    
    const menTypes = ["Runner", "Sneaker", "Jogger", "High-Top", "Trainer", "Loafer", "Boot", "Slip-On", "Pacer", "Walker"];
    const womenTypes = ["Flats", "Heels", "Sneaker", "Runner", "Sandal", "Slip-On", "Wedge", "Bootie", "Trainer", "Mule"];

    const menImages = [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1597248881519-db089d3744a5?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1562183241-b937e95585b6?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1520639888713-7851108b1bfe?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&q=80&w=1000"
    ];

    const womenImages = [
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1620859344131-419b0aa932cc?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1603487742131-4160d6986ba2?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=1000"
    ];

    let idCounter = 1;

    // Generate 35 Men's Products
    for(let i=0; i<35; i++) {
        const adj = menAdjectives[Math.floor(Math.random() * menAdjectives.length)];
        const type = menTypes[Math.floor(Math.random() * menTypes.length)];
        const img = menImages[Math.floor(Math.random() * menImages.length)];
        
        products.push({
            _id: `m${idCounter++}`,
            name: `${adj} ${type}`,
            price: Math.floor(Math.random() * (25000 - 4000) + 4000), // INR pricing approx
            category: "Men",
            subcategory: type,
            images: [img],
            ratings: (Math.random() * (5 - 4) + 4).toFixed(1),
            badge: Math.random() > 0.7 ? "New" : (Math.random() > 0.8 ? "-20%" : undefined),
            ai_tags: ["men", type.toLowerCase(), adj.toLowerCase()]
        });
    }

    // Generate 35 Women's Products
    for(let i=0; i<35; i++) {
        const adj = womenAdjectives[Math.floor(Math.random() * womenAdjectives.length)];
        const type = womenTypes[Math.floor(Math.random() * womenTypes.length)];
        const img = womenImages[Math.floor(Math.random() * womenImages.length)];
        
        products.push({
            _id: `w${idCounter++}`,
            name: `${adj} ${type}`,
            price: Math.floor(Math.random() * (25000 - 4000) + 4000), // INR pricing approx
            category: "Women",
            subcategory: type,
            images: [img],
            ratings: (Math.random() * (5 - 4) + 4).toFixed(1),
            badge: Math.random() > 0.7 ? "Bestseller" : (Math.random() > 0.8 ? "-15%" : undefined),
            ai_tags: ["women", type.toLowerCase(), adj.toLowerCase()]
        });
    }

    const content = `export const products = ${JSON.stringify(products, null, 4)};\n\nexport const categories = [
    { name: "Men", img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=300" },
    { name: "Women", img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=300" },
    { name: "New Arrivals", img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=300" },
    { name: "Everyday", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=300" },
    { name: "Running", img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=300" },
    { name: "Slip-Ons", img: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&q=80&w=300" }
];\n`;

    fs.writeFileSync('frontend/src/data/products.ts', content);
    console.log('Successfully generated 70 products in products.ts');
};

generateProducts();
