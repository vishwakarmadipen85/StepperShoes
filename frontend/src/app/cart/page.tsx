'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Trash2, ArrowRight } from 'lucide-react';

export default function CartPage() {
    return (
        <main className="min-h-screen bg-[#FAF9F6] pt-44 md:pt-48">
            <Navbar />
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
                <h1 className="text-4xl font-black uppercase tracking-tighter mb-12">Your Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        {[1, 2].map((item) => (
                            <div key={item} className="flex gap-6 bg-white p-6 rounded-2xl border border-gray-100">
                                <div className="w-24 h-24 bg-gray-100 rounded-xl flex-shrink-0"></div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-lg">Tree Runner</h3>
                                            <p className="text-sm text-gray-500">Men's / size 9 / Charcoal</p>
                                        </div>
                                        <button className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                                    </div>
                                    <div className="flex justify-between items-end mt-4">
                                        <div className="flex items-center border border-gray-200 rounded-lg">
                                            <button className="px-3 py-1 text-gray-500 hover:text-black">-</button>
                                            <span className="px-2 font-bold text-sm">1</span>
                                            <button className="px-3 py-1 text-gray-500 hover:text-black">+</button>
                                        </div>
                                        <span className="font-bold text-lg">₹4,500</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="bg-white p-8 rounded-2xl border border-gray-100 h-fit space-y-6">
                        <h3 className="font-bold text-xl uppercase tracking-tight">Order Summary</h3>
                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>₹9,000</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="border-t border-gray-100 pt-4 flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>₹9,000</span>
                            </div>
                        </div>
                        <button className="w-full bg-black text-white font-bold py-4 rounded-full uppercase tracking-widest hover:bg-gray-900 transition-colors flex items-center justify-center gap-2">
                            Checkout <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
