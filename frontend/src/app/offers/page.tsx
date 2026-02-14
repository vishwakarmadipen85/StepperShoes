'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function OffersPage() {
    return (
        <main className="min-h-screen bg-[#FAF9F6] pt-44 md:pt-48">
            <Navbar />
            <div className="max-w-7xl mx-auto px-6 py-12 text-center">
                <h1 className="text-6xl font-black uppercase tracking-tighter mb-4 text-[#E41E26]">Flash Sale</h1>
                <p className="text-xl font-bold uppercase tracking-widest mb-12">Up to 50% Off Selected Styles</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Placeholder for offer items */}
                    <div className="aspect-video bg-gray-200 rounded-2xl flex items-center justify-center font-bold text-gray-400 uppercase">
                        Deal 1
                    </div>
                    <div className="aspect-video bg-gray-200 rounded-2xl flex items-center justify-center font-bold text-gray-400 uppercase">
                        Deal 2
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
