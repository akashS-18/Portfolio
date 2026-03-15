'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function DustParticles({ count = 400 }: { count?: number }) {
    const meshRef = useRef<THREE.Points>(null);

    const [positions, velocities] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const vel = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 8;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 4;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
            vel[i * 3] = (Math.random() - 0.5) * 0.002;
            vel[i * 3 + 1] = Math.random() * 0.003 + 0.001;
            vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
        }
        return [pos, vel];
    }, [count]);

    useFrame(() => {
        if (!meshRef.current) return;
        const posAttr = meshRef.current.geometry.attributes.position;
        for (let i = 0; i < count; i++) {
            (posAttr.array as Float32Array)[i * 3] += velocities[i * 3];
            (posAttr.array as Float32Array)[i * 3 + 1] += velocities[i * 3 + 1];
            (posAttr.array as Float32Array)[i * 3 + 2] += velocities[i * 3 + 2];
            // Reset if too high
            if ((posAttr.array as Float32Array)[i * 3 + 1] > 3) {
                (posAttr.array as Float32Array)[i * 3 + 1] = -2;
            }
        }
        posAttr.needsUpdate = true;
    });

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial
                size={0.015}
                color="#a0c0ff"
                transparent
                opacity={0.5}
                sizeAttenuation
            />
        </points>
    );
}
