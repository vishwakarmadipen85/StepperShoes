import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Star, ShoppingBag } from 'lucide-react';

// This function is required for static export with dynamic routes
export function generateStaticParams() {
    // Return a list of possible values for [id]
    // In a real app, this would fetch from an API or database
    return [
        { id: '1' },
        { id: '2' },
        { id: '3' },
    ];
}

export default async function ProductPage() {
    // Note: In Next.js 15, params are awaited in the component, but we aren't using the ID 
    // to fetch specific data here yet (it's using mock data in the JSX). 
    // If we needed the ID: const { id } = await props.params;

    return (
        <main className="min-h-screen bg-[#FAF9F6] pt-44 md:pt-48">
            <Navbar />
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-gray-200 rounded-3xl overflow-hidden">
                            {/* Main Image Placeholder */}
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="aspect-square bg-gray-100 rounded-xl cursor-pointer hover:ring-2 ring-black transition-all"></div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-8">
                        <div>
                            <div className="flex items-center gap-2 text-yellow-500 mb-2">
                                <Star size={18} fill="currentColor" />
                                <span className="font-bold text-black text-sm">4.8 (120 reviews)</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-4">Tree Runner</h1>
                            <p className="text-2xl font-bold text-gray-900">₹4,500</p>
                        </div>

                        <p className="text-gray-600 leading-relaxed">
                            Light and breezy, the Tree Runner is our go-to for warmer days. Made with responsibly sourced eucalyptus tree fiber, it breathes well and fits seamlessly into your life.
                        </p>

                        {/* Size Selector */}
                        <div className="space-y-3">
                            <span className="text-xs font-bold uppercase tracking-widest">Select Size</span>
                            <div className="flex flex-wrap gap-3">
                                {[7, 8, 9, 10, 11, 12].map((size) => (
                                    <button key={size} className="w-12 h-12 rounded-lg border border-gray-200 font-bold hover:border-black hover:bg-black hover:text-white transition-all">
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4 pt-4">
                            <button className="flex-1 bg-black text-white font-bold py-4 rounded-full uppercase tracking-widest hover:bg-gray-900 transition-colors flex items-center justify-center gap-2">
                                <ShoppingBag size={20} /> Add to Cart
                            </button>
                            <button className="w-16 h-16 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                                ♡
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
