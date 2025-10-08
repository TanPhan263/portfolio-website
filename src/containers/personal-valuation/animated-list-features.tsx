'use client';

import { AnimatedList } from '@/components/magicui/animated-list';
import { cn } from '@/shared/utils/common';

const features = [
  {
    title: 'API Integration',
    description:
      'Connect and integrate third-party services to enhance functionality and data exchange in web application.'
  },
  {
    title: 'Payment Gateway Integration',
    description:
      'Securely handle online payments with services like Stripe, PayPal, or custom payment solutions.'
  },
  {
    title: 'WebSockets & Real-Time Applications',
    description:
      'Enable two-way communication for live updates, notifications, and collaborative features.'
  },
  {
    title: 'Authentication & Authorization',
    description:
      'Implement secure user login systems using JWT, OAuth, or SSO for access control.'
  },
  {
    title: 'Page Speed Optimization',
    description:
      'Improving load times by optimizing images, minifying CSS/JS, and utilizing caching. Faster sites rank better on Google and improve user experience.'
  },
  {
    title: 'SEO Optimization',
    description:
      'Optimizing title tags, meta descriptions, and header tags with relevant keywords helps search engines understand your content and improves click-through rates.'
  },
  {
    title: 'Resposive UI',
    description:
      'Creating user interfaces that adapt to different screen sizes and devices ensures a consistent and optimal user experience.'
  }
];

export function AnimatedListFeatures({ className }: { className?: string }) {
  return (
    <AnimatedList className={className}>
      {features.map((feature) => (
        <div
          key={feature.title}
          className={cn(
            'flex flex-col overflow-hidden border border-gray-200 dark:border-gray-500 p-6 rounded-xl',
            'dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]'
          )}
        >
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white">
            <span className="text-sm sm:text-lg">{feature.title}</span>
            <span className="mx-1">·</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">
            {feature.description}
          </p>
        </div>
      ))}
    </AnimatedList>
  );
}
