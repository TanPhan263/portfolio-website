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
        className={cn(className)}
      >
        {children}
      </motion.h1>
    </HeroHighlight>
  );
}
