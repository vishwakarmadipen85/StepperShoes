'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
    OrbitControls,
    Environment,
    ContactShadows,
    Float,
    PerspectiveCamera,
    Stars
} from '@react-three/drei';
import * as THREE from 'three';

function Shoe({ position = [0, 0, 0], ...props }: any) {
    const meshRef = useRef<THREE.Group>(null);
    const [hovered, setHover] = useState(false);

    useFrame((state) => {
        if (meshRef.current) {
            const t = state.clock.getElapsedTime();
            // Gentle floating rotation
            meshRef.current.rotation.set(
                Math.cos(t / 4) / 8,
                Math.sin(t / 3) / 8 + (hovered ? state.clock.elapsedTime * 0.5 : 0),
                -0.2 - (1 + Math.sin(t / 1.5)) / 20
            );
            // Floating height
            meshRef.current.position.y = (1 + Math.sin(t / 1.5)) / 10 + (hovered ? 0.2 : 0);
        }
    });

    return (
        <group
            ref={meshRef}
            position={position}
            {...props}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            <mesh castShadow receiveShadow>
                {/* Abstract shoe representation using primitive shapes for a futuristic look until real model loads */}
                <boxGeometry args={[0.8, 0.4, 2]} />
                <meshStandardMaterial
                    color={hovered ? "#ff4d4d" : "#ffffff"}
                    roughness={0.1}
                    metalness={0.8}
                    emissive={hovered ? "#ff0000" : "#000000"}
                    emissiveIntensity={0.2}
                />
            </mesh>
            {/* Sole */}
            <mesh position={[0, -0.25, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.85, 0.1, 2.05]} />
                <meshStandardMaterial color="#111" />
            </mesh>
        </group>
    );
}

export default function SneakerScene() {
    return (
        <div className="h-full w-full absolute inset-0 pointer-events-none">
            <Canvas shadows dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={50} />

                {/* Mood Lighting */}
                <ambientLight intensity={0.5} />
                <spotLight
                    position={[10, 10, 10]}
                    angle={0.15}
                    penumbra={1}
                    intensity={2}
                    castShadow
                    shadow-mapSize={[1024, 1024]}
                />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#4400ff" />

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <Float
                    speed={2}
                    rotationIntensity={1}
                    floatIntensity={1}
                    floatingRange={[-0.1, 0.1]}
                >
                    <Shoe />
                </Float>

                <Environment preset="city" />

                <ContactShadows
                    position={[0, -1.5, 0]}
                    opacity={0.6}
                    scale={10}
                    blur={2.5}
                    far={4}
                    color="#000000"
                />

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    minPolarAngle={Math.PI / 3}
                    maxPolarAngle={Math.PI / 1.5}
                    autoRotate
                    autoRotateSpeed={0.5}
                />
            </Canvas>
        </div>
    );
}
