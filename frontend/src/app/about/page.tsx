'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#FAF9F6] pt-44 md:pt-48">
            <Navbar />
            <div className="max-w-4xl mx-auto px-6 py-24 text-center">
                <h1 className="text-5xl font-black uppercase tracking-tighter mb-8">Our Story</h1>
                <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                    At Stepper Shoes, we believe in comfort without compromise. Born from a desire to create footwear that respects the planet, we use renewable materials like merino wool and eucalyptus fibers to craft shoes that feel as good as they look.
                </p>
                <div className="aspect-video bg-gray-200 rounded-3xl overflow-hidden mb-12">
                    {/* Brand Image Placeholder */}
                </div>
            </div>
            <Footer />
        </main>
    );
}
