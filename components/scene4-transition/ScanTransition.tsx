'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolioStore } from '@/store/portfolioStore';
import { fakeLogs } from '@/data/roadmap';
import { useTypewriter } from '@/hooks/useTypewriter';

type Phase = 'analyzing' | 'verifying' | 'loading' | 'verified' | 'done';

const PHASES: { label: string; pct: number; phase: Phase }[] = [
    { label: 'Analyzing threat signature...', pct: 30, phase: 'analyzing' },
    { label: 'Verifying identity matrix...', pct: 70, phase: 'verifying' },
    { label: 'Loading profile modules...', pct: 100, phase: 'loading' },
];

export default function ScanTransition() {
    const { setScene } = usePortfolioStore();
    const [phaseIdx, setPhaseIdx] = useState(0);
    const [progress, setProgress] = useState(0);
    const [visibleLogs, setVisibleLogs] = useState<string[]>([]);
    const [phase, setPhase] = useState<Phase>('analyzing');
    const logsRef = useRef<HTMLDivElement>(null);

    const { displayed: verifiedText } = useTypewriter(
        'Identity verified: AKASH',
        55,
        phase === 'verified' ? 0 : 9999999
    );
    const { displayed: loadingText, done: loadingDone } = useTypewriter(
        'Loading Portfolio Interface...',
        40,
        phase === 'verified' ? 1600 : 9999999
    );

    useEffect(() => {
        let logIdx = 0;
        const logInterval = setInterval(() => {
            if (logIdx < fakeLogs.length) {
                setVisibleLogs((prev) => [...prev, fakeLogs[logIdx++]]);
                if (logsRef.current) logsRef.current.scrollTop = logsRef.current.scrollHeight;
            }
        }, 280);

        // Progress bar phases
        const timers = [
            setTimeout(() => setProgress(30), 100),
            setTimeout(() => { setProgress(70); setPhaseIdx(1); setPhase('verifying'); }, 1800),
            setTimeout(() => { setProgress(100); setPhaseIdx(2); setPhase('loading'); }, 3600),
            setTimeout(() => setPhase('verified'), 4800),
            setTimeout(() => setPhase('done'), 7200),
        ];

        return () => {
            clearInterval(logInterval);
            timers.forEach(clearTimeout);
        };
    }, []);

    useEffect(() => {
        if (phase === 'done') {
            setTimeout(() => setScene('SCENE_PORTFOLIO'), 600);
        }
    }, [phase, setScene]);

    const currentLabel = PHASES[Math.min(phaseIdx, PHASES.length - 1)].label;

    return (
        <div
            className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
            style={{ background: '#030308' }}
        >
            {/* Scan line */}
            <div
                className="pointer-events-none absolute left-0 right-0 h-[1px]"
                style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(0,229,255,0.6) 50%, transparent 100%)',
                    animation: 'scan-line 2s linear infinite',
                    zIndex: 2,
                    opacity: 0.6,
                }}
            />

            {/* Matrix raining code background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ opacity: 0.06 }}>
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute top-0 mono text-green-500 text-xs"
                        style={{
                            left: `${i * 5 + Math.random() * 2}%`,
                            fontFamily: 'var(--font-mono)',
                            fontSize: '11px',
                            color: 'var(--color-green)',
                            animation: `particle-drift ${4 + Math.random() * 6}s linear ${Math.random() * -8}s infinite`,
                            writingMode: 'vertical-rl',
                            letterSpacing: '4px',
                        }}
                    >
                        {Math.random().toString(36).substring(2, 12)}
                    </div>
                ))}
            </div>

            {/* Main content card */}
            <div className="relative z-10 w-full max-w-2xl px-6 flex flex-col gap-6">

                {/* Header */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(255,60,60,0.7)', letterSpacing: '0.2em', marginBottom: 8 }}>
                        ◉ COUNTERMEASURE PROTOCOL INITIATED
                    </p>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.6rem', color: 'var(--color-cyan)' }}>
                        System Analysis
                    </h2>
                </motion.div>

                {/* Progress bar */}
                <motion.div
                    className="w-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="flex justify-between mb-1">
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-white-40)' }}>
                            {currentLabel}
                        </span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-cyan)' }}>
                            {progress}%
                        </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                        <motion.div
                            className="h-full rounded-full"
                            style={{ background: 'linear-gradient(90deg, var(--color-cyan), var(--color-purple))' }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1.6, ease: 'easeOut' }}
                        />
                    </div>
                </motion.div>

                {/* Fake logs terminal */}
                <motion.div
                    ref={logsRef}
                    className="rounded-xl p-4 overflow-y-auto"
                    style={{
                        height: '200px',
                        background: 'rgba(0,0,0,0.5)',
                        border: '1px solid rgba(0,229,255,0.12)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        lineHeight: '1.8',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    {visibleLogs.map((log, i) => {
                        const logStr = String(log ?? '');
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.2 }}
                                style={{
                                    color: logStr.includes('verified') || logStr.includes('✓') ? 'var(--color-green)'
                                        : logStr.includes('AKASH') ? 'var(--color-cyan)'
                                            : 'var(--color-white-40)',
                                }}
                            >
                                {logStr}
                            </motion.div>
                        );
                    })}
                    {/* Blinking cursor */}
                    <span className="animate-blink" style={{ color: 'var(--color-cyan)' }}>█</span>
                </motion.div>

                {/* Identity Verified reveal */}
                {(phase === 'verified' || phase === 'done') && (
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Verified badge */}
                        <motion.div
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full mb-4"
                            style={{
                                background: 'rgba(0,255,136,0.08)',
                                border: '1px solid rgba(0,255,136,0.4)',
                                boxShadow: 'var(--glow-green)',
                            }}
                            animate={{ boxShadow: ['0 0 20px rgba(0,255,136,0.4)', '0 0 40px rgba(0,255,136,0.8)', '0 0 20px rgba(0,255,136,0.4)'] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            <span style={{ color: 'var(--color-green)', fontSize: '18px' }}>✓</span>
                            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-green)', fontSize: '14px', letterSpacing: '0.12em' }}>
                                {verifiedText}
                                <span className="animate-blink">|</span>
                            </span>
                        </motion.div>

                        {loadingText && (
                            <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-white-40)', fontSize: '12px', letterSpacing: '0.08em' }}>
                                {loadingText}
                                {!loadingDone && <span className="animate-blink">_</span>}
                            </p>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
