"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Hover3DCardProps {
    children: React.ReactNode;
    className?: string;
    depth?: number;
}

export default function Hover3DCard({
    children,
    className = "",
    depth = 10,
}: Hover3DCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [hover, setHover] = useState(false);

    // Mouse position state
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring animation for rotation
    const mouseX = useSpring(x, { stiffness: 500, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 20 });

    // Map mouse position to rotation degrees
    const rotateX = useTransform(mouseY, [-0.5, 0.5], [depth, -depth]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-depth, depth]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseXPos = e.clientX - rect.left;
        const mouseYPos = e.clientY - rect.top;

        // Normalize mouse position to -0.5 to 0.5
        const xPct = maxMin((mouseXPos / width) - 0.5);
        const yPct = maxMin((mouseYPos / height) - 0.5);

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        setHover(false);
        x.set(0);
        y.set(0);
    };

    const maxMin = (val: number) => Math.min(Math.max(val, -0.5), 0.5);

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={`relative transition-all duration-200 ease-out ${className}`}
        >
            <div
                style={{
                    transform: "translateZ(50px)",
                    transformStyle: "preserve-3d",
                }}
                className="h-full w-full"
            >
                {children}
            </div>

            {/* Glossy reflection effect */}
            <motion.div
                className="absolute inset-0 z-10 bg-white/10 pointer-events-none rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: hover ? 1 : 0 }}
                style={{
                    background: `radial-gradient(
                circle at ${50 + x.get() * 100}% ${50 + y.get() * 100}%, 
                rgba(255,255,255,0.2), 
                transparent 60%
            )`
                }}
            />
        </motion.div>
    );
}
