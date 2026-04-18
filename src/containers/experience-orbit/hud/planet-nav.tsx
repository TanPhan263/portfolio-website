'use client';

import { PlanetType, useCosmosStore } from '@/shared/stores/use-cosmos-store';
import { cn } from '@/shared/utils/common';
import { PLANET_ORDER } from '../config';

const PlanetNavItem = ({
  type,
  index,
  onFocus
}: {
  type: PlanetType;
  index: number;
  onFocus: (i: number) => void;
}) => {
  const isActive = useCosmosStore((s) => s.activePlanet === type);

  return (
    <button
      onClick={() => onFocus(index)}
      className="flex items-center gap-3 group cursor-pointer py-2 focus:outline-none"
    >
      {/* Index number */}
      <span
        className={cn(
          'text-[8px] tabular-nums w-4 text-right transition-colors duration-300 mix-blend-difference',
          isActive ? 'text-blue-400' : 'text-white/20 group-hover:text-white/40'
        )}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Tick line — active glows, inactive is subtle */}
      <div
        className={cn(
          'h-px rounded-full transition-all duration-500',
          isActive
            ? 'w-6 bg-blue-400 shadow-[0_0_8px_2px_rgba(96,165,250,0.6)]'
            : 'w-2 bg-white/20 group-hover:w-4 group-hover:bg-white/40'
        )}
      />

      {/* Planet name */}
      <span
        className={cn(
          'text-[10px] font-black uppercase tracking-[0.25em] transition-all duration-300 mix-blend-difference',
          isActive
            ? 'text-white'
            : 'text-white/25 group-hover:text-white/60'
        )}
      >
        {type}
      </span>
    </button>
  );
};

export const PlanetNav = ({ onFocus }: { onFocus: (i: number) => void }) => (
  <div className="absolute top-10 md:top-1/2 left-6 md:left-8 md:-translate-y-1/2 z-50 pointer-events-auto font-orbitron! flex flex-col">
    {/* Vertical track */}
    <div className="absolute left-[1.1rem] top-0 bottom-0 w-px bg-white/5" />

    {PLANET_ORDER.map((type, i) => (
      <PlanetNavItem key={type} type={type} index={i} onFocus={onFocus} />
    ))}
  </div>
);
