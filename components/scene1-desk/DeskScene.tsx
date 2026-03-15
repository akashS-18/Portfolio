'use client';
import { useRef, useEffect, Suspense, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { usePortfolioStore } from '@/store/portfolioStore';
import ClickToBegin from './ClickToBegin';
import DustParticles from './DustParticles';
import * as THREE from 'three';

function LaptopGeometry({ onOpenComplete }: { onOpenComplete: () => void }) {
    const groupRef = useRef<THREE.Group>(null);
    const lidRef = useRef<THREE.Group>(null);
    const screenGlowRef = useRef<THREE.MeshStandardMaterial>(null);
    const opened = useRef(false);
    const lidRot = useRef(Math.PI * 0.9); // starts almost fully closed
    const completed = useRef(false);
    const time = useRef(0);

    useEffect(() => {
        const handleClick = () => {
            if (opened.current) return;
            opened.current = true;
        };
        document.addEventListener('scene-desk-click', handleClick);
        return () => document.removeEventListener('scene-desk-click', handleClick);
    }, []);

    useFrame((state, delta) => {
        time.current += delta;

        // Gentle float when idle
        if (groupRef.current) {
            groupRef.current.position.y = Math.sin(time.current * 0.8) * 0.05;
            if (!opened.current) {
                groupRef.current.rotation.y = Math.sin(time.current * 0.3) * 0.06;
            }
        }

        // Lid opening animation
        if (opened.current && lidRef.current && lidRot.current > 0) {
            lidRot.current = Math.max(0, lidRot.current - delta * 2.0);
            lidRef.current.rotation.x = lidRot.current;

            // Brighten screen as lid opens
            if (screenGlowRef.current) {
                const openFraction = 1 - (lidRot.current / (Math.PI * 0.9));
                screenGlowRef.current.emissiveIntensity = 0.1 + openFraction * 2.5;
            }

            if (lidRot.current <= 0.01 && !completed.current) {
                completed.current = true;
                setTimeout(() => onOpenComplete(), 800);
            }
        }
    });

    const bodyColor = '#1e2040';
    const bodyMetal = new THREE.MeshStandardMaterial({ color: bodyColor, roughness: 0.25, metalness: 0.85 });

    return (
        <group ref={groupRef} position={[0, -0.1, 0]} rotation={[0, 0.15, 0]}>
            {/* ── Base / body ── */}
            <mesh castShadow receiveShadow material={bodyMetal}>
                <boxGeometry args={[3.2, 0.14, 2.2]} />
            </mesh>

            {/* Keyboard area */}
            <mesh position={[0, 0.075, 0.1]}>
                <boxGeometry args={[2.6, 0.01, 1.6]} />
                <meshStandardMaterial color="#0d0e22" roughness={0.6} />
            </mesh>

            {/* Key rows (decorative) */}
            {[-0.55, -0.2, 0.15, 0.45].map((z, i) => (
                <mesh key={i} position={[0, 0.082, z]}>
                    <boxGeometry args={[2.2, 0.015, 0.08]} />
                    <meshStandardMaterial color="#292b50" roughness={0.5} />
                </mesh>
            ))}

            {/* Trackpad */}
            <mesh position={[0, 0.078, 0.72]}>
                <boxGeometry args={[0.9, 0.012, 0.55]} />
                <meshStandardMaterial color="#16182e" roughness={0.35} metalness={0.7} />
            </mesh>

            {/* ── Lid group (hinged at back) ── */}
            <group
                ref={lidRef}
                position={[0, 0.07, -1.1]}
                rotation={[Math.PI * 0.9, 0, 0]}
            >
                {/* Lid shell */}
                <mesh castShadow position={[0, 1.1, 0]} material={bodyMetal}>
                    <boxGeometry args={[3.2, 2.1, 0.12]} />
                </mesh>

                {/* Apple-style logo on back */}
                <mesh position={[0, 1.1, -0.065]}>
                    <circleGeometry args={[0.18, 32]} />
                    <meshStandardMaterial color="#2a2c52" roughness={0.2} metalness={0.9} />
                </mesh>

                {/* Screen bezel */}
                <mesh position={[0, 1.1, 0.065]}>
                    <boxGeometry args={[3.0, 1.9, 0.01]} />
                    <meshStandardMaterial color="#0a0b18" roughness={0.8} />
                </mesh>

                {/* SCREEN GLOW — the glowing display */}
                <mesh position={[0, 1.1, 0.075]}>
                    <boxGeometry args={[2.7, 1.65, 0.005]} />
                    <meshStandardMaterial
                        ref={screenGlowRef}
                        color="#00e5ff"
                        emissive="#00e5ff"
                        emissiveIntensity={0.1}
                        roughness={0.05}
                        metalness={0}
                    />
                </mesh>

                {/* Screen subtle grid lines */}
                <mesh position={[0, 1.1, 0.08]}>
                    <planeGeometry args={[2.65, 1.6, 8, 6]} />
                    <meshStandardMaterial
                        color="#00e5ff"
                        emissive="#00e5ff"
                        emissiveIntensity={0.05}
                        wireframe
                        transparent
                        opacity={0.15}
                    />
                </mesh>
            </group>

            {/* Screen point light (illuminates scene as screen opens) */}
            <pointLight
                position={[0, 1.5, 0.5]}
                color="#00e5ff"
                intensity={opened.current ? 2 : 0}
                distance={5}
            />
        </group>
    );
}

function CameraController({ opening }: { opening: boolean }) {
    const { camera } = useThree();
    const t = useRef(0);

    useFrame((state, delta) => {
        t.current += delta;
        // Gentle breathing
        camera.position.y = 2.2 + Math.sin(t.current * 0.4) * 0.02;
        // Slight zoom in when opening
        if (opening) {
            camera.position.z = THREE.MathUtils.lerp(camera.position.z, 3.0, delta * 1.2);
        }
    });
    return null;
}

function DeskPlane() {
    return (
        <mesh rotation-x={-Math.PI / 2} position={[0, -0.5, 0]} receiveShadow>
            <planeGeometry args={[12, 12]} />
            <meshStandardMaterial color="#0a0b18" roughness={0.95} metalness={0.0} />
        </mesh>
    );
}

export default function DeskScene() {
    const [opening, setOpening] = useState(false);

    const handleClick = () => {
        document.dispatchEvent(new Event('scene-desk-click'));
        setOpening(true);
    };

    const handleOpenComplete = () => {
        usePortfolioStore.getState().setScene('SCENE_LOGIN');
    };

    return (
        <div className="relative w-full h-screen">
            <Canvas
                shadows
                camera={{ position: [0, 2.2, 5.5], fov: 42 }}
                style={{ background: 'radial-gradient(ellipse at 50% 40%, #0d1030 0%, #050510 100%)' }}
            >
                <Suspense fallback={null}>
                    {/* Ambient — enough to see the laptop clearly */}
                    <ambientLight intensity={0.6} color="#8090ff" />

                    {/* Key light — strong top-left */}
                    <directionalLight
                        position={[-2, 5, 4]}
                        intensity={2.5}
                        color="#c0d0ff"
                        castShadow
                        shadow-mapSize={[2048, 2048]}
                    />

                    {/* Fill light — right side */}
                    <directionalLight position={[3, 2, 2]} intensity={1.0} color="#ffffff" />

                    {/* Cyan accent — front glow from screen */}
                    <pointLight position={[0, 2, 3]} color="#00e5ff" intensity={1.2} distance={8} />

                    {/* Purple rim — back */}
                    <pointLight position={[0, 3, -3]} color="#8a2be2" intensity={0.8} distance={6} />

                    {/* Warm desk light */}
                    <pointLight position={[-3, 1, 2]} color="#ffcc88" intensity={0.4} distance={6} />

                    <LaptopGeometry onOpenComplete={handleOpenComplete} />
                    <DustParticles />
                    <DeskPlane />
                    <CameraController opening={opening} />

                    {/* Subtle fog only very far away */}
                    <fog attach="fog" args={['#050510', 12, 25]} />
                </Suspense>
            </Canvas>

            {/* Click to Begin overlay */}
            <ClickToBegin onClick={handleClick} />

            {/* Light vignette — only edges */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 55%, rgba(5,5,16,0.6) 100%)',
                }}
            />
        </div>
    );
}
