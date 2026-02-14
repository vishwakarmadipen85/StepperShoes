'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const PromoPopup = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 3000);
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, x: -100, y: 100 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="fixed bottom-6 left-6 z-[100] bg-white rounded-2xl shadow-2xl border border-black/5 overflow-hidden w-72 flex items-center gap-4 p-4 group"
            >
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute top-2 right-2 text-black/20 hover:text-black transition-colors"
                >
                    <X size={14} />
                </button>

                <div className="w-20 h-20 bg-[#FAF8F6] rounded-lg overflow-hidden flex-shrink-0">
                    <img
                        src="https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&q=80&w=200"
                        className="w-full h-full object-contain mix-blend-multiply"
                        alt="Promo"
                    />
                </div>

                <div className="space-y-1">
                    <p className="text-[8px] font-black uppercase tracking-widest text-black/30">Limited Offer</p>
                    <h4 className="text-[11px] font-bold uppercase tracking-tight leading-tight">These were made <br /> for easy flex</h4>
                    <button className="text-[9px] font-black uppercase tracking-widest text-[#E41E26] hover:underline pt-1">
                        Explore Slip-Ons
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default PromoPopup;
