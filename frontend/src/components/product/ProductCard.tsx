'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useUI } from '@/context/UIContext';

interface ProductCardProps {
    product: {
        _id: string;
        name: string;
        price: number;
        images: string[];
        category: string;
        ratings: string | number;
        ai_tags?: string[];
        badge?: string;
    };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const addItem = useCartStore(state => state.addItem);
    const { openCart } = useUI();

    const handleQuickAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        addItem({
            productId: product._id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity: 1,
            variant: {
                sku: `${product._id}-9-default`,
                size: 9,
                color: 'Default'
            }
        });
        openCart();
    };

    // Calculate a fake original price for the UI if a badge exists (e.g., -15%)
    const originalPrice = product.badge && product.badge.includes('%') 
        ? product.price * 1.2 
        : product.price + 1000;

    return (
        <div className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-black transition-colors duration-300 relative">
            {/* Status Badge */}
            {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                    <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-white rounded-sm ${product.badge.includes('%') ? 'bg-orange-500' : 'bg-black'}`}>
                        {product.badge}
                    </span>
                </div>
            )}

            {/* Wishlist Button */}
            <button className="absolute top-4 right-4 z-10 text-gray-300 hover:text-black transition-colors">
                <Heart size={18} />
            </button>

            {/* Image Section */}
            <Link href={`/product/${product._id}`} className="relative aspect-[4/5] bg-[#f9f9f9] overflow-hidden flex items-center justify-center p-8">
                {product.images && product.images.length > 0 && product.images[0] ? (
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500 p-8"
                    />
                ) : (
                    <Image
                        src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000"
                        alt="Placeholder Shoe"
                        fill
                        className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500 p-8 grayscale opacity-50"
                    />
                )}
                
                {/* Quick Add overlay */}
                <div className="absolute bottom-4 left-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                     <button onClick={handleQuickAdd} className="w-full bg-black text-white font-bold uppercase tracking-widest text-[10px] py-3 rounded-full flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors shadow-lg">
                        <ShoppingBag size={14} /> Quick Add
                    </button>
                </div>
            </Link>

            {/* Info Section */}
            <Link href={`/product/${product._id}`} className="p-4 space-y-2">
                <div className="flex justify-between items-start gap-2">
                    <h3 className="text-sm font-bold text-black leading-tight">{product.name}</h3>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-black">₹{product.price.toLocaleString('en-IN')}</span>
                    {product.badge && product.badge.includes('%') && (
                        <span className="text-xs font-bold text-gray-400 line-through">₹{Math.round(originalPrice).toLocaleString('en-IN')}</span>
                    )}
                </div>

                <div className="flex items-center gap-1 pt-1">
                    <Star size={12} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-[10px] font-bold text-gray-600">{product.ratings} <span className="text-gray-400 font-medium">(120)</span></span>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
