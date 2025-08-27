import { ComingSoonPage } from '@/components/layout/coming-soon';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Nathan Phan',
  description:
    'Learn more about Nathan Phan - Frontend Developer, JavaScript enthusiast, and tech explorer.',
  keywords: [
    'Nathan Phan',
    'About Kinh',
    'Frontend Developer',
    'JavaScript',
    'Next.js',
    'Vietnam Developer'
  ],
  openGraph: {
    title: 'About | Nathan Phan',
    description:
      'Discover the story and journey of Nathan Phan in the world of web development.',
    url: 'https://kinhdev.id.vn/about',
    siteName: 'Nathan Phan',
    type: 'website',
    locale: 'en_US',
    images: [
      // {
      //   url: "https://kinhdev.id.vn/images/seo/about-og-image.png",
      //   width: 1200,
      //   height: 630,
      //   alt: "Nathan Phan About Page",
      // },
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | Nathan Phan',
    description:
      'Learn more about Nathan Phan - Frontend Developer and tech enthusiast.'
    // images: ["https://kinhdev.id.vn/images/seo/about-og-image.png"],
  },
  alternates: {
    canonical: 'https://kinhdev.id.vn/about'
  }
};

export default function Page() {
  return <ComingSoonPage pageName="About" />;
}
