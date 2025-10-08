'use client';
import { IExperience } from '@/shared/services/experience-service/dto';
import { cn } from '@/shared/utils/common';
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import { Fragment, RefObject, useEffect, useRef, useState } from 'react';
import { TimelineCard } from './timeline-card';

export const Timeline = ({ data }: { data: IExperience[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  // Improve the height calculation with a resize observer
  useEffect(() => {
    if (!ref.current) return;

    const updateHeight = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setHeight(rect.height);
      }
    };

    // Initial calculation
    updateHeight();

    // Set up resize observer to handle window resizing
    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(ref.current);

    return () => {
      if (ref.current) resizeObserver.unobserve(ref.current);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 20%', 'end 80%']
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full md:px-10 overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto py-6 px-4">
        <h2 className="text-2xl md:text-4xl mb-4 text-black dark:text-white max-w-4xl font-bold">
          My Journey as a Frontend Developer
        </h2>
        <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-3xl italic">
          After graduating from university, I began my journey as an intern at a
          small outsourcing company, taking the first steps in my career.
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-10 md:pb-20">
        {data.map((item, index) => {
          return (
            <Fragment key={`${item.year}_${index}`}>
              <TimelineItem
                key={`${item.year}_${index}`}
                data={item}
                heightTransform={heightTransform}
                containerRef={containerRef}
              />
            </Fragment>
          );
        })}
        <div
          style={{
            height: height + 'px'
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

function TimelineItem({
  data,
  heightTransform,
  containerRef
}: {
  data: IExperience;
  heightTransform: MotionValue<number>;
  containerRef: RefObject<HTMLDivElement | null>;
}) {
  const [startAnimation, setStartAnimation] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !containerRef.current) return;
    const unsubscribe = heightTransform.on('change', (value) => {
      if (!ref.current || !containerRef.current) return;
      const relativeTop = ref.current.offsetTop;

      requestAnimationFrame(() => {
        setStartAnimation(value >= relativeTop && value > 0);
      });
    });
    return () => {
      unsubscribe();
    };
  }, [heightTransform, containerRef]);

  return (
    <div
      key={data.year}
      ref={ref}
      className="relative flex justify-start lg:justify-between pb-10 gap-4 lg:gap-0"
    >
      <div className="pl-[13px] sticky flex flex-col md:flex-row shrink-0 z-40 items-center self-start max-w-xs lg:max-w-1/4 lg:w-full xl:max-w-sm">
        <div
          className={cn(
            'h-6 w-6 rounded-full shrink-0 border ml-2 transition duration-200 ease-in-out',
            startAnimation
              ? 'from-purple-500 from-30% to-blue-500 bg-radial border-none'
              : 'bg-white dark:bg-black border-neutral-700 dark:border-neutral-700'
          )}
        />
        <h3
          className={cn(
            'hidden lg:block text-2xl lg:text-3xl mb-4 md:mb-0 text-left font-bold pl-0 md:pl-5',
            'transition-colors duration-200 ease-in-out',
            startAnimation
              ? 'text-neutral-800 dark:text-neutral-300'
              : 'text-neutral-500 dark:text-neutral-500'
          )}
        >
          {data.year}
        </h3>
      </div>

      <div className="relative w-full lg:min-w-3/4 xl:min-w-1/2 max-w-[750px] pr-4 md:pr-0">
        {data?.projects.map((project, index) => (
          <motion.div
            key={project.title.replaceAll(' ', '') + '_' + index}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
          >
            <TimelineCard
              data={project}
              isActive={startAnimation}
              year={index === 0 ? data.year : undefined}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
