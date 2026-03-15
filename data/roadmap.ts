export interface RoadmapNode {
    id: string;
    quarter: string;
    title: string;
    description: string;
    status: 'done' | 'active' | 'upcoming';
    skills: string[];
}

export const roadmap: RoadmapNode[] = [
    {
        id: 'rm-1',
        quarter: 'Q1 2023',
        title: 'Foundation',
        description: 'Mastered Python, React fundamentals, SQL. Built first full-stack project.',
        status: 'done',
        skills: ['Python', 'React', 'PostgreSQL'],
    },
    {
        id: 'rm-2',
        quarter: 'Q3 2023',
        title: 'Backend & APIs',
        description: 'Deep-dived into FastAPI, Docker, REST design. Shipped production APIs.',
        status: 'done',
        skills: ['FastAPI', 'Docker', 'REST', 'Redis'],
    },
    {
        id: 'rm-3',
        quarter: 'Q1 2024',
        title: 'AI Integration',
        description: 'Integrated LLMs, built AI pipelines, won state hackathon with AI product.',
        status: 'done',
        skills: ['OpenAI', 'LangChain', 'Embeddings'],
    },
    {
        id: 'rm-4',
        quarter: 'Q3 2024',
        title: 'Cloud & DevOps',
        description: 'AWS certification, CI/CD pipelines, Kubernetes basics, deployed to production.',
        status: 'active',
        skills: ['AWS', 'K8s', 'GitHub Actions'],
    },
    {
        id: 'rm-5',
        quarter: 'Q1 2025',
        title: 'ML Engineering',
        description: 'Building custom ML models, fine-tuning LLMs, deploying AI inference APIs.',
        status: 'upcoming',
        skills: ['PyTorch', 'HuggingFace', 'ONNX'],
    },
    {
        id: 'rm-6',
        quarter: 'Q3 2025',
        title: 'Founder Mode',
        description: 'Launch own AI SaaS product. Build and scale from 0 to 1000 users.',
        status: 'upcoming',
        skills: ['Product', 'Go-to-market', 'Scale'],
    },
];

export const fakeLogs = [
    '> Initiating neural scan protocol...',
    '> Loading identity matrix: [AKASH_K]',
    '> Verifying cryptographic signature... ✓',
    '> Scanning filesystem... 4,218 files indexed',
    '> AI capability core: ONLINE',
    '> React/Next.js module: LOADED (v18.3)',
    '> Python runtime: LOADED (v3.12)',
    '> Full-stack integration layer: STABLE',
    '> GitHub contribution graph: PARSING...',
    '> 512+ commits detected across 18 repositories',
    '> Hackathon wins: 1 (State-level, 2024)',
    '> Open source PRs merged: 23',
    '> Certifications validated: 4',
    '> Skills proficiency scan: COMPLETE',
    '> Portfolio modules: ASSEMBLING...',
    '> Identity verified: AKASH',
    '> Loading portfolio interface...',
];
