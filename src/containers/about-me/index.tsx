'use client';

import { motion } from 'motion/react';

import { GlowingEffect } from '@/components/ui/glowing-effect';
import { SocialCard } from '@/components/ui/social-card';

const socialPosts = [
  {
    id: 1,
    variants: {
      initial: { x: 20, rotate: -5 },
      hover: { x: 0, rotate: 0 }
    },
    colSpan: 'col-span-1 md:col-span-1 lg:col-span-2',
    order: 'order-2 md:order-1',
    data: {
      status: '⚡ Core Hustle: frameworks & languages – the must-haves',
      tags: [
        'ReactJS',
        'Nextjs',
        'Vuejs',
        'Nuxtjs',
        'TypeScript',
        'JavaScript'
      ],
      images: [
        'react-logo.png',
        'next-logo.jpeg',
        'vue-logo.jpeg',
        'nuxt-logo.png',
        'ts-logo.png',
        'js-logo.png'
      ]
    }
  },
  {
    id: 2,
    variants: undefined,
    colSpan: 'col-span-1 md:col-span-1 lg:col-span-2',
    order: 'order-2 md:order-1',
    data: {
      status: '🎨 UI Vibes: making apps pretty, smooth, and on point',
      tags: [
        'TailwindCSS',
        'Mantine',
        'Bootstrap',
        'Motion',
        'Echart',
        'AgGrid'
      ],
      images: [
        'tailwind-logo.png',
        'mantine-logo.png',
        'bs-logo.png',
        'motion-logo.png',
        'ag-grid-logo.png',
        'echart-logo.png'
      ]
    }
  },
  {
    id: 3,
    variants: {
      initial: { x: -20, rotate: 5 },
      hover: { x: 0, rotate: 0 }
    },
    colSpan: 'col-span-1 md:col-span-1 lg:col-span-2',
    order: 'order-2 md:order-1',
    data: {
      status: '🚀 Flow Tools: stuff that keeps the dev life smooth & fast',
      tags: ['Redux', 'ReactQuery', 'Vite', 'Webpack', 'GitHub', 'GitLab'],
      images: [
        'redux-logo.png',
        'react-query-logo.avif',
        'vite-logo.png',
        'webpack-logo.png',
        'git-logo.jpg',
        'gitlab.png'
      ]
    }
  }
];

export function MyInformation() {
  return (
    <>
      <div className="flex flex-col gap-6 px-11 sm:px-4">
        <motion.div
          initial="initial"
          animate="animate"
          whileHover="hover"
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full py-4 overflow-visible"
        >
          {socialPosts.map(({ id, variants, colSpan, order, data }) => (
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
                <SocialCard
                  status={data.status}
                  tags={data.tags}
                  images={data.images}
                  index={id}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
}
