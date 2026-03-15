'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioStore } from '@/store/portfolioStore';
import { CONFIG } from '@/data/config';

function LiveClock() {
    const [time, setTime] = useState('');
    useEffect(() => {
        const update = () => setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
        update();
        const id = setInterval(update, 1000);
        return () => clearInterval(id);
    }, []);
    return <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-white-80)' }}>{time}</span>;
}

const ICONS = [
    { icon: '📁', label: 'Projects' },
    { icon: '📄', label: 'Resume' },
    { icon: '⚡', label: 'Terminal' },
    { icon: '🤖', label: 'AI Lab' },
];

export default function FakeDesktop() {
    const { setScene } = usePortfolioStore();
    const [showAlert, setShowAlert] = useState(false);
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setShowAlert(true), 1800);
        return () => clearTimeout(t);
    }, []);

    return (
        <div
            className="relative w-full h-screen overflow-hidden neon-grid"
            style={{ background: '#070b18' }}
        >
            {/* Wallpaper gradient overlay */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 30% 70%, rgba(138,43,226,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(0,229,255,0.06) 0%, transparent 60%)' }}
            />

            {/* Desktop icons */}
            <div className="absolute top-12 left-8 flex flex-col gap-6">
                {ICONS.map((ic, i) => (
                    <motion.div
                        key={i}
                        className="flex flex-col items-center gap-1.5 group"
                        style={{ width: '64px' }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        whileHover={{ scale: 1.08 }}
                    >
                        <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl glass group-hover:glow-cyan"
                            style={{ border: '1px solid rgba(0,229,255,0.15)', transition: 'all 0.2s' }}
                        >
                            {ic.icon}
                        </div>
                        <span style={{ fontSize: '10px', color: 'var(--color-white-80)', fontFamily: 'var(--font-mono)', textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
                            {ic.label}
                        </span>
                    </motion.div>
                ))}
            </div>

            {/* Watermark */}
            <div
                className="absolute bottom-20 left-1/2 -translate-x-1/2 pointer-events-none select-none text-center"
                style={{ opacity: 0.04, fontFamily: 'var(--font-display)', fontSize: '8rem', fontWeight: 800, color: 'var(--color-cyan)', letterSpacing: '0.5em', whiteSpace: 'nowrap' }}
            >
                AKASH · OS
            </div>

            {/* Taskbar */}
            <div
                className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-6 py-2"
                style={{
                    height: 44,
                    background: 'rgba(5,5,16,0.85)',
                    borderTop: '1px solid rgba(0,229,255,0.12)',
                    backdropFilter: 'blur(12px)',
                }}
            >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-cyan)', letterSpacing: '0.1em' }}>
                    ⟨ AkashOS v2.6 ⟩
                </span>
                <div className="flex items-center gap-4">
                    <span style={{ fontSize: '11px', color: 'var(--color-white-40)', fontFamily: 'var(--font-mono)' }}>🌐 Connected</span>
                    <span style={{ fontSize: '11px', color: 'var(--color-white-40)', fontFamily: 'var(--font-mono)' }}>🔋 98%</span>
                    <LiveClock />
                </div>
            </div>

            {/* Simulation label — always visible */}
            <div
                className="absolute top-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded text-center pointer-events-none"
                style={{
                    background: 'rgba(255,140,0,0.12)',
                    border: '1px solid rgba(255,140,0,0.3)',
                    color: 'rgba(255,140,0,0.8)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9px',
                    letterSpacing: '0.1em',
                }}
            >
                {CONFIG.simulationLabel}
            </div>

            {/* Security Notification */}
            <AnimatePresence>
                {showAlert && !dismissed && (
                    <SecurityNotification
                        onClose={() => setDismissed(true)}
                        onClick={() => {
                            setDismissed(true);
                            setTimeout(() => setScene('SCENE_TRANSITION'), 300);
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

interface SecurityNotificationProps {
    onClick: () => void;
    onClose: () => void;
}

function SecurityNotification({ onClick, onClose }: SecurityNotificationProps) {
    return (
        <motion.div
            initial={{ y: 80, opacity: 0, x: '50%' }}
            animate={{ y: 0, opacity: 1, x: '50%' }}
            exit={{ y: 80, opacity: 0, x: '50%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="absolute right-1/2 bottom-14"
            style={{ zIndex: 50 }}
        >
            <div
                className="relative w-[380px] rounded-xl overflow-hidden"
                style={{
                    background: 'rgba(10, 5, 5, 0.92)',
                    border: '1px solid rgba(255,60,60,0.6)',
                    boxShadow: 'var(--glow-red)',
                    animation: 'pulse-glow-red 1.5s ease-in-out infinite',
                    backdropFilter: 'blur(16px)',
                }}
            >
                {/* Red header bar */}
                <div
                    className="flex items-center gap-2 px-4 py-2"
                    style={{ background: 'rgba(255,60,60,0.15)', borderBottom: '1px solid rgba(255,60,60,0.3)' }}
                >
                    <div className="flex gap-1.5">
                        <button onClick={onClose} className="w-3 h-3 rounded-full" style={{ background: '#ff4444' }} />
                        <div className="w-3 h-3 rounded-full" style={{ background: '#ff8800' }} />
                        <div className="w-3 h-3 rounded-full" style={{ background: '#00c846' }} />
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,60,60,0.8)', letterSpacing: '0.1em', marginLeft: 4 }}>
                        SYSTEM ALERT — PRIORITY: CRITICAL
                    </span>
                </div>

                <div className="p-5" onClick={onClick} style={{ cursor: 'default' }}>
                    {/* Icon + title */}
                    <div className="flex items-start gap-3 mb-3">
                        <motion.span
                            className="text-3xl"
                            animate={{ opacity: [1, 0.4, 1] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                        >
                            ⚠
                        </motion.span>
                        <div>
                            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', color: 'var(--color-red)', marginBottom: 4 }}>
                                UNAUTHORIZED ACCESS DETECTED
                            </h3>
                            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-white-40)', lineHeight: 1.6 }}>
                                Anomalous identity signature detected in system core.<br />
                                Profile modules intercepted. Initiating countermeasure.<br />
                                <span style={{ color: 'rgba(255,60,60,0.7)' }}>Source: 192.168.█.█ · Port 4431</span>
                            </p>
                        </div>
                    </div>

                    {/* Glitchy code block */}
                    <div
                        className="rounded p-3 mb-4"
                        style={{ background: 'rgba(255,60,60,0.06)', border: '1px solid rgba(255,60,60,0.2)', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,100,100,0.7)' }}
                    >
                        <span>$ trace --id AKASH_PROFILE</span><br />
                        <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.6 }}>
                            █ Decrypting identity signature...
                        </motion.span><br />
                        <span style={{ color: 'var(--color-cyan)' }}>→ Profile located. Click to intercept.</span>
                    </div>

                    {/* CTA button */}
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full py-2.5 rounded-lg font-semibold text-sm tracking-wider"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,60,60,0.3), rgba(255,60,60,0.1))',
                            border: '1px solid rgba(255,60,60,0.5)',
                            color: 'var(--color-red)',
                            fontFamily: 'var(--font-mono)',
                            boxShadow: '0 0 12px rgba(255,60,60,0.2)',
                        }}
                    >
                        INVESTIGATE THREAT →
                    </motion.button>

                    <p style={{ textAlign: 'center', fontSize: '9px', color: 'rgba(255,255,255,0.2)', marginTop: 8, fontFamily: 'var(--font-mono)' }}>
                        ⚠ SIMULATED — Click to continue the experience
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
