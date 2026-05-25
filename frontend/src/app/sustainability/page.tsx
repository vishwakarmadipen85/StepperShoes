'use client';

import React from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Leaf, Recycle, Globe, Droplets } from "lucide-react";

export default function Sustainability() {
    return (
        <main className="relative min-h-screen bg-white text-black pt-28">
            <Navbar />

            {/* Hero Section */}
            <div className="bg-[#f9f9f9] border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1 space-y-6">
                        <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center mb-4">
                            <Leaf size={24} />
                        </div>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Our Commitment</p>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-black leading-none">
                            BETTER FOR <br /> THE PLANET
                        </h1>
                        <p className="text-base font-medium text-gray-600 max-w-md">
                            We believe that great design shouldn't cost the earth. Discover how we're working towards a zero-carbon future through innovative materials and ethical manufacturing.
                        </p>
                    </div>
                    
                    <div className="flex-1 relative aspect-square md:aspect-[4/3] w-full max-w-lg">
                        <img 
                            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1000" 
                            alt="Sustainability" 
                            className="w-full h-full object-cover rounded-3xl"
                        />
                    </div>
                </div>
            </div>

            {/* Stats/Pillars Section */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 border-b border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    <div className="space-y-4">
                        <Recycle size={32} className="text-gray-400 mb-6" />
                        <h3 className="text-xl font-black uppercase tracking-widest">Recycled Materials</h3>
                        <p className="text-sm font-medium text-gray-500 leading-relaxed">
                            Over 80% of our uppers are knit from recycled plastic bottles, giving single-use plastics a second, long-lasting life.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <Globe size={32} className="text-gray-400 mb-6" />
                        <h3 className="text-xl font-black uppercase tracking-widest">Carbon Neutral</h3>
                        <p className="text-sm font-medium text-gray-500 leading-relaxed">
                            We measure our carbon footprint from raw materials to end-of-life, entirely offsetting what we can't completely eliminate.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <Droplets size={32} className="text-gray-400 mb-6" />
                        <h3 className="text-xl font-black uppercase tracking-widest">Water Conservation</h3>
                        <p className="text-sm font-medium text-gray-500 leading-relaxed">
                            Our proprietary dyeing processes utilize 90% less water than traditional footwear manufacturing methods.
                        </p>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="bg-black text-white text-center py-24 px-6">
                <div className="max-w-2xl mx-auto space-y-6">
                    <h2 className="text-3xl font-black uppercase tracking-tighter">Read Our Impact Report</h2>
                    <p className="text-gray-400 font-medium text-sm">Dive deep into our supply chain transparency and our goals for 2030.</p>
                    <button className="mt-8 bg-white text-black font-bold px-8 py-3 rounded-full uppercase tracking-widest text-xs hover:bg-gray-200 transition-colors">
                        Download PDF
                    </button>
                </div>
            </div>
            
            <Footer />
        </main>
    );
}
