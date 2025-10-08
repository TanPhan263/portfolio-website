'use client';

import { motion } from 'motion/react';

import { GlowingEffect } from '@/components/ui/glowing-effect';
import { SocialCard } from '@/components/ui/social-card';
import useHomePage from '@/shared/hooks/queries/useHomePage';
import { useMemo } from 'react';

const socialPosts = [
  {
    id: 1,
    variants: {
      initial: { x: 20, rotate: -5 },
      hover: { x: 0, rotate: 0 }
    },
    colSpan: 'col-span-1 md:col-span-1 lg:col-span-2',
    order: 'order-2 md:order-1'
  },
  {
    id: 2,
    variants: undefined,
    colSpan: 'hidden md:block col-span-1 md:col-span-1 lg:col-span-2',
    order: 'order-2 md:order-1'
  },
  {
    id: 3,
    variants: {
      initial: { x: -20, rotate: 5 },
      hover: { x: 0, rotate: 0 }
    },
    colSpan: 'md:hidden col-span-1 md:col-span-1 lg:col-span-2',
    order: 'order-2 md:order-1'
  },
  {
    id: 4,
    variants: {
      initial: { x: -20, rotate: 5 },
      hover: { x: 0, rotate: 0 }
    },
    colSpan: 'hidden md:block col-span-1 md:col-span-1 lg:col-span-2',
    order: 'order-2 md:order-1'
  },
  {
    id: 5,
    variants: {
      initial: { x: 20, rotate: -5 },
      hover: { x: 0, rotate: 0 }
    },
    colSpan: 'md:hidden col-span-1 md:col-span-1 lg:col-span-2',
    order: 'order-2 md:order-1'
  }
];

export function MyTechStack() {
  const { data } = useHomePage();
  const mappedSocialPost = useMemo(() => {
    if (!data) return [];
    const { socials } = data;
    return socialPosts.map((post, index) => {
      const mappedIndex = index === 0 ? 0 : index < 3 ? 1 : 2;
      return {
        ...post,
        data: socials[mappedIndex]
      };
    });
  }, [data]);

  return (
    <>
      <div className="flex flex-col gap-6 px-11 sm:px-4">
        <motion.div
          initial="initial"
          animate="animate"
          whileHover="hover"
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full py-4 overflow-visible"
        >
          {mappedSocialPost.map(({ id, variants, colSpan, order, data }) => (
            <motion.div
              key={id}
              variants={variants}
              className={`${colSpan} dark:bg-black/50 bg-white/50 p-0 ${order}`}
            >
              <div className="relative rounded-2xl border p-2 md:rounded-3xl md:p-3 col-span-1 md:col-span-2 lg:col-span-3">
                <GlowingEffect
                  blur={0}
                  borderWidth={3}
                  spread={80}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                />
                <SocialCard {...data} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
}
