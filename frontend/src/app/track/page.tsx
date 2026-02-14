'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function TrackPage() {
    return (
        <main className="min-h-screen bg-[#FAF9F6] pt-44 md:pt-48">
            <Navbar />
            <div className="max-w-md mx-auto px-6 py-24 text-center">
                <h1 className="text-3xl font-black uppercase tracking-tighter mb-8">Track Order</h1>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                    <input type="text" placeholder="Order ID (e.g. #1234)" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:border-black transition-colors" />
                    <button className="w-full bg-black text-white font-bold py-3 rounded-full uppercase tracking-widest hover:bg-gray-900 transition-colors">
                        Track Status
                    </button>
                </div>
            </div>
            <Footer />
        </main>
    );
}
