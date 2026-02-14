'use client';

import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';

function Shoe(props: any) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            const t = state.clock.getElapsedTime();
            meshRef.current.rotation.set(
                Math.cos(t / 4) / 8,
                Math.sin(t / 4) / 8,
                -0.2 - (1 + Math.sin(t / 1.5)) / 20
            );
            meshRef.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
        }
    });

    return (
        <group {...props}>
            <mesh ref={meshRef} castShadow receiveShadow>
                <boxGeometry args={[1, 1, 1]} />
                {/* Placeholder for actual 3D model */}
                <meshStandardMaterial color="orange" />
            </mesh>
        </group>
    );
}

export default function SneakerScene() {
    return (
        <div className="h-full w-full absolute inset-0">
            <Canvas shadows camera={{ position: [0, 0, 4], fov: 45 }}>
                <ambientLight intensity={0.7} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
                <Float
                    speed={2}
                    rotationIntensity={1}
                    floatIntensity={1}
                    floatingRange={[-0.1, 0.1]}
                >
                    <Shoe position={[0, -0.5, 0]} />
                </Float>
                <Environment preset="city" />
                <ContactShadows position={[0, -1.4, 0]} opacity={0.75} scale={10} blur={2.5} far={4} color="#000000" />
            </Canvas>
        </div>
    );
}
