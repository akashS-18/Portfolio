'use client';
import { usePortfolioStore } from '@/store/portfolioStore';
import { Volume2, VolumeX, FastForward, Zap, ZapOff } from 'lucide-react';

interface GlobalHUDProps {
    showSkip?: boolean;
}

export default function GlobalHUD({ showSkip = false }: GlobalHUDProps) {
    const { soundEnabled, recruiterMode, toggleSound, toggleRecruiterMode, skipIntro } = usePortfolioStore();

    return (
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 100 }}>
            {/* Top Left — Brand */}
            <div className="absolute top-5 left-6 pointer-events-auto">
                <span
                    className="font-display text-sm font-bold tracking-widest text-glow-cyan"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--color-cyan)', letterSpacing: '0.15em' }}
                >
                    ⚡ AKASH.DEV
                </span>
            </div>

            {/* Top Right — Controls */}
            <div className="absolute top-4 right-5 flex items-center gap-3 pointer-events-auto">
                {/* Sound Toggle */}
                <button
                    onClick={toggleSound}
                    title={soundEnabled ? 'Mute' : 'Enable Sound'}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 glass"
                    style={{
                        color: soundEnabled ? 'var(--color-cyan)' : 'var(--color-white-40)',
                        border: `1px solid ${soundEnabled ? 'rgba(0,229,255,0.3)' : 'rgba(255,255,255,0.1)'}`,
                    }}
                >
                    {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
                    <span className="hidden sm:inline">{soundEnabled ? 'SFX ON' : 'SFX OFF'}</span>
                </button>

                {/* Recruiter Mode Toggle */}
                <button
                    onClick={toggleRecruiterMode}
                    title={recruiterMode ? 'Exit Recruiter Mode' : 'Recruiter Mode — Skip animations'}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
                    style={{
                        color: recruiterMode ? 'var(--color-green)' : 'var(--color-white-40)',
                        background: recruiterMode ? 'rgba(0,255,136,0.1)' : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${recruiterMode ? 'rgba(0,255,136,0.3)' : 'rgba(255,255,255,0.1)'}`,
                        backdropFilter: 'blur(8px)',
                    }}
                >
                    {recruiterMode ? <Zap size={13} /> : <ZapOff size={13} />}
                    <span className="hidden sm:inline">{recruiterMode ? 'RECRUITER ON' : 'RECRUITER'}</span>
                </button>
            </div>

            {/* Bottom Right — Skip Intro */}
            {showSkip && (
                <div className="absolute bottom-6 right-6 pointer-events-auto">
                    <button
                        onClick={skipIntro}
                        className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300"
                        style={{
                            color: 'var(--color-white-40)',
                            border: '1px solid rgba(255,255,255,0.12)',
                            backdropFilter: 'blur(8px)',
                            background: 'rgba(255,255,255,0.04)',
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-cyan)';
                            (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0,229,255,0.4)';
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-white-40)';
                            (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.12)';
                        }}
                    >
                        <FastForward size={13} />
                        Skip Intro
                    </button>
                </div>
            )}
        </div>
    );
}
