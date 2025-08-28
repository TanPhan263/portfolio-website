import { ComingSoonPage } from '@/components/layout/coming-soon';

export const metadata = {
  title: 'Experience | Nathan Phan',
  description:
    'Explore the professional journey of Nathan Phan - frontend developer with experience in modern JavaScript frameworks.',
  openGraph: {
    title: 'Experience | Nathan Phan',
    description:
      'Frontend Developer with hands-on experience in React, Next.js, and modern UI/UX design.',
    url: 'https://nathan-phan.vercel.app/experience',
    siteName: 'Nathan Phan',
    images: [
      // {
      //   url: "https://nathan-phan.vercel.app/images/seo/experience-og-image.png",
      //   width: 1200,
      //   height: 630,
      //   alt: "Nathan Phan Experience Page",
      // },
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Experience | Nathan Phan',
    description:
      "Check out Nathan Phan's past work and achievements in frontend development."
    //   images: ["https://nathan-phan.vercel.app/images/seo/experience-og-image.png"],
  },
  alternates: {
    canonical: 'https://nathan-phan.vercel.app/experience'
  }
};

export default function Page() {
  return <ComingSoonPage pageName="Experience" />;

  // <div>
  //   <FullScreen>
  //     <ExperienceTimeline />
  //   </FullScreen>
  // </div>
}
