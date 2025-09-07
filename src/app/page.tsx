import { FullScreen } from '@/components/full-screen';
import { MyInformation } from '@/containers/about-me';
import { MyUniverse } from '@/containers/my-universe';
import { PersonalValuation } from '@/containers/personal-valuation';

export default function Home() {
  return (
    <div>
      <FullScreen className="w-full xl:w-[85%] mx-auto">
        <MyUniverse />
      </FullScreen>

      <FullScreen className="w-full xl:w-[85%] mx-auto flex flex-col gap-6">
        <MyInformation />
      </FullScreen>

      <FullScreen className="w-full xl:w-[85%] mx-auto mt-10">
        <PersonalValuation />
      </FullScreen>

      {/* <Resume /> */}
    </div>
  );
}
