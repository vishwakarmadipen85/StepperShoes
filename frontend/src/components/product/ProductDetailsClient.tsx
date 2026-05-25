'use client';

import React, { useState } from 'react';
import { Star, Heart, Truck, Check, Plus, Box, ArrowLeft, RefreshCcw } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useUI } from '@/context/UIContext';
import SneakerScene from '@/components/canvas/SneakerScene';
import AppCanvas from '@/components/canvas/Canvas';
import ShoeModel from '@/components/canvas/ShoeModel';
import { useWishlistStore } from '@/store/useWishlistStore';
import SizeAdvisorModal from '@/components/product/SizeAdvisorModal';
import Link from 'next/link';

interface Variant {
    sku: string;
    size: number;
    color: { name: string; hex: string };
    stock: number;
}

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    images: string[];
    variants: Variant[];
    averageRating: number;
}

export default function ProductDetailsClient({ product }: { product: Product }) {
    const [selectedSize, setSelectedSize] = useState<number | null>(null);
    const [mainImage, setMainImage] = useState(product.images[0]);
    const [selectedColor, setSelectedColor] = useState(product.variants[0]?.color || { name: 'White', hex: '#FFFFFF' });
    const [show3D, setShow3D] = useState(false);
    const [isSizeAdvisorOpen, setIsSizeAdvisorOpen] = useState(false);

    const addItem = useCartStore(state => state.addItem);
    const { openCart } = useUI();
    const { toggleItem, hasItem } = useWishlistStore();
    const isWishlisted = hasItem(product._id);


    const uniqueSizes = [6, 7, 8, 9, 10, 11, 12]; // Mocking sizes based on the design
    const colors = [
        { name: 'White', hex: '#FFFFFF' },
        { name: 'Black', hex: '#111111' },
        { name: 'Olive', hex: '#556B2F' },
        { name: 'Navy', hex: '#000080' }
    ];

    const handleAddToCart = () => {
        if (!selectedSize) return;
        addItem({
            productId: product._id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity: 1,
            variant: {
                sku: `SKU-${product._id}-${selectedSize}-${selectedColor.name}`,
                size: selectedSize,
                color: selectedColor.name
            }
        });
        openCart();
    };

    return (
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 bg-white text-black min-h-screen pt-28">
            {/* Breadcrumb */}
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-8">
                Home / {product.category} / {product.name}
            </div>

            <div className="flex flex-col lg:flex-row gap-16 relative">

                {/* Left: Thumbnails (Desktop Only) */}
                <div className="hidden lg:flex flex-col gap-4 w-24">
                    {product.images.map((img, i) => (
                        <button
                            key={i}
                            onClick={() => { setMainImage(img); setShow3D(false); }}
                            className={`w-full aspect-square bg-[#f5f5f5] rounded-xl overflow-hidden cursor-pointer transition-all ${mainImage === img && !show3D ? 'border border-black' : 'border border-transparent hover:border-gray-300'}`}
                        >
                            <img src={img} alt="" className="w-full h-full object-contain p-2 mix-blend-multiply" />
                        </button>
                    ))}
                    <button
                        onClick={() => setShow3D(true)}
                        className={`w-full aspect-square bg-gray-100 rounded-xl overflow-hidden cursor-pointer transition-all flex flex-col items-center justify-center text-gray-500 ${show3D ? 'border border-black text-black' : 'border border-transparent hover:border-gray-300 hover:text-black'}`}
                    >
                        <Box size={24} />
                        <span className="text-[8px] font-bold mt-1 uppercase tracking-widest">3D VIEW</span>
                    </button>
                </div>

                {/* Center: Main Image / 3D Viewer */}
                <div className="flex-1 relative bg-[#f9f9f9] rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-auto flex items-center justify-center">
                    {/* Back Button (Mobile) */}
                    <button className="lg:hidden absolute top-6 left-6 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                        <ArrowLeft size={16} />
                    </button>
                    {/* 360 Icon */}
                    <div className="absolute top-6 right-6 z-10 text-gray-400">
                        <RefreshCcw size={20} />
                    </div>

                    {show3D ? (
                        <div className="absolute inset-0 z-0 bg-gray-50">
                            <AppCanvas>
                                <ShoeModel colorHex={selectedColor.hex} />
                            </AppCanvas>
                        </div>
                    ) : (
                        <SneakerScene />
                    )}

                    {/* 3D Toggle Button */}
                    <button
                        onClick={() => setShow3D(!show3D)}
                        className="absolute bottom-8 bg-white border border-gray-200 shadow-xl px-5 py-3 rounded-full flex items-center gap-2 cursor-pointer hover:bg-black hover:text-white transition-colors z-10"
                    >
                        <Box size={14} />
                        <span className="text-[10px] font-bold tracking-widest">{show3D ? 'VIEW IMAGE' : '3D VIEW'}</span>
                    </button>
                </div>

                {/* Right: Product Details */}
                <div className="w-full lg:w-[400px] flex-shrink-0 space-y-6">
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tight">{product.name}</h1>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">{product.category}</p>

                        <div className="flex items-center gap-2 mt-3">
                            <Star size={14} className="fill-yellow-400 text-yellow-400" />
                            <span className="text-xs font-bold">{product.averageRating.toFixed(1)}</span>
                            <span className="text-xs text-gray-400 font-medium">(120 reviews)</span>
                        </div>
                    </div>

                    <div>
                        <p className="text-2xl font-black">₹{product.price.toLocaleString('en-IN')}</p>
                        <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest mt-1">• In Stock</p>
                    </div>

                    {/* Color Selection */}
                    <div className="space-y-3 pt-4">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                            COLOR: <span className="text-black">{selectedColor.name}</span>
                        </p>
                        <div className="flex gap-3">
                            {colors.map((color, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedColor(color)}
                                    className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor.name === color.name ? 'border-black scale-110' : 'border-transparent hover:scale-110'}`}
                                >
                                    <div className="w-full h-full rounded-full border border-gray-200" style={{ backgroundColor: color.hex }}></div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Size Selection */}
                    <div className="space-y-3 pt-4">
                        <div className="flex justify-between items-center">
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">SIZE (UK)</p>
                            <button 
                                onClick={() => setIsSizeAdvisorOpen(true)}
                                className="text-[10px] font-bold text-gray-500 uppercase tracking-widest underline underline-offset-4 hover:text-black"
                            >
                                Size Advisor (AI)
                            </button>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            {uniqueSizes.map(size => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`py-3 border rounded-md text-xs font-bold transition-colors ${selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-200 hover:border-black text-gray-600'}`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-6 space-y-3">
                        <button
                            onClick={handleAddToCart}
                            className="w-full bg-black text-white font-bold py-4 rounded-full uppercase tracking-widest text-xs hover:bg-gray-800 transition-colors"
                        >
                            ADD TO CART
                        </button>
                        <button className="w-full bg-white text-black border border-black font-bold py-4 rounded-full uppercase tracking-widest text-xs hover:bg-gray-50 transition-colors">
                            BUY NOW
                        </button>
                    </div>

                    {/* Meta Actions */}
                    <div className="flex justify-center gap-8 pt-2">
                        <button 
                            onClick={() => toggleItem({
                                id: product._id,
                                name: product.name,
                                price: product.price,
                                image: product.images[0]
                            })}
                            className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${isWishlisted ? 'text-red-500 hover:text-red-600' : 'text-gray-500 hover:text-black'}`}
                        >
                            <Heart size={14} className={isWishlisted ? 'fill-red-500 text-red-500' : ''} />
                            {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
                        </button>
                        <button className="flex items-center gap-2 text-[10px] font-bold text-gray-500 hover:text-black uppercase tracking-widest">
                            <RefreshCcw size={14} /> Compare
                        </button>
                    </div>

                    {/* Delivery & Features */}
                    <div className="pt-6 space-y-4 border-t border-gray-100">
                        <div>
                            <p className="flex items-center gap-2 text-xs font-bold text-black"><Truck size={16} /> Delivery by 29 May - 30 May</p>
                            <p className="text-[10px] font-medium text-gray-500 mt-1 pl-6">Free shipping on orders above ₹5000</p>
                        </div>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-xs font-medium text-gray-600"><Check size={14} className="text-black" /> Breathable engineered mesh</li>
                            <li className="flex items-center gap-2 text-xs font-medium text-gray-600"><Check size={14} className="text-black" /> Lightweight EVA midsole</li>
                            <li className="flex items-center gap-2 text-xs font-medium text-gray-600"><Check size={14} className="text-black" /> Anti-slip rubber outsole</li>
                            <li className="flex items-center gap-2 text-xs font-medium text-gray-600"><Check size={14} className="text-black" /> Sustainable & eco-friendly materials</li>
                        </ul>
                    </div>

                    {/* Accordions */}
                    <div className="pt-4 space-y-0 border-t border-gray-100">
                        {['DESCRIPTION', 'SHIPPING & RETURNS', 'REVIEWS (120)'].map((tab, i) => (
                            <div key={i} className="flex justify-between items-center py-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 px-2 transition-colors">
                                <span className="text-[10px] font-black uppercase tracking-widest">{tab}</span>
                                <Plus size={14} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <SizeAdvisorModal 
                isOpen={isSizeAdvisorOpen}
                onClose={() => setIsSizeAdvisorOpen(false)}
                onSelectSize={(size) => setSelectedSize(size)}
            />
        </div>
    );
}
