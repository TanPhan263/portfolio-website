'use client';

import { ContactSection } from '@/containers/contact-section';
import { ExperienceOrbit } from '@/containers/experience-orbit';
import { MyUniverse } from '@/containers/my-universe';
import { PersonalValuation } from '@/containers/personal-valuation';
import { MyTechStack } from '@/containers/techstacks';
import { ExperienceTimeline } from '@/components/ui/experience-timeline';
import { FullScreen } from '@/components/full-screen';
import { useSiteSettingStore } from '@/shared/stores/use-site-setting-store';

export function HomeClient() {
  const mode = useSiteSettingStore((s) => s.mode);

  return (
    <>
      {mode === 'universe' ? (
        <ExperienceOrbit />
      ) : (
        <div className="flex flex-col gap-20 py-20 pb-40">
          <FullScreen className="w-full xl:w-[85%] mx-auto">
            <MyUniverse />
          </FullScreen>

          <FullScreen className="w-full xl:w-[85%] mx-auto">
            <MyTechStack />
          </FullScreen>

          <FullScreen className="w-full xl:w-[85%] mx-auto">
            <PersonalValuation />
          </FullScreen>

          <FullScreen className="w-full xl:w-[85%] mx-auto">
            <ExperienceTimeline />
          </FullScreen>

          <FullScreen className="w-full xl:w-[85%] mx-auto">
            <ContactSection />
          </FullScreen>
        </div>
      )}
    </>
  );
}
