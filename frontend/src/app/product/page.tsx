'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SneakerScene from '@/components/canvas/SneakerScene';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Shield, Info, ArrowRight } from 'lucide-react';

const ProductDetail = () => {
    const [selectedSize, setSelectedSize] = useState<number | null>(null);

    return (
        <main className="min-h-screen bg-[#FAF9F6] text-black pt-20">
            <Navbar />

            <div className="pt-24 px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
                {/* Left: 3D Viewer */}
                <div className="h-[75vh] bg-white rounded-3xl relative overflow-hidden flex items-center justify-center border border-black/5 shadow-sm">
                    <SneakerScene />
                    <div className="absolute top-8 left-8">
                        <span className="bg-black/5 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-black/40">360° Studio View</span>
                    </div>
                </div>

                {/* Right: Info */}
                <div className="flex flex-col justify-center space-y-10 py-12">
                    <div className="space-y-4">
                        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/30">
                            Everyday Essentials
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-black">CLASSIC WOOL JOGGER</h1>
                        <div className="flex items-center gap-4 text-black/30">
                            <span className="text-sm font-bold tracking-widest uppercase">₹7,199.00</span>
                            <div className="h-4 w-px bg-black/10" />
                            <span className="text-xs font-bold uppercase tracking-widest">Free Shipping</span>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-black">Select Size (UK)</span>
                            <button className="text-[10px] font-bold uppercase tracking-widest text-black/30 underline hover:text-black transition-colors">Size Guide</button>
                        </div>
                        <div className="grid grid-cols-5 gap-3">
                            {[7, 8, 9, 10, 11].map(size => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`py-5 rounded-xl border-2 transition-all font-bold text-sm ${selectedSize === size ? 'bg-black text-white border-black' : 'border-black/5 hover:border-black/20 text-black/40'}`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6 pt-4">
                        <button className="w-full bg-black hover:bg-black/80 text-white font-bold py-6 rounded-full transition-all active:scale-[0.98] uppercase text-xs tracking-[0.2em] shadow-xl">
                            Add to Bag
                        </button>
                        <p className="text-[9px] text-center text-black/30 uppercase tracking-[0.25em] font-bold leading-relaxed">
                            Secured Payment • 7 Day Exchange • Responsibility at Core
                        </p>
                    </div>

                    {/* Features List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 border-t border-black/5">
                        <div className="space-y-2">
                            <h4 className="text-[10px] font-bold uppercase tracking-widest">Natural Materials</h4>
                            <p className="text-[11px] text-black/50 leading-relaxed">Breathable, soft, and renewably sourced.</p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-[10px] font-bold uppercase tracking-widest">Everyday Comfort</h4>
                            <p className="text-[11px] text-black/50 leading-relaxed">Designed to be worn all day, every day.</p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
};

export default ProductDetail;
