'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Hover3DCard from '../ui/Hover3DCard';

interface ProductCardProps {
    product: {
        _id: string;
        name: string;
        price: number;
        images: string[];
        category: string;
        ratings: number;
        ai_tags: string[];
    };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="h-full">
            {/* Using the Hover3DCard wrapper for consistent 3D effect */}
            <Hover3DCard className="h-full" depth={20}>
                <div className="group relative h-full bg-white rounded-2xl overflow-hidden border border-black/[0.03] hover:shadow-2xl transition-all duration-500">
                    {/* Image Section */}
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#F5F5F5]" style={{ transform: "translateZ(50px)" }}>
                        <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Status Badge (New/Limited) */}
                        <div className="absolute top-4 left-4" style={{ transform: "translateZ(30px)" }}>
                            <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest text-black shadow-sm">
                                New Arrival
                            </span>
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="p-6 space-y-3" style={{ transform: "translateZ(60px)" }}>
                        <div className="space-y-1">
                            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/30">{product.category}</p>
                            <h3 className="text-base font-bold text-black group-hover:text-black/70 transition-colors uppercase tracking-tight">{product.name}</h3>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                            <span className="text-lg font-bold text-black/80">₹{Math.round(product.price * 80)}</span>
                            <Link
                                href={`/product/${product._id}`}
                                className="text-black/30 hover:text-black transition-colors"
                            >
                                <ArrowUpRight size={22} strokeWidth={1.5} />
                            </Link>
                        </div>
                    </div>
                </div>
            </Hover3DCard>
        </div>
    );
};

export default ProductCard;
