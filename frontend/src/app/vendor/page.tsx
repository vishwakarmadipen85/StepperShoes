'use client';

import React from 'react';
import { DollarSign, Package, ShoppingBag, TrendingUp } from 'lucide-react';

const stats = [
    { label: 'Total Revenue', value: '₹12,450', change: '+12%', icon: DollarSign },
    { label: 'Active Products', value: '24', change: '+2', icon: Package },
    { label: 'Pending Orders', value: '5', change: '-1', icon: ShoppingBag },
    { label: 'Conversion Rate', value: '3.2%', change: '+0.4%', icon: TrendingUp },
];

export default function VendorDashboard() {
    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">{stat.label}</span>
                            <div className="bg-gray-50 p-2 rounded-lg">
                                <stat.icon size={20} className="text-gray-700" />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                            <span className={`text-xs font-semibold ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                                {stat.change}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Orders - Placeholder */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-bold text-gray-900">Recent Orders</h3>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
                </div>
                <div className="p-6 text-center text-gray-500">
                    No recent orders to display.
                </div>
            </div>
        </div>
    );
}
