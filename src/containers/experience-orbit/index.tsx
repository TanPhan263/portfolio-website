'use client';

import { useCosmosStore } from '@/shared/stores/use-cosmos-store';
import { Suspense, useEffect, useState } from 'react';
import { PLANET_CONFIG } from './config';

import { ComingSoonPage } from '@/components/layout/coming-soon';
import { ExperienceTimeline } from '@/components/ui/experience-timeline';
import { ContactSection } from '../contact';
import { PersonalIntroduction } from '../personal-introduction';
import { PersonalValuation } from '../personal-valuation';
import { MyTechStack } from '../techstacks';

import { useSiteSettingStore } from '@/shared/stores/use-site-setting-store';
import dynamic from 'next/dynamic';

import { useDrawerLock } from './hooks/use-drawer-lock';
import { LoadingScreen } from './hud/loading-screen';
import { PlanetDrawer } from './hud/planet-drawer';
import { PlanetInfo } from './hud/planet-info';
import { StatusBar } from './hud/status-bar';
import { TopControls } from './hud/top-controls';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SECTION_MAP: Record<string, React.ComponentType<any>> = {
  PersonalIntroduction: PersonalIntroduction,
  MyTechStack: MyTechStack,
  PersonalValuation: PersonalValuation,
  ExperienceTimeline: ExperienceTimeline,
  ContactSection: ContactSection,
  CommingSoon: ComingSoonPage
};

const SolarSystemScene = dynamic(
  () => import('./solar-system-scene').then((mod) => mod.SolarSystemScene),
  {
    ssr: false
  }
);

export const ExperienceOrbit = () => {
  const [hasHydrated, setHasHydrated] = useState(false);
  const activePlanet = useCosmosStore((s) => s.activePlanet);
  const scrollProgress = useCosmosStore((s) => s.scrollProgress);
  const isDrawerOpen = useSiteSettingStore((s) => s.openDrawer);
  const setIsDrawerOpen = useSiteSettingStore((s) => s.setOpenDrawer);

  useDrawerLock(isDrawerOpen);
  useEffect(() => {
    setTimeout(() => {
      setHasHydrated(true);
    }, 1000);
  }, []);

  const activeConfig = PLANET_CONFIG[activePlanet];
  const ActiveComponent = SECTION_MAP[activeConfig.section] || null;

  return (
    <section className="relative w-full h-screen overflow-hidden bg-dark select-none">
      {!hasHydrated && <LoadingScreen />}
      <Suspense fallback={<LoadingScreen />}>
        <SolarSystemScene locked={isDrawerOpen} />
      </Suspense>

      {/* HUD LAYER — must be absolute (not fixed) to preserve mix-blend-mode */}
      <div className="absolute inset-0 pointer-events-none z-60 font-orbitron! mix-blend-difference">
        <TopControls />
        <PlanetInfo
          activePlanet={activePlanet}
          isVisible={!isDrawerOpen}
          onExplore={() => setIsDrawerOpen(true)}
        />
        <StatusBar scrollProgress={scrollProgress} />
      </div>

      <PlanetDrawer
        isOpen={isDrawerOpen}
        activePlanet={activePlanet}
        onClose={() => setIsDrawerOpen(false)}
      >
        {ActiveComponent && <ActiveComponent />}
      </PlanetDrawer>
    </section>
  );
};
