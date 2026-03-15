'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { certifications, achievements } from '@/data/certifications';
import { useScrollReveal } from '@/hooks/useScrollReveal';

function confettiBurst(el: HTMLElement, color: string) {
    for (let i = 0; i < 18; i++) {
        const dot = document.createElement('div');
        dot.style.cssText = `
            position: fixed; width: 6px; height: 6px; border-radius: 50%;
            background: ${color}; pointer-events: none; z-index: 9999;
            left: ${el.getBoundingClientRect().left + el.offsetWidth / 2}px;
            top: ${el.getBoundingClientRect().top + el.offsetHeight / 2}px;
        `;
        document.body.appendChild(dot);
        const angle = (i / 18) * 2 * Math.PI;
        const dist = 60 + Math.random() * 60;
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist;
        dot.animate([
            { transform: 'translate(0,0) scale(1)', opacity: 1 },
            { transform: `translate(${tx}px,${ty}px) scale(0)`, opacity: 0 }
        ], { duration: 700, easing: 'ease-out' }).onfinish = () => dot.remove();
    }
}

export default function CertificationsSection() {
    const { ref, visible } = useScrollReveal(0.1);
    const [flippedId, setFlippedId] = useState<string | null>(null);

    const handleFlip = (id: string, color: string, el: HTMLElement) => {
        setFlippedId(prev => (prev === id ? null : id));
        if (flippedId !== id) confettiBurst(el, color);
    };

    return (
        <section id="section-certs" ref={ref} className="relative py-24 px-6 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 mb-16 justify-center"
            >
                <span className="w-8 h-px bg-[var(--color-cyan)]" />
                <span className="mono text-xs text-[var(--color-cyan)] tracking-widest uppercase">05 — Certifications</span>
                <span className="w-8 h-px bg-[var(--color-cyan)]" />
            </motion.div>

            <div className="max-w-5xl mx-auto">
                {/* Cert badges grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                    {certifications.map((cert, i) => (
                        <motion.div
                            key={cert.id}
                            initial={{ opacity: 0, y: 40, rotateX: -20 }}
                            animate={visible ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                            transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                            style={{ perspective: 600 }}
                        >
                            <div
                                className="relative cursor-pointer"
                                style={{ height: 180, transformStyle: 'preserve-3d' }}
                                id={`cert-card-${cert.id}`}
                                onClick={e => handleFlip(cert.id, cert.color, e.currentTarget as HTMLElement)}
                            >
                                <motion.div
                                    animate={{ rotateY: flippedId === cert.id ? 180 : 0 }}
                                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                    style={{ transformStyle: 'preserve-3d' }}
                                    className="relative w-full h-full"
                                >
                                    {/* Front */}
                                    <div className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-3 glass"
                                        style={{ backfaceVisibility: 'hidden', borderColor: `${cert.color}33` }}>
                                        <div className="text-3xl">{cert.icon}</div>
                                        <div className="mono text-xl font-bold" style={{ color: cert.color }}>{cert.badge}</div>
                                        <div className="text-xs text-white/40 text-center px-2 leading-tight">{cert.issuer}</div>
                                        <div className="text-[10px] mono text-white/20">{cert.year}</div>
                                    </div>
                                    {/* Back */}
                                    <div className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-2 p-3 glass"
                                        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', borderColor: `${cert.color}44`, background: `${cert.color}0d` }}>
                                        <p className="text-xs text-center leading-snug text-white/80">{cert.title}</p>
                                        <p className="text-[10px] mono text-white/40">{cert.issuer}</p>
                                        {cert.credentialId && (
                                            <p className="text-[9px] mono text-white/25 mt-1">{cert.credentialId}</p>
                                        )}
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Achievements */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={visible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <h3 className="text-center mono text-xs text-[var(--color-green)] tracking-widest uppercase mb-6">◈ ACHIEVEMENTS</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {achievements.map((ach, i) => (
                            <motion.div
                                key={ach.title}
                                initial={{ opacity: 0, x: -20 }}
                                animate={visible ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                                className="flex items-start gap-4 glass rounded-xl p-4"
                            >
                                <span className="text-2xl flex-shrink-0">{ach.icon}</span>
                                <div>
                                    <h4 className="font-semibold text-white/90" style={{ fontFamily: 'var(--font-display)' }}>{ach.title}</h4>
                                    <p className="text-xs text-white/50 mt-0.5">{ach.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
