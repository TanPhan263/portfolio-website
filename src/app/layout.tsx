import { SiteWrapper } from '@/components/layout/site-wrapper';
import TanstackProvider from '@/shared/providers/tanstack.provider';
import '@/styles/globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Exo_2, Orbitron } from 'next/font/google';

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-orbitron'
});

const exo2 = Exo_2({
  subsets: ['latin', 'vietnamese', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-exo2'
});

export const metadata: Metadata = {
  title: 'Nathan Phan | Frontend Developer Portfolio',
  description:
    "Explore Nathan Phan's portfolio – a skilled Frontend Developer specializing in Next.js, React, and modern web technologies. Showcasing innovative projects, UI/UX expertise, and high-performance web applications.",
  keywords: [
    'Frontend Developer',
    'Next.js Developer',
    'React Developer',
    'Nathan Phan Portfolio',
    'Web Development',
    'UI/UX Design',
    'JavaScript',
    'TypeScript',
    'Modern Web Technologies'
  ],
  openGraph: {
    title: 'Nathan Phan | Frontend Developer Portfolio',
    description:
      "Discover Nathan Phan's expertise in Frontend Development, React, and Next.js. View projects, case studies, and technical skills.",
    url: 'https://nathan-phan.vercel.app',
    type: 'website',
    images: [
      {
        url: '',
        width: 1200,
        height: 630,
        alt: 'Nathan Phan - Frontend Developer Portfolio'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nathan Phan | Frontend Developer Portfolio',
    description:
      "Explore Nathan Phan's frontend projects and expertise in React, Next.js, and modern web development.",
    images: ['']
  },
  icons: {
    icon: '/favicon.ico'
  },
  verification: {
    google: 'z4IXz38vVCl7Os2TOx7m0t5MzpAYOGK2tZ2tRsjKvrI'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${exo2.variable} ${orbitron.variable} antialiased scroll-smooth w-full relative min-h-screen overflow-x-hidden`}
      >
        <TanstackProvider>
          <SiteWrapper>{children}</SiteWrapper>
        </TanstackProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
