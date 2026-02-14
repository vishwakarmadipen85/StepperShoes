'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function HelpPage() {
    return (
        <main className="min-h-screen bg-[#FAF9F6] pt-44 md:pt-48">
            <Navbar />
            <div className="max-w-4xl mx-auto px-6 py-24">
                <h1 className="text-4xl font-black uppercase tracking-tighter mb-12">Help Center</h1>

                <div className="space-y-6">
                    <details className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 group">
                        <summary className="font-bold text-lg cursor-pointer flex justify-between items-center">
                            How do I track my order?
                            <span className="transform group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="mt-4 text-gray-600">You can track your order by visiting the Track Order page and entering your order ID.</p>
                    </details>

                    <details className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 group">
                        <summary className="font-bold text-lg cursor-pointer flex justify-between items-center">
                            What is your return policy?
                            <span className="transform group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="mt-4 text-gray-600">We offer a 30-day no-questions-asked return policy for all unworn shoes.</p>
                    </details>
                </div>
            </div>
            <Footer />
        </main>
    );
}
