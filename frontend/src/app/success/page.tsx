'use client';

import Navbar from "@/components/layout/Navbar";
import Link from 'next/link';

export default function SuccessPage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white flex flex-col">
            <Navbar />
            <div className="flex-1 flex items-center justify-center p-6">
                <div className="max-w-md w-full glass p-10 rounded-[40px] text-center relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-cyan-500/20 blur-[60px] rounded-full" />

                    <div className="w-20 h-20 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(6,182,212,0.5)]">
                        <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    <h1 className="text-4xl font-black uppercase italic mb-4">Launch <span className="text-cyan-400">Success</span></h1>
                    <p className="text-white/60 mb-10 leading-relaxed">
                        Your AEROSTEP gear is currently being calibrated and prepared for shipment.
                        A confirmation email has been sent to your terminal.
                    </p>

                    <div className="space-y-4">
                        <Link href="/admin/dashboard" className="block w-full bg-white text-black font-black py-4 rounded-full uppercase tracking-tighter hover:bg-cyan-400 transition-colors">
                            Track Order
                        </Link>
                        <Link href="/" className="block w-full border border-white/10 hover:bg-white/5 text-white/60 font-bold py-4 rounded-full uppercase tracking-tighter transition-colors">
                            Return to Base
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
