'use client';

import React, { forwardRef, useRef } from 'react';

import { AnimatedBeam } from '@/components/magicui/animated-beam';
import AppImage from '@/components/ui/app-image';
import { cn, getCloudinaryUrl } from '@/shared/utils/common';
import { IconBrandFigma, IconUser } from '@tabler/icons-react';

const Circle = forwardRef<HTMLDivElement, { className?: string; children?: React.ReactNode }>(
  ({ className, children }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'z-10 flex size-12 items-center justify-center rounded-full border-2 border-border bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]',
          className
        )}
      >
        {children}
      </div>
    );
  }
);

Circle.displayName = 'Circle';

export function AnimatedBeamConvert({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cn(
        'relative flex h-full w-full items-center justify-center overflow-hidden p-10',
        className
      )}
      ref={containerRef}
    >
      <div className="flex size-full max-w-lg flex-row items-stretch justify-between gap-10">
        <div className="flex flex-col justify-center">
          <Circle ref={div6Ref}>
            <IconUser className="text-black h-6 w-6" />
          </Circle>
        </div>
        <div className="flex flex-col justify-center">
          <Circle ref={div5Ref} className="size-16">
            <IconBrandFigma className="text-[#F32E1E] h-6 w-6" />
          </Circle>
        </div>
        <div className="flex flex-col justify-center gap-2">
          <Circle ref={div1Ref}>
            <AppImage height={32} width={32} src={getCloudinaryUrl('html')} alt="html" />
          </Circle>
          <Circle ref={div2Ref}>
            <AppImage height={32} width={32} src={getCloudinaryUrl('css')} alt="css" />
          </Circle>
          <Circle ref={div3Ref}>
            <AppImage height={32} width={32} src={getCloudinaryUrl('js-logo')} alt="javasrcipt" />
          </Circle>
          <Circle ref={div4Ref}>
            <AppImage height={32} width={32} src={getCloudinaryUrl('ts-logo')} alt="typescript" />
          </Circle>
        </div>
      </div>

      <AnimatedBeam containerRef={containerRef} fromRef={div1Ref} toRef={div5Ref} />
      <AnimatedBeam containerRef={containerRef} fromRef={div2Ref} toRef={div5Ref} />
      <AnimatedBeam containerRef={containerRef} fromRef={div3Ref} toRef={div5Ref} />
      <AnimatedBeam containerRef={containerRef} fromRef={div4Ref} toRef={div5Ref} />
      <AnimatedBeam containerRef={containerRef} fromRef={div5Ref} toRef={div6Ref} />
    </div>
  );
}
