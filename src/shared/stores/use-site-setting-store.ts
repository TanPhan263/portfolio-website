import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type SiteMode = 'normal' | 'universe';

interface SiteSettingState {
  mode: SiteMode;
  setMode: (mode: SiteMode) => void;
  toggleMode: () => void;
  openDrawer: boolean;
  setOpenDrawer: (open: boolean) => void;
}

export const useSiteSettingStore = create<SiteSettingState>()(
  persist(
    (set) => ({
      mode: 'universe',
      setMode: (mode) => set({ mode }),
      toggleMode: () => set((state) => ({
        mode: state.mode === 'normal' ? 'universe' : 'normal',
      })),
      openDrawer: false,
      setOpenDrawer: (open) => set({ openDrawer: open }),
    }),
    {
      name: 'site-setting-store',
      partialize: (state) => ({ mode: state.mode }), // openDrawer always resets on reload
    }
  )
);
