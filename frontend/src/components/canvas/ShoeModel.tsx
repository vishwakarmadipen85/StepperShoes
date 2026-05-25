'use client';

import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ShoeModelProps {
    colorHex?: string;
}

export default function ShoeModel({ colorHex = '#FFFFFF' }: ShoeModelProps) {
    const { scene } = useGLTF('/models/shoe.glb');
    const groupRef = useRef<THREE.Group>(null);

    // Apply color changes dynamically to specific parts of the shoe model
    useEffect(() => {
        if (!scene) return;

        scene.traverse((child: any) => {
            if (child.isMesh && child.material) {
                // Clone the material so color changes don't leak globally across other products
                child.material = child.material.clone();
                const name = child.material.name.toLowerCase();

                // Paint the main shoe upper mesh body
                if (name.includes('upper') || name.includes('shoe') || name.includes('leather') || name.includes('mesh')) {
                    child.material.color.set(colorHex);
                }
                
                // Keep the sole white/light-gray or default unless it's a black shoe
                if (name.includes('sole')) {
                    if (colorHex === '#111111') {
                        child.material.color.set('#222222');
                    } else {
                        child.material.color.set('#EEEEEE');
                    }
                }

                // Adjust laces color slightly to complement the main color
                if (name.includes('lace') || name.includes('laces')) {
                    if (colorHex === '#FFFFFF') {
                        child.material.color.set('#E0E0E0');
                    } else {
                        child.material.color.set(colorHex);
                    }
                }
            }
        });
    }, [scene, colorHex]);

    // Slowly rotate the model in the canvas
    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
        }
    });

    return (
        <group ref={groupRef} dispose={null}>
            <primitive 
                object={scene} 
                scale={1.8} 
                position={[0, -0.3, 0]} 
                rotation={[0.1, -Math.PI / 4, 0]} 
            />
        </group>
    );
}

// Pre-load the model to prevent flash of empty canvas
useGLTF.preload('/models/shoe.glb');
