'use client';

import React, { useRef, useState } from 'react';
import NextImage from 'next/image';
import Navbar from '@/components/layout/Navbar';
import { Camera, Zap, RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';

const VirtualTryOn = () => {
    const [isActive, setIsActive] = useState(false);

    return (
        <main className="min-h-screen bg-[#050505] text-white overflow-hidden">
            <Navbar />

            <div className="h-screen w-full relative flex items-center justify-center">
                {/* AR Viewfinder */}
                <div className="w-full h-full relative bg-neutral-900 overflow-hidden">
                    {!isActive && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 space-y-6">
                            <div className="w-24 h-24 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/40 animate-pulse">
                                <Camera size={40} className="text-cyan-400" />
                            </div>
                            <div className="text-center">
                                <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white">Initialize Lens</h2>
                                <p className="text-white/40 text-sm max-w-xs mt-2 uppercase tracking-widest leading-loose">Point your camera at your feet to start the AI virtual fitting session.</p>
                            </div>
                            <button
                                onClick={() => setIsActive(true)}
                                className="bg-white text-black font-black px-10 py-4 rounded-2xl hover:bg-cyan-400 transition-colors uppercase tracking-tighter"
                            >
                                Start AI Try-On
                            </button>
                        </div>
                    )}

                    {/* AR UI Overlays */}
                    <div className="absolute inset-x-0 top-0 pt-32 px-10 flex justify-between items-start pointer-events-none z-20">
                        <div className="space-y-4">
                            <div className="glass px-4 py-2 rounded-xl flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-cyan-400 animate-pulse' : 'bg-red-500'}`} />
                                <span className="text-[10px] font-black uppercase tracking-widest">
                                    {isActive ? 'AI Scanning: ACTIVE' : 'AI Scanning: STANDBY'}
                                </span>
                            </div>
                            {isActive && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="glass p-4 rounded-xl space-y-3"
                                >
                                    <div className="space-y-1">
                                        <p className="text-[8px] text-white/40 uppercase font-bold tracking-widest">Neural Mesh Status</p>
                                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-cyan-500"
                                                initial={{ width: "0%" }}
                                                animate={{ width: "94%" }}
                                                transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                                            />
                                        </div>
                                    </div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-cyan-400">Lock: ANKLE_PRIMARY</p>
                                </motion.div>
                            )}
                        </div>

                        <div className="flex flex-col items-end gap-4">
                            <button className="glass p-4 rounded-full pointer-events-auto hover:bg-white/10 transition-colors">
                                <RefreshCcw size={20} />
                            </button>
                            <div className="glass px-4 py-2 rounded-xl text-[8px] font-black uppercase tracking-[0.2em] text-white/40">
                                Latency: 12ms
                            </div>
                        </div>
                    </div>

                    {isActive && (
                        <div className="absolute inset-x-0 bottom-10 px-10 flex justify-center z-20">
                            <motion.div
                                initial={{ y: 100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="glass p-6 rounded-[2rem] w-full max-w-xl flex items-center gap-6 border-cyan-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                            >
                                <div className="w-20 h-20 bg-[#0a0a0a] rounded-2xl border border-white/10 relative overflow-hidden">
                                    <NextImage src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=200" alt="Sneaker" fill className="object-cover opacity-80" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-black italic text-sm uppercase tracking-tight">AERO-X1 GENESIS</h4>
                                    <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest mt-1">Neon Cyan Variant</p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="w-10 h-10 rounded-full border border-white/20 hover:border-white/50 transition-colors" />
                                    <button className="w-10 h-10 rounded-full border-2 border-cyan-400 bg-cyan-400/20" />
                                </div>
                            </motion.div>
                        </div>
                    )}

                    {/* Viewfinder Corners */}
                    <div className="absolute top-24 left-10 w-12 h-12 border-t-2 border-l-2 border-cyan-500/40" />
                    <div className="absolute top-24 right-10 w-12 h-12 border-t-2 border-r-2 border-cyan-500/40" />
                    <div className="absolute bottom-10 left-10 w-12 h-12 border-b-2 border-l-2 border-cyan-500/40" />
                    <div className="absolute bottom-10 right-10 w-12 h-12 border-b-2 border-r-2 border-cyan-500/40" />
                </div>
            </div>
        </main>
    );
};

export default VirtualTryOn;
