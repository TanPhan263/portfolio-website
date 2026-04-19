'use client';
import { BentoCard, BentoGrid } from '@/components/magicui/bento-grid';
import { FigmaLogoIcon } from '@radix-ui/react-icons';
import { ChartLine, Code2, SquareTerminal } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { AnimatedBeamConvert } from './animated-beam-convert';
import { AnimatedListFeatures } from './animated-list-features';
import { MarqueeCleanCode } from './marquee-clean-code';

const LiveChart = dynamic(
  () => import('./lightweight-chart').then(m => m.LiveChart),
  { ssr: false }
);

export function PersonalValuation() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[352px] rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
    );
  }

  return (
    <>
      <BentoGrid className="w-full mx-auto md:auto-rows-[20rem] px-4">
        {items.map(item => (
          <BentoCard key={item.name} {...item} />
        ))}
      </BentoGrid>
    </>
  );
}

const items = [
  {
    name: 'Service',
    description: 'Developing professional responsive websites, Landing pages, and webapplications',
    background: (
      <AnimatedListFeatures className="absolute right-0 top-2 h-[300px] w-full scale-80 border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-90" />
    ),
    className: 'md:col-span-1 order-1',
    Icon: SquareTerminal,
  },
  {
    name: 'Converting',
    description: 'Convert the design into pixel-perfect UI',
    background: (
      <div className="absolute right-0 top-2 w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105">
        <AnimatedBeamConvert />
      </div>
    ),
    className: 'md:col-span-1 order-2',
    Icon: FigmaLogoIcon,
  },
  {
    name: 'Real-Time Data',
    description: 'Integrating live market data streams using WebSocket & TradingView charts',
    background: (
      <div className="absolute inset-0 overflow-hidden mask-[linear-gradient(to_top,transparent_5%,#000_60%)]">
        <LiveChart symbolKey="PAXGUSDT" interval="1m" />
      </div>
    ),
    className: 'md:col-span-1 row-span-2 order-4 md:order-3',
    Icon: ChartLine,
  },
  {
    name: 'Clean Code',
    description: 'Writing mantainable, readable, efficient code and following best practices.',
    background: (
      <MarqueeCleanCode className="absolute right-0 top-2 w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)]" />
    ),
    className: 'md:col-span-2 order-3 md:order-4',
    Icon: Code2,
  },
];
