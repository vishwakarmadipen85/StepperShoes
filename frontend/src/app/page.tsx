'use client';
import React, { useState } from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import PromoPopup from "@/components/home/PromoPopup";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, RefreshCcw, Box, ShieldCheck, Leaf, Heart } from "lucide-react";
import Link from "next/link";
import { products } from "@/data/products";
import dynamic from 'next/dynamic';

const SneakerScene = dynamic(() => import("@/components/canvas/SneakerScene"), { ssr: false });
const AppCanvas = dynamic(() => import("@/components/canvas/Canvas"), { ssr: false });
const ShoeModel = dynamic(() => import("@/components/canvas/ShoeModel"), { ssr: false });

export default function Home() {
  const featuredProducts = products.filter(p => p.badge || parseFloat(String(p.ratings)) > 4.7).slice(0, 4);
  // Ensure aiRecommended are different from featuredProducts
  const aiRecommended = products.filter(p => p.price > 4000 && !featuredProducts.some(fp => fp._id === p._id)).slice(0, 4);
  const [show3D, setShow3D] = useState(false);

  return (
    <main className="relative min-h-screen bg-white text-black overflow-x-hidden pt-28">
      <Navbar />

      {/* 1. Hero Section */}
      <section className="relative w-full bg-[#f5f5f5] px-6 lg:px-20 py-16 flex flex-col lg:flex-row items-center justify-between overflow-hidden">
        <div className="relative z-10 space-y-6 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-2"
          >
            <p className="text-[10px] font-bold tracking-widest uppercase text-gray-500">AI-POWERED FOOTWEAR</p>
            <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tighter uppercase text-black">
              MOVE <br /> DIFFERENTLY
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-gray-600 text-sm md:text-lg max-w-md font-medium"
          >
            Sustainable. Stylish. Intelligent. Experience the future of footwear.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex items-center gap-4 pt-4"
          >
            <Link href="/men" className="bg-black text-white font-bold px-8 py-3 rounded-full hover:bg-gray-800 transition-all uppercase text-[10px] tracking-widest">
              SHOP MEN
            </Link>
            <Link href="/women" className="bg-transparent text-black border border-black font-bold px-8 py-3 rounded-full hover:bg-black hover:text-white transition-all uppercase text-[10px] tracking-widest">
              SHOP WOMEN
            </Link>
          </motion.div>
        </div>
        
        {/* Hero Image */}
        <div className="relative mt-12 lg:mt-0 lg:w-1/2 flex justify-center items-center aspect-[4/3] lg:aspect-auto h-[400px] lg:h-[600px]">
            {show3D ? (
                <div className="absolute inset-0 z-0 bg-[#f5f5f5] rounded-3xl overflow-hidden">
                    <AppCanvas>
                        <ShoeModel colorHex="#FFFFFF" />
                    </AppCanvas>
                </div>
            ) : (
                <motion.img 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=1000" 
                    alt="Premium White Sneaker" 
                    className="w-full h-full object-contain rotate-[-10deg] hover:rotate-0 transition-transform duration-700 drop-shadow-2xl mix-blend-multiply"
                />
            )}
            
            {/* 3D View Button floating */}
            <button 
                onClick={() => setShow3D(!show3D)}
                className="absolute bottom-10 right-10 z-20 bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl px-4 py-2 rounded-full flex items-center gap-2 cursor-pointer hover:bg-black hover:text-white transition-colors"
            >
                <Box size={14} />
                <span className="text-[10px] font-bold tracking-widest">{show3D ? 'VIEW IMAGE' : '3D VIEW'}</span>
            </button>
        </div>
      </section>

      {/* 2. Feature Banner */}
      <section className="bg-black text-white py-8 px-6 overflow-x-auto">
          <div className="max-w-7xl mx-auto flex items-center justify-between min-w-max gap-12 text-xs">
              <div className="flex items-center gap-3">
                  <Sparkles size={20} className="text-gray-400" />
                  <div>
                      <p className="font-bold uppercase tracking-widest">AI RECOMMENDATIONS</p>
                      <p className="text-gray-400 text-[10px]">Personalized for you</p>
                  </div>
              </div>
              <div className="flex items-center gap-3">
                  <Box size={20} className="text-gray-400" />
                  <div>
                      <p className="font-bold uppercase tracking-widest">3D PRODUCT VIEW</p>
                      <p className="text-gray-400 text-[10px]">See every detail</p>
                  </div>
              </div>
              <div className="flex items-center gap-3">
                  <Leaf size={20} className="text-gray-400" />
                  <div>
                      <p className="font-bold uppercase tracking-widest">ECO MATERIALS</p>
                      <p className="text-gray-400 text-[10px]">Better for planet</p>
                  </div>
              </div>
              <div className="flex items-center gap-3">
                  <ShieldCheck size={20} className="text-gray-400" />
                  <div>
                      <p className="font-bold uppercase tracking-widest">SECURE PAYMENT</p>
                      <p className="text-gray-400 text-[10px]">100% safe checkout</p>
                  </div>
              </div>
              <div className="flex items-center gap-3">
                  <RefreshCcw size={20} className="text-gray-400" />
                  <div>
                      <p className="font-bold uppercase tracking-widest">EASY RETURNS</p>
                      <p className="text-gray-400 text-[10px]">Hassle free returns</p>
                  </div>
              </div>
          </div>
      </section>

      {/* 3. Shop By Category */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-2 mb-12 relative">
            <h2 className="text-2xl font-black uppercase tracking-tighter">SHOP BY CATEGORY</h2>
            <p className="text-gray-500 font-medium text-xs">Explore our wide range of footwear</p>
            <Link href="/collections" className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-widest border-b border-black hidden md:block">VIEW ALL</Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {[
                { name: 'SNEAKERS', img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=300&q=80', count: '50+' },
                { name: 'RUNNING', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80', count: '50+' },
                { name: 'LOAFERS', img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&q=80', count: '50+' },
                { name: 'SANDALS', img: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&q=80', count: '50+' },
                { name: 'SLIDES', img: 'https://images.unsplash.com/photo-1562183241-b937e95585b6?w=300&q=80', count: '50+' },
                { name: 'BOOTS', img: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=300&q=80', count: '50+' },
            ].map((cat, i) => (
                <Link href={`/collections/${cat.name.toLowerCase()}`} key={i} className="group flex flex-col items-center">
                    <div className="bg-gray-50 rounded-2xl p-4 w-full aspect-square flex items-center justify-center mb-4 border border-gray-100 group-hover:border-black transition-colors">
                        <img src={cat.img} alt={cat.name} className="w-full h-auto object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <h3 className="font-bold text-xs uppercase tracking-widest">{cat.name}</h3>
                    <p className="text-[10px] text-gray-500">{cat.count} Products</p>
                </Link>
            ))}
        </div>
      </section>

      {/* 4. Trending Now */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-gray-100">
        <div className="flex flex-col items-center text-center space-y-2 mb-12">
            <h2 className="text-2xl font-black uppercase tracking-tighter">TRENDING NOW</h2>
            <p className="text-gray-500 font-medium text-xs">Our most popular picks this season</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. AI Recommended */}
      <section className="py-24 px-6 md:px-12 bg-[#0A0A0A] text-white">
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center text-center space-y-2 mb-12">
                <h2 className="text-2xl font-black uppercase tracking-tighter">AI RECOMMENDED FOR YOU</h2>
                <p className="text-gray-400 font-medium text-xs">Based on your style and preferences</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {aiRecommended.map((product) => (
                    <div key={product._id} className="group cursor-pointer">
                        <div className="relative bg-[#111] rounded-2xl p-6 aspect-square flex items-center justify-center mb-4 overflow-hidden border border-white/10 group-hover:border-white/30 transition-colors">
                            <button className="absolute top-4 right-4 text-white/50 hover:text-white z-10"><Heart size={18} /></button>
                            <img src={(product.images && product.images.length > 0 && product.images[0]) ? product.images[0] : "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000"} alt={product.name} className="w-full h-auto object-contain mix-blend-screen group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <h3 className="font-bold text-sm tracking-tight text-white mb-1">{product.name}</h3>
                        <p className="text-xs font-black text-gray-300">₹{product.price.toLocaleString('en-IN')}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
