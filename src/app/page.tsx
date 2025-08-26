import CTA from '@/components/ui/CTA';
import Features from '@/components/ui/Features';
import Hero from '@/components/ui/Hero';
import Showcase from '@/components/ui/Showcase';
import Testimonials from '@/components/ui/Testimonials';

export default function Home() {
  return (
    <>
      <Hero />
      <Showcase />
      <Testimonials />
      <Features />
      <CTA />
    </>
  );
}
