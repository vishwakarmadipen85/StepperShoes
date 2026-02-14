'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { BarChart3, Users, ShoppingBag, Brain, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
    const stats = [
        { label: 'Total Revenue', value: '$1.2M', icon: <BarChart3 className="text-cyan-400" />, trend: '+18%' },
        { label: 'Total Users', value: '45.2K', icon: <Users className="text-blue-400" />, trend: '+5.4%' },
        { label: 'Active Orders', value: '820', icon: <ShoppingBag className="text-purple-400" />, trend: '+12%' },
    ];

    return (
        <main className="min-h-screen bg-[#050505] text-white">
            <Navbar />

            <div className="pt-24 px-6 md:px-20 pb-20 space-y-10">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter">Global Intelligence Console</h1>
                    <p className="text-white/40 text-sm uppercase tracking-widest font-bold">Comprehensive surveillance of ecosystem performance.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <div key={i} className="glass p-6 rounded-3xl border-white/5 space-y-4">
                            <div className="flex justify-between items-center">
                                <div className="p-2 bg-white/5 rounded-xl">{stat.icon}</div>
                                <span className="text-[10px] font-black text-green-400 bg-green-400/10 px-2 py-1 rounded-lg flex items-center gap-1">
                                    <ArrowUpRight size={10} /> {stat.trend}
                                </span>
                            </div>
                            <div>
                                <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">{stat.label}</p>
                                <h2 className="text-2xl font-black italic">{stat.value}</h2>
                            </div>
                        </div>
                    ))}
                    <div className="glass p-6 rounded-3xl border-cyan-500/20 bg-cyan-500/5 flex flex-col justify-center">
                        <div className="flex items-center gap-3 text-cyan-400 mb-2">
                            <Brain size={20} />
                            <span className="text-[10px] font-black uppercase tracking-widest leading-none">AI Health</span>
                        </div>
                        <p className="text-xl font-black italic">OPTOMIZED</p>
                        <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest mt-1">SLA: 99.98%</p>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="glass p-8 rounded-[2.5rem] space-y-8">
                        <div className="flex justify-between items-center">
                            <h3 className="font-bold uppercase tracking-widest text-xs">Revenue Forecast (90 Days)</h3>
                            <span className="text-[10px] font-black uppercase text-cyan-400">Model: Prophet v4.2</span>
                        </div>
                        <div className="h-[250px] flex items-end gap-1">
                            {Array.from({ length: 30 }).map((_, i) => (
                                <div
                                    key={i}
                                    style={{ height: `${20 + Math.random() * 80}%` }}
                                    className={`flex-1 rounded-t-sm ${i > 20 ? 'bg-cyan-500/40 animate-pulse' : 'bg-white/10'}`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="glass p-8 rounded-[2.5rem] space-y-6">
                        <h3 className="font-bold uppercase tracking-widest text-xs">Vendor Distribution</h3>
                        <div className="space-y-4 pt-4">
                            {[
                                { name: 'Elite Footwear', share: 45, color: 'bg-cyan-500' },
                                { name: 'Urban Sole', share: 30, color: 'bg-blue-500' },
                                { name: 'Velocity Gear', share: 25, color: 'bg-purple-500' },
                            ].map((v, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest items-center">
                                        <span>{v.name}</span>
                                        <span>{v.share}%</span>
                                    </div>
                                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${v.share}%` }}
                                            className={`h-full ${v.color}`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AdminDashboard;
