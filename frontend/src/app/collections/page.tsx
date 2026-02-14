'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CategoryCarousel from '@/components/home/CategoryCarousel';

export default function CollectionsPage() {
    return (
        <main className="min-h-screen bg-[#FAF9F6] pt-44 md:pt-48">
            <Navbar />
            <div className="py-12">
                <h1 className="text-center text-4xl font-black uppercase tracking-tighter mb-12">All Collections</h1>
                <CategoryCarousel />
            </div>
            <Footer />
        </main>
    );
}
