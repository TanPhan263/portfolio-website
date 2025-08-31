'use client';
import { ProjectTimelineItem } from '@/shared/data/experience';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { TimelineCard } from './timeline-card';

export const Timeline = ({ data }: { data: ProjectTimelineItem[] }) => {
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
      <div className="max-w-7xl mx-auto py-6 px-4 md:px-8 lg:px-10">
        <h2 className="text-2xl md:text-4xl mb-4 text-black dark:text-white max-w-4xl font-bold">
          My Journey as a Frontend Developer
        </h2>
        <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-3xl italic">
          After graduating from university, I began my journey as an intern at a
          small outsourcing company, taking the first steps in my career.
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <TimelineItem key={`${item.year}_${index}`} data={item} />
        ))}
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

function TimelineItem({ data }: { data: ProjectTimelineItem }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 40%', 'end end']
  });

  const processCircle: React.CSSProperties = {
    strokeDashoffset: 0,
    strokeWidth: 7,
    fill: 'none'
  };

  const progressIcon: React.CSSProperties = {
    ...processCircle,
    transform: 'rotate(-90deg)',
    stroke: '#c27aff'
  };

  const progressIconIndicator: React.CSSProperties = {
    ...processCircle,
    strokeDashoffset: 0,
    strokeWidth: 7,
    fill: 'none'
  };

  const progressIconBg: React.CSSProperties = {
    opacity: 0.2
  };

  return (
    <div
      key={data.year}
      ref={ref}
      className="relative flex justify-start pt-10 md:gap-0"
    >
      <div className="pl-[13px] sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
        <figure className="bg-white dark:bg-black rounded-full">
          <svg
            style={progressIcon}
            width="40"
            height="40"
            viewBox="0 0 100 100"
          >
            <circle
              style={progressIconBg}
              cx="50"
              cy="50"
              r="30"
              pathLength="1"
              className="bg"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="30"
              pathLength="1"
              style={{
                ...progressIconIndicator,
                pathLength: scrollYProgress
              }}
            />
          </svg>
        </figure>

        <h3 className="hidden md:block text-2xl lg:text-4xl mb-4 md:mb-0 text-left font-bold text-neutral-500 dark:text-neutral-500 pl-0 md:pl-5  ">
          {data.year}
        </h3>
      </div>

      <div className="relative pl-4 pr-4 md:pl-4 w-full">
        <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
          {data.title}
        </h3>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true
          }}
        >
          <TimelineCard data={data} />
        </motion.div>
      </div>
    </div>
  );
}
