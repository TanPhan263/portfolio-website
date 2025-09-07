"use client";
import { cn } from "@/app/lib/utils";
import { ProjectTimelineDetail, StackBrand } from "@/shared/data/experience";
import { IconCircleCheck } from "@tabler/icons-react";
import { motion, Variants } from "motion/react";
import { Badge } from "./badge";
import { Safari } from "./safari";
import Iphone15Pro from "../magicui/iphone-15-pro";
import { GlowingEffect } from "./glowing-effect";
interface TimelineCardProps {
  data: ProjectTimelineDetail;
  isActive?: boolean;
  year?: string;
}

export function TimelineCard({ data, isActive, year }: TimelineCardProps) {
  return (
    <>
      {year && (
        <h3
          className={cn(
            "lg:hidden text-2xl -mt-1 text-left font-bold pl-0",
            "transition-colors duration-200 ease-in-out",
            isActive
              ? "text-neutral-800 dark:text-neutral-300"
              : "text-neutral-500 dark:text-neutral-500"
          )}
        >
          {year}
        </h3>
      )}
      <h3
        className={cn(
          "lg:hidden block text-xl mb-2 text-left font-bold",
          isActive
            ? "text-neutral-800 dark:text-neutral-300"
            : "text-neutral-500 dark:text-neutral-500"
        )}
      >
        {data.title}
      </h3>
      <div className="relative h-full rounded-2xl border p-3 md:rounded-3xl md:p-3 mb-4">
        <GlowingEffect
          blur={0}
          borderWidth={3}
          spread={80}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="border-0.75 relative flex h-full flex-col overflow-hidden rounded-xl dark:shadow-[0px_0px_27px_0px_#2D2D2D] group/item">
          
          <div className="p-3 !pb-0">
            <h3 className="hidden lg:block text-lg sm:text-xl md:text-2xl font-semibold text-black dark:text-white">
              {data.title}
            </h3>
            <small className="text-sm md:text-base text-neutral-700 dark:text-neutral-300">
              {data.summary}
            </small>
          </div>

          <div className="relative overflow-hidden p-3 rounded-2xl">
            <Safari
              imageSrc={`/images/experiences${data.imageUrl}`}
              className="hidden md:block left-0 h-auto w-full"
            />
             <Iphone15Pro
              src={`/images/experiences${data.imageUrlMobile}`}
              className="md:hidden left-0 h-auto w-full"
            />
            <div className="absolute top-0 left-0 h-full w-full bg-gray-200/70 dark:bg-neutral-800/80 group-hover/item:translate-y-0 md:-translate-y-full transition-all duration-300 rounded-2xl" />

            <div className="absolute w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] bottom-4 left-4 md:bottom-6 md:left-6 group-hover/item:opacity-100 md:translate-y-8 md:opacity-0 group-hover/item:translate-y-0 transition-all duration-300">
             <h4 className="text-md font-semibold mb-2">Tech Stacks</h4>
              <div className="flex flex-wrap gap-2">
                <KeySkills skills={data.stacks} />
              </div>
              <h4 className="text-md font-semibold mt-2">Achievements</h4>
              <ul className="pl-0 md:pl-3 space-y-1 text-sm md:text-base text-neutral-700 dark:text-neutral-300 list-none">
                {data.achievements.map((ach, idx) => (
                  <li
                    key={"achievements" + idx}
                    className="flex gap-1 md:gap-2"
                  >
                    <IconCircleCheck className="size-4 md:size-5 shrink-0" />
                    <span className="leading-tight">{ach}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const KeySkills = ({ skills }: { skills: StackBrand[] }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  return (
    <motion.div
      className="flex flex-wrap gap-1 md:gap-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name + index}
          variants={badgeVariants as Variants}
          whileHover={{
            scale: 1.1,
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            y: -5,
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Badge
            className={cn(
              "px-3 py-1 cursor-pointer dark:bg-gray-500 dark:text-gray-200 duration-300",
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
