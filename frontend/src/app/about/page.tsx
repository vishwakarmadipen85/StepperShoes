'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#FAF9F6] pt-44 md:pt-48">
            <Navbar />
            <div className="max-w-4xl mx-auto px-6 py-24 text-center">
                <h1 className="text-5xl font-black uppercase tracking-tighter mb-8">Our Story</h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    At Stepper Shoes, we believe in comfort without compromise. Born from a desire to create footwear that respects the planet, we use renewable materials like merino wool and eucalyptus fibers to craft shoes that feel as good as they look.
                </p>
                
                <div className="aspect-video bg-gray-200 rounded-3xl overflow-hidden mb-16 relative">
                    <img src="https://images.unsplash.com/photo-1552346154-21d32810baa3?auto=format&fit=crop&q=80&w=1200" alt="Stepper team" className="w-full h-full object-cover" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left mb-16">
                    <div>
                        <h2 className="text-2xl font-black uppercase tracking-widest mb-4">Our Mission</h2>
                        <p className="text-gray-600 leading-relaxed">
                            To engineer the most comfortable, sustainable, and versatile footwear on the planet. We constantly innovate with new materials and biomechanical designs to ensure every step you take is supported and energized.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-2xl font-black uppercase tracking-widest mb-4">Sustainability</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We are committed to a zero-carbon future. Our manufacturing process uses 60% less energy than traditional footwear, and our packaging is 100% recycled. When you wear Stepper, you wear a promise to the earth.
                        </p>
                    </div>
                </div>

                <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 mb-12">
                    <h2 className="text-3xl font-black uppercase tracking-tighter mb-6">Get In Touch</h2>
                    <p className="text-gray-600 mb-8">Have questions or want to collaborate? We'd love to hear from you.</p>
                    
                    <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                        <a href="#" className="flex items-center gap-3 text-gray-800 hover:text-black transition-colors font-bold">
                            <span className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">IG</span>
                            @StepperShoes
                        </a>
                        <a href="#" className="flex items-center gap-3 text-gray-800 hover:text-black transition-colors font-bold">
                            <span className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">FB</span>
                            /StepperFootwear
                        </a>
                        <a href="#" className="flex items-center gap-3 text-green-600 hover:text-green-700 transition-colors font-bold">
                            <span className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">WA</span>
                            +1 (555) 123-4567
                        </a>
                        <a href="mailto:hello@stepper.com" className="flex items-center gap-3 text-gray-800 hover:text-black transition-colors font-bold">
                            <span className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">✉</span>
                            hello@stepper.com
                        </a>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
