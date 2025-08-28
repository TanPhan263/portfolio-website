import { ComingSoonPage } from '@/components/layout/coming-soon';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Nathan Phan',
  description:
    'Learn more about Nathan Phan - Frontend Developer, JavaScript enthusiast, and tech explorer.',
  keywords: [
    'Nathan Phan',
    'About me',
    'Frontend Developer',
    'JavaScript',
    'TypeScript',
    'Next.js',
    'Vietnam Developer'
  ],
  openGraph: {
    title: 'About | Nathan Phan',
    description:
      'Discover the story and journey of Nathan Phan in the world of web development.',
    siteName: 'Nathan Phan',
    type: 'website',
    locale: 'en_US'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | Nathan Phan',
    description:
      'Learn more about Nathan Phan - Frontend Developer and tech enthusiast.'
  },
  alternates: {
    canonical: ''
  }
};

export default function Page() {
  return <ComingSoonPage pageName="About" />;
}
