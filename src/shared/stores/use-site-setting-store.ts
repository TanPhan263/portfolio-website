import { create } from 'zustand';

export type SiteMode = 'normal' | 'universe';

interface SiteSettingState {
  mode: SiteMode;
  setMode: (mode: SiteMode) => void;
  toggleMode: () => void;
  openDrawer: boolean;
  setOpenDrawer: (open: boolean) => void;
}

export const useSiteSettingStore = create<SiteSettingState>((set) => ({
  mode: 'universe', // Defaulting to universe as the user is currently working on it
  setMode: (mode) => set({ mode }),
  toggleMode: () => set((state) => ({
    mode: state.mode === 'normal' ? 'universe' : 'normal'
  })),
  openDrawer: false,
  setOpenDrawer: (open) => set({ openDrawer: open }),
}));
