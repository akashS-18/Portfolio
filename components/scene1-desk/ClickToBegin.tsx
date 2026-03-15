'use client';
import { motion } from 'framer-motion';

interface ClickToBeginProps {
    onClick: () => void;
}

export default function ClickToBegin({ onClick }: ClickToBeginProps) {
    return (
        <motion.div
            className="absolute inset-0 flex flex-col items-center justify-end pb-20 pointer-events-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            onClick={onClick}
        >
            <div className="flex flex-col items-center gap-4">
                {/* Pulsing dot */}
                <div
                    className="w-3 h-3 rounded-full animate-pulse-glow"
                    style={{ background: 'var(--color-cyan)' }}
                />
                <motion.p
                    className="text-sm tracking-[0.3em] uppercase"
                    style={{ color: 'var(--color-white-40)', fontFamily: 'var(--font-mono)' }}
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
                >
                    Click anywhere to begin
                </motion.p>
                {/* Scroll hint arrow */}
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                    style={{ color: 'var(--color-white-40)' }}
                >
                    ↓
                </motion.div>
            </div>
        </motion.div>
    );
}
