'use client';

import type { PlanetType } from '@/shared/stores/use-cosmos-store';
import { AnimatePresence, motion } from 'motion/react';
import { IconChevronRight } from '@tabler/icons-react';
import { PLANET_CONFIG, PLANET_ORDER } from '../config';

interface PlanetInfoProps {
  activePlanet: PlanetType;
  isVisible: boolean;
  onExplore: () => void;
}

export const PlanetInfo = ({ activePlanet, isVisible, onExplore }: PlanetInfoProps) => {
  const config = PLANET_CONFIG[activePlanet];
  const planetIndex = PLANET_ORDER.indexOf(activePlanet) + 1;

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key={activePlanet}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="absolute bottom-20 right-4 md:right-10 text-right pointer-events-none"
        >
          <div className="flex flex-col items-end gap-4">
            {/* Planet index counter */}
            <div className="flex items-center gap-2">
              <div className="w-12 h-px bg-white/15" />
              <p className="text-[9px] tracking-[0.4em] text-white/40 uppercase">
                {String(planetIndex).padStart(2, '0')}&nbsp;/&nbsp;
                {String(PLANET_ORDER.length).padStart(2, '0')}
              </p>
            </div>

            {/* Section title */}
            <h3 className="text-2xl md:text-4xl lg:text-5xl font-light text-white uppercase tracking-widest leading-none">
              {config.label}
            </h3>

            {/* Accent indicator */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse" />
              <div className="w-10 h-px bg-white/40" />
            </div>

            {/* Bio */}
            <p className="text-white/60 text-[10px] font-light leading-relaxed tracking-wide max-w-52">
              {config.bio}
            </p>

            {/* CTA */}
            <button
              onClick={onExplore}
              className="pointer-events-auto group mt-2 inline-flex items-center gap-2.5 border border-white/20 hover:border-white/50 px-4 py-2 text-white/60 hover:text-white text-[9px] uppercase tracking-[0.3em] transition-all duration-300"
            >
              Explore
              <IconChevronRight
                size={11}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
