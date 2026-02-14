'use client';

import React from 'react';
import Link from 'next/link';
import { Github, Twitter, Instagram, Globe, Cpu, Facebook } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-black/5 pt-24 pb-12 px-6 md:px-20 relative">
            {/* Top Section */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                <div className="space-y-6">
                    <h2 className="text-2xl font-black tracking-tighter uppercase">STEPPER SHOES</h2>
                    <p className="text-xs font-bold text-gray-400 leading-relaxed max-w-xs">
                        CRAFTING CONSCIOUS COMFORT FOR THE MODERN TRAVELER. PREMIUM FOOTWEAR DESIGNED FOR LIFE'S EVERYDAY ADVENTURES.
                    </p>
                    <div className="flex gap-4 text-gray-400">
                        <Twitter size={18} className="hover:text-black cursor-pointer transition-colors" />
                        <Instagram size={18} className="hover:text-black cursor-pointer transition-colors" />
                        <Facebook size={18} className="hover:text-black cursor-pointer transition-colors" />
                    </div>
                </div>

                {/* Shop Links */}
                <div className="space-y-8">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-black/30">Shop</h4>
                    <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-black/60">
                        {['Men', 'Women', 'New Arrivals', 'Care Guide', 'E-Gift Cards'].map((item, i) => (
                            <li key={i} className="hover:text-black transition-colors cursor-pointer">{item}</li>
                        ))}
                    </ul>
                </div>

                {/* About Links */}
                <div className="space-y-8">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-black/30">Company</h4>
                    <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-black/60">
                        {['Our Story', 'Sustainability', 'Global Impact', 'Stores', 'Press'].map((item, i) => (
                            <li key={i} className="hover:text-black transition-colors cursor-pointer">{item}</li>
                        ))}
                    </ul>
                </div>

                {/* Support Links */}
                <div className="space-y-8">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-black/30">Support</h4>
                    <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-black/60">
                        {['Shipping & Returns', 'Track Order', 'Privacy Policy', 'Terms', 'Contact Us'].map((item, i) => (
                            <li key={i} className="hover:text-black transition-colors cursor-pointer">{item}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="max-w-7xl mx-auto pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                <p>&copy; 2026 STEPPER SHOES. COMFORT BY DESIGN.</p>
                <div className="flex items-center gap-6">
                    <span className="flex items-center gap-2"><Globe size={14} /> India (INR)</span>
                    <span className="hover:text-black cursor-pointer transition-colors">Accessibility</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
