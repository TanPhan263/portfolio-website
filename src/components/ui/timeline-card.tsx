'use client';
import { cn } from '@/app/lib/utils';
import { ProjectTimelineItem, StackBrand } from '@/shared/data/experience';
import { IconCheckbox } from '@tabler/icons-react';
import { motion, Variants } from 'motion/react';
import { Badge } from './badge';

interface TimelineCardProps {
  data: ProjectTimelineItem;
}

export function TimelineCard({ data }: TimelineCardProps) {
  return (
    <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
      <div className="border-0.75 relative flex h-full flex-col gap-4 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
        {/* Year + Title */}
        <div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-black dark:text-white">
            {data.title}
          </h3>
        </div>

        {/* Summary */}
        <p className="text-sm md:text-base text-neutral-700 dark:text-neutral-300">
          {data.summary}
        </p>

        {/* Description */}
        <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400">
          {data.description}
        </p>

        {/* Stacks */}
        <div>
          <h4 className="text-md font-semibold mb-2">Tech Stacks</h4>
          <div className="flex flex-wrap gap-2">
            <KeySkills skills={data.stacks} />
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h4 className="text-md font-semibold mb-2">Achievements</h4>
          <ul className="pl-3 space-y-1 text-sm md:text-base text-neutral-700 dark:text-neutral-300 list-none">
            {data.achievements.map((ach, idx) => (
              <li key={idx} className="flex items-start gap-1">
                <IconCheckbox className="mr-2 shrink-0" />
                {ach}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const KeySkills = ({ skills }: { skills: StackBrand[] }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // Animation variants for individual skill badges
  const badgeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    }
  };

  return (
    <motion.div
      className="flex flex-wrap gap-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {skills.map((skill, index) => (
        <motion.div
          key={index}
          variants={badgeVariants as Variants}
          whileHover={{
            scale: 1.1,
            boxShadow:
              '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            y: -5
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <Badge
            className={cn(
              'px-3 py-1 cursor-pointer dark:bg-gray-700 dark:text-gray-200 duration-300',
              `outline-[${skill.darkColor}] transition hover:outline-2`
            )}
          >
            {skill.name}
          </Badge>
        </motion.div>
      ))}
    </motion.div>
  );
};
