'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, User, Search, Menu, ChevronDown, MapPin } from 'lucide-react';

import { useUI } from '@/context/UIContext';

const Navbar = () => {
    const { openCart, openAuth } = useUI();
    const [timeLeft, setTimeLeft] = useState({ days: 1, hours: 8, minutes: 27, seconds: 52 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let { days, hours, minutes, seconds } = prev;
                if (seconds > 0) seconds--;
                else {
                    seconds = 59;
                    if (minutes > 0) minutes--;
                    else {
                        minutes = 59;
                        if (hours > 0) hours--;
                        else {
                            hours = 23;
                            if (days > 0) days--;
                        }
                    }
                }
                return { days, hours, minutes, seconds };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            {/* Top Announcement Bar */}
            <div className="bg-[#E41E26] text-white py-2 px-6 flex flex-col md:flex-row items-center justify-center gap-4 text-center">
                <p className="text-sm font-bold tracking-tight uppercase">Valentine's Day Exclusive Deals, Ends In:</p>
                <div className="flex items-center gap-3">
                    {[
                        { label: 'Day', val: timeLeft.days },
                        { label: 'Hours', val: timeLeft.hours },
                        { label: 'Min', val: timeLeft.minutes },
                        { label: 'Sec', val: timeLeft.seconds }
                    ].map((item, i) => (
                        <div key={i} className="bg-white text-black px-2 py-1 rounded min-w-[40px]">
                            <p className="text-sm font-bold">{item.val.toString().padStart(2, '0')}</p>
                            <p className="text-[8px] uppercase font-bold text-black/40 leading-none">{item.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Secondary Service Nav */}
            <div className="bg-[#1A1A1A] text-white/60 text-[10px] font-bold uppercase tracking-widest py-2 px-6 md:px-12 flex justify-between items-center border-b border-white/5">
                <div className="flex items-center gap-6">
                    <Link href="/track" className="hover:text-white transition-colors flex items-center gap-1.5"><MapPin size={10} /> Track Order</Link>
                    <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
                </div>
                <div className="flex items-center gap-6">
                    <Link href="/help" className="hover:text-white transition-colors">Help</Link>
                    <div className="flex items-center gap-1 cursor-pointer">
                        INR (₹) <ChevronDown size={10} />
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <div className="bg-white/95 backdrop-blur-md border-b border-black/5 px-6 md:px-12 py-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-10">
                    <Link href="/" className="text-2xl font-black tracking-tighter text-black uppercase">
                        STEPPER SHOES
                    </Link>

                    <div className="hidden lg:flex items-center gap-8 text-[11px] font-bold tracking-widest text-black/70">
                        <Link href="/collections" className="hover:text-black flex items-center gap-1 transition-colors">NEW <ChevronDown size={12} /></Link>
                        <Link href="/collections/men" className="hover:text-black flex items-center gap-1 transition-colors">MEN <ChevronDown size={12} /></Link>
                        <Link href="/collections/women" className="hover:text-black flex items-center gap-1 transition-colors">WOMEN <ChevronDown size={12} /></Link>
                        <Link href="/offers" className="hover:text-black flex items-center gap-1 transition-colors text-[#E41E26]">OFFERS <ChevronDown size={12} /></Link>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center bg-black/[0.03] border border-black/5 rounded-full px-4 py-2 w-64 group focus-within:bg-white focus-within:border-black/20 transition-all">
                        <Search size={16} className="text-black/30" />
                        <input
                            type="text"
                            placeholder="Search Limited Edition"
                            className="bg-transparent border-none outline-none text-[11px] font-bold tracking-tight text-black px-3 w-full"
                        />
                    </div>

                    <div className="flex items-center gap-5 text-black/80">
                        <button onClick={openAuth} className="flex items-center gap-2 hover:text-black transition-colors">
                            <User size={20} strokeWidth={2} />
                            <span className="hidden xl:inline text-[10px] font-bold uppercase tracking-widest">Account</span>
                        </button>
                        <button onClick={openCart} className="relative group hover:text-black transition-colors flex items-center gap-2">
                            <ShoppingCart size={20} strokeWidth={2} />
                            <span className="hidden xl:inline text-[10px] font-bold uppercase tracking-widest">Cart</span>
                            <span className="absolute -top-2 left-3 bg-[#E41E26] text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">0</span>
                        </button>
                        <button className="lg:hidden"><Menu size={20} /></button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
