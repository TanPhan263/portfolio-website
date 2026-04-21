'use client';

import { motion } from 'motion/react';
import React, { useMemo } from 'react';

import { Marquee } from '@/components/magicui/marquee';
import AppImage from '@/components/ui/app-image';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { IconCloud } from '@/components/ui/icon-cloud';
import { SocialCard } from '@/components/ui/social-card';
import useHomePage from '@/shared/hooks/queries/useHomePage';
import { getCloudinaryUrl } from '@/shared/utils/common';

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

const TechItem = React.memo(({ url, name }: { url: string; name: string }) => (
  <div className="relative p-4 overflow-hidden rounded-2xl border border-dark/30 bg-blue-950/5 backdrop-blur-md transition-all duration-300 hover:bg-dark-900/20 hover:scale-110 group shrink-0">
    <AppImage
      className="rounded-lg h-[60px] w-[60px] md:h-[100px] md:w-[100px] object-contain transition-all duration-500"
      src={url}
      alt={name}
      width={100}
      height={100}
      loading="lazy"
    />
  </div>
));

TechItem.displayName = 'TechItem';

export function MyTechStackMarquee() {
  const { data } = useHomePage();

  const rows = useMemo(() => {
    const socials = data?.socials;
    if (!socials || socials.length === 0)
      return { first: [], second: [], third: [] };

    const allImages = socialPosts.flatMap((_, index) => {
      const mappedIndex = index === 0 ? 0 : index < 3 ? 1 : 2;
      return socials[mappedIndex]?.images || [];
    });

    const techData = allImages.map((img) => ({
      name: img,
      url: getCloudinaryUrl(img)
    }));

    const size = Math.ceil(techData.length / 3);
    return {
      first: techData.slice(0, size),
      second: techData.slice(size, size * 2),
      third: techData.slice(size * 2)
    };
  }, [data]);

  if (rows.first.length === 0) return null;

  return (
    <div className="relative max-w-[100vw] flex w-full flex-col items-center justify-center overflow-hidden gap-4 py-8">
      <div className="flex flex-col">
        <Marquee pauseOnHover className="[--duration:40s]" repeat={3}>
          {rows.first.map((item, i) => (
            <TechItem
              key={`r1-${item.name}-${i}`}
              url={item.url}
              name={item.name}
            />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:50s]" repeat={3}>
          {rows.second.map((item, i) => (
            <TechItem
              key={`r2-${item.name}-${i}`}
              url={item.url}
              name={item.name}
            />
          ))}
        </Marquee>
        <Marquee pauseOnHover className="[--duration:45s]" repeat={3}>
          {rows.third.map((item, i) => (
            <TechItem
              key={`r3-${item.name}-${i}`}
              url={item.url}
              name={item.name}
            />
          ))}
        </Marquee>
      </div>
    </div>
  );
}

export function MyTechStackIconCloud() {
  const { data } = useHomePage();

  const images = useMemo(() => {
    const socials = data?.socials;
    if (!socials || socials.length === 0) return [];

    const allImages = socialPosts.flatMap((_, index) => {
      const mappedIndex = index === 0 ? 0 : index < 3 ? 1 : 2;
      return socials[mappedIndex]?.images || [];
    });

    const techData = allImages.map((img) => getCloudinaryUrl(img));

    return techData;
  }, [data]);

  if (images?.length === 0) return null;
  return <IconCloud images={images} />;
}
