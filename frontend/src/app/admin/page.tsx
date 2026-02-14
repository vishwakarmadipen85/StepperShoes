'use client';

import React from 'react';
import { Users, ShoppingCart, DollarSign, AlertCircle } from 'lucide-react';

const stats = [
    { label: 'Total Sales', value: '₹1.2M', change: '+15%', icon: DollarSign, color: 'text-green-600' },
    { label: 'Active Vendors', value: '128', change: '+4', icon: Users, color: 'text-blue-600' },
    { label: 'Pending Approvals', value: '12', change: 'Action Needed', icon: AlertCircle, color: 'text-orange-600' },
    { label: 'Total Orders', value: '3,450', change: '+8%', icon: ShoppingCart, color: 'text-purple-600' },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold text-gray-900">Platform Overview</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">{stat.label}</span>
                            <div className={`p-2 rounded-lg bg-opacity-10 ${stat.color.replace('text', 'bg')}`}>
                                <stat.icon size={20} className={stat.color} />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                            <span className="text-xs font-semibold text-gray-500">
                                {stat.change}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity / Moderation Queue */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Pending Vendor Approvals</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">Urban Kicks Co.</p>
                                        <p className="text-xs text-gray-500">Applied 2 days ago</p>
                                    </div>
                                </div>
                                <button className="text-xs font-bold text-blue-600 hover:underline">Review</button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Product Moderation Queue</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-md bg-gray-200"></div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">Neon High-Tops</p>
                                        <p className="text-xs text-gray-500">Vendor: CyberShoes</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="text-xs font-bold text-green-600 hover:underline">Approve</button>
                                    <button className="text-xs font-bold text-red-600 hover:underline">Reject</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
