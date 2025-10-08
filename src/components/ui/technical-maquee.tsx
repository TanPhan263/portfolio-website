'use client';

import { Marquee } from '@/components/magicui/marquee';
import { cn } from '@/shared/utils/common';
import Image from 'next/image';
import { useCallback } from 'react';

export function TechnicalMarquee({
  className,
  images,
  transform = 'translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)'
}: {
  className?: string;
  transform?: string;
  images: string[];
}) {
  const renderImage = useCallback((image: string, index: number) => {
    return (
      <div
        key={`marquee-vertical${index}-${image}`}
        className="relative p-4 overflow-hidden rounded-xl border border-blue-900"
      >
        <Image
          className="rounded-lg min-h-[80px] min-w-[80px]"
          height={100}
          width={100}
          src={image}
          unoptimized
          alt="techstack marquee image"
        />
      </div>
    );
  }, []);

  const firstRow = images.slice(0, images.length / 3);
  const secondRow = images.slice(images.length / 3, (images.length * 2) / 3);
  const lastRow = images.slice((images.length * 2) / 3, images.length);
  return (
    <div
      className={cn(
        'relative flex h-96 w-full flex-row items-center justify-center gap-4 overflow-hidden [perspective:300px]',
        className
      )}
    >
      <div
        className="flex flex-row items-center gap-4"
        style={{
          transform: transform
        }}
      >
        <Marquee className="[--duration:20s]" vertical>
          {firstRow.map((image, i) => renderImage(image, i))}
        </Marquee>
        <Marquee className="[--duration:20s]" reverse vertical>
          {secondRow.map((image, i) => renderImage(image, i))}
        </Marquee>
        <Marquee className="[--duration:20s]" vertical>
          {lastRow.map((image, i) => renderImage(image, i))}
        </Marquee>
      </div>
    </div>
  );
}
