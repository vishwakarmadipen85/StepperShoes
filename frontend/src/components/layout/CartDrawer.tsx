'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ArrowRight } from 'lucide-react';
import { useUI } from '@/context/UIContext';

export default function CartDrawer() {
    const { isCartOpen, closeCart } = useUI();

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
                    >
                        <div className="p-6 flex items-center justify-between border-b border-gray-100">
                            <h2 className="text-xl font-black uppercase tracking-tighter">Your Cart (2)</h2>
                            <button onClick={closeCart} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {[1, 2].map((item) => (
                                <div key={item} className="flex gap-4">
                                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0"></div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-sm">Tree Runner</h3>
                                                <p className="text-xs text-gray-500">Size 9 / Charcoal</p>
                                            </div>
                                            <button className="text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                                        </div>
                                        <div className="flex justify-between items-end mt-2">
                                            <div className="flex items-center border border-gray-200 rounded-md">
                                                <button className="px-2 py-0.5 text-gray-500 hover:text-black">-</button>
                                                <span className="px-1.5 font-bold text-xs">1</span>
                                                <button className="px-2 py-0.5 text-gray-500 hover:text-black">+</button>
                                            </div>
                                            <span className="font-bold text-sm">₹4,500</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-6 border-t border-gray-100 space-y-4 bg-gray-50">
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-bold">₹9,000</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-bold text-green-600">Free</span>
                                </div>
                            </div>
                            <button className="w-full bg-black text-white font-bold py-4 rounded-full uppercase tracking-widest hover:bg-gray-900 transition-colors flex items-center justify-center gap-2">
                                Checkout <ArrowRight size={18} />
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
