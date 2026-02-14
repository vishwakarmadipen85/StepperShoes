'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import { Suspense } from 'react';

interface SceneProps {
    children: React.ReactNode;
}

const Scene = ({ children }: SceneProps) => {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <OrbitControls
                enablePan={false}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 1.75}
            />

            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />

            <Suspense fallback={null}>
                {children}
                <Environment preset="city" />
            </Suspense>

            <ContactShadows
                position={[0, -0.8, 0]}
                opacity={0.4}
                scale={10}
                blur={2}
                far={0.8}
            />
        </>
    );
};

export default function AppCanvas({ children }: { children?: React.ReactNode }) {
    return (
        <div className="w-full h-full min-h-[400px] bg-transparent">
            <Canvas shadows>
                <Scene>
                    {children}
                </Scene>
            </Canvas>
        </div>
    );
}
