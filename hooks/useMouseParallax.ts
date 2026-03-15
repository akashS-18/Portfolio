'use client';
import { useState, useEffect, useCallback } from 'react';

export function useMouseParallax(multiplier = 20) {
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleMouseMove = useCallback((e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * multiplier;
        const y = (e.clientY / window.innerHeight - 0.5) * multiplier;
        setOffset({ x, y });
    }, [multiplier]);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [handleMouseMove]);

    return offset;
}
