'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import VendorSpotlight from '@/components/home/VendorSpotlight';

export default function VendorsPage() {
    return (
        <main className="min-h-screen bg-[#FAF9F6] pt-44 md:pt-48">
            <Navbar />
            <div className="pt-12">
                <VendorSpotlight />
            </div>
            <Footer />
        </main>
    );
}
