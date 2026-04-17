import type { PlanetType } from '@/shared/stores/use-cosmos-store';

export type PlanetConfig = {
  radius: number;
  color: string;
  label: string;
  section: string;
  description: string;
  bio: string;
};

export const PLANET_CONFIG: Record<PlanetType, PlanetConfig> = {
  SUN: {
    radius: 0,
    color: '#ffcc33',
    label: 'About Me',
    section: 'MyUniverse',
    description: 'A star at the center, providing energy to the entire system.',
    bio: "Hey, i'm Tan — i build things for the web and lowkey obsess over clean code and good UX."
  },
  MERCURY: {
    radius: 15,
    color: '#A5A5A5',
    label: 'Tech Stack',
    section: 'MyTechStack',
    description: 'Smallest planet, closest to the Sun, with extreme temperatures.',
    bio: 'My go-to stack. not gatekeeping — this is literally what i use to ship.'
  },
  VENUS: {
    radius: 24,
    color: '#E3BB76',
    label: 'Core Values',
    section: 'PersonalValuation',
    description: 'Hottest planet due to a dense, greenhouse-gas-filled atmosphere.',
    bio: 'The stuff I actually care about. No corporate fluff, just real values I live by.'
  },
  EARTH: {
    radius: 36,
    color: '#2271B3',
    label: 'Experiences',
    section: 'ExperienceTimeline',
    description: 'Our home, the only planet known to support life with liquid water.',
    bio: "Places I've been, things I've built. The full arc, no cap."
  },
  MARS: {
    radius: 48,
    color: '#E27B58',
    label: 'Contact Me',
    section: 'ContactSection',
    description: 'The "Red Planet," known for its thin atmosphere, deserts, and extinct volcanoes.',
    bio: 'Slide into my inbox fr. collabs, opportunities, or just vibes — all welcome.'
  },
  JUPITER: {
    radius: 68,
    color: '#D39C7E',
    label: 'Comming Soon',
    section: 'CommingSoon',
    description: 'The largest planet, a gas giant with 95+ moons and a famous "Great Red Spot" storm.',
    bio: 'Something big is cooking here. Stay tuned fr fr.'
  },
  SATURN: {
    radius: 90,
    color: '#C5AB6E',
    label: 'Comming Soon',
    section: 'CommingSoon',
    description: 'Famous for its extensive, bright ring system and 146+ moons.',
    bio: "Still loading... but trust, it's gonna hit different."
  },
  URANUS: {
    radius: 110,
    color: '#B5E3E3',
    label: 'Comming Soon',
    section: 'CommingSoon',
    description: 'An ice giant that rotates on its side, with a faint ring system.',
    bio: 'Doing its own thing, unbothered. New content incoming, no rush.'
  },
  NEPTUNE: {
    radius: 130,
    color: '#6081FF',
    label: 'Comming Soon',
    section: 'CommingSoon',
    description: 'The coldest and farthest planet, known for high-speed winds and deep blue color.',
    bio: "Deep in the sauce rn. Launching when it's ready, not before."
  },
  PLUTO: {
    radius: 150,
    color: '#CFA78E',
    label: 'Comming Soon',
    section: 'CommingSoon',
    description: 'A dwarf planet in the Kuiper belt, known for its icy surface.',
    bio: "Yeah Pluto's a dwarf planet, and this section is still a wip. Respect the process."
  }
};

export const PLANET_ORDER: PlanetType[] = [
  'SUN',
  'MERCURY',
  'VENUS',
  'EARTH',
  'MARS',
  'JUPITER',
  'SATURN',
  'URANUS',
  'NEPTUNE',
  'PLUTO'
];

export const ZOOM_MIN = 0.3;
export const ZOOM_MAX = 3.0;
