'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import { products } from "@/data/products";

export default function CategoryPage() {
    const params = useParams();
    const categoryName = Array.isArray(params.category) ? params.category[0] : params.category;

    // Filter products based on URL param (simple search)
    const categoryProducts = products.filter(p =>
        p.category.toLowerCase() === categoryName?.toLowerCase() ||
        p.subcategory.toLowerCase() === categoryName?.toLowerCase()
    );

    // If no specific matches, just show all for demo purposes (or empty state)
    const displayProducts = categoryProducts.length > 0 ? categoryProducts : products;

    return (
        <main className="min-h-screen bg-[#FAF9F6] pt-44 md:pt-48">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
                <div className="space-y-4 mb-12 text-center md:text-left">
                    <p className="text-sm font-bold tracking-widest uppercase text-gray-400">Collection</p>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">{categoryName}</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>

            <Footer />
        </main>
    );
}
