'use client';

import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8 px-6 md:px-12 relative text-black">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-8 mb-16">
                <div className="col-span-1 md:col-span-2 space-y-4">
                    <h2 className="text-xl font-black tracking-tighter uppercase">STEPPER</h2>
                    <p className="text-[10px] font-bold text-gray-400 leading-relaxed max-w-[200px] uppercase">
                        AI-powered footwear for the future. Sustainable. Stylish. Intelligent.
                    </p>
                </div>

                <div className="space-y-4">
                    <h4 className="text-[9px] font-black uppercase tracking-widest text-black mb-4">Shop</h4>
                    <ul className="space-y-3 text-[10px] font-medium text-gray-500">
                        <li><Link href="/men" className="hover:text-black transition-colors">Men</Link></li>
                        <li><Link href="/women" className="hover:text-black transition-colors">Women</Link></li>
                        <li><Link href="/collections" className="hover:text-black transition-colors">Collections</Link></li>
                        <li><Link href="/collections/new" className="hover:text-black transition-colors">New Arrivals</Link></li>
                        <li><Link href="/collections/sale" className="hover:text-black transition-colors">Sale</Link></li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h4 className="text-[9px] font-black uppercase tracking-widest text-black mb-4">Help</h4>
                    <ul className="space-y-3 text-[10px] font-medium text-gray-500">
                        <li><Link href="/faq" className="hover:text-black transition-colors">FAQ</Link></li>
                        <li><Link href="/shipping" className="hover:text-black transition-colors">Shipping</Link></li>
                        <li><Link href="/returns" className="hover:text-black transition-colors">Returns</Link></li>
                        <li><Link href="/size-guide" className="hover:text-black transition-colors">Size Guide</Link></li>
                        <li><Link href="/track" className="hover:text-black transition-colors">Track Order</Link></li>
                        <li><Link href="/contact" className="hover:text-black transition-colors">Contact Us</Link></li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h4 className="text-[9px] font-black uppercase tracking-widest text-black mb-4">Company</h4>
                    <ul className="space-y-3 text-[10px] font-medium text-gray-500">
                        <li><Link href="/about" className="hover:text-black transition-colors">About Us</Link></li>
                        <li><Link href="/sustainability" className="hover:text-black transition-colors">Sustainability</Link></li>
                        <li><Link href="/careers" className="hover:text-black transition-colors">Careers</Link></li>
                        <li><Link href="/blog" className="hover:text-black transition-colors">Blog</Link></li>
                        <li><Link href="/stores" className="hover:text-black transition-colors">Store Locator</Link></li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h4 className="text-[9px] font-black uppercase tracking-widest text-black mb-4">Legal</h4>
                    <ul className="space-y-3 text-[10px] font-medium text-gray-500">
                        <li><Link href="/terms" className="hover:text-black transition-colors">Terms & Conditions</Link></li>
                        <li><Link href="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link></li>
                        <li><Link href="/refund" className="hover:text-black transition-colors">Refund Policy</Link></li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] font-bold text-gray-400">
                <p>&copy; 2024 Stepper Shoes. All rights reserved.</p>
                <div className="flex gap-2">
                    {/* Placeholder for payment icons */}
                    <div className="h-4 w-6 bg-gray-200 rounded"></div>
                    <div className="h-4 w-6 bg-gray-200 rounded"></div>
                    <div className="h-4 w-6 bg-gray-200 rounded"></div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
