'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, ArrowUpRight } from 'lucide-react';

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
    const [rotate, setRotate] = React.useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        setRotate({ x: rotateX, y: rotateY });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setRotate({ x: 0, y: 0 })}
            animate={{
                rotateX: rotate.x,
                rotateY: rotate.y,
                y: rotate.x !== 0 ? -10 : 0
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ transformStyle: "preserve-3d" }}
            className="group relative bg-white rounded-2xl overflow-hidden border border-black/[0.03] hover:shadow-2xl transition-all duration-500"
        >
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
            <div className="p-6 space-y-3" style={{ transform: "translateZ(70px)" }}>
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
        </motion.div>
    );
};

export default ProductCard;
