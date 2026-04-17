'use client';

import { motion } from 'motion/react';

interface StatusBarProps {
  scrollProgress: number;
}

export const StatusBar = ({ scrollProgress }: StatusBarProps) => (
  <>
    <div className="absolute bottom-3 md:bottom-10 left-4 md:left-10 flex items-center gap-4">
      <span className="text-[10px] font-mono text-white/30">
        {Math.round(scrollProgress * 100)}%
      </span>
      <div className="w-40 h-0.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-blue-500"
          initial={false}
          animate={{ width: `${scrollProgress * 100}%` }}
        />
      </div>
      <p className="text-[10px] text-white/30 uppercase font-black tracking-widest leading-none">
        Celestial Map Active
      </p>
    </div>

    <div className="absolute bottom-10 left-4 md:left-1/2 md:-translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
      <p className="text-[8px] font-black uppercase tracking-[0.3em] text-white">
        Use Mouse Wheel or Navigation to Traverse
      </p>
    </div>
  </>
);
