'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { BarChart3, Package, DollarSign, TrendingUp, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const VendorDashboard = () => {
    const stats = [
        { label: 'Total Sales', value: '$84,200', icon: <DollarSign className="text-cyan-400" />, trend: '+12.5%' },
        { label: 'Active Products', value: '24', icon: <Package className="text-blue-400" />, trend: '0%' },
        { label: 'Avg Rating', value: '4.8', icon: <TrendingUp className="text-purple-400" />, trend: '+0.2' },
    ];

    return (
        <main className="min-h-screen bg-[#050505] text-white">
            <Navbar />

            <div className="pt-24 px-6 md:px-20 pb-20 space-y-10">
                <div className="flex justify-between items-end">
                    <div className="space-y-1">
                        <h1 className="text-4xl font-black italic uppercase tracking-tighter">Vendor command</h1>
                        <p className="text-white/40 text-sm uppercase tracking-widest font-bold">Manage your fleet and maximize performance.</p>
                    </div>
                    <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-black px-6 py-3 rounded-xl transition-all flex items-center gap-2 uppercase tracking-tighter text-sm">
                        <Plus size={18} /> New Product
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass p-8 rounded-[2rem] space-y-4"
                        >
                            <div className="flex justify-between items-start">
                                <div className="p-3 bg-white/5 rounded-2xl">{stat.icon}</div>
                                <span className="text-xs font-bold text-green-400">{stat.trend}</span>
                            </div>
                            <div>
                                <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">{stat.label}</p>
                                <h2 className="text-3xl font-black italic mt-1">{stat.value}</h2>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Analytics Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 glass p-8 rounded-[2rem] h-[400px] flex flex-col">
                        <div className="flex justify-between items-center mb-10">
                            <h3 className="font-bold uppercase tracking-widest text-xs">Revenue Velocity (AI Forecasted)</h3>
                            <div className="flex gap-4 text-[10px] font-black uppercase text-white/40">
                                <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-cyan-400" /> Historical</span>
                                <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500 border border-white/20" /> Predicted</span>
                            </div>
                        </div>
                        <div className="flex-1 flex items-end gap-2 px-4">
                            {[40, 60, 45, 90, 65, 80, 55, 100, 85, 110].map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ delay: i * 0.05 }}
                                    className={`flex-1 rounded-t-lg ${i > 7 ? 'bg-blue-600/40 border border-cyan-400/30 border-b-0' : 'bg-cyan-500/20'}`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="glass p-8 rounded-[3rem] flex flex-col space-y-6">
                        <h3 className="font-bold uppercase tracking-widest text-xs">Recent Activities</h3>
                        <div className="flex-1 space-y-6 overflow-y-auto pr-2">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="flex gap-4 items-center">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xs font-bold italic">#{i}</div>
                                    <div className="flex-1">
                                        <p className="text-xs font-bold uppercase tracking-tighter">New Order: AERO-X Gen</p>
                                        <p className="text-[10px] text-white/30">2 minutes ago</p>
                                    </div>
                                    <p className="text-xs font-black italic">+$249</p>
                                </div>
                            ))}
                        </div>
                        <button className="w-full py-4 glass text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition-all">View All Sales</button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default VendorDashboard;
