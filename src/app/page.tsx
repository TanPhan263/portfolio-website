import { HomeClient } from '@/components/home/home-client';
import getQueryClient from '@/shared/query-client';
import { ExperienceService } from '@/shared/services';
import HomeService from '@/shared/services/home-service';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function Home() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['home-page'],
    queryFn: () => HomeService.getHomeContent(),
    staleTime: 5 * 60 * 1000
  });
  await queryClient.prefetchQuery({
    queryKey: ['experience-page'],
    queryFn: () => ExperienceService.getExperienceContent(),
    staleTime: 5 * 60 * 1000
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeClient />
    </HydrationBoundary>
  );
}
