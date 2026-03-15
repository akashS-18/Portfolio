export interface Certification {
    id: string;
    title: string;
    issuer: string;
    year: number;
    color: string;
    icon: string;
    badge: string;
    credentialId?: string;
}

export const certifications: Certification[] = [
    {
        id: 'cert-1',
        title: 'AWS Certified Cloud Practitioner',
        issuer: 'Amazon Web Services',
        year: 2024,
        color: '#ff8c00',
        icon: '☁',
        badge: 'AWS',
        credentialId: 'AWS-CP-2024-AKASH',
    },
    {
        id: 'cert-2',
        title: 'Google Professional ML Engineer',
        issuer: 'Google Cloud',
        year: 2024,
        color: '#00e5ff',
        icon: '🧠',
        badge: 'GCP',
        credentialId: 'GCP-ML-2024-AKASH',
    },
    {
        id: 'cert-3',
        title: 'Meta React Developer',
        issuer: 'Meta / Coursera',
        year: 2023,
        color: '#8a2be2',
        icon: '⚛',
        badge: 'META',
        credentialId: 'META-REACT-2023',
    },
    {
        id: 'cert-4',
        title: 'Python for AI & ML Bootcamp',
        issuer: 'Udemy',
        year: 2023,
        color: '#00ff88',
        icon: '🐍',
        badge: 'PY',
        credentialId: 'UDEMY-PAIML-2023',
    },
];

export const achievements = [
    { icon: '🏆', title: 'Hackathon Winner', desc: 'State-level AI Hackathon 1st Place — 2024' },
    { icon: '🌟', title: 'Open Source Contributor', desc: '500+ GitHub contributions in 2024' },
    { icon: '🎖', title: 'Dean\'s List', desc: 'Academic Excellence Award — 3 consecutive semesters' },
    { icon: '🤝', title: 'Mentored 30+ Devs', desc: 'Community tech lead at college AI club' },
];
