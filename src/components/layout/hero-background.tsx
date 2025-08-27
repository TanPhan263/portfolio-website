'use client';
import { cn } from '@/shared/utils/common';
import { motion } from 'motion/react';
import { HeroHighlight } from '../ui/hero-highlight';

export function HeroBackground({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <HeroHighlight className="min-h-screen">
      <motion.h1
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0]
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1]
        }}
        // className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
        className={cn(className)}
      >
        {children}
      </motion.h1>
    </HeroHighlight>
  );
}
