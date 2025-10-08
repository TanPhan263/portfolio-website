import { FullScreen } from '@/components/full-screen';
import { MyUniverse } from '@/containers/my-universe';
import { PersonalValuation } from '@/containers/personal-valuation';
import { MyTechStack } from '@/containers/techstacks';
import getQueryClient from '@/shared/query-client';
import HomeService from '@/shared/services/home-service';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function Home() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['home-page'],
    queryFn: () => HomeService.getHomeContent(),
    staleTime: 5 * 60 * 1000
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <FullScreen className="w-full xl:w-[85%] mx-auto">
          <MyUniverse />
        </FullScreen>

        <FullScreen className="w-full xl:w-[85%] mx-auto flex flex-col gap-6">
          <MyTechStack />
        </FullScreen>

        <FullScreen className="w-full xl:w-[85%] mx-auto mt-10">
          <PersonalValuation />
        </FullScreen>
      </div>
    </HydrationBoundary>
  );
}
