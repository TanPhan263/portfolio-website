'use client';

import { Timeline } from '@/components/ui/timeline';
import useExperiencePage from '@/shared/hooks/queries/useExperiences';

export function ExperienceTimeline() {
  const { data, isLoading } = useExperiencePage();
  if (isLoading) return <></>;
  return (
    <div className="w-full h-full">
      <Timeline data={data || []} />
    </div>
  );
}
