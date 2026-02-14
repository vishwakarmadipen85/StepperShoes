'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useUI } from '@/context/UIContext';

export default function AuthModal() {
    const { isAuthOpen, closeAuth } = useUI();
    const [isLogin, setIsLogin] = useState(true);

    return (
        <AnimatePresence>
            {isAuthOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeAuth}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl z-[70]"
                    >
                        <button onClick={closeAuth} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <X size={20} />
                        </button>

                        <h2 className="text-2xl font-black text-center mb-6 uppercase tracking-tighter">
                            {isLogin ? 'Welcome Back' : 'Join the Club'}
                        </h2>

                        <form className="space-y-4">
                            {!isLogin && (
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest mb-1">Full Name</label>
                                    <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:border-black transition-colors" placeholder="John Doe" />
                                </div>
                            )}
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-widest mb-1">Email</label>
                                <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:border-black transition-colors" placeholder="hello@example.com" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-widest mb-1">Password</label>
                                <input type="password" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:border-black transition-colors" placeholder="••••••••" />
                            </div>

                            <button className="w-full bg-black text-white font-bold py-3.5 rounded-full uppercase tracking-widest hover:bg-gray-900 transition-colors mt-2">
                                {isLogin ? 'Sign In' : 'Create Account'}
                            </button>
                        </form>

                        <div className="mt-6 text-center text-xs">
                            <span className="text-gray-500">{isLogin ? "Don't have an account? " : "Already have an account? "}</span>
                            <button onClick={() => setIsLogin(!isLogin)} className="font-bold underline hover:text-black">
                                {isLogin ? 'Sign Up' : 'Log In'}
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
