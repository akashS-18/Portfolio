'use client';
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useCountUp } from '@/hooks/useCountUp';

const STATS = [
    { value: 12, suffix: '+', label: 'Projects Shipped', icon: '🚀', color: '#00E5FF' },
    { value: 30, suffix: '+', label: 'GitHub Commits', icon: '💻', color: '#8A2BE2' },
    { value: 4, suffix: '', label: 'Certifications', icon: '🏅', color: '#00FFB3' },
    { value: 97, suffix: '%', label: 'Code Quality Score', icon: '✨', color: '#00E5FF' },
    { value: 1, suffix: 'st', label: 'Hackathon Win', icon: '🏆', color: '#8A2BE2' },
];

export default function StatsSection() {
    const { ref, visible } = useScrollReveal(0.2);

    return (
        <section id="section-stats" ref={ref} className="relative py-24 px-6 neon-grid overflow-hidden">
            {/* Glow top/bottom edges */}
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.4), transparent)' }} />
            <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.4), transparent)' }} />

            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 mb-16 justify-center"
            >
                <span className="w-8 h-px bg-[var(--color-cyan)]" />
                <span className="mono text-xs text-[var(--color-cyan)] tracking-widest uppercase">04 — By the Numbers</span>
                <span className="w-8 h-px bg-[var(--color-cyan)]" />
            </motion.div>

            <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6">
                {STATS.map((stat, i) => (
                    <StatCard key={stat.label} stat={stat} index={i} visible={visible} />
                ))}
            </div>
        </section>
    );
}

function StatCard({ stat, index, visible }: {
    stat: typeof STATS[0]; index: number; visible: boolean;
}) {
    const count = useCountUp(stat.value, 1800, visible);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={visible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="glass rounded-2xl p-6 text-center group hover:scale-105 transition-transform duration-300"
            style={{ borderColor: `${stat.color}22` }}
        >
            <div className="text-3xl mb-3">{stat.icon}</div>
            <div className="text-4xl font-bold mono mb-1" style={{ color: stat.color, textShadow: `0 0 20px ${stat.color}66` }}>
                {count}{stat.suffix}
            </div>
            <p className="text-sm text-white/40">{stat.label}</p>
        </motion.div>
    );
}
