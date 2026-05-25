'use client';

import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';

interface ChatProduct {
    id: string;
    name: string;
    price: number;
    image: string;
}

interface ChatMessage {
    role: 'user' | 'assistant';
    text: string;
    products?: ChatProduct[];
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: 'assistant', text: 'Hi there! Looking for the perfect pair of shoes? I can help you find your size, style, or track an order.' }
    ]);
    const [input, setInput] = useState('');

    const handleSend = async () => {
        if (!input.trim()) return;
        
        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInput('');

        try {
            const res = await fetch('http://127.0.0.1:8000/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMsg })
            });
            if (res.ok) {
                const data = await res.json();
                setMessages(prev => [...prev, { role: 'assistant', text: data.text, products: data.products }]);
                return;
            }
        } catch (err) {
            console.error("Chat API error, using fallback:", err);
        }

        // Fallback local rule simulator if python server is offline
        setTimeout(() => {
            const userQuery = userMsg.toLowerCase();
            let response = "I'm not sure about that. Our human support team will be with you shortly.";
            let fallbackProducts: ChatProduct[] = [];
            
            if (userQuery.includes('size')) {
                response = "I can help with sizing! Just click the 'AI Predictor' button on any product page, and I'll calculate your perfect fit based on your height, weight, and favorite brands.";
            } else if (userQuery.includes('order') || userQuery.includes('track')) {
                response = "You can track your order by clicking the 'Track Order' link in the top menu. You'll need your Order ID!";
            } else if (userQuery.includes('return') || userQuery.includes('exchange')) {
                response = "We offer a 30-day hassle-free return policy. You can initiate a return from your account dashboard.";
            } else if (userQuery.includes('hello') || userQuery.includes('hi')) {
                response = "Hello! How can I help you elevate your shoe game today?";
            } else if (userQuery.includes('red')) {
                response = "Sure! I found some great options matching your request: Pro Pacer, Bella Runner.";
                fallbackProducts = [
                    { id: "m1", name: "Pro Pacer", price: 19785, image: "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&q=80&w=1000" },
                    { id: "w38", name: "Bella Runner", price: 11282, image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&q=80&w=1000" }
                ];
            }
            
            setMessages(prev => [...prev, { role: 'assistant', text: response, products: fallbackProducts }]);
        }, 800);
    };

    return (
        <>
            {/* Chat Toggle Button */}
            <button 
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50 ${isOpen ? 'hidden' : 'flex'}`}
            >
                <MessageSquare size={24} />
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-black/10 flex flex-col overflow-hidden z-50 animate-in slide-in-from-bottom-5">
                    <div className="bg-black text-white p-4 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Bot size={20} className="text-purple-400" />
                            <span className="font-bold uppercase tracking-widest text-sm">Stepper AI</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors">
                            <X size={20} />
                        </button>
                    </div>
                    
                    <div className="p-4 h-80 overflow-y-auto flex flex-col gap-4 bg-gray-50">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-black text-white rounded-tr-sm' : 'bg-white border border-gray-200 text-black rounded-tl-sm shadow-sm'}`}>
                                    {msg.text}
                                </div>
                                {msg.products && msg.products.length > 0 && (
                                    <div className="w-[85%] mt-2 space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                        {msg.products.map(product => (
                                            <a 
                                                key={product.id}
                                                href={`/product/${product.id}`}
                                                className="flex items-center gap-3 p-2 bg-white border border-gray-200 rounded-xl hover:border-black transition-colors shadow-sm cursor-pointer"
                                            >
                                                <img src={product.image} alt={product.name} className="w-10 h-10 object-contain bg-gray-50 rounded-lg" />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs font-bold text-black truncate">{product.name}</p>
                                                    <p className="text-[10px] text-gray-500 font-bold">₹{product.price.toLocaleString('en-IN')}</p>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="p-4 border-t border-black/10 bg-white flex items-center gap-2">
                        <input 
                            type="text" 
                            placeholder="Type your question..." 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm outline-none focus:border-black transition-colors"
                        />
                        <button 
                            onClick={handleSend}
                            className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors flex-shrink-0"
                        >
                            <Send size={16} className="-ml-0.5" />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
