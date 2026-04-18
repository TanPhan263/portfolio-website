'use client';

import { IconSatellite } from '@tabler/icons-react';

export const LoadingScreen = ({ text = '' }: { text?: string }) => (
  <div className="absolute inset-0 bg-black/50 backdrop-blur-2xl flex flex-col items-center justify-center z-100 font-orbitron!">
    <div className="mb-8 text-white/80">
      <IconSatellite size={48} stroke={1.5} />
    </div>

    <div className="relative w-48 h-1 bg-white/10 rounded-full overflow-hidden mb-4">
      <div className="absolute top-0 left-0 h-full w-1/2 bg-blue-500 rounded-full animate-[shimmer_1.5s_ease-in-out_infinite]" />
    </div>

    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 animate-pulse">
      {text}
    </p>
  </div>
);
