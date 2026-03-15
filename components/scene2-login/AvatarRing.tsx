'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface AvatarRingProps {
    onReveal: () => void;
}

export default function AvatarRing({ onReveal }: AvatarRingProps) {
    const [hovered, setHovered] = useState(false);
    const size = 130;
    const r = 58;
    const circumference = 2 * Math.PI * r;

    return (
        <div
            className="relative flex items-center justify-center"
            style={{ width: size, height: size }}
            onMouseEnter={() => { setHovered(true); onReveal(); }}
            onTouchStart={() => { setHovered(true); onReveal(); }}
        >
            {/* SVG Arc Ring */}
            <svg
                width={size + 20}
                height={size + 20}
                className="absolute"
                style={{ top: -10, left: -10 }}
                viewBox={`0 0 ${size + 20} ${size + 20}`}
            >
                {/* Track */}
                <circle
                    cx={(size + 20) / 2} cy={(size + 20) / 2} r={r + 8}
                    fill="none" stroke="rgba(0,229,255,0.12)" strokeWidth="1.5"
                />
                {/* Animated arc */}
                <motion.circle
                    cx={(size + 20) / 2} cy={(size + 20) / 2} r={r + 8}
                    fill="none"
                    stroke="rgba(0,229,255,0.8)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeDasharray={circumference + 50}
                    initial={{ strokeDashoffset: circumference + 50, rotate: -90 }}
                    animate={{
                        strokeDashoffset: hovered ? 0 : circumference + 50,
                        rotate: -90,
                    }}
                    transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                    style={{ transformOrigin: `${(size + 20) / 2}px ${(size + 20) / 2}px`, filter: 'drop-shadow(0 0 6px rgba(0,229,255,0.6))' }}
                />
                {/* Rotating decoration dots */}
                <motion.circle cx={(size + 20) / 2} cy={8} r="3" fill="var(--color-cyan)"
                    style={{ transformOrigin: `${(size + 20) / 2}px ${(size + 20) / 2}px`, opacity: 0.8 }}
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 5, ease: 'linear' }}
                />
            </svg>

            {/* Avatar Circle */}
            <motion.div
                className="relative rounded-full overflow-hidden"
                style={{
                    width: size, height: size,
                    border: '2px solid rgba(0,229,255,0.3)',
                    boxShadow: hovered ? 'var(--glow-cyan)' : '0 0 20px rgba(0,229,255,0.1)',
                    transition: 'box-shadow 0.5s',
                }}
                whileHover={{ scale: 1.04 }}
            >
                {/* Placeholder gradient avatar */}
                <div
                    className="w-full h-full flex items-center justify-center text-4xl font-bold"
                    style={{
                        background: 'linear-gradient(135deg, #0d1428, #1a1a3e)',
                        color: 'var(--color-cyan)',
                        fontFamily: 'var(--font-display)',
                    }}
                >
                    A
                </div>
                {/* Glow overlay on hover */}
                <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.15) 0%, transparent 70%)' }}
                    animate={{ opacity: hovered ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                />
            </motion.div>

            {/* Pulsing outer ring */}
            <motion.div
                className="absolute rounded-full pointer-events-none"
                style={{ width: size + 20, height: size + 20, border: '1px solid rgba(0,229,255,0.2)' }}
                animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            />
        </div>
    );
}
