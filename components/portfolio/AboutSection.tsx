'use client';
import { motion } from 'framer-motion';
import { CONFIG } from '@/data/config';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useTypewriter } from '@/hooks/useTypewriter';
import { useState } from 'react';

const STATS_BACK = [
    { label: 'Projects Shipped', value: '12+' },
    { label: 'GitHub Commits', value: '512+' },
    { label: 'Certs Earned', value: '4' },
    { label: 'Hackathons Won', value: '1' },
];

export default function AboutSection() {
    const { ref, visible } = useScrollReveal(0.1);
    const [flipped, setFlipped] = useState(false);

    const { displayed: line1, done: line1Done } = useTypewriter("Hi, I'm Akash.", 60, visible ? 0 : 999999);
    const { displayed: line2, done: line2Done } = useTypewriter('Full Stack Dev · AI Automation · CSE Student.', 45, visible ? 950 : 999999);

    return (
        <section id="section-about" ref={ref} className="relative min-h-screen flex items-center justify-center py-24 px-6 overflow-hidden">
            {/* Section label */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={visible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-3"
                >
                    <span className="w-8 h-px bg-[var(--color-cyan)]" />
                    <span className="mono text-xs text-[var(--color-cyan)] tracking-widest uppercase">01 — About</span>
                    <span className="w-8 h-px bg-[var(--color-cyan)]" />
                </motion.div>
            </div>

            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left — Photo Card with flip */}
                <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    animate={visible ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex justify-center"
                >
                    <div
                        className="relative w-72 h-80 cursor-pointer"
                        style={{ perspective: 1000 }}
                        onClick={() => setFlipped(f => !f)}
                        id="about-photo-card"
                    >
                        <motion.div
                            animate={{ rotateY: flipped ? 180 : 0 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            style={{ transformStyle: 'preserve-3d' }}
                            className="relative w-full h-full"
                        >
                            {/* Front */}
                            <div className="absolute inset-0 rounded-2xl overflow-hidden glass-cyan"
                                style={{ backfaceVisibility: 'hidden' }}>
                                {/* Wave mask photo area */}
                                <div className="relative w-full h-full flex items-center justify-center">
                                    <motion.div
                                        initial={{ clipPath: 'ellipse(0% 0% at 50% 50%)' }}
                                        animate={visible ? { clipPath: 'ellipse(150% 150% at 50% 50%)' } : {}}
                                        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                        className="w-full h-full"
                                    >
                                        {/* Avatar placeholder with initials */}
                                        <div className="w-full h-full flex items-center justify-center"
                                            style={{ background: 'linear-gradient(135deg, #0b0f1e 0%, #1a0a2e 50%, #0b1a2e 100%)' }}>
                                            <div className="relative">
                                                <div className="w-36 h-36 rounded-full flex items-center justify-center text-5xl font-bold"
                                                    style={{
                                                        background: 'linear-gradient(135deg, rgba(0,229,255,0.15), rgba(138,43,226,0.15))',
                                                        border: '2px solid rgba(0,229,255,0.3)',
                                                        boxShadow: '0 0 40px rgba(0,229,255,0.2)'
                                                    }}>
                                                    <span style={{ fontFamily: 'var(--font-display)', color: '#00e5ff' }}>A</span>
                                                </div>
                                                {/* Animated ring */}
                                                <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 144 144" fill="none">
                                                    <circle cx="72" cy="72" r="70" stroke="url(#ringGrad)" strokeWidth="1.5" strokeDasharray="8 4" />
                                                    <defs>
                                                        <linearGradient id="ringGrad" x1="0" y1="0" x2="144" y2="144" gradientUnits="userSpaceOnUse">
                                                            <stop stopColor="#00e5ff" />
                                                            <stop offset="1" stopColor="#8a2be2" />
                                                        </linearGradient>
                                                    </defs>
                                                </svg>
                                            </div>
                                        </div>
                                    </motion.div>
                                    {/* Click to flip hint */}
                                    <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-white/30 mono">
                                        click to flip →
                                    </div>
                                </div>
                            </div>

                            {/* Back — Stats */}
                            <div className="absolute inset-0 rounded-2xl p-6 flex flex-col justify-center gap-4 glass-purple"
                                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                                <h4 className="text-sm mono text-[var(--color-cyan)] tracking-widest mb-2">{'>'} SYSTEM STATS</h4>
                                {STATS_BACK.map(stat => (
                                    <div key={stat.label} className="flex justify-between items-center border-b border-white/5 pb-2">
                                        <span className="text-sm text-white/60">{stat.label}</span>
                                        <span className="mono text-[var(--color-cyan)] font-bold">{stat.value}</span>
                                    </div>
                                ))}
                                <div className="text-xs text-white/30 mono mt-2">click to flip →</div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Right — Text */}
                <div className="flex flex-col gap-6">
                    {/* Typewriter heading */}
                    <div>
                        <h1 className="text-4xl lg:text-5xl font-bold leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                            <span className="text-glow-cyan text-[var(--color-cyan)]">{line1}</span>
                            {!line1Done && <span className="text-glow-cyan text-[var(--color-cyan)] animate-blink">|</span>}
                        </h1>
                        <h2 className="text-xl lg:text-2xl text-white/60 mt-2" style={{ fontFamily: 'var(--font-display)' }}>
                            {line2}
                            {line1Done && !line2Done &&
                                <span className="animate-blink text-[var(--color-cyan)]">|</span>}
                        </h2>
                    </div>

                    {/* Bio paragraphs slide-up */}
                    {[CONFIG.bio, CONFIG.vision].map((para, i) => (
                        <motion.p
                            key={i}
                            initial={{ opacity: 0, y: 24 }}
                            animate={visible ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, delay: 0.5 + i * 0.2 }}
                            className="text-white/70 leading-relaxed text-base max-w-lg"
                        >
                            {para}
                        </motion.p>
                    ))}

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={visible ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.9 }}
                        className="flex flex-wrap gap-4 mt-2"
                    >
                        <a href={CONFIG.github} target="_blank" rel="noopener noreferrer"
                            id="about-github-btn"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-lg mono text-sm transition-all duration-200 glass-cyan hover:glow-cyan"
                            style={{ color: 'var(--color-cyan)' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                            GitHub
                        </a>
                        <a href={CONFIG.linkedin} target="_blank" rel="noopener noreferrer"
                            id="about-linkedin-btn"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-lg mono text-sm transition-all duration-200 glass-purple hover:glow-purple"
                            style={{ color: '#a855f7' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                            LinkedIn
                        </a>
                        <a href={`mailto:${CONFIG.email}`}
                            id="about-email-btn"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-lg mono text-sm transition-all duration-200 glass hover:bg-white/10"
                            style={{ color: 'rgba(255,255,255,0.6)' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,12 2,6" /></svg>
                            Email
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
