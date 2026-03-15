'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePortfolioStore } from '@/store/portfolioStore';
import dynamic from 'next/dynamic';

// Lazy-load all scenes
const DeskScene = dynamic(() => import('@/components/scene1-desk/DeskScene'), { ssr: false });
const LoginScreen = dynamic(() => import('@/components/scene2-login/LoginScreen'), { ssr: false });
const FakeDesktop = dynamic(() => import('@/components/scene3-desktop/FakeDesktop'), { ssr: false });
const ScanTransition = dynamic(() => import('@/components/scene4-transition/ScanTransition'), { ssr: false });
const PortfolioLayout = dynamic(() => import('@/components/portfolio/PortfolioLayout'), { ssr: false });

// Always-visible HUD
const GlobalHUD = dynamic(() => import('@/components/global/GlobalHUD'), { ssr: false });
const CustomCursor = dynamic(() => import('@/components/global/CustomCursor'), { ssr: false });
const NoiseOverlay = dynamic(() => import('@/components/global/NoiseOverlay'), { ssr: false });

const CINEMATIC_SCENES = ['SCENE_DESK', 'SCENE_LAPTOP_OPEN', 'SCENE_LOGIN', 'SCENE_DESKTOP', 'SCENE_SECURITY', 'SCENE_TRANSITION'];

export default function CinematicOrchestrator() {
    const { currentScene, recruiterMode } = usePortfolioStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);
    if (!mounted) return null;

    const isCinematic = CINEMATIC_SCENES.includes(currentScene);
    const isDesk = currentScene === 'SCENE_DESK' || currentScene === 'SCENE_LAPTOP_OPEN';
    const isLogin = currentScene === 'SCENE_LOGIN';
    const isDesktop = currentScene === 'SCENE_DESKTOP' || currentScene === 'SCENE_SECURITY';
    const isTransition = currentScene === 'SCENE_TRANSITION';
    const isPortfolio = currentScene === 'SCENE_PORTFOLIO';

    return (
        <div className={`relative w-full min-h-screen overflow-hidden bg-[#050510] ${recruiterMode ? 'recruiter-mode' : ''}`}>
            <CustomCursor />
            <NoiseOverlay />
            <GlobalHUD showSkip={isCinematic} />

            <AnimatePresence mode="wait">
                {isDesk && !recruiterMode && (
                    <motion.div key="desk" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="absolute inset-0">
                        <DeskScene />
                    </motion.div>
                )}

                {isLogin && (
                    <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.5 }} className="absolute inset-0">
                        <LoginScreen />
                    </motion.div>
                )}

                {isDesktop && (
                    <motion.div key="desktop" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="absolute inset-0">
                        <FakeDesktop />
                    </motion.div>
                )}

                {isTransition && (
                    <motion.div key="transition" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="absolute inset-0">
                        <ScanTransition />
                    </motion.div>
                )}

                {isPortfolio && (
                    <motion.div key="portfolio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="absolute inset-0 overflow-y-auto">
                        <PortfolioLayout />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
