'use client';

import { Timeline } from '@/components/ui/timeline';
import useExperiencePage from '@/shared/hooks/queries/useExperiences';

function TimelineSkeleton() {
  return (
    <div className="w-full px-4">
      <div className="max-w-7xl mx-auto py-6 px-4">
        <div className="h-8 w-80 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse mb-4" />
        <div className="h-4 w-96 max-w-full bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
      </div>
      <div className="max-w-7xl mx-auto pb-10 md:pb-20 space-y-8">
        {[1, 2, 3].map((i) => (
          <div key={`experience_${i}`} className="flex gap-4 md:gap-6">
            <div className="flex flex-col items-center shrink-0 pl-3.25">
              <div className="h-6 w-6 rounded-full bg-neutral-200 dark:bg-neutral-800 animate-pulse ml-2" />
            </div>
            <div className="w-full pr-4 md:pr-0">
              <div className="rounded-2xl border p-2 md:p-3 space-y-3">
                <div className="h-6 w-48 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
                <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
                <div className="h-48 md:h-64 w-full bg-neutral-200 dark:bg-neutral-800 rounded-xl animate-pulse" />
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4].map((j) => (
                    <div
                      key={j}
                      className="h-6 w-16 bg-neutral-200 dark:bg-neutral-800 rounded-full animate-pulse"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ExperienceTimeline() {
  const { data, isLoading } = useExperiencePage();
  if (isLoading) return <TimelineSkeleton />;
  return (
    <div className="w-full h-full">
      <Timeline data={data || []} />
    </div>
  );
}
