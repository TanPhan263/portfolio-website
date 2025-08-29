'use client';

import { BlurImage } from '@/components/ui/apple-cards-carousel';
import { Compare } from '@/components/ui/compare';
import { Cover } from '@/components/ui/cover';
import { Lens } from '@/components/ui/lens';
import { TypeWriter } from '@/components/ui/type-writer';
import TypewriterArray from '@/components/ui/type-writer-array';
import { ROLE_TITLES } from '@/shared/data/role-titles';
import { cn } from '@/shared/utils/common';
import { useTheme } from 'next-themes';
import { memo, useState } from 'react';

// const animationTypes: AnimationVariant[] = [
//   'fadeIn',
//   'blurIn',
//   'blurInUp',
//   'blurInDown',
//   'slideUp',
//   'slideDown',
//   'slideLeft',
//   'slideRight',
//   'scaleUp',
//   'scaleDown'
// ];

export const MyUniverse = () => {
  const [hovering, setHovering] = useState(false);
  const { theme } = useTheme();

  return (
    <div className="w-full flex flex-col lg:flex-row justify-between items-center md:gap-20 px-2 md:px-6 lg:mt-8">
      <div className="flex-1 relative w-full lg:w-auto">
        <div className="flex flex-row gap-4 my-4 lg:my-0 lg:block items-center sm:items-start">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight sm:my-6 dark:text-zinc-300 text-zinc-700">
            <TypeWriter text="Hello," />
          </h1>

          <Title />
        </div>

        <div className="flex items-center justify-center md:justify-start">
          <div
            className={cn(
              'relative md:w-fit w-full py-2 px-4 sm:px-8 text-base sm:text-lg md:text-xl font-bold my-5 pt-2 pb-3 text-center text-black dark:text-white',
              'border-y border-dashed dark:border-white border-gray-600'
            )}
          >
            <div className="absolute -top-2 left-2 h-[calc(100%+1rem)] w-[calc(100%-1rem)] border-x border-dashed dark:border-white border-gray-600" />
            <div className="absolute bg-gray-600 dark:bg-white h-2 w-2 -top-1 left-1" />
            <div className="absolute bg-gray-600 dark:bg-white h-2 w-2 -bottom-1 left-1" />
            <div className="absolute bg-gray-600 dark:bg-white h-2 w-2 -top-1 right-1" />
            <div className="absolute bg-gray-600 dark:bg-white h-2 w-2 -bottom-1 right-1" />
            <TypewriterArray words={ROLE_TITLES} />
          </div>
        </div>
        <div className="text-lg text-zinc-600 dark:text-zinc-400 my-4 md:my-8 font-bold bg-gray-500/20 rounded-xs p-4">
          Frontend Wizard 🪄 | React ⚛️ & Next.js 🚀
          <br />
          <span className="font-normal italic">
            Turning pixels into magic ✨, coding with coffee ☕, and vibin’
            while building smooth, modern UIs 🌈
          </span>
        </div>
      </div>
      <div className="relative flex-1 flex justify-center w-full mt-8 lg:mt-0">
        {/* Responsive positioning for floating elements */}
        <div className="px-3 py-2 hidden sm:block absolute top-0 left-16 sm:left-16 bg-purple-500/20 rounded-[6px] w-max font-medium dark:text-purple-300 text-purple-500 border border-purple-500/20 animate-wiggle duration-1000 z-30">
          Responsive UI
        </div>

        <div className="px-3 py-2 hidden sm:block absolute top-24 right-4 sm:right-8 bg-blue-500/20 rounded-[6px] w-max font-medium dark:text-blue-300 text-blue-500 border border-blue-500/20 animate-wiggle duration-1000 z-30">
          Clean Code
        </div>

        <div className="px-3 py-2 hidden sm:block absolute top-20 right-26 sm:right-52 bg-yellow-500/20 rounded-[6px] w-max font-medium dark:text-yellow-300 text-yellow-500 border border-yellow-500/20 animate-wiggle duration-1000 z-30">
          Performance
        </div>

        <div className="px-3 py-2 hidden sm:block absolute top-32 left-0 sm:left-4 bg-red-700/20 rounded-[6px] w-max font-medium dark:text-red-300 text-red-500 border border-red-500/20 animate-wiggle duration-1000 z-30">
          SEO
        </div>

        <div className="px-3 py-2 hidden sm:block absolute top-6 right-6 sm:right-16 bg-green-700/20 rounded-[6px] w-max font-medium dark:text-green-300 text-green-500 border border-green-500/20 animate-wiggle duration-1000 z-30">
          Teamwork
        </div>

        <Lens hovering={hovering} setHovering={setHovering}>
          <BlurImage
            src={`/images/avt-card${theme === 'light' ? '-light' : ''}.png`}
            alt="image"
            width={450}
            height={400}
            className="rounded-5xl object-contain"
          />
        </Lens>
      </div>
    </div>
  );
};

export function CompareDemo() {
  return (
    <div className="w-full border rounded-3xl dark:bg-neutral-900 bg-neutral-100 border-neutral-200 dark:border-neutral-800">
      <Compare
        firstImage="https://voocgavdbpy2gucg.public.blob.vercel-storage.com/portfolio/image%20%283%29-9ohWXR6mPsqfP9GC3OXB6l23pKXqpS.png"
        secondImage="https://voocgavdbpy2gucg.public.blob.vercel-storage.com/portfolio/image%20%284%29-Z38KH4uoJOoyhY6YDXVDNxRu8uWZUS.png"
        firstImageClassName="object-cover object-left-top"
        secondImageClassname="object-cover object-left-top"
        className="h-[200px] sm:h-[250px] md:h-[400px] lg:h-[500px] w-full"
        slideMode="hover"
      />
    </div>
  );
}

export const Title = memo(() => {
  return (
    <h1 className="flex flex-row sm:flex-col items-center sm:items-start text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight sm:my-6 dark:text-zinc-300 text-zinc-700 gap-2">
      <TypeWriter text="I'm" />
      <Cover>
        <TypeWriter text="Nathan Phan" />
      </Cover>
    </h1>
  );
});

Title.displayName = 'Title';
