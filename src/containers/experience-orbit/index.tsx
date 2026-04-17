'use client';

import { useCosmosStore } from '@/shared/stores/use-cosmos-store';
import { AnimatePresence, motion } from 'framer-motion';
import { Suspense, useEffect } from 'react';
import { PLANET_CONFIG } from './solar-system-scene';

import { ComingSoonPage } from '@/components/layout/coming-soon';
import { ExperienceTimeline } from '@/components/ui/experience-timeline';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { ContactSection } from '../contact-section';
import { MyUniverse } from '../my-universe';
import { PersonalValuation } from '../personal-valuation';
import { MyTechStack } from '../techstacks';

import { useSiteSettingStore } from '@/shared/stores/use-site-setting-store';
import {
  IconBrandGithub,
  IconChevronRight,
  IconCoffee,
  IconSatellite,
  IconX
} from '@tabler/icons-react';
import dynamic from 'next/dynamic';

const SECTION_MAP: Record<string, React.ComponentType<any>> = {
  MyUniverse: MyUniverse,
  MyTechStack: MyTechStack,
  PersonalValuation: PersonalValuation,
  ExperienceTimeline: ExperienceTimeline,
  ContactSection: ContactSection,
  CommingSoon: ComingSoonPage
};

const LoadingScreen = ({ text = '' }: { text?: string }) => (
  <div className="absolute inset-0 bg-[#152238] flex flex-col items-center justify-center z-100 font-orbitron!">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      className="relative mb-8 text-blue-500"
    >
      <IconSatellite size={48} stroke={1.5} />
      <motion.div
        animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 border-2 border-blue-500/50 rounded-full"
      />
    </motion.div>

    <div className="relative w-48 h-1 bg-white/10 rounded-full overflow-hidden mb-4">
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: '200%' }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 left-0 h-full w-1/2 bg-blue-500 rounded-full"
      />
    </div>

    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 animate-pulse">
      {text}
    </p>
  </div>
);

const SolarSystemScene = dynamic(
  () => import('./solar-system-scene').then((mod) => mod.SolarSystemScene),
  {
    ssr: false,
    loading: () => <LoadingScreen />
  }
);

export const ExperienceOrbit = () => {
  const activePlanet = useCosmosStore((s) => s.activePlanet);
  const scrollProgress = useCosmosStore((s) => s.scrollProgress);
  const setMode = useSiteSettingStore((s) => s.setMode);
  const isDrawerOpen = useSiteSettingStore((s) => s.openDrawer);
  const setIsDrawerOpen = useSiteSettingStore((s) => s.setOpenDrawer);

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isDrawerOpen]);

  const activeConfig = PLANET_CONFIG[activePlanet];
  const ActiveComponent = SECTION_MAP[activeConfig.section] || null;

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#192841] select-none">
      <Suspense fallback={<LoadingScreen />}>
        <SolarSystemScene locked={isDrawerOpen} />
      </Suspense>

      {/* FIXED HUD LAYER */}
      <div className="fixed inset-0 pointer-events-none z-60 font-orbitron!">
        {/* Top Right Controls */}
        <div className="absolute top-10 right-10 flex items-center gap-4 pointer-events-auto">
          {/* Mode Switcher */}
          <ModeToggle />

          {/* Social Links */}
          <div className="h-10 w-px bg-white/10 mx-2" />

          <a
            href="https://github.com/tanphan263"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white/70 hover:text-white transition-all backdrop-blur-md hover:scale-110 active:scale-95"
            title="GitHub"
          >
            <IconBrandGithub size={20} stroke={1.5} />
          </a>

          <a
            href="https://buymeacoffee.com/nathanphan"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/20 rounded-full text-yellow-500/70 hover:text-yellow-500 transition-all backdrop-blur-md hover:scale-110 active:scale-95"
            title="Buy me a coffee"
          >
            <IconCoffee size={20} stroke={1.5} />
          </a>
        </div>

        {/* Global HUD - Content */}
        <AnimatePresence mode="wait">
          {!isDrawerOpen && (
            <motion.div
              key={activePlanet}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute bottom-20 right-10 max-w-sm md:max-w-md text-right pointer-events-none pr-10 border-r border-blue-500/30"
            >
              <div className="space-y-4">
                <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">
                  {activeConfig.label}
                </h3>
                <div className="h-1 w-20 bg-blue-500 ml-auto" />
                <p className="text-[#a1a1aa] text-xs font-medium leading-relaxed tracking-wider ml-auto max-w-50">
                  {activeConfig.bio}
                </p>

                <div className="pointer-events-auto pt-4">
                  <button
                    onClick={() => setIsDrawerOpen(true)}
                    className="group inline-flex items-center gap-2 px-6 py-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-sm transition-all"
                  >
                    View Details
                    <IconChevronRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Drawer */}
        <AnimatePresence>
          {isDrawerOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsDrawerOpen(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
              />
              {/* Drawer Container */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="absolute top-0 right-0 h-full w-full max-w-4xl bg-dark/50 backdrop-blur-xl overflow-y-auto pointer-events-auto border-l border-white/10 shadow-2xl"
              >
                <div className="p-4 md:p-6 flex flex-col min-h-full">
                  <div className="flex items-center justify-between mb-10 pb-4 border-b border-white/10">
                    <h2 className="text-2xl font-black text-white uppercase tracking-widest">
                      {activeConfig.label}
                    </h2>
                    <button
                      onClick={() => setIsDrawerOpen(false)}
                      className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white"
                    >
                      <IconX size={20} />
                    </button>
                  </div>

                  <div className="flex-1 space-y-8 mt-4 overflow-x-hidden">
                    {/* DRAWER DYNAMIC COMPONENT */}
                    {ActiveComponent && <ActiveComponent />}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Status Indicator */}
        <div className="absolute bottom-10 left-10 flex items-center gap-4">
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

        {/* Control Hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <p className="text-[8px] font-black uppercase tracking-[0.3em] text-white">
            Use Mouse Wheel or Navigation to Traverse
          </p>
        </div>
      </div>
    </section>
  );
};
