'use client';

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CategoryCarousel from "@/components/home/CategoryCarousel";
import SneakerScene from "@/components/canvas/SneakerScene";
import ProductCard from "@/components/product/ProductCard";
import VendorSpotlight from "@/components/home/VendorSpotlight";
import PromoPopup from "@/components/home/PromoPopup";
import { motion } from "framer-motion";
import { Cpu, Zap, Globe, ArrowRight } from "lucide-react";

import { products } from "@/data/products";

export default function Home() {
  const featuredProducts = products.filter(p => p.badge || p.ratings > 4.7).slice(0, 6);

  return (
    <main className="relative min-h-screen bg-[#FAF9F6] text-black overflow-x-hidden pt-44 md:pt-48">
      <Navbar />

      <CategoryCarousel />

      {/* Hero Section */}
      <section className="relative h-[85vh] w-full flex flex-col items-center justify-center px-6 text-center">
        <div className="z-10 space-y-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-black/40 font-bold tracking-[0.4em] text-[10px] uppercase">Designed for Everyday Life</h2>
            <h1 className="text-6xl md:text-8xl font-bold leading-[1.1] tracking-tight text-black">
              Unbelievably <br /> <span className="text-black/30">Comfortable</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-black/60 text-lg max-w-xl mx-auto font-medium"
          >
            Crafted with nature's finest materials. Experience the softest step you've ever taken.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center gap-4"
          >
            <button className="bg-black text-white font-bold px-12 py-5 rounded-full hover:bg-black/80 transition-all uppercase text-xs tracking-widest shadow-xl">
              Shop Men
            </button>
            <button className="bg-white text-black border border-black/10 hover:border-black font-bold px-12 py-5 rounded-full transition-all uppercase text-xs tracking-widest">
              Shop Women
            </button>
          </motion.div>
        </div>

        {/* 3D Visual Centerpiece */}
        <div className="absolute inset-0 z-0 opacity-40">
          <SneakerScene />
        </div>
      </section>

      {/* Sustainable Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: "Plant Based", desc: "Using materials from the earth, for the earth.", icon: "🌱" },
            { title: "Machine Washable", desc: "Keep them fresh without the fuss.", icon: "🫧" },
            { title: "Carbon Neutral", desc: "We offset every step we take.", icon: "🌍" }
          ].map((item, i) => (
            <div key={i} className="text-center space-y-4 p-8">
              <span className="text-4xl">{item.icon}</span>
              <h3 className="text-sm font-bold uppercase tracking-[0.2em]">{item.title}</h3>
              <p className="text-sm text-black/50 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Grid */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Our Favorites</h2>
          <p className="text-black/40 font-bold uppercase tracking-[0.3em] text-[10px]">Premium comfort, designed for you.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* Materials Section */}
      <section className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-4">
            <h2 className="text-5xl font-black tracking-tighter uppercase leading-none">Shop by <br /><span className="text-black/20">Materials</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { name: "Extra Fine Merino Wool", desc: "Soft, breathable, and water resistant.", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600" },
              { name: "Recycled PET Suede", desc: "Sustainable style that lasts.", img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600" },
              { name: "Organic Cotton", desc: "Pure comfort from nature.", img: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&q=80&w=600" }
            ].map((material, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="relative h-[500px] rounded-[32px] overflow-hidden group cursor-pointer"
              >
                <img src={material.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={material.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-10 space-y-2">
                  <h3 className="text-2xl font-bold text-white uppercase tracking-tight">{material.name}</h3>
                  <p className="text-white/60 text-sm font-medium">{material.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Width Impact Section */}
      <section className="relative h-[90vh] bg-[#1a1a1a] overflow-hidden flex items-center justify-center text-center px-10 group">
        <div className="absolute inset-0 opacity-40 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1500"
            className="w-full h-full object-cover grayscale scale-110 group-hover:scale-100 transition-transform duration-[3s]"
            alt="Nature Backdrop"
          />
        </div>
        <div className="relative z-10 space-y-10 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="space-y-6">
            <h2 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-none uppercase italic">The Softest <br /> Step on Earth.</h2>
            <p className="text-white/60 text-xl font-bold uppercase tracking-widest">Responsibly Made. Honestly Priced.</p>
          </motion.div>
          <button className="bg-white text-black font-black px-16 py-6 rounded-full hover:bg-black hover:text-white transition-all uppercase text-sm tracking-widest shadow-2xl">
            Our Sustainability Goal
          </button>
        </div>
      </section>

      <VendorSpotlight />

      {/* Join the Community */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Step into the Loop</h2>
            <p className="text-black/40 font-bold uppercase tracking-widest text-[10px]">Sign up for new arrivals and occasional surprises.</p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="YOUR EMAIL"
              className="flex-1 bg-black/[0.03] border-b border-black/10 py-5 px-6 outline-none focus:border-black transition-colors font-bold text-[10px] tracking-widest"
            />
            <button className="bg-black text-white font-bold px-12 py-5 rounded-full hover:bg-black/80 transition-all uppercase text-[10px] tracking-widest">
              Join
            </button>
          </div>
        </div>
      </section>

      <PromoPopup />
      <Footer />
    </main>
  );
}
