'use client';

import React, { useState } from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { products } from "@/data/products";

export default function WomenCollection() {
    const [sortBy, setSortBy] = useState('Popularity');
    
    // Filter out only women's products (mock logic for now using existing data)
    const womenProducts = products.filter(p => p.category.toLowerCase().includes('women') || p.category.toLowerCase().includes('sneaker'));

    return (
        <main className="relative min-h-screen bg-white text-black pt-28">
            <Navbar />

            {/* Breadcrumb & Hero */}
            <div className="bg-[#f9f9f9] border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 relative overflow-hidden">
                    <div className="relative z-10 space-y-4">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Home / Women</p>
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-black">WOMEN'S COLLECTION</h1>
                        <p className="text-sm font-medium text-gray-600 max-w-sm">Designed for comfort. Made for style. Explore the latest in women's premium footwear.</p>
                    </div>
                    {/* Decorative Background Image (Placeholder) */}
                    <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none">
                        <img src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover object-right" alt="Women's Lifestyle" />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 flex flex-col md:flex-row gap-12">
                {/* Left Sidebar Filters */}
                <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
                    <div className="flex items-center gap-2 font-bold text-sm border-b border-gray-100 pb-4 uppercase tracking-widest">
                        <SlidersHorizontal size={16} /> Filters
                    </div>
                    
                    {/* Category Filter */}
                    <div className="space-y-4">
                        <h3 className="text-[11px] font-black uppercase tracking-widest flex items-center justify-between">
                            Category <ChevronDown size={14} />
                        </h3>
                        <div className="space-y-3">
                            {['Sneakers (120)', 'Running (80)', 'Heels (35)', 'Flats (40)', 'Sandals (25)'].map((cat, i) => (
                                <label key={i} className="flex items-center gap-3 cursor-pointer group">
                                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer" />
                                    <span className="text-xs font-medium text-gray-600 group-hover:text-black transition-colors">{cat}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Size Filter */}
                    <div className="space-y-4 border-t border-gray-100 pt-6">
                        <h3 className="text-[11px] font-black uppercase tracking-widest flex items-center justify-between">
                            Size (UK) <ChevronDown size={14} />
                        </h3>
                        <div className="grid grid-cols-4 gap-2">
                            {[4, 5, 6, 7, 8, 9, 10].map(size => (
                                <button key={size} className="border border-gray-200 rounded-md py-2 text-xs font-bold text-gray-600 hover:border-black hover:text-black transition-colors">
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Price Filter */}
                    <div className="space-y-4 border-t border-gray-100 pt-6">
                        <h3 className="text-[11px] font-black uppercase tracking-widest flex items-center justify-between">
                            Price <ChevronDown size={14} />
                        </h3>
                        <div className="space-y-2">
                            <input type="range" min="1000" max="20000" className="w-full accent-black" />
                            <div className="flex justify-between text-xs font-bold text-gray-500">
                                <span>₹1,499</span>
                                <span>₹19,999</span>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Right Product Grid */}
                <div className="flex-1 space-y-8">
                    {/* Top Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <p className="text-xs font-medium text-gray-500">Showing 1-12 of 230+ products</p>
                        
                        <div className="flex items-center gap-2 text-xs font-bold">
                            <span className="text-gray-500">Sort by:</span>
                            <select 
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-transparent border-none outline-none cursor-pointer hover:text-gray-600"
                            >
                                <option>Popularity</option>
                                <option>Newest</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                            </select>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {womenProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-center gap-2 pt-12">
                        <button className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold bg-black text-white">1</button>
                        <button className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold text-gray-500 hover:bg-gray-100">2</button>
                        <button className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold text-gray-500 hover:bg-gray-100">3</button>
                        <span className="text-gray-400">...</span>
                        <button className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold text-gray-500 hover:bg-gray-100">20</button>
                    </div>
                </div>
            </div>
            
            <Footer />
        </main>
    );
}
