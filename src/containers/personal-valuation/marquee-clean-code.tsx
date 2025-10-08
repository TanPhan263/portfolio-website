'use client';

import { Marquee } from '@/components/magicui/marquee';
import { cn } from '@/shared/utils/common';

const cleanCodePrinciples = [
  {
    title: 'Meaningful Names',
    description:
      'Use clear, descriptive names for variables, functions, and classes so the purpose is obvious without extra comments.'
  },
  {
    title: 'Single Responsibility Principle',
    description:
      'Each function, class, or module should do one thing and do it well. Avoid mixing multiple concerns in the same place.'
  },
  {
    title: 'Small Functions',
    description:
      'Keep functions short and focused. Long functions are harder to understand, test, and maintain.'
  },
  {
    title: 'Avoid Magic Numbers & Strings',
    description:
      'Replace hard-coded values with named constants or enums to improve readability and reduce errors.'
  },
  {
    title: 'Consistent Formatting',
    description:
      'Use a consistent code style (indentation, spacing, naming conventions) to make code easier to read and review.'
  },
  {
    title: 'Clear Comments',
    description:
      "Write comments only when necessary. Prefer self-explanatory code. Comments should explain 'why', not 'what'."
  },
  {
    title: 'Error Handling',
    description:
      'Handle errors gracefully with meaningful messages. Avoid swallowing exceptions silently.'
  },
  {
    title: 'DRY (Don’t Repeat Yourself)',
    description:
      'Eliminate duplication by extracting reusable functions, components, or modules.'
  },
  {
    title: 'KISS (Keep It Simple, Stupid)',
    description:
      'Favor simple, straightforward solutions over clever or complex ones that are harder to maintain.'
  },
  {
    title: 'Refactor Often',
    description:
      'Regularly improve existing code by simplifying, removing duplication, and improving readability without changing behavior.'
  }
];

export function MarqueeCleanCode({ className }: { className?: string }) {
  return (
    <Marquee className={className}>
      {cleanCodePrinciples.map((principle) => (
        <div
          key={principle.title}
          className={cn(
            'flex flex-col w-60 overflow-hidden border border-gray-200 dark:border-gray-500 p-6 rounded-xl',
            'dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]'
          )}
        >
          <h3 className="text-lg font-semibold">{principle.title}</h3>
          <p className="text-sm font-light">{principle.description}</p>
        </div>
      ))}
    </Marquee>
  );
}
