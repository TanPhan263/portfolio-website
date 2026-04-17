'use client';

import type { PlanetType } from '@/shared/stores/use-cosmos-store';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer';
import { IconX } from '@tabler/icons-react';
import { PLANET_CONFIG } from '../config';

interface PlanetDrawerProps {
  isOpen: boolean;
  activePlanet: PlanetType;
  onClose: () => void;
  children?: React.ReactNode;
}

export const PlanetDrawer = ({
  isOpen,
  activePlanet,
  onClose,
  children
}: PlanetDrawerProps) => {
  const config = PLANET_CONFIG[activePlanet];

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => { if (!open) onClose(); }}
      direction="right"
    >
      <DrawerContent className="w-full! md:w-fit max-w-4xl! z-60 dark:bg-dark/50 backdrop-blur-xl border-l border-white/10 shadow-2xl overflow-y-auto overflow-x-hidden sm:max-w-none! font-orbitron!">
        <div className="flex flex-col min-h-full p-0 md:p-6">
          <DrawerHeader className="flex flex-row items-center justify-between mb-10 pb-4 border-b border-white/10">
            <DrawerTitle className="text-2xl font-black text-white uppercase tracking-widest">
              {config.label}
            </DrawerTitle>
            <DrawerClose
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
            >
              <IconX size={20} />
            </DrawerClose>
          </DrawerHeader>

          <div className="flex-1 space-y-4 mt-4 overflow-x-hidden">
            {children}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
