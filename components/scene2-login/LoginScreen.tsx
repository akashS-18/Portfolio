'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioStore } from '@/store/portfolioStore';
import { useMouseParallax } from '@/hooks/useMouseParallax';
import { CONFIG } from '@/data/config';
import FloatingCodeSyntax from './FloatingCodeSyntax';
import AvatarRing from './AvatarRing';

export default function LoginScreen() {
    const { setScene } = usePortfolioStore();
    const [unlocking, setUnlocking] = useState(false);
    const offset = useMouseParallax(18);

    const handleUnlock = () => {
        if (unlocking) return;
        setUnlocking(true);
        setTimeout(() => setScene('SCENE_DESKTOP'), 1200);
    };

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Enter') handleUnlock();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [unlocking]);

    return (
        <div
            className="relative w-full h-screen flex items-center justify-center overflow-hidden cursor-pointer"
            style={{ background: 'radial-gradient(ellipse at 40% 50%, #0d1428 0%, #050510 70%)' }}
            onClick={handleUnlock}
        >
            {/* Floating code in background */}
            <div
                style={{ transform: `translate(${offset.x * 0.5}px, ${offset.y * 0.5}px)` }}
                className="absolute inset-0 pointer-events-none"
            >
                <FloatingCodeSyntax />
            </div>

            {/* Scan line */}
            <div
                className="pointer-events-none absolute left-0 right-0 h-[2px]"
                style={{
                    background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.4), transparent)',
                    animation: 'scan-line 4s linear infinite',
                    zIndex: 2,
                }}
            />

            {/* Center login card */}
            <motion.div
                className="relative z-10 flex flex-col items-center gap-6"
                style={{ transform: `translate(${offset.x * -0.4}px, ${offset.y * -0.4}px)` }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.87, 0, 0.13, 1] }}
            >
                {/* OS label */}
                <p style={{ color: 'var(--color-white-40)', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em' }}>
                    AKASH-OS v2.6 · SECURE TERMINAL
                </p>

                {/* Avatar ring */}
                <AvatarRing onReveal={() => { }} />

                {/* Name */}
                <div className="text-center">
                    <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.6rem', color: '#fff' }}>
                        {CONFIG.fullName}
                    </h1>
                    <p style={{ color: 'var(--color-white-40)', fontSize: '13px', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
                        {CONFIG.title}
                    </p>
                </div>

                {/* Tap / Enter hint */}
                <AnimatePresence>
                    {!unlocking && (
                        <motion.p
                            key="hint"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                            style={{ color: 'var(--color-white-40)', fontSize: '11px', fontFamily: 'var(--font-mono)' }}
                        >
                            Tap anywhere or press Enter to continue
                        </motion.p>
                    )}
                </AnimatePresence>

                {/* Unlocking state */}
                <AnimatePresence>
                    {unlocking && (
                        <motion.p
                            key="unlocking"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ color: 'var(--color-cyan)', fontSize: '11px', fontFamily: 'var(--font-mono)', letterSpacing: '0.15em' }}
                        >
                            ✓ UNLOCKED
                        </motion.p>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Corner decorations */}
            {['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'].map((pos, i) => (
                <div key={i} className={`absolute ${pos} w-5 h-5 pointer-events-none`}
                    style={{
                        borderTop: i < 2 ? '1px solid rgba(0,229,255,0.3)' : 'none',
                        borderBottom: i >= 2 ? '1px solid rgba(0,229,255,0.3)' : 'none',
                        borderLeft: i % 2 === 0 ? '1px solid rgba(0,229,255,0.3)' : 'none',
                        borderRight: i % 2 !== 0 ? '1px solid rgba(0,229,255,0.3)' : 'none',
                    }}
                />
            ))}

            {/* Unlock flash */}
            <AnimatePresence>
                {unlocking && (
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 0.8 }}
                        style={{ background: 'rgba(0,229,255,0.08)' }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
