'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, Project } from '@/data/projects';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function ProjectsSection() {
    const { ref, visible } = useScrollReveal(0.05);
    const [selected, setSelected] = useState<Project | null>(null);

    return (
        <section id="section-projects" ref={ref} className="relative min-h-screen py-24 px-6 overflow-hidden">
            {/* Section label */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 mb-16 justify-center"
            >
                <span className="w-8 h-px bg-[var(--color-cyan)]" />
                <span className="mono text-xs text-[var(--color-cyan)] tracking-widest uppercase">03 — Projects</span>
                <span className="w-8 h-px bg-[var(--color-cyan)]" />
            </motion.div>

            {/* Featured badge */}
            <div className="max-w-6xl mx-auto">
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={visible ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-center text-white/40 mono text-sm mb-10"
                >
                    {'>'} {projects.filter(p => p.featured).length} featured · {projects.length} total projects
                </motion.p>

                {/* Project grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project, i) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={i}
                            visible={visible}
                            onOpen={() => setSelected(project)}
                        />
                    ))}
                </div>
            </div>

            {/* Project Modal */}
            <AnimatePresence>
                {selected && (
                    <ProjectModal project={selected} onClose={() => setSelected(null)} />
                )}
            </AnimatePresence>
        </section>
    );
}

function ProjectCard({ project, index, visible, onOpen }: {
    project: Project; index: number; visible: boolean; onOpen: () => void;
}) {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
        const y = -((e.clientX - rect.left) / rect.width - 0.5) * 8;
        setTilt({ x, y });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 + index * 0.12 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
            style={{ transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
            className="relative group cursor-pointer rounded-2xl overflow-hidden transition-transform duration-200"
            onClick={onOpen}
            id={`project-card-${project.id}`}
        >
            {/* Glass card */}
            <div className="glass rounded-2xl p-6 h-full transition-all duration-300 group-hover:border-[var(--color-cyan)]/30 group-hover:shadow-[0_0_30px_rgba(0,229,255,0.08)]">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div>
                        {project.featured && (
                            <span className="inline-block px-2 py-0.5 rounded mono text-[10px] mb-2"
                                style={{ background: 'rgba(0,229,255,0.1)', border: '1px solid rgba(0,229,255,0.2)', color: 'var(--color-cyan)' }}>
                                ★ FEATURED
                            </span>
                        )}
                        <h3 className="text-xl font-bold text-white group-hover:text-[var(--color-cyan)] transition-colors"
                            style={{ fontFamily: 'var(--font-display)' }}>
                            {project.title}
                        </h3>
                        <p className="text-xs mono text-white/30 mt-1">{project.year}</p>
                    </div>
                    <div className="text-white/20 group-hover:text-[var(--color-cyan)] transition-colors text-xl">↗</div>
                </div>

                {/* Problem */}
                <p className="text-sm text-white/60 leading-relaxed mb-4 line-clamp-2">{project.problem}</p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
                    {project.tech.map(t => (
                        <span key={t} className="px-2 py-0.5 rounded text-xs mono text-white/50"
                            style={{ background: 'rgba(255,255,255,0.05)' }}>
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ backdropFilter: 'blur(20px)', background: 'rgba(5,5,16,0.85)' }}
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="glass-cyan rounded-2xl p-8 max-w-2xl w-full relative"
                onClick={e => e.stopPropagation()}
                id="project-modal"
            >
                {/* Close */}
                <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full glass flex items-center justify-center text-white/50 hover:text-white transition-colors" id="modal-close">
                    ✕
                </button>

                <div className="flex items-center gap-3 mb-2">
                    {project.featured && (
                        <span className="px-2 py-0.5 rounded mono text-[10px]"
                            style={{ background: 'rgba(0,229,255,0.1)', border: '1px solid rgba(0,229,255,0.2)', color: 'var(--color-cyan)' }}>
                            ★ FEATURED
                        </span>
                    )}
                    <span className="mono text-xs text-white/30">{project.year}</span>
                </div>

                <h2 className="text-3xl font-bold text-[var(--color-cyan)] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                    {project.title}
                </h2>

                <div className="space-y-4 mb-6">
                    <div>
                        <h4 className="mono text-xs text-[var(--color-orange)] tracking-widest mb-1">◈ THE PROBLEM</h4>
                        <p className="text-white/70 text-sm leading-relaxed">{project.problem}</p>
                    </div>
                    <div>
                        <h4 className="mono text-xs text-[var(--color-green)] tracking-widest mb-1">◈ THE SOLUTION</h4>
                        <p className="text-white/70 text-sm leading-relaxed">{project.solution}</p>
                    </div>
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map(t => (
                        <span key={t} className="px-3 py-1 rounded-full text-xs mono text-[var(--color-cyan)]"
                            style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.2)' }}>
                            {t}
                        </span>
                    ))}
                </div>

                {/* Action buttons */}
                <div className="flex gap-3">
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                        id={`modal-github-${project.id}`}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg mono text-sm glass-cyan hover:glow-cyan transition-all"
                        style={{ color: 'var(--color-cyan)' }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                        View Code
                    </a>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer"
                        id={`modal-demo-${project.id}`}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg mono text-sm"
                        style={{ background: 'rgba(138,43,226,0.2)', border: '1px solid rgba(138,43,226,0.3)', color: '#a855f7' }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                        Live Demo
                    </a>
                </div>
            </motion.div>
        </motion.div>
    );
}
