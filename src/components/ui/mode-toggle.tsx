'use client';

import { useSiteSettingStore } from '@/shared/stores/use-site-setting-store';
import { cn } from '@/shared/utils/common';
import { IconLayoutGrid, IconRocket } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'motion/react';
import * as React from 'react';

export function ModeToggle({ className }: { className?: string }) {
  const { mode, setMode } = useSiteSettingStore();
  const [hovered, setHovered] = React.useState<string | null>(null);

  const isUniverse = mode === 'universe';

  const handleToggle = () => {
    setMode(isUniverse ? 'normal' : 'universe');
  };

  return (
    <div
      className={cn(
        'group relative flex items-center p-1 border rounded-full cursor-pointer transition-all duration-300',
        className
      )}
      onClick={handleToggle}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: -45, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute left-1/2 -translate-x-1/2 px-3 py-1 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[10px] font-black uppercase tracking-widest rounded-md pointer-events-none whitespace-nowrap shadow-xl"
          >
            {hovered} Mode
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-900 dark:bg-zinc-100 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Moving background slider */}
      <motion.div
        className="absolute h-8 w-8 bg-white dark:bg-zinc-900/80 backdrop-blur-2xl rounded-full shadow-sm z-0"
        initial={false}
        animate={{
          x: isUniverse ? 32 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />

      {/* Normal Mode Icon */}
      <div
        onMouseEnter={() => setHovered('Normal')}
        onMouseLeave={() => setHovered(null)}
        className={cn(
          'relative z-10 flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-300',
          !isUniverse ? 'dark:text-white text-black' : 'text-zinc-500'
        )}
      >
        <IconLayoutGrid size={18} />
      </div>

      {/* Universe Mode Icon */}
      <div
        onMouseEnter={() => setHovered('Universe')}
        onMouseLeave={() => setHovered(null)}
        className={cn(
          'relative z-10 flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-300',
          isUniverse ? 'dark:text-white text-black' : 'text-zinc-500'
        )}
      >
        <IconRocket size={18} />
      </div>
    </div>
  );
}
