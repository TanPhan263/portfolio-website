import { FullScreen } from "@/components/full-screen";
import { ExperienceTimeline } from "@/components/ui/experience-timeline";

export const metadata = {
  title: "Experience | Nathan Phan",
  description:
    "Explore the professional journey of Nathan Phan - frontend developer with experience in modern JavaScript frameworks.",
  openGraph: {
    title: "Experience | Nathan Phan",
    description:
      "Frontend Developer with hands-on experience in React, Next.js, and modern UI/UX design.",
    url: "https://nathan-phan.vercel.app/experience",
    siteName: "Nathan Phan",
    images: [],
  },
  twitter: {
    card: "summary_large_image",
    title: "Experience | Nathan Phan",
    description:
      "Check out Nathan Phan's past work and achievements in frontend development.",
  },
  alternates: {
    canonical: "https://nathan-phan.vercel.app/experience",
  },
};

export default function Page() {
  return (
    <FullScreen className="my-10 lg:my-20">
      <ExperienceTimeline />
    </FullScreen>
  );
}
