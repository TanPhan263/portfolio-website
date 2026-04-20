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
  title: 'TanTeck | Frontend Developer & Creative Engineer',
  description:
    "Explore TanTeck's interactive 3D portfolio — featuring an immersive solar system built with Three.js and React Three Fiber. Specializing in Next.js, React, and high-performance web experiences.",
  keywords: [
    'Frontend Developer',
    'Next.js Developer',
    'React Developer',
    'Three.js Developer',
    'React Three Fiber',
    '3D Web Development',
    'Interactive Portfolio',
    'Creative Developer',
    'TanTeck Portfolio',
    'WebGL',
    'UI/UX Design',
    'JavaScript',
    'TypeScript',
    'Next.js',
    'Reactjs',
    'Web Development',
    'Framer Motion',
    'Zustand',
    'BFF',
    'Immersive Web'
  ],
  openGraph: {
    title: 'TanTeck | 3D Frontend Developer & Creative Engineer',
    description:
      'An interactive 3D solar system portfolio built with Three.js. Navigate planets to explore my skills, experience, and projects. Crafted with React Three Fiber and Next.js for a seamless web experience.',
    url: 'https://tanteck.net',
    siteName: 'TanTeck Portfolio',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/dfpgw5yw2/image/upload/q_auto/f_auto/v1759852582/avt-card-dark.png',
        width: 800,
        height: 800,
        alt: 'TanTeck - 3D Interactive Portfolio'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TanTeck | Frontend Developer & Creative Engineer',
    description:
      'Explore my interactive 3D solar system portfolio. Built with Three.js, React Three Fiber, and Next.js.',
    images: [
      'https://res.cloudinary.com/dfpgw5yw2/image/upload/q_auto/f_auto/v1759852582/avt-card-dark.png'
    ]
  },
  icons: {
    icon: '/favicon.ico'
  },
  verification: {
    google: 'z4IXz38vVCl7Os2TOx7m0t5MzpAYOGK2tZ2tRsjKvrI'
  },
  alternates: {
    canonical: 'https://tanteck.net'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large'
    }
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
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
        className={`${exo2.variable} ${orbitron.variable} antialiased scroll-smooth w-full relative min-h-screen overflow-x-clip`}
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
