'use client';

import { Canvas } from '@react-three/fiber';
import Particles from './Particles';

export default function Global3DBackground() {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none">
            <Canvas camera={{ position: [0, 0, 5] }} dpr={[1, 2]}>
                <ambientLight intensity={0.5} />
                <Particles count={300} />
            </Canvas>
        </div>
    );
}
