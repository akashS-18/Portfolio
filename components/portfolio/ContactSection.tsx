'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG } from '@/data/config';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const TERMINAL_PROMPTS = [
    { label: 'SEND_TO', placeholder: 'your_name@company.com', field: 'email' as const },
    { label: 'SUBJECT', placeholder: 'Re: Collaboration opportunity', field: 'subject' as const },
    { label: 'MESSAGE', placeholder: 'Tell me something interesting...', field: 'message' as const, multiline: true },
];

export default function ContactSection() {
    const { ref, visible } = useScrollReveal(0.1);
    const [form, setForm] = useState({ email: '', subject: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
    const [activeField, setActiveField] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            if (res.ok) {
                setStatus('sent');
                setTimeout(() => {
                    setStatus('idle');
                    setForm({ email: '', subject: '', message: '' });
                }, 4000);
            } else {
                setStatus('error');
                setTimeout(() => setStatus('idle'), 4000);
            }
        } catch {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 4000);
        }
    };

    return (
        <section id="section-contact" ref={ref} className="relative py-24 px-6 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 mb-16 justify-center"
            >
                <span className="w-8 h-px bg-[var(--color-cyan)]" />
                <span className="mono text-xs text-[var(--color-cyan)] tracking-widest uppercase">07 — Contact</span>
                <span className="w-8 h-px bg-[var(--color-cyan)]" />
            </motion.div>

            <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Left — Info */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={visible ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col gap-6"
                >
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                            Let's build something{' '}
                            <span className="text-glow-cyan text-[var(--color-cyan)]">extraordinary.</span>
                        </h2>
                        <p className="text-white/60 leading-relaxed">
                            Whether it's a full-stack system, an AI pipeline, or just a great conversation —
                            my inbox is always open.
                        </p>
                    </div>

                    {/* Quick links */}
                    {[
                        { icon: '📧', label: 'Email', value: CONFIG.email, href: `mailto:${CONFIG.email}` },
                        { icon: '📞', label: 'Phone', value: CONFIG.phone, href: `tel:${CONFIG.phone}` },
                        { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/akash-akash-765689309', href: CONFIG.linkedin },
                        { icon: '🐙', label: 'GitHub', value: 'github.com/akashS-18', href: CONFIG.github },
                        { icon: '📍', label: 'Location', value: CONFIG.location, href: null },
                    ].map(link => (
                        <motion.div
                            key={link.label}
                            initial={{ opacity: 0, x: -20 }}
                            animate={visible ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex items-center gap-4"
                        >
                            <span className="text-xl w-8 text-center">{link.icon}</span>
                            <div className="flex-1 border-b border-white/5 pb-3">
                                <p className="mono text-[10px] text-white/30 tracking-widest">{link.label}</p>
                                {link.href ? (
                                    <a href={link.href} className="text-sm text-white/70 hover:text-[var(--color-cyan)] transition-colors">
                                        {link.value}
                                    </a>
                                ) : (
                                    <p className="text-sm text-white/70">{link.value}</p>
                                )}
                            </div>
                        </motion.div>
                    ))}

                    {/* Availability badge */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={visible ? { opacity: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-full w-fit"
                        style={{ background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.2)' }}
                    >
                        <span className="w-2 h-2 rounded-full bg-[var(--color-green)] animate-pulse-glow" />
                        <span className="mono text-xs text-[var(--color-green)]">Open to opportunities</span>
                    </motion.div>
                </motion.div>

                {/* Right — Terminal form */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={visible ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="glass rounded-2xl overflow-hidden"
                        style={{ borderColor: 'rgba(0,229,255,0.15)' }}>
                        {/* Terminal header */}
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5"
                            style={{ background: 'rgba(0,229,255,0.03)' }}>
                            <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-red)] opacity-70" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-orange)] opacity-70" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-green)] opacity-70" />
                            <span className="mono text-xs text-white/30 ml-2">akash@portfolio:~/contact $</span>
                        </div>

                        <AnimatePresence mode="wait">
                            {/* SUCCESS */}
                            {status === 'sent' ? (
                                <motion.div
                                    key="sent"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="p-8 flex flex-col items-center gap-4 text-center"
                                >
                                    <div className="text-5xl">✓</div>
                                    <h3 className="mono text-lg text-[var(--color-green)]">Message transmitted!</h3>
                                    <p className="text-sm text-white/50">I'll get back to you within 24 hours.</p>
                                </motion.div>

                                /* ERROR */
                            ) : status === 'error' ? (
                                <motion.div
                                    key="error"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="p-8 flex flex-col items-center gap-4 text-center"
                                >
                                    <div className="text-5xl">✕</div>
                                    <h3 className="mono text-lg" style={{ color: 'var(--color-red)' }}>Transmission failed.</h3>
                                    <p className="text-sm text-white/50">
                                        Something went wrong. Email directly at{' '}
                                        <a href={`mailto:${CONFIG.email}`} className="text-[var(--color-cyan)] hover:underline">
                                            {CONFIG.email}
                                        </a>
                                    </p>
                                </motion.div>

                                /* FORM */
                            ) : (
                                <motion.form
                                    key="form"
                                    onSubmit={handleSubmit}
                                    className="p-6 flex flex-col gap-4"
                                >
                                    {TERMINAL_PROMPTS.map(prompt => (
                                        <div key={prompt.field} className="flex flex-col gap-1">
                                            <label className="mono text-[10px] tracking-widest text-[var(--color-cyan)]/60">
                                                {'>'} {prompt.label}:
                                            </label>
                                            {prompt.multiline ? (
                                                <textarea
                                                    id={`contact-${prompt.field}`}
                                                    value={form[prompt.field]}
                                                    onChange={e => setForm(f => ({ ...f, [prompt.field]: e.target.value }))}
                                                    onFocus={() => setActiveField(prompt.field)}
                                                    onBlur={() => setActiveField(null)}
                                                    placeholder={prompt.placeholder}
                                                    rows={4}
                                                    required
                                                    className="mono text-sm bg-transparent text-white/80 outline-none resize-none border-b transition-colors placeholder:text-white/15"
                                                    style={{ borderColor: activeField === prompt.field ? 'rgba(0,229,255,0.5)' : 'rgba(255,255,255,0.08)' }}
                                                />
                                            ) : (
                                                <input
                                                    id={`contact-${prompt.field}`}
                                                    type={prompt.field === 'email' ? 'email' : 'text'}
                                                    value={form[prompt.field]}
                                                    onChange={e => setForm(f => ({ ...f, [prompt.field]: e.target.value }))}
                                                    onFocus={() => setActiveField(prompt.field)}
                                                    onBlur={() => setActiveField(null)}
                                                    placeholder={prompt.placeholder}
                                                    required
                                                    className="mono text-sm bg-transparent text-white/80 outline-none border-b py-1.5 transition-colors placeholder:text-white/15"
                                                    style={{ borderColor: activeField === prompt.field ? 'rgba(0,229,255,0.5)' : 'rgba(255,255,255,0.08)' }}
                                                />
                                            )}
                                        </div>
                                    ))}

                                    <motion.button
                                        id="contact-submit"
                                        type="submit"
                                        disabled={status === 'sending'}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="mt-2 py-3 rounded-xl mono text-sm font-bold transition-all duration-300 disabled:opacity-50"
                                        style={{
                                            background: status === 'sending'
                                                ? 'rgba(0,229,255,0.05)'
                                                : 'linear-gradient(135deg, rgba(0,229,255,0.15), rgba(138,43,226,0.15))',
                                            border: '1px solid rgba(0,229,255,0.3)',
                                            color: 'var(--color-cyan)',
                                            boxShadow: '0 0 20px rgba(0,229,255,0.1)',
                                        }}
                                    >
                                        {status === 'sending' ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <span className="w-3 h-3 rounded-full border border-[var(--color-cyan)] border-t-transparent animate-spin" />
                                                Transmitting...
                                            </span>
                                        ) : (
                                            '↗ SEND MESSAGE'
                                        )}
                                    </motion.button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
