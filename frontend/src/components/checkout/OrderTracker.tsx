'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Box, Truck, MapPin, CheckCircle, Clock } from 'lucide-react';

export default function OrderTracker() {
    const [progress, setProgress] = useState(0.65); // Out for delivery
    const [eta, setEta] = useState('');

    useEffect(() => {
        // Generate a dynamic delivery date (3 days from now)
        const date = new Date();
        date.setDate(date.getDate() + 3);
        const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
        setEta(date.toLocaleDateString('en-IN', options));
    }, []);

    const steps = [
        { label: 'Ordered', desc: 'Order #ORD-781523', icon: CheckCircle, active: true },
        { label: 'Packed', desc: 'At Bengaluru Hub', icon: Box, active: true },
        { label: 'Shipped', desc: 'In Transit via AeroCourier', icon: Truck, active: true },
        { label: 'Delivered', desc: 'Pending signature', icon: MapPin, active: false }
    ];

    return (
        <div className="w-full bg-[#FAF9F6] border border-black/5 rounded-3xl p-8 space-y-8 text-black mt-8 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-6 border-b border-black/5">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shadow-lg">
                        <Truck size={24} />
                    </div>
                    <div>
                        <h3 className="font-black uppercase tracking-tight text-lg">Live Shipment Tracker</h3>
                        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Powered by Stepper Logistics</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-full border border-black/5 shadow-inner">
                    <Clock size={14} className="text-gray-400" />
                    <span className="text-xs font-bold uppercase tracking-wider">ETA: {eta}</span>
                </div>
            </div>

            {/* Visual Progress Timeline */}
            <div className="relative pt-8 pb-4">
                {/* Horizontal Connector Line */}
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0 rounded-full" />
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress * 100}%` }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    className="absolute top-1/2 left-0 h-1 bg-black -translate-y-1/2 z-0 rounded-full"
                />

                {/* Animated Truck Carrier */}
                <motion.div
                    initial={{ left: 0 }}
                    animate={{ left: `${progress * 100}%` }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-black text-white p-2.5 rounded-full shadow-xl"
                >
                    <Truck size={16} />
                </motion.div>

                {/* Step Indicators */}
                <div className="flex justify-between relative z-0">
                    {steps.map((step, idx) => {
                        const StepIcon = step.icon;
                        const isDone = idx < 3; // First three are complete
                        return (
                            <div key={idx} className="flex flex-col items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-500 border ${
                                    isDone 
                                        ? 'bg-black border-black text-white' 
                                        : 'bg-white border-gray-300 text-gray-400'
                                }`}>
                                    <StepIcon size={14} />
                                </div>
                                <span className={`text-[10px] font-black uppercase tracking-widest mt-3 ${isDone ? 'text-black' : 'text-gray-400'}`}>
                                    {step.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Step Details list */}
            <div className="bg-white rounded-2xl p-6 border border-black/5 space-y-4">
                <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400">Shipping History</p>
                <div className="space-y-4">
                    {steps.filter(s => s.active).reverse().map((step, idx) => (
                        <div key={idx} className="flex items-start gap-4">
                            <div className="w-1.5 h-1.5 bg-black rounded-full mt-2" />
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider">{step.label}</p>
                                <p className="text-xs text-gray-500 font-medium">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
