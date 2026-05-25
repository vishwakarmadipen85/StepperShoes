'use client';

import React, { useState, useRef } from 'react';
import { ZoomIn } from 'lucide-react';

export default function SneakerScene() {
    const [isHovering, setIsHovering] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const imageRef = useRef<HTMLImageElement>(null);

    // We use the reliable Unsplash image that is already known to work on your network
    const imageUrl = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop";

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!imageRef.current) return;
        const { left, top, width, height } = imageRef.current.getBoundingClientRect();
        
        // Calculate mouse position as a percentage (0 to 100)
        let x = ((e.clientX - left) / width) * 100;
        let y = ((e.clientY - top) / height) * 100;
        
        // Clamp values to keep background within bounds
        x = Math.max(0, Math.min(100, x));
        y = Math.max(0, Math.min(100, y));
        
        setMousePos({ x, y });
    };

    return (
        <div 
            className="h-full w-full absolute inset-0 z-10 bg-white flex flex-col items-center justify-center overflow-hidden cursor-crosshair"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onMouseMove={handleMouseMove}
        >
            {/* Base Image */}
            <img 
                ref={imageRef}
                src={imageUrl}
                alt="Product View"
                className={`max-w-[80%] max-h-[80%] object-contain drop-shadow-xl transition-opacity duration-200 ${isHovering ? 'opacity-0' : 'opacity-100'}`}
                draggable={false}
            />

            {/* Magnified Image Overlay (Flipkart Style Zoom) */}
            {isHovering && (
                <div 
                    className="absolute inset-0 z-20 pointer-events-none"
                    style={{
                        backgroundImage: `url(${imageUrl})`,
                        backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
                        backgroundSize: '200%', // 2x Zoom level
                        backgroundRepeat: 'no-repeat'
                    }}
                />
            )}

            {/* Instructions */}
            <div className="absolute bottom-8 flex gap-2 pointer-events-none z-30 transition-opacity duration-300 opacity-100">
                <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl flex items-center gap-3 border border-gray-100 text-black">
                    <ZoomIn size={16} /> Hover to Zoom & Pan
                </div>
            </div>
        </div>
    );
}
