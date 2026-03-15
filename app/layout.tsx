import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Akash — Full Stack · AI · Automation',
  description: 'Cinematic portfolio of Akash — Full Stack Developer, AI Engineer, and Automation Specialist. Building intelligent systems that scale.',
  keywords: ['Akash', 'Full Stack Developer', 'AI Engineer', 'Portfolio', 'React', 'Python', 'Next.js'],
  authors: [{ name: 'Akash' }],
  openGraph: {
    title: 'Akash — Full Stack · AI · Automation',
    description: 'Building intelligent systems that scale.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Akash — Full Stack · AI · Automation',
    description: 'Building intelligent systems that scale.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#050510" />
      </head>
      <body>{children}</body>
    </html>
  );
}
