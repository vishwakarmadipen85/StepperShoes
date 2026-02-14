'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheck, Users, Box, BarChart2, LogOut } from 'lucide-react';

const sidebarLinks = [
    { name: 'Overview', href: '/admin', icon: BarChart2 },
    { name: 'Vendors', href: '/admin/vendors', icon: Users },
    { name: 'Moderation', href: '/admin/products', icon: Box },
    { name: 'Settings', href: '/admin/settings', icon: ShieldCheck },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="flex h-screen bg-[#F3F4F6]">
            {/* Sidebar */}
            <aside className="w-64 bg-[#111827] text-white flex flex-col">
                <div className="p-6 border-b border-gray-800">
                    <h1 className="text-xl font-bold tracking-tight">ADMIN<span className="text-blue-500">PANEL</span></h1>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {sidebarLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                    }`}
                            >
                                <Icon size={18} />
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <button className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:bg-gray-800 rounded-lg text-sm font-medium transition-colors">
                        <LogOut size={18} />
                        Exit Admin
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 sticky top-0 z-10">
                    <h2 className="font-semibold text-gray-800">Global Administration</h2>
                    <div className="text-sm text-gray-500">Logged in as Super Admin</div>
                </header>
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
