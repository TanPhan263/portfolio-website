'use client';

import { ModeToggle } from '@/components/ui/mode-toggle';
import { IconBrandGithub, IconCoffee } from '@tabler/icons-react';

export const TopControls = () => (
  <div className="absolute top-10 right-4 md:right-10 flex flex-col md:flex-row items-center gap-4 pointer-events-auto">
    <ModeToggle />

    <div className="hidden md:block h-10 w-px bg-white/10 mx-2" />

    <a
      href="https://github.com/TanPhan263/portfolio-website"
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white/70 hover:text-white transition-all backdrop-blur-md hover:scale-110 active:scale-95"
      title="GitHub"
    >
      <IconBrandGithub size={20} stroke={1.5} />
    </a>

    {/* <a
      href="https://buymeacoffee.com/nathanphan"
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/20 rounded-full text-yellow-500/70 hover:text-yellow-500 transition-all backdrop-blur-md hover:scale-110 active:scale-95"
      title="Buy me a coffee"
    >
      <IconCoffee size={20} stroke={1.5} />
    </a> */}
  </div>
);
