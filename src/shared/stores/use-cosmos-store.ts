import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type PlanetType = 'SUN' | 'MERCURY' | 'VENUS' | 'EARTH' | 'MARS' | 'JUPITER' | 'SATURN' | 'URANUS' | 'NEPTUNE' | 'PLUTO';

interface CosmosState {
  activePlanet: PlanetType;
  setActivePlanet: (planet: PlanetType) => void;
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;
}

export const useCosmosStore = create<CosmosState>()(
  persist(
    (set) => ({
      activePlanet: 'SUN',
      setActivePlanet: (planet) => set({ activePlanet: planet }),
      scrollProgress: 0,
      setScrollProgress: (progress) => set({ scrollProgress: progress }),
    }),
    {
      name: 'cosmos-store',
    }
  )
);
