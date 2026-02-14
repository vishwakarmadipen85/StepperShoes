'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';

const vendors = [
    { name: 'Urban Kicks', rating: 4.8, image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd81?auto=format&fit=crop&q=80&w=200', category: 'Streetwear' },
    { name: 'EcoStep', rating: 4.9, image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=200', category: 'Sustainable' },
    { name: 'LeatherCraft', rating: 4.7, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=200', category: 'Formal' },
    { name: 'RunFast', rating: 4.6, image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&q=80&w=200', category: 'Athletics' },
];

export default function VendorSpotlight() {
    return (
        <section className="py-24 px-6 bg-[#FAF9F6]">
            <div className="max-w-7xl mx-auto space-y-12">
                <div className="flex items-end justify-between">
                    <div className="space-y-4">
                        <h2 className="text-4xl font-black tracking-tighter uppercase leading-none">Featured <br /> Creators</h2>
                        <p className="text-gray-500 font-medium max-w-md">Discover unique collections from our top-rated independent design partners.</p>
                    </div>
                    <Link href="/vendors" className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:gap-4 transition-all">
                        View All Partners <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {vendors.map((vendor, i) => (
                        <Link href={`/vendors/${vendor.name.toLowerCase().replace(' ', '-')}`} key={i} className="group block">
                            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-4">
                                <img
                                    src={vendor.image}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                    alt={vendor.name}
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
                                    <Star size={12} className="fill-yellow-400 text-yellow-400" />
                                    <span className="text-xs font-bold">{vendor.rating}</span>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-lg font-bold uppercase tracking-tight group-hover:text-gray-600 transition-colors">{vendor.name}</h3>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{vendor.category}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="pt-10 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Fake logos */}
                        <div className="h-8 w-24 bg-black/20 mask-logo"></div>
                        <span className="text-xl font-black tracking-tighter">NIKE</span>
                        <span className="text-xl font-black tracking-tighter">ADIDAS</span>
                        <span className="text-xl font-black tracking-tighter">PUMA</span>
                        <span className="text-xl font-black tracking-tighter">REEBOK</span>
                    </div>
                    <Link href="/vendor/register" className="text-xs font-bold uppercase tracking-widest text-[#E41E26] hover:underline">
                        Become a Partner
                    </Link>
                </div>
            </div>
        </section>
    );
}
