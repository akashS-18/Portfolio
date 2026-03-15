'use client';
import { useEffect, useRef, useState } from 'react';
import { usePortfolioStore } from '@/store/portfolioStore';

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        let raf: number;
        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;

        const onMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            setVisible(true);
        };
        const onLeave = () => setVisible(false);

        const animate = () => {
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;
            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
            }
            if (ringRef.current) {
                ringRef.current.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
            }
            raf = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', onMove);
        document.addEventListener('mouseleave', onLeave);
        raf = requestAnimationFrame(animate);
        return () => {
            window.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseleave', onLeave);
            cancelAnimationFrame(raf);
        };
    }, []);

    if (!visible) return null;

    return (
        <>
            {/* Dot */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none"
                style={{ zIndex: 'var(--z-cursor)' as string, background: 'var(--color-cyan)', boxShadow: '0 0 8px rgba(0,229,255,0.9)' }}
            />
            {/* Ring */}
            <div
                ref={ringRef}
                className="fixed top-0 left-0 w-9 h-9 rounded-full pointer-events-none border"
                style={{
                    zIndex: 'var(--z-cursor)' as string,
                    borderColor: 'rgba(0,229,255,0.5)',
                    transition: 'width 0.2s, height 0.2s',
                }}
            />
        </>
    );
}
