export const projects = [
    {
        id: 'proj-1',
        title: 'Local Business Directory',
        problem: 'Local businesses lacked a unified platform where customers could discover them by category, read reviews, and get details — all in one place.',
        solution: 'Built a full-stack web platform with user authentication, category-based search, business listings, review system, and an admin dashboard for managing entries.',
        tech: ['React', 'HTML', 'CSS', 'JavaScript', 'Supabase', 'PostgreSQL'],
        github: 'https://github.com/akashS-18',
        demo: 'https://akashs-18.github.io/LBD/',
        image: '/images/projects/business-directory.png',
        featured: true,
        year: 2024,
    },
    {
        id: 'proj-2',
        title: 'JobSnap AI – Smart Resume Generator',
        problem: 'Job seekers struggle to create ATS-friendly resumes that pass automated screening — most generic templates fail to match job descriptions effectively.',
        solution: 'AI-powered resume generator using Django REST APIs that creates tailored, ATS-optimized resumes based on user input with a custom interactive frontend.',
        tech: ['Python', 'Django', 'HTML', 'CSS', 'JavaScript', 'Django REST Framework'],
        github: 'https://github.com/akashS-18',
        demo: 'https://v0-resume-generator-ecbf9pjik-akashs-projects-588a80db.vercel.app/',
        image: '/images/projects/jobsnap.png',
        featured: true,
        year: 2024,
    },
    {
        id: 'proj-3',
        title: 'Smart AI Assistant',
        problem: 'Traditional desktop assistants lack intelligence — no face recognition, no emotion detection, no adaptive voice interaction for secure and personalized access.',
        solution: 'Intelligent desktop assistant with face login, voice commands, emotion detection, and automated attendance marking powered by computer vision and speech tech.',
        tech: ['Python', 'OpenCV', 'MediaPipe', 'SpeechRecognition', 'pyttsx3', 'face_recognition'],
        github: 'https://github.com/akashS-18',
        demo: '#',
        image: '/images/projects/ai-assistant.png',
        featured: true,
        year: 2025,
    },
    {
        id: 'proj-4',
        title: 'ATS Resume Score Analyzer',
        problem: 'Job applicants have no way to know why their resume gets rejected by ATS systems — they submit blindly and never get feedback on keyword relevance or skills gaps.',
        solution: 'Web app that analyzes a resume against a job description using TF-IDF similarity and a custom weighted scoring algorithm, returning an ATS compatibility score with actionable improvement suggestions.',
        tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Recharts', 'pdfjs-dist', 'mammoth'],
        github: 'https://github.com/akashS-18',
        demo: 'https://ats-calc.vercel.app',
        image: '/images/projects/ats-analyzer.png',
        featured: true,
        year: 2025,
    },
];

export interface Project {
    id: string;
    title: string;
    problem: string;
    solution: string;
    tech: string[];
    github: string;
    demo: string;
    image: string;
    featured: boolean;
    year: number;
}
