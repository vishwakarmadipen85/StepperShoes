import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductDetailsClient from '@/components/product/ProductDetailsClient';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { products as staticProducts } from '@/data/products';

// Fetch product helper
async function getProduct(slug: string) {
    try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
        const res = await fetch(`${API_URL}/products/slug/${slug}`, {
            next: { revalidate: 60 }
        });
        if (res.ok) {
            const data = await res.json();
            if (data.product) return data.product;
        }
    } catch (err) {
        console.warn("Backend fetch failed for product, checking static products:", err);
    }

    // Check static fallback
    const staticProduct = staticProducts.find(p => p._id === slug || p.name.toLowerCase().replace(/ /g, '-') === slug);
    if (staticProduct) {
        return {
            _id: staticProduct._id,
            name: staticProduct.name,
            description: (staticProduct as any).description || "Experience ultimate style and comfort with the Stepper Shoes premium edition, designed for lightweight performance and modern aesthetics.",
            price: staticProduct.price,
            category: staticProduct.category,
            images: staticProduct.images,
            variants: (staticProduct as any).variants || [
                { sku: `SKU-${staticProduct._id}-7-WHITE`, size: 7, color: { name: 'White', hex: '#FFFFFF' }, stock: 10 },
                { sku: `SKU-${staticProduct._id}-8-WHITE`, size: 8, color: { name: 'White', hex: '#FFFFFF' }, stock: 10 },
                { sku: `SKU-${staticProduct._id}-9-WHITE`, size: 9, color: { name: 'White', hex: '#FFFFFF' }, stock: 10 },
                { sku: `SKU-${staticProduct._id}-10-WHITE`, size: 10, color: { name: 'White', hex: '#FFFFFF' }, stock: 10 },
                { sku: `SKU-${staticProduct._id}-11-WHITE`, size: 11, color: { name: 'White', hex: '#FFFFFF' }, stock: 10 },
                { sku: `SKU-${staticProduct._id}-12-WHITE`, size: 12, color: { name: 'White', hex: '#FFFFFF' }, stock: 10 },
                { sku: `SKU-${staticProduct._id}-7-BLACK`, size: 7, color: { name: 'Black', hex: '#111111' }, stock: 10 },
                { sku: `SKU-${staticProduct._id}-8-BLACK`, size: 8, color: { name: 'Black', hex: '#111111' }, stock: 10 },
                { sku: `SKU-${staticProduct._id}-9-BLACK`, size: 9, color: { name: 'Black', hex: '#111111' }, stock: 10 },
                { sku: `SKU-${staticProduct._id}-10-BLACK`, size: 10, color: { name: 'Black', hex: '#111111' }, stock: 10 },
                { sku: `SKU-${staticProduct._id}-11-BLACK`, size: 11, color: { name: 'Black', hex: '#111111' }, stock: 10 },
                { sku: `SKU-${staticProduct._id}-12-BLACK`, size: 12, color: { name: 'Black', hex: '#111111' }, stock: 10 },
            ],
            averageRating: parseFloat(String(staticProduct.ratings)) || 4.5
        };
    }
    return null;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id: slug } = await params;
    const product = await getProduct(slug);

    if (!product) {
        return {
            title: 'Product Not Found | Stepper Shoes'
        };
    }

    return {
        title: `${product.name} | Stepper Shoes`,
        description: product.description.substring(0, 160),
        openGraph: {
            title: product.name,
            description: product.description,
            images: [product.images[0]],
        }
    };
}

// In Next.js 15, params must be awaited
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id: slug } = await params;
    const product = await getProduct(slug);

    if (!product) {
        return notFound();
    }

    // JSON-LD Schema for SEO
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        image: product.images,
        description: product.description,
        sku: product.variants[0]?.sku || product._id,
        offers: {
            '@type': 'AggregateOffer',
            url: `https://steppershoes.com/product/${slug}`,
            priceCurrency: 'INR',
            lowPrice: product.price,
            offerCount: product.variants.length,
            availability: 'https://schema.org/InStock'
        }
    };

    return (
        <main className="min-h-screen bg-[#FAF9F6] pt-44 md:pt-48">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Navbar />
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
                <ProductDetailsClient product={product} />
            </div>
            <Footer />
        </main>
    );
}
