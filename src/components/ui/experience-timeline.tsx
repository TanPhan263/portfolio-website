import { Timeline } from '@/components/ui/timeline';
import { PROJECT_TIMELINE } from '@/shared/data/experience';
// import BlurImage from "next/image"

export function ExperienceTimeline() {
  return (
    <div className="w-full h-full">
      <Timeline data={PROJECT_TIMELINE} />
    </div>
  );
}
