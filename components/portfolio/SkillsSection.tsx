'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills, Skill } from '@/data/skills';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const ORBIT_RADII = [160, 160, 180, 160, 180, 160];
const ORBIT_SPEEDS = [22, 18, 26, 20, 28, 16];
const ORBIT_DELAYS = [0, -4, -8, -12, -16, -20];

export default function SkillsSection() {
    const { ref, visible } = useScrollReveal(0.1);
    const [active, setActive] = useState<Skill | null>(null);

    return (
        <section id="section-skills" ref={ref} className="relative min-h-screen flex flex-col items-center justify-center py-24 px-6 overflow-hidden">
            {/* Section label */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 mb-16"
            >
                <span className="w-8 h-px bg-[var(--color-cyan)]" />
                <span className="mono text-xs text-[var(--color-cyan)] tracking-widest uppercase">02 — Skills</span>
                <span className="w-8 h-px bg-[var(--color-cyan)]" />
            </motion.div>

            <div className="relative flex flex-col lg:flex-row items-center gap-16 w-full max-w-6xl">
                {/* Orbital Sphere */}
                <div className="relative flex-shrink-0" style={{ width: 420, height: 420 }}>
                    {/* Center sphere */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={visible ? { scale: 1, opacity: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <div className="relative w-28 h-28 rounded-full flex items-center justify-center"
                            style={{
                                background: 'radial-gradient(circle at 35% 35%, rgba(0,229,255,0.3), rgba(8,8,30,0.9))',
                                boxShadow: '0 0 40px rgba(0,229,255,0.4), 0 0 80px rgba(0,229,255,0.1), inset 0 0 30px rgba(0,229,255,0.1)'
                            }}>
                            <span style={{ fontFamily: 'var(--font-display)', fontSize: 14, color: '#00e5ff', letterSpacing: 2 }}>SKILLS</span>
                        </div>
                    </motion.div>

                    {/* Orbiting nodes */}
                    {skills.map((skill, i) => {
                        const angle = (360 / skills.length) * i;
                        const r = ORBIT_RADII[i];
                        const speed = ORBIT_SPEEDS[i];
                        const delay = ORBIT_DELAYS[i];
                        const isActive = active?.id === skill.id;
                        return (
                            <motion.div
                                key={skill.id}
                                initial={{ opacity: 0 }}
                                animate={visible ? { opacity: 1 } : {}}
                                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                                className="absolute top-1/2 left-1/2"
                                style={{
                                    '--orbit-r': `${r}px`,
                                    // CSS custom prop for animation
                                } as React.CSSProperties}
                            >
                                <div
                                    className="absolute"
                                    style={{
                                        top: '50%', left: '50%',
                                        animation: `orbit ${speed}s linear ${delay}s infinite`,
                                        transformOrigin: '0 0',
                                        '--orbit-r': `${r}px`,
                                    } as React.CSSProperties}
                                >
                                    <button
                                        id={`skill-node-${skill.id}`}
                                        onClick={() => setActive(active?.id === skill.id ? null : skill)}
                                        className="relative group flex items-center justify-center w-14 h-14 rounded-full text-2xl transition-transform duration-200 hover:scale-110"
                                        style={{
                                            background: `radial-gradient(circle, ${skill.color}22 0%, #0b0f1e 80%)`,
                                            border: `1.5px solid ${skill.color}44`,
                                            boxShadow: isActive ? `0 0 20px ${skill.color}88` : 'none',
                                            transform: 'translate(-50%, -50%)',
                                        }}
                                        aria-label={skill.label}
                                    >
                                        <span>{skill.icon}</span>
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Skill Detail Panel */}
                <div className="flex-1 w-full max-w-md">
                    <AnimatePresence mode="wait">
                        {active ? (
                            <motion.div
                                key={active.id}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: 0.4 }}
                                className="glass rounded-2xl p-6"
                                style={{ borderColor: `${active.color}33` }}
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-3xl">{active.icon}</span>
                                    <div>
                                        <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)', color: active.color }}>
                                            {active.label}
                                        </h3>
                                        <p className="text-sm text-white/40 mono">Proficiency: {active.level}%</p>
                                    </div>
                                </div>

                                {/* Progress Ring */}
                                <ProgressRing value={active.level} color={active.color} size={100} />

                                {/* Sub-skills */}
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {active.sub.map(s => (
                                        <span key={s} className="px-3 py-1 rounded-full text-xs mono"
                                            style={{ background: `${active.color}15`, border: `1px solid ${active.color}33`, color: active.color }}>
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="prompt"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center h-48 gap-3"
                            >
                                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/30 text-xl animate-pulse-glow">
                                    ✦
                                </div>
                                <p className="text-white/30 text-sm mono text-center">
                                    {'>'} click a skill node to inspect...
                                </p>
                                {/* Skill grid as fallback overview */}
                                <div className="grid grid-cols-2 gap-3 w-full mt-4">
                                    {skills.map(skill => (
                                        <button
                                            key={skill.id}
                                            id={`skill-list-${skill.id}`}
                                            onClick={() => setActive(skill)}
                                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-all duration-200 hover:scale-105"
                                            style={{ background: `${skill.color}0d`, border: `1px solid ${skill.color}22` }}
                                        >
                                            <span>{skill.icon}</span>
                                            <span className="text-xs mono" style={{ color: skill.color }}>{skill.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}

function ProgressRing({ value, color, size }: { value: number; color: string; size: number }) {
    const r = (size - 16) / 2;
    const circ = 2 * Math.PI * r;
    const offset = circ - (value / 100) * circ;
    return (
        <div className="flex items-center gap-4">
            <svg width={size} height={size}>
                <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                <motion.circle
                    cx={size / 2} cy={size / 2} r={r}
                    fill="none" stroke={color} strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circ}
                    initial={{ strokeDashoffset: circ }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                    style={{ filter: `drop-shadow(0 0 6px ${color})` }}
                />
                <text x={size / 2} y={size / 2 + 5} textAnchor="middle" fontSize="14" fontWeight="bold"
                    fill={color} fontFamily="JetBrains Mono, monospace">{value}%</text>
            </svg>
        </div>
    );
}
