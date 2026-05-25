'use client';

import React, { useState } from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Sparkles, ArrowRight, Wand2, Check, Loader2 } from "lucide-react";
import Link from 'next/link';

export default function AIStylist() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({ useCase: '', color: '', priority: '' });
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [recommendation, setRecommendation] = useState<any>(null);

    const getMatchingImage = (slug: string) => {
        switch (slug) {
            case 'aero-x1-genesis':
                return 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800';
            case 'nebula-flow':
                return 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800';
            case 'titan-hoop':
                return 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&q=80&w=800';
            case 'cyber-pulse':
                return 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800';
            default:
                return 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800';
        }
    };

    const getMatchingProductId = (slug: string) => {
        switch (slug) {
            case 'aero-x1-genesis': return 'm4';
            case 'nebula-flow': return 'm3';
            case 'titan-hoop': return 'm2';
            case 'cyber-pulse': return 'm5';
            default: return 'm3';
        }
    };

    const handleAnswer = async (key: string, value: string) => {
        const newAnswers = { ...answers, [key]: value };
        setAnswers(newAnswers);
        
        if (step < 3) {
            setStep(step + 1);
        } else {
            setIsAnalyzing(true);
            try {
                const response = await fetch('http://127.0.0.1:8000/ai/recommend-by-quiz', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newAnswers)
                });
                if (response.ok) {
                    const data = await response.json();
                    setRecommendation(data);
                } else {
                    throw new Error('API failed');
                }
            } catch (error) {
                console.error('Failed to query AI recommendation service, using mock fallback:', error);
                // Dynamic fallback
                const isSport = newAnswers.useCase.toLowerCase().includes('running') || newAnswers.useCase.toLowerCase().includes('gym');
                setRecommendation({
                    slug: isSport ? 'aero-x1-genesis' : 'nebula-flow',
                    name: isSport ? 'AERO-X1 GENESIS' : 'NEBULA FLOW',
                    description: isSport 
                        ? 'The peak of performance engineering. Features reactive carbon-fiber plates and biometric-adaptive cushioning.'
                        : 'Minimalist aesthetic meets maximum comfort. Designed for the urban explorer.',
                    matchScore: 95
                });
            } finally {
                setIsAnalyzing(false);
                setStep(4);
            }
        }
    };

    const resetQuiz = () => {
        setStep(0);
        setAnswers({ useCase: '', color: '', priority: '' });
        setRecommendation(null);
    };

    return (
        <main className="relative min-h-screen bg-white text-black pt-28">
            <Navbar />

            {step === 0 && (
                <div className="bg-[#f9f9f9] border-b border-gray-100 min-h-[60vh] flex items-center justify-center">
                    <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 relative overflow-hidden flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mb-6 shadow-xl">
                            <Wand2 size={32} />
                        </div>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">The Future of Fit</p>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-black max-w-3xl mb-6">
                            MEET YOUR <br /> AI STYLIST
                        </h1>
                        <p className="text-base font-medium text-gray-600 max-w-xl mb-10">
                            Our intelligent styling engine analyzes millions of data points, your personal preferences, and biomechanics to curate the perfect footwear rotation just for you.
                        </p>
                        
                        <button 
                            onClick={() => setStep(1)}
                            className="bg-black text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-gray-800 transition-colors shadow-2xl hover:-translate-y-1"
                        >
                            <Sparkles size={16} /> Start Style Quiz
                        </button>
                    </div>
                </div>
            )}

            {step > 0 && step < 4 && !isAnalyzing && (
                <div className="max-w-3xl mx-auto px-6 py-24 min-h-[60vh]">
                    <div className="mb-8">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Step {step} of 3</p>
                        <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
                            <div className="bg-black h-full transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }}></div>
                        </div>
                    </div>

                    {step === 1 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-3xl font-black uppercase tracking-tighter">What's your primary use case?</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {['Running & Athletics', 'Casual Daily Wear', 'Work & Office', 'Gym & Training'].map((opt) => (
                                    <button 
                                        key={opt}
                                        onClick={() => handleAnswer('useCase', opt)}
                                        className="p-6 text-left border border-gray-200 rounded-2xl hover:border-black hover:bg-gray-50 transition-all font-bold text-lg group flex justify-between items-center"
                                    >
                                        {opt}
                                        <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-3xl font-black uppercase tracking-tighter">What's your typical color palette?</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {['Monochrome & Minimal', 'Bright & Bold', 'Earth Tones', 'Soft Pastels'].map((opt) => (
                                    <button 
                                        key={opt}
                                        onClick={() => handleAnswer('color', opt)}
                                        className="p-6 text-left border border-gray-200 rounded-2xl hover:border-black hover:bg-gray-50 transition-all font-bold text-lg group flex justify-between items-center"
                                    >
                                        {opt}
                                        <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-3xl font-black uppercase tracking-tighter">What matters most to you?</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {['All-Day Comfort', 'Maximum Durability', 'Lightweight Feel', 'Latest Trendiness'].map((opt) => (
                                    <button 
                                        key={opt}
                                        onClick={() => handleAnswer('priority', opt)}
                                        className="p-6 text-left border border-gray-200 rounded-2xl hover:border-black hover:bg-gray-50 transition-all font-bold text-lg group flex justify-between items-center"
                                    >
                                        {opt}
                                        <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {isAnalyzing && (
                <div className="max-w-3xl mx-auto px-6 py-32 min-h-[60vh] flex flex-col items-center justify-center text-center">
                    <Loader2 size={48} className="animate-spin mx-auto mb-6 text-black" />
                    <h2 className="text-2xl font-black uppercase tracking-widest mb-2">Analyzing Your Profile</h2>
                    <p className="text-gray-500 font-medium">Matching your preferences with our biomechanical database...</p>
                </div>
            )}

            {step === 4 && recommendation && (
                <div className="max-w-5xl mx-auto px-6 py-20 min-h-[60vh] animate-in fade-in zoom-in-95 duration-700">
                    <div className="text-center mb-12">
                        <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                            <Check size={32} />
                        </div>
                        <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">Your Perfect Match</h2>
                        <p className="text-gray-600 font-medium max-w-xl mx-auto">Based on your preference for {answers.color.toLowerCase()} colors, {answers.useCase.toLowerCase()}, and priority for {answers.priority.toLowerCase()}, we've curated this selection.</p>
                    </div>

                    <div className="bg-[#f9f9f9] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 border border-gray-100 shadow-sm">
                        <div className="flex-1 relative aspect-square md:aspect-auto md:h-80 w-full bg-white rounded-2xl flex items-center justify-center shadow-inner overflow-hidden border border-gray-150">
                            <img src={getMatchingImage(recommendation.slug)} alt={recommendation.name} className="w-full h-full object-contain p-6" />
                        </div>
                        <div className="flex-1 space-y-6">
                            <div className="inline-block px-3 py-1 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-full">{recommendation.matchScore}% Match</div>
                            <h3 className="text-3xl font-black uppercase tracking-tighter">{recommendation.name}</h3>
                            <p className="text-gray-600">{recommendation.description}</p>
                            
                            <div className="space-y-3 pt-4 border-t border-gray-200">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-gray-500 uppercase">Style</span>
                                    <span className="text-sm font-bold">{answers.color}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-gray-500 uppercase">Primary Focus</span>
                                    <span className="text-sm font-bold">{answers.priority}</span>
                                </div>
                            </div>

                            <div className="pt-6 flex flex-col sm:flex-row gap-4">
                                <Link href={`/product/${getMatchingProductId(recommendation.slug)}`} className="flex-1 bg-black text-white text-center py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-gray-800 transition-colors">
                                    View Product
                                </Link>
                                <button onClick={resetQuiz} className="flex-1 bg-white border border-gray-300 text-black text-center py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-gray-50 transition-colors">
                                    Retake Quiz
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Keep the features section if step === 0 */}
            {step === 0 && (
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div className="space-y-4 flex flex-col items-center">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-black mb-2">
                                <span className="font-black text-lg">1</span>
                            </div>
                            <h3 className="text-lg font-black uppercase tracking-widest">Share Your Style</h3>
                            <p className="text-sm font-medium text-gray-500">Tell us about your daily routine, wardrobe preferences, and favorite activities in a quick 2-minute quiz.</p>
                        </div>
                        <div className="space-y-4 flex flex-col items-center">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-black mb-2">
                                <span className="font-black text-lg">2</span>
                            </div>
                            <h3 className="text-lg font-black uppercase tracking-widest">AI Analysis</h3>
                            <p className="text-sm font-medium text-gray-500">Our neural network processes your data against our entire catalog to find your optimal ergonomic and aesthetic matches.</p>
                        </div>
                        <div className="space-y-4 flex flex-col items-center">
                            <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mb-2 shadow-lg">
                                <span className="font-black text-lg">3</span>
                            </div>
                            <h3 className="text-lg font-black uppercase tracking-widest">Perfect Match</h3>
                            <p className="text-sm font-medium text-gray-500">Receive a curated capsule collection of footwear tailored exactly to your biomechanics and personal brand.</p>
                        </div>
                    </div>
                </div>
            )}
            
            <Footer />
        </main>
    );
}
