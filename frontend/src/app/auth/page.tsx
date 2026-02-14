'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <main className="min-h-screen bg-[#FAF9F6] pt-44 md:pt-48">
            <Navbar />
            <div className="flex flex-col items-center justify-center py-24 px-6">
                <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
                    <h1 className="text-3xl font-black text-center mb-8 uppercase tracking-tighter">
                        {isLogin ? 'Welcome Back' : 'Join the Club'}
                    </h1>

                    <form className="space-y-6">
                        {!isLogin && (
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest mb-2">Full Name</label>
                                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:border-black transition-colors" placeholder="John Doe" />
                            </div>
                        )}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2">Email Address</label>
                            <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:border-black transition-colors" placeholder="hello@example.com" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2">Password</label>
                            <input type="password" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:border-black transition-colors" placeholder="••••••••" />
                        </div>

                        <button className="w-full bg-black text-white font-bold py-4 rounded-full uppercase tracking-widest hover:bg-gray-900 transition-colors">
                            {isLogin ? 'Sign In' : 'Create Account'}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm">
                        <span className="text-gray-500">{isLogin ? "Don't have an account? " : "Already have an account? "}</span>
                        <button onClick={() => setIsLogin(!isLogin)} className="font-bold underline">
                            {isLogin ? 'Sign Up' : 'Log In'}
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
