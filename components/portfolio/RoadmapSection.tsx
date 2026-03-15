'use client';
import { motion } from 'framer-motion';
import { roadmap } from '@/data/roadmap';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const STATUS_STYLE = {
    done: { color: '#00ff88', bg: 'rgba(0,255,136,0.1)', border: 'rgba(0,255,136,0.3)', label: '✓ DONE' },
    active: { color: '#00e5ff', bg: 'rgba(0,229,255,0.1)', border: 'rgba(0,229,255,0.3)', label: '▶ ACTIVE' },
    upcoming: { color: 'rgba(255,255,255,0.3)', bg: 'rgba(255,255,255,0.03)', border: 'rgba(255,255,255,0.1)', label: '◌ SOON' },
};

export default function RoadmapSection() {
    const { ref, visible } = useScrollReveal(0.05);

    return (
        <section id="section-roadmap" ref={ref} className="relative py-24 px-6 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 mb-16 justify-center"
            >
                <span className="w-8 h-px bg-[var(--color-cyan)]" />
                <span className="mono text-xs text-[var(--color-cyan)] tracking-widest uppercase">06 — Roadmap</span>
                <span className="w-8 h-px bg-[var(--color-cyan)]" />
            </motion.div>

            {/* Horizontal timeline (scrollable) */}
            <div className="max-w-6xl mx-auto overflow-x-auto pb-4" style={{ scrollbarWidth: 'thin' }}>
                <div className="relative min-w-max">
                    {/* Timeline line */}
                    <div className="absolute top-16 left-0 right-0 h-px"
                        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.3) 10%, rgba(0,229,255,0.3) 90%, transparent)' }} />

                    <div className="flex gap-8 px-4">
                        {roadmap.map((node, i) => {
                            const style = STATUS_STYLE[node.status];
                            return (
                                <motion.div
                                    key={node.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={visible ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                    className="flex flex-col items-center gap-0"
                                    style={{ width: 200 }}
                                >
                                    {/* Quarter label */}
                                    <div className="mono text-[10px] tracking-widest mb-3" style={{ color: style.color }}>
                                        {node.quarter}
                                    </div>

                                    {/* Node dot */}
                                    <div className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center mb-4 flex-shrink-0"
                                        style={{
                                            background: style.bg,
                                            border: `2px solid ${style.border}`,
                                            boxShadow: node.status === 'active' ? `0 0 16px ${style.color}88` : 'none'
                                        }}>
                                        {node.status === 'done' ? (
                                            <span style={{ color: style.color, fontSize: 12 }}>✓</span>
                                        ) : node.status === 'active' ? (
                                            <span className="w-2 h-2 rounded-full animate-pulse-glow" style={{ background: style.color }} />
                                        ) : (
                                            <span style={{ color: style.color, fontSize: 10 }}>◌</span>
                                        )}
                                    </div>

                                    {/* Card */}
                                    <div className="glass rounded-xl p-4 w-full"
                                        style={{ borderColor: style.border, background: style.bg }}>
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-bold text-sm" style={{ fontFamily: 'var(--font-display)', color: style.color }}>
                                                {node.title}
                                            </h4>
                                            <span className="mono text-[9px] px-1.5 py-0.5 rounded"
                                                style={{ background: `${style.color}22`, color: style.color }}>
                                                {style.label}
                                            </span>
                                        </div>
                                        <p className="text-xs text-white/50 leading-relaxed mb-3">{node.description}</p>
                                        <div className="flex flex-wrap gap-1">
                                            {node.skills.map(s => (
                                                <span key={s} className="mono text-[9px] px-1.5 py-0.5 rounded"
                                                    style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)' }}>
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Legend */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={visible ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex items-center justify-center gap-6 mt-8"
            >
                {Object.entries(STATUS_STYLE).map(([k, v]) => (
                    <div key={k} className="flex items-center gap-2 mono text-xs" style={{ color: v.color }}>
                        <div className="w-2 h-2 rounded-full" style={{ background: v.color }} />
                        {k.toUpperCase()}
                    </div>
                ))}
            </motion.div>
        </section>
    );
}
