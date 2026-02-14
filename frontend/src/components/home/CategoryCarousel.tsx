'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const categories = [
    { name: "New Launches", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=200", color: "bg-[#E6F0F0]" },
    { name: "Begin Walk", img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=200", color: "bg-[#F5F1EE]" },
    { name: "Men", img: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&q=80&w=200", color: "bg-[#E0E7FF]" },
    { name: "Women", img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=200", color: "bg-[#FFE4E6]" },
    { name: "Sneakers", img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=200", color: "bg-[#F1F5F9]" },
    { name: "Slip Ons", img: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&q=80&w=200", color: "bg-[#FAF8F6]" },
    { name: "Loafers", img: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&q=80&w=200", color: "bg-[#FDF2F8]" },
    { name: "Oxfords", img: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=200", color: "bg-[#F0FDFA]" },
    { name: "Slides", img: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=200", color: "bg-[#FFF7ED]" },
    { name: "Sandals", img: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&q=80&w=200", color: "bg-[#F5F3FF]" },
];

const CategoryCarousel = () => {
    return (
        <section className="py-10 px-6 md:px-12 bg-white overflow-hidden">
            <div className="flex items-center gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4">
                {categories.map((cat, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        className="flex-shrink-0 snap-start flex flex-col items-center gap-4 group cursor-pointer"
                    >
                        <div className={`w-28 h-28 md:w-36 md:h-36 rounded-full ${cat.color} overflow-hidden flex items-center justify-center p-4 transition-transform duration-500 group-hover:rotate-6 shadow-sm`}>
                            <img
                                src={cat.img}
                                alt={cat.name}
                                className="w-full h-full object-contain mix-blend-multiply drop-shadow-xl"
                            />
                        </div>
                        <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] text-black/60 group-hover:text-black transition-colors">
                            {cat.name}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default CategoryCarousel;
