'use client';
import { useMemo } from 'react';

const CODE_SNIPPETS = [
    'def train_model(X, y):',
    'const [state, setState] =',
    '<div className="hero">',
    'SELECT * FROM users WHERE',
    'import numpy as np',
    'async function fetchData()',
    'git commit -m "feat:"',
    'docker-compose up -d',
    'useEffect(() => {}, [])',
    'return <Component />',
    'pip install langchain',
    'const res = await fetch(',
    'CREATE INDEX ON users',
    'if __name__ == "__main__":',
    'export default function',
    'npm run build',
    'kubectl apply -f deploy.yml',
    'model.fit(X_train, y_train)',
    '.then(res => res.json())',
    'FROM python:3.12-slim',
];

interface CodeSpan {
    id: number;
    text: string;
    x: number;
    y: number;
    opacity: number;
    fontSize: number;
    duration: number;
    delay: number;
    dx: number;
}

export default function FloatingCodeSyntax() {
    const spans: CodeSpan[] = useMemo(() =>
        CODE_SNIPPETS.map((text, i) => ({
            id: i,
            text,
            x: Math.random() * 95,
            y: Math.random() * 90,
            opacity: 0.06 + Math.random() * 0.12,
            fontSize: 10 + Math.floor(Math.random() * 5),
            duration: 18 + Math.random() * 20,
            delay: Math.random() * -30,
            dx: (Math.random() - 0.5) * 40,
        })), []);

    return (
        <>
            {spans.map((span) => (
                <span
                    key={span.id}
                    className="absolute select-none pointer-events-none"
                    style={{
                        left: `${span.x}%`,
                        top: `${span.y}%`,
                        opacity: span.opacity,
                        fontSize: `${span.fontSize}px`,
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--color-cyan)',
                        filter: 'blur(0.8px)',
                        whiteSpace: 'nowrap',
                        animation: `float ${span.duration}s ease-in-out ${span.delay}s infinite alternate`,
                        transform: `translateX(${span.dx}px)`,
                    }}
                >
                    {span.text}
                </span>
            ))}
        </>
    );
}
