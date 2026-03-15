'use client';
import { useState, useEffect, useRef } from 'react';

export function useTypewriter(text: string, speed = 60, startDelay = 0) {
    const [displayed, setDisplayed] = useState('');
    const [done, setDone] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        setDisplayed('');
        setDone(false);
        let i = 0;

        const delayTimer = setTimeout(() => {
            timerRef.current = setInterval(() => {
                setDisplayed(text.slice(0, ++i));
                if (i >= text.length) {
                    clearInterval(timerRef.current!);
                    setDone(true);
                }
            }, speed);
        }, startDelay);

        return () => {
            clearTimeout(delayTimer);
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [text, speed, startDelay]);

    return { displayed, done };
}
