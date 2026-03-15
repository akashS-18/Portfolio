export interface Skill {
    id: string;
    label: string;
    level: number;
    color: string;
    icon: string;
    sub: string[];
}

export const skills: Skill[] = [
    {
        id: 'languages',
        label: 'Programming',
        level: 88,
        color: '#00e5ff',
        icon: '💻',
        sub: ['Python', 'Java', 'JavaScript'],
    },
    {
        id: 'web',
        label: 'Web Dev',
        level: 82,
        color: '#8a2be2',
        icon: '🌐',
        sub: ['HTML5', 'CSS3', 'React.js', 'Django', 'REST APIs'],
    },
    {
        id: 'backend',
        label: 'Backend & DB',
        level: 75,
        color: '#ff8c00',
        icon: '🗄',
        sub: ['Supabase', 'PostgreSQL', 'MongoDB', 'Authentication Systems'],
    },
    {
        id: 'ai',
        label: 'AI / CV',
        level: 78,
        color: '#00ff88',
        icon: '🤖',
        sub: ['OpenCV', 'MediaPipe', 'Face Recognition', 'Machine Learning', 'Prompt Engineering'],
    },
    {
        id: 'tools',
        label: 'Tools',
        level: 80,
        color: '#ff3c3c',
        icon: '🔧',
        sub: ['Git', 'GitHub', 'VS Code', 'Google Cloud Labs', 'Postman'],
    },
    {
        id: 'soft',
        label: 'Soft Skills',
        level: 90,
        color: '#f59e0b',
        icon: '🌟',
        sub: ['Self-Learner', 'Hackathon Teamwork', 'Communication', 'Leadership', 'Project Management'],
    },
];
