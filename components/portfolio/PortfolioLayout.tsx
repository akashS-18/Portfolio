'use client';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { CONFIG } from '@/data/config';

const AboutSection = dynamic(() => import('./AboutSection'), { ssr: false });
const SkillsSection = dynamic(() => import('./SkillsSection'), { ssr: false });
const ProjectsSection = dynamic(() => import('./ProjectsSection'), { ssr: false });
const StatsSection = dynamic(() => import('./StatsSection'), { ssr: false });
const CertificationsSection = dynamic(() => import('./CertificationsSection'), { ssr: false });
const RoadmapSection = dynamic(() => import('./RoadmapSection'), { ssr: false });
const ContactSection = dynamic(() => import('./ContactSection'), { ssr: false });

export default function PortfolioLayout() {
    return (
        <div className="relative min-h-screen bg-[var(--color-void)] overflow-x-hidden">
            {/* Ambient background glow */}
            <div className="fixed inset-0 pointer-events-none" aria-hidden>
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-10"
                    style={{ background: 'radial-gradient(circle, #00e5ff 0%, transparent 70%)' }} />
                <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full opacity-8"
                    style={{ background: 'radial-gradient(circle, #8a2be2 0%, transparent 70%)' }} />
            </div>

            {/* Navigation dots */}
            <PortfolioNav />

            {/* Sections */}
            <main id="portfolio-main">
                <AboutSection />
                <SkillsSection />
                <ProjectsSection />
                <StatsSection />
                <CertificationsSection />
                <RoadmapSection />
                <ContactSection />
            </main>

            {/* Footer */}
            <footer className="text-center py-8 text-xs text-white/20 mono border-t border-white/5">
                <span className="text-[var(--color-cyan)]/50">{'>'}</span> {CONFIG.fullName} · {new Date().getFullYear()} · Built with Next.js &amp; Framer Motion
            </footer>
        </div>
    );
}

const NAV_ITEMS = ['About', 'Skills', 'Projects', 'Stats', 'Certs', 'Roadmap', 'Contact'];

function PortfolioNav() {
    return (
        <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3" aria-label="Section navigation">
            {NAV_ITEMS.map((item, i) => (
                <a
                    key={item}
                    href={`#section-${item.toLowerCase()}`}
                    title={item}
                    className="group relative flex items-center justify-end gap-2"
                >
                    <span className="opacity-0 group-hover:opacity-100 transition-all duration-200 text-xs mono text-[var(--color-cyan)] whitespace-nowrap">
                        {item}
                    </span>
                    <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-[var(--color-cyan)] group-hover:shadow-[0_0_8px_var(--color-cyan)] transition-all duration-200" />
                </a>
            ))}
        </nav>
    );
}
