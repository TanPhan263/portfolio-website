'use client';

import { Badge } from '@/components/ui/badge';
import { StackBrand, stacks } from '@/shared/data/experience';
import useExperiencePage from '@/shared/hooks/queries/useExperiences';
import { IProject } from '@/shared/services/experience-service/dto';
import { getCloudinaryUrl } from '@/shared/utils/common';
import { IconChevronRight, IconCircleCheck, IconX } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import AppImage from './app-image';
import { Safari } from './safari';

function TimelineSkeleton() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="animate-pulse flex space-x-4">
        <div className="h-4 w-4 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
        <div className="h-4 w-4 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
        <div className="h-4 w-4 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
      </div>
    </div>
  );
}

interface ProjectData extends IProject {
  year: string;
}

const KeySkills = ({ skills }: { skills: StackBrand[] }) => (
  <div className="flex flex-wrap gap-1 md:gap-2">
    {skills.map((skill, index) => (
      <Badge
        key={skill.name + index}
        style={{ outlineColor: skill.color }}
        className="px-3 py-1 cursor-pointer dark:bg-gray-500 dark:text-gray-200 duration-300 transition hover:outline-2"
      >
        {skill.name}
      </Badge>
    ))}
  </div>
);

const DetailsModal = ({
  project,
  setSelectedProject,
}: {
  project: ProjectData;
  setSelectedProject: (project: ProjectData | null) => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={() => setSelectedProject(null)}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="bg-white dark:bg-[#0f0f0f] border border-neutral-200 dark:border-neutral-800 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white backdrop-blur-md transition-colors"
          onClick={() => setSelectedProject(null)}
        >
          <IconX size={20} />
        </button>

        <div className="relative h-64 md:h-80 w-full shrink-0 bg-neutral-100 dark:bg-neutral-900">
          {project.imageUrl ? (
            <AppImage
              src={getCloudinaryUrl(project.imageUrl)}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 60vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-neutral-500">No Image Available</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0f0f0f] via-transparent to-transparent" />
        </div>

        <div className="p-6 md:p-8 overflow-y-auto">
          <span className="mb-4 inline-block px-3 py-1 bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-widest rounded-full border border-blue-200 dark:border-blue-500/20">
            {project.year}
          </span>
          <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-4">
            {project.title}
          </h3>
          <p className="text-neutral-600 dark:text-neutral-300 mb-8 leading-relaxed text-sm md:text-base">
            {project.summary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.stacks && project.stacks.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-3">
                  Technologies Used
                </h4>
                <KeySkills skills={stacks(...project.stacks)} />
              </div>
            )}
            {project.achievements && project.achievements.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-3">
                  Key Achievements
                </h4>
                <ul className="space-y-2">
                  {project.achievements.map((ach, i) => (
                    <li
                      key={i}
                      className="flex gap-2 text-sm text-neutral-600 dark:text-neutral-300"
                    >
                      <IconCircleCheck className="size-5 text-emerald-500 shrink-0" />
                      <span className="leading-tight">{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export function ExperienceTimeline() {
  const { data, isLoading } = useExperiencePage();
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const projects = useMemo<ProjectData[]>(() => {
    if (!data) return [];
    const flat: ProjectData[] = [];
    [...data]
      .sort((a, b) => Number(b.year) - Number(a.year))
      .forEach(exp => exp.projects.forEach(proj => flat.push({ ...proj, year: exp.year })));
    return flat;
  }, [data]);

  useEffect(() => {
    if (projects.length === 0) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-index'));
            if (!isNaN(idx)) setActiveIndex(idx);
          }
        });
      },
      {
        root: null,
        rootMargin: '-15% 0px -30% 0px',
        threshold: 0,
      }
    );

    imageRefs.current.forEach(el => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [projects]);

  if (isLoading) return <TimelineSkeleton />;
  if (projects.length === 0) return null;

  const active = projects[activeIndex];

  return (
    <>
      <div className="hidden lg:flex flex-col w-full">
        <div className="w-full px-10 mb-12">
          <h2 className="text-5xl font-bold text-black dark:text-white">My Journey</h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-base italic mt-3">
            After graduating from university, I began my journey as an intern at a small outsourcing
            company, taking the first steps in my career.
          </p>
        </div>
        <div className="flex w-full">
          <div className="w-2/5 sticky top-0 h-screen self-start flex flex-col justify-center px-10 shrink-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="flex flex-col"
              >
                <span className="mb-4 text-xs font-semibold px-3 py-1 bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded-md self-start">
                  {active?.year}
                </span>
                <h3 className="text-4xl font-bold text-black dark:text-white leading-tight line-clamp-2 mb-3">
                  {active?.title}
                </h3>
                <p className="text-neutral-500 dark:text-neutral-400 text-base leading-relaxed line-clamp-3">
                  {active?.summary}
                </p>
                <button
                  onClick={() => setSelectedProject(active)}
                  className="mt-3 self-start flex items-center gap-2 px-5 py-2.5 rounded-full border border-neutral-300 dark:border-neutral-700 text-sm font-semibold text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  View project <IconChevronRight size={16} />
                </button>
              </motion.div>
            </AnimatePresence>

            <div className="mt-12 flex items-center gap-2">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() =>
                    imageRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                  className={`rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? 'w-6 h-2 bg-black dark:bg-white'
                      : 'w-2 h-2 bg-neutral-300 dark:bg-neutral-600 hover:bg-neutral-400'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="w-3/5 flex flex-col gap-4 py-4 pr-4 shrink-0">
            {projects.map((proj, i) => (
              <div
                key={i}
                ref={el => {
                  imageRefs.current[i] = el;
                }}
                data-index={i}
                className={`w-3/5 rounded-2xl cursor-pointer transition-all duration-500 ${
                  i === activeIndex
                    ? 'opacity-100 scale-100'
                    : 'opacity-40 hover:opacity-60 scale-90'
                }`}
                onClick={() =>
                  imageRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              >
                {proj.imageUrl ? (
                  <Safari
                    imageSrc={getCloudinaryUrl(proj.imageUrl)}
                    className="object-cover object-center"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-neutral-200 dark:bg-neutral-800">
                    <span className="text-neutral-500">No Image</span>
                  </div>
                )}

                <div className="absolute bottom-4 left-4 px-4 py-2 rounded-xl bg-black/50 backdrop-blur-sm">
                  <p className="text-white text-sm font-semibold">{proj.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:hidden w-full flex flex-col px-4 py-10 gap-10">
        <div className="mb-4">
          <h2 className="text-3xl font-bold text-black dark:text-white">My Journey</h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm italic mt-2">
            My projects over the years.
          </p>
        </div>

        {projects.map((proj, i) => (
          <div
            key={i}
            className="flex flex-col gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-10 last:border-0"
          >
            <div className="w-full h-[30vh] rounded-2xl overflow-hidden relative bg-neutral-100 dark:bg-neutral-900 shadow-lg">
              {proj.imageUrl ? (
                <AppImage
                  src={getCloudinaryUrl(proj.imageUrl)}
                  fill
                  className="object-cover"
                  alt={proj.title}
                  sizes="100vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-neutral-200 dark:bg-neutral-800">
                  <span className="text-neutral-500">No Image</span>
                </div>
              )}
            </div>
            <span className="text-xs font-semibold px-2 py-1 bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded-md self-start">
              {proj.year}
            </span>
            <h3 className="text-2xl font-bold text-black dark:text-white">{proj.title}</h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
              {proj.summary}
            </p>
            <button
              onClick={() => setSelectedProject(proj)}
              className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-semibold self-start"
            >
              View details <IconChevronRight size={18} />
            </button>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <DetailsModal project={selectedProject} setSelectedProject={setSelectedProject} />
        )}
      </AnimatePresence>
    </>
  );
}
