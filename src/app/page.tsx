import { FullScreen } from '@/components/full-screen';
import { MyInformation } from '@/containers/about-me';

import { MyUniverse } from '@/containers/my-universe';
import { PersonalInterests } from '@/containers/personal-interests';
import { ExperienceTimeline } from './experience/containers/experience-timeline';

export default function Home() {
  return (
    <div>
      <FullScreen className="w-full xl:w-[85%] mx-auto">
        <MyUniverse />
      </FullScreen>

      <FullScreen className="w-full xl:w-[85%] mx-auto flex flex-col gap-6">
        <MyInformation />
      </FullScreen>

      <FullScreen>
        <ExperienceTimeline />
      </FullScreen>

      <div className="my-10">
        <PersonalInterests />
      </div>

      {/* <Resume /> */}
    </div>
  );
}
