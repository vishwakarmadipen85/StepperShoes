'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, User, Search, Heart, ChevronDown, Sparkles } from 'lucide-react';
import { useUI } from '@/context/UIContext';
import { useCartStore } from '@/store/useCartStore';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
    const { openCart, openAuth } = useUI();
    const { user, isAuthenticated, logout } = useAuth();
    const cartItems = useCartStore(state => state.items);
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A] text-white">
            {/* Top Announcement Bar */}
            <div className="bg-black text-white/60 py-2 px-6 flex items-center justify-between text-xs border-b border-white/10">
                <div className="flex-1 flex justify-center text-center">
                    <p className="font-medium tracking-wide">Free Shipping on Orders Over ₹5000 | Easy Returns & Exchanges</p>
                </div>
            </div>

            {/* Main Navigation */}
            <div className="px-6 md:px-12 py-5 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-12">
                    <Link href="/" className="text-3xl font-black tracking-tighter uppercase flex items-center gap-2">
                        STEPPER
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden lg:flex items-center gap-8 text-xs font-bold tracking-widest text-white/80">
                        <div 
                            className="relative group cursor-pointer hover:text-white transition-colors py-2 flex items-center gap-1"
                            onMouseEnter={() => setActiveMenu('men')}
                            onMouseLeave={() => setActiveMenu(null)}
                        >
                            <Link href="/men">Men <ChevronDown size={12} className="opacity-50" /></Link>
                        </div>
                        
                        <div 
                            className="relative group cursor-pointer hover:text-white transition-colors py-2 flex items-center gap-1"
                            onMouseEnter={() => setActiveMenu('women')}
                            onMouseLeave={() => setActiveMenu(null)}
                        >
                            <Link href="/women">Women <ChevronDown size={12} className="opacity-50" /></Link>
                        </div>

                        <Link href="/collections" className="hover:text-white transition-colors">Collections</Link>
                        <Link href="/ai-stylist" className="hover:text-white transition-colors">AI Stylist</Link>
                        <Link href="/sustainability" className="hover:text-white transition-colors">Sustainability</Link>
                        <Link href="/about" className="hover:text-white transition-colors">About</Link>
                    </div>
                </div>

                {/* Right side icons & search */}
                <div className="flex items-center gap-8">
                    <div className="relative hidden md:block">
                        <div className="flex items-center bg-white/10 rounded-full px-4 py-2 w-64 group focus-within:bg-white/20 transition-all border border-transparent focus-within:border-white/20">
                            <Search size={16} className="text-white/50" />
                            <input
                                type="text"
                                placeholder="Search for shoes..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-transparent border-none outline-none text-xs font-medium tracking-wide text-white px-3 w-full placeholder-white/50"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-5 text-white">
                        {isAuthenticated && user ? (
                            <div className="relative group flex items-center gap-2 cursor-pointer py-1 z-50">
                                <span className="text-[9px] font-black uppercase tracking-widest bg-white/10 px-3.5 py-2 rounded-full hover:bg-white/20 transition-all border border-white/5">
                                    Hi, {user.name.split(' ')[0]}
                                </span>
                                <div className="absolute right-0 top-full mt-1.5 w-44 bg-neutral-950 border border-white/10 rounded-xl overflow-hidden shadow-2xl opacity-0 translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
                                    <div className="px-4 py-3 border-b border-white/5">
                                        <p className="font-bold text-[8px] uppercase tracking-wider text-white/40">Account Info</p>
                                        <p className="font-bold text-[11px] truncate text-white/90">{user.email}</p>
                                    </div>
                                    {user.role === 'vendor' && (
                                        <Link href="/vendor" className="block w-full text-left px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider hover:bg-white/5 transition-colors">
                                            Vendor Console
                                        </Link>
                                    )}
                                    {user.role === 'admin' && (
                                        <Link href="/admin" className="block w-full text-left px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider hover:bg-white/5 transition-colors">
                                            Admin Console
                                        </Link>
                                    )}
                                    <button onClick={logout} className="w-full text-left px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-red-400 hover:bg-white/5 transition-colors">
                                        Log Out
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button onClick={openAuth} className="hover:text-gray-300 transition-colors">
                                <User size={22} strokeWidth={1.5} />
                            </button>
                        )}
                        <button className="hover:text-gray-300 transition-colors">
                            <Heart size={22} strokeWidth={1.5} />
                        </button>
                        <button onClick={openCart} className="relative group hover:text-gray-300 transition-colors">
                            <ShoppingCart size={22} strokeWidth={1.5} />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
