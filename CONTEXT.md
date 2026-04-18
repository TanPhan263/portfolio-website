# experience-orbit — Implementation Context

A fully interactive 3D solar system built with Three.js inside a Next.js App Router project.  
Each planet maps to a portfolio section. The camera tracks the active planet. Users navigate via scroll wheel, side-nav clicks, or planet clicks. A slide-in drawer reveals section content.

---

## Tech Stack Requirements

| Dependency | Purpose |
|---|---|
| `next` (App Router) | Framework, font loading |
| `react` + `react-dom` | UI layer |
| `three` | 3D math and geometry |
| `@react-three/fiber` | React renderer for Three.js |
| `@react-three/drei` | Helpers: `Html`, `Stars`, `PerspectiveCamera`, `useTexture` |
| `@react-three/postprocessing` | Post-FX: `Bloom`, `EffectComposer` |
| `framer-motion` OR `motion/react` | HUD animations (`AnimatePresence`, `motion.div`) |
| `zustand` | Global state (active planet, scroll progress, drawer open) |
| `tailwindcss` v4 | Styling |
| `next/font/google` | Orbitron font |

---

## File Structure

```
src/
├── containers/
│   └── experience-orbit/
│       ├── config.ts               # PlanetConfig type, PLANET_CONFIG, PLANET_ORDER, ZOOM_MIN/MAX
│       ├── index.tsx               # ExperienceOrbit orchestrator — HUD layer, drawer, Suspense
│       ├── solar-system-scene.tsx  # Three.js Canvas, planets, camera, PlanetNavItem, zoom controls
│       ├── planet-components.tsx   # PlanetBody, AsteroidBelt meshes
│       ├── sun-shader.tsx          # Custom GLSL shader for the sun
│       ├── hooks/
│       │   ├── use-scene-controls.ts  # All pointer/wheel/pinch/fov/zoom interaction logic
│       │   └── use-drawer-lock.ts     # Body overflow lock while drawer is open
│       └── hud/
│           ├── loading-screen.tsx  # Satellite spinner shown during Suspense fallback
│           ├── top-controls.tsx    # ModeToggle + GitHub + Buy-me-a-coffee links
│           ├── planet-info.tsx     # AnimatePresence planet label/bio/CTA panel
│           ├── planet-drawer.tsx   # Vaul Drawer (right-side slide-in, renders active section)
│           ├── planet-nav.tsx      # Side-nav with PlanetNavItem — index numbers, tick-line, glow
│           └── status-bar.tsx      # Scroll % + progress bar + control hint
├── shared/
│   └── stores/
│       ├── use-cosmos-store.ts     # activePlanet, scrollProgress
│       └── use-site-setting-store.ts # mode, openDrawer
└── public/
    └── images/
        └── textures/
            ├── sunmap.jpg
            ├── mercurymap.jpg
            ├── venusmap.jpg
            ├── earthmap1k.jpg
            ├── earthcloudmap.jpg
            ├── mars_1k_color.jpg
            ├── jupitermap.jpg
            ├── saturnmap.jpg
            ├── uranusmap.jpg
            ├── neptunemap.jpg
            └── plutomap1k.jpg
```

---

## Zustand Stores

### `use-cosmos-store.ts`
```ts
import { create } from 'zustand';

export type PlanetType =
  | 'SUN' | 'MERCURY' | 'VENUS' | 'EARTH' | 'MARS'
  | 'JUPITER' | 'SATURN' | 'URANUS' | 'NEPTUNE' | 'PLUTO';

interface CosmosState {
  activePlanet: PlanetType;
  setActivePlanet: (planet: PlanetType) => void;
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;
}

export const useCosmosStore = create<CosmosState>((set) => ({
  activePlanet: 'SUN',
  setActivePlanet: (planet) => set({ activePlanet: planet }),
  scrollProgress: 0,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
}));
```

### `use-site-setting-store.ts`
```ts
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
  mode: 'universe',
  setMode: (mode) => set({ mode }),
  toggleMode: () => set((state) => ({ mode: state.mode === 'normal' ? 'universe' : 'normal' })),
  openDrawer: false,
  setOpenDrawer: (open) => set({ openDrawer: open }),
}));
```

---

## Font Setup (Tailwind v4 + next/font)

### `src/app/layout.tsx`
```tsx
import { Orbitron } from 'next/font/google';

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-orbitron',
});

// Apply variable to <body>
<body className={`${orbitron.variable} antialiased`}>
```

### `src/styles/globals.css`
Inside the `@theme inline` block, register the font token so Tailwind v4 generates the `font-orbitron` utility:
```css
@theme inline {
  --font-orbitron: var(--font-orbitron);
  /* ...other tokens */
}
```

> **Tailwind v4 note**: `tailwind.config.ts` `fontFamily` extensions are ignored unless a `@config` directive is present. Always register custom fonts via `@theme inline` in CSS.

---

## PLANET_CONFIG Shape

Every planet entry follows this shape:

```ts
type PlanetConfig = {
  radius: number;      // orbit radius in Three.js units (0 = sun, center)
  color: string;       // hex, fallback if no texture
  label: string;       // displayed section name in HUD
  section: string;     // key mapping to SECTION_MAP component
  description: string; // scientific description, shown in HUD tooltip
  bio: string;         // human / Gen-Z intro copy shown in the HUD panel
};
```

Planets and their orbit radii: `SUN(0)`, `MERCURY(15)`, `VENUS(24)`, `EARTH(36)`, `MARS(48)`, `JUPITER(68)`, `SATURN(90)`, `URANUS(110)`, `NEPTUNE(130)`, `PLUTO(150)`.

---

## SECTION_MAP

Map planet `section` keys to React components:

```ts
const SECTION_MAP: Record<string, React.ComponentType<any>> = {
  MyUniverse: MyUniverse,         // SUN  — About Me
  MyTechStack: MyTechStack,       // MERCURY — Tech Stack
  PersonalValuation: PersonalValuation, // VENUS — Core Values
  ExperienceTimeline: ExperienceTimeline, // EARTH — Experiences
  ContactSection: ContactSection, // MARS — Contact
  CommingSoon: ComingSoonPage,    // all outer planets
};
```

Replace these with your own section components. The string value in `PLANET_CONFIG.section` must match a key here.

---

## Architecture Overview

```
ExperienceOrbit (index.tsx)
├── <SolarSystemScene locked={isDrawerOpen} />   ← Three.js Canvas layer (next/dynamic, ssr:false)
│   ├── useSceneControls(locked)      ← hook: pointer drag, wheel, pinch, FOV, zoom, planet focus
│   ├── <VirtualPilot />              ← lerps scrollProgress toward targetProgress
│   ├── <CameraRig />                 ← camera lerps to active planet position + drag + zoom
│   ├── <Planet /> × 10              ← orbit, mesh, hover, HUD callout (Html)
│   ├── <PlanetNav />                ← side-nav (hud/planet-nav.tsx), owns PlanetNavItem hook calls
│   ├── Zoom Controls (+ / − buttons)← call adjustZoom() from useSceneControls
│   ├── <AsteroidBelt />              ← instanced mesh between MARS and JUPITER
│   ├── <Stars />                     ← drei background stars
│   └── <EffectComposer><Bloom />     ← bloom post-processing
└── ABSOLUTE HUD LAYER (pointer-events-none, mix-blend-difference)
    ├── <TopControls />               ← ModeToggle, GitHub, Buy-me-a-coffee
    ├── <PlanetInfo />                ← AnimatePresence planet label/bio/CTA panel
    ├── <StatusBar />                 ← scroll %, progress bar, hint text
    └── <PlanetDrawer />              ← Vaul Drawer (right-side), renders active section component
```

---

## Key Behaviours & Implementation Notes

### 1. Scroll-driven navigation
- `wheel` event listener on `window` increments `targetProgress.current` (0–1 float).
- `VirtualPilot.useFrame` lerps `scrollProgress` toward `targetProgress` at `0.05` speed each frame.
- Active planet is derived: `Math.round(scrollProgress * (PLANET_ORDER.length - 1))`.
- **Critical**: read `scrollProgress` from `useCosmosStore.getState()` inside `useFrame`, NOT from a React hook — avoids stale closure.

### 2. Direct planet click navigation
```ts
const handlePlanetFocus = (index: number) => {
  const targetVal = index / (PLANET_ORDER.length - 1);
  targetProgress.current = targetVal;                        // snap lerp target
  useCosmosStore.getState().setScrollProgress(targetVal);    // snap visible state
  useCosmosStore.getState().setActivePlanet(PLANET_ORDER[index]); // snap active planet
};
```
Snapping both `scrollProgress` and `activePlanet` immediately prevents the camera stepping through intermediate planets.

### 3. Drawer pause
`VirtualPilot.useFrame` early-returns when `useSiteSettingStore.getState().openDrawer === true`, freezing scroll progress while the drawer is open.

### 4. Camera rig
- Reads live planet position by recalculating orbital angle each frame (same formula as the `Planet` component).
- `lookAtTarget` lerps toward the planet position at `0.05`.
- Camera position is spherical: derived from base zoom distances `(defaultOffsetZ, defaultOffsetY)` + mouse drag offsets, then converted to cartesian and lerped at `0.05`.
- Drag offsets accumulate on `pointerdown + pointermove` on the canvas wrapper div.

### 5. Orbital motion formula
All planets use the same formula to calculate position each frame:
```ts
const orbitalSpeed = 0.5 / (radius + 2);
const angle = time * orbitalSpeed + radius * 10.5;  // phase offset ensures planets start spread out
position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
```
Sun stays at `(0, 0, 0)` — its radius is `0`.

### 6. HUD callout (inside Canvas via `<Html>`)
- Rendered with `@react-three/drei`'s `<Html distanceFactor={...} zIndexRange={[49,0]}>`.
- Contains an SVG connector line + info card.
- Uses `font-orbitron` class for typography.
- `pointer-events-none` on wrapper; `pointer-events-auto` on the card only.

### 7. Side navigation (`hud/planet-nav.tsx`)
- Rendered as an absolutely-positioned element **outside** the `<Canvas>` but inside the same relative wrapper via `<PlanetNav onFocus={handlePlanetFocus} />`.
- Each `PlanetNavItem` owns its own `useCosmosStore` hook call (fixes Rules of Hooks violation in `.map()`).
- Design: two-digit index number (`01`, `02`…) + animated tick-line (active glows blue with box-shadow, inactive expands on hover) + planet name.
- Subtle vertical track line runs down the left of the list.
- Labels use `font-orbitron`, `uppercase`, `tracking-[0.25em]`, `mix-blend-difference`.

### 8. Drawer
- Full-height right-side panel, `max-w-4xl`.
- `motion.div` animates `x: '100%' → 0`.
- Backdrop is a separate `motion.div` with `backdrop-blur-sm`.
- `document.body.style.overflow = 'hidden'` while open; restored on close.
- Dynamically renders the active section component via `SECTION_MAP`.

---

## Planet Textures
Place `.jpg` texture maps in `public/images/textures/`. Filenames expected:

| Planet | File |
|--------|------|
| Sun | `sunmap.jpg` |
| Mercury | `mercurymap.jpg` |
| Venus | `venusmap.jpg` |
| Earth | `earthmap1k.jpg` + `earthcloudmap.jpg` |
| Mars | `mars_1k_color.jpg` |
| Jupiter | `jupitermap.jpg` |
| Saturn | `saturnmap.jpg` |
| URANUS | `uranusmap.jpg` |
| Neptune | `neptunemap.jpg` |
| Pluto | `plutomap1k.jpg` |

Free sources: [Solar System Scope](https://www.solarsystemscope.com/textures/) · [NASA Visible Earth](https://visibleearth.nasa.gov/)

---

## Sun Shader
Custom GLSL procedural shader (`sun-shader.tsx`):
- Vertex shader: passes UV, normal, position.
- Fragment shader: combines a `sunmap.jpg` texture with procedural sinusoidal noise animated by `uTime` uniform, adds a Fresnel glow edge.
- `uTime` is updated every frame via `useFrame`.
- A `<pointLight>` is embedded inside the sun mesh to cast light on surrounding planets.

---

## Special Planet Cases
- **Earth**: renders a semi-transparent cloud layer mesh at scale `1.01` using `earthcloudmap.jpg` with `AdditiveBlending`.
- **Saturn**: renders a procedural ring mesh (`ringGeometry`) rotated `-Math.PI / 2.2` with `DoubleSide` material.
- **All planets**: atmospheric glow — a `BackSide` transparent sphere at scale `1.15`.

---

## Adapting to a New Project

1. **Install deps**: `three @react-three/fiber @react-three/drei @react-three/postprocessing zustand framer-motion` (or `motion`)
2. **Copy** the 4 files from `experience-orbit/` and the 2 Zustand store files.
3. **Add textures** to `public/images/textures/`.
4. **Register font** in layout and `@theme inline` CSS (see Font Setup above).
5. **Replace `SECTION_MAP`** with your own section components.
6. **Update `PLANET_CONFIG`** — change `label`, `section`, `description`, `bio` per planet.
7. **Mount** `<ExperienceOrbit />` in a full-screen section: `<section className="relative w-full h-screen overflow-hidden">`.
8. The `SolarSystemScene` is loaded with `next/dynamic` + `ssr: false` because Three.js requires the browser environment.

---

## Common Pitfalls

| Problem | Cause | Fix |
|---|---|---|
| `font-orbitron` class has no effect | Tailwind v4 ignores `tailwind.config.ts` font extensions without `@config` | Register `--font-orbitron: var(--font-orbitron)` inside `@theme inline` in globals.css |
| Camera steps through planets on nav click | Stale `scrollProgress` from React hook in `useFrame` closure | Read state via `useCosmosStore.getState()` inside `useFrame` |
| Camera keeps moving while drawer is open | `VirtualPilot` not paused | Add early return: `if (useSiteSettingStore.getState().openDrawer) return;` |
| Scroll offset miscalculation in `useScroll` (if used elsewhere) | Container missing `position: relative` | Add `relative` class to the `ref` container |
| Hydration mismatch from browser extensions | Extension injecting attributes into `<body>` | Add `suppressHydrationWarning` to `<body>` in layout |
| `[object Object]` warning from motion v12 | `transition` inside variant state objects — motion v12 treats them as animatable CSS | Extract `transition` from variant states and pass as separate `transition` prop |
| Three.js SSR crash | Canvas uses `window` / WebGL | Always `dynamic(() => import(...), { ssr: false })` for the Canvas component |
| Loading screen flickers twice (show/hide/show/hide) | Both `dynamic(loading: ...)` and `<Suspense fallback>` fire independently | Remove `loading` from `dynamic()` and use only `<Suspense fallback={<LoadingScreen />}>` as the single gatekeeper |
