import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// This function is required for static export with dynamic routes
export function generateStaticParams() {
    return [
        { name: 'nike' },
        { name: 'adidas' },
        { name: 'puma' },
        { name: 'allbirds' },
    ];
}

export default async function VendorProfilePage({ params }: { params: Promise<{ name: string }> }) {
    const { name: vendorName } = await params;

    return (
        <main className="min-h-screen bg-[#FAF9F6] pt-44 md:pt-48">
            <Navbar />
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="h-64 bg-black/5 rounded-3xl mb-8 flex items-end p-8">
                    <h1 className="text-6xl font-black uppercase tracking-tighter text-black/20">{vendorName}</h1>
                </div>
                <h2 className="text-2xl font-bold uppercase tracking-tight mb-8">Latest Collection</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="aspect-[4/5] bg-white rounded-2xl border border-gray-100"></div>
                    <div className="aspect-[4/5] bg-white rounded-2xl border border-gray-100"></div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
