'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ArrowRight } from 'lucide-react';
import { useUI } from '@/context/UIContext';
import { useCartStore } from '@/store/useCartStore';
import Link from 'next/link';

export default function CartDrawer() {
    const { isCartOpen, closeCart } = useUI();
    const { items, removeItem, updateQuantity } = useCartStore();

    const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 5000 || subtotal === 0 ? 0 : 250;
    const total = subtotal + shipping;
    const totalCount = items.reduce((total, item) => total + item.quantity, 0);

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
                            <h2 className="text-xl font-black uppercase tracking-tighter">Your Cart ({totalCount})</h2>
                            <button onClick={closeCart} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <p className="text-gray-400 font-medium">Your cart is empty.</p>
                                    <button onClick={closeCart} className="bg-black text-white px-6 py-3 font-bold rounded-full uppercase tracking-widest text-xs hover:bg-gray-900 transition-colors">
                                        Continue Shopping
                                    </button>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-bold text-sm uppercase">{item.name}</h3>
                                                    <p className="text-[10px] text-gray-500 uppercase">Size: {item.variant.size} / Color: {item.variant.color}</p>
                                                </div>
                                                <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                            <div className="flex justify-between items-end mt-2">
                                                <div className="flex items-center border border-gray-200 rounded-md bg-white">
                                                    <button 
                                                        onClick={() => item.quantity > 1 && updateQuantity(item.id, item.quantity - 1)}
                                                        className="px-2 py-0.5 text-gray-500 hover:text-black font-bold"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="px-1.5 font-bold text-xs">{item.quantity}</span>
                                                    <button 
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="px-2 py-0.5 text-gray-500 hover:text-black font-bold"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <span className="font-bold text-sm">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {items.length > 0 && (
                            <div className="p-6 border-t border-gray-100 space-y-4 bg-gray-50">
                                <div className="space-y-2 text-sm font-bold text-gray-500">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span className="text-black">₹{subtotal.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span className={shipping === 0 ? 'text-green-600' : 'text-black'}>
                                            {shipping === 0 ? 'FREE' : `₹${shipping}`}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-end pt-2 border-t border-gray-200">
                                        <span className="font-black uppercase tracking-widest text-gray-400 text-xs">Total</span>
                                        <span className="text-xl font-black text-black">₹{total.toLocaleString('en-IN')}</span>
                                    </div>
                                </div>
                                <Link 
                                    href="/checkout"
                                    onClick={closeCart}
                                    className="w-full bg-black text-white font-bold py-4 rounded-full uppercase tracking-widest hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 text-center text-sm"
                                >
                                    Checkout <ArrowRight size={18} />
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
