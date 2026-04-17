'use client';

import { PlanetType, useCosmosStore } from '@/shared/stores/use-cosmos-store';
import { useSiteSettingStore } from '@/shared/stores/use-site-setting-store';
import { cn } from '@/shared/utils/common';
import { Html, PerspectiveCamera, Stars } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { AsteroidBelt, PlanetBody } from './planet-components';
import { BoilingSun } from './sun-shader';

// --- Constants & Config ---
export const PLANET_CONFIG: Record<
  PlanetType,
  {
    radius: number;
    color: string;
    label: string;
    section: string;
    description: string;
    bio: string;
  }
> = {
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
    description:
      'Smallest planet, closest to the Sun, with extreme temperatures.',
    bio: 'My go-to stack. not gatekeeping — this is literally what i use to ship.'
  },
  VENUS: {
    radius: 24,
    color: '#E3BB76',
    label: 'Core Values',
    section: 'PersonalValuation',
    description:
      'Hottest planet due to a dense, greenhouse-gas-filled atmosphere.',
    bio: 'The stuff I actually care about. No corporate fluff, just real values I live by.'
  },
  EARTH: {
    radius: 36,
    color: '#2271B3',
    label: 'Experiences',
    section: 'ExperienceTimeline',
    description:
      'Our home, the only planet known to support life with liquid water.',
    bio: 'Places I\'ve been, things I\'ve built. The full arc, no cap.'
  },
  MARS: {
    radius: 48,
    color: '#E27B58',
    label: 'Contact Me',
    section: 'ContactSection',
    description:
      'The "Red Planet," known for its thin atmosphere, deserts, and extinct volcanoes.',
    bio: 'Slide into my inbox fr. collabs, opportunities, or just vibes — all welcome.'
  },
  JUPITER: {
    radius: 68,
    color: '#D39C7E',
    label: 'Contact Me',
    section: 'CommingSoon',
    description:
      'The largest planet, a gas giant with 95+ moons and a famous "Great Red Spot" storm.',
    bio: 'Something big is cooking here. Stay tuned fr fr.'
  },
  SATURN: {
    radius: 90,
    color: '#C5AB6E',
    label: 'Comming Soon',
    section: 'CommingSoon',
    description: 'Famous for its extensive, bright ring system and 146+ moons.',
    bio: 'Still loading... but trust, it\'s gonna hit different.'
  },
  URANUS: {
    radius: 110,
    color: '#B5E3E3',
    label: 'Comming Soon',
    section: 'CommingSoon',
    description:
      'An ice giant that rotates on its side, with a faint ring system.',
    bio: 'Doing its own thing, unbothered. New content incoming, no rush.'
  },
  NEPTUNE: {
    radius: 130,
    color: '#6081FF',
    label: 'Comming Soon',
    section: 'CommingSoon',
    description:
      'The coldest and farthest planet, known for high-speed winds and deep blue color.',
    bio: 'Deep in the sauce rn. Launching when it\'s ready, not before.'
  },
  PLUTO: {
    radius: 150,
    color: '#CFA78E',
    label: 'Comming Soon',
    section: 'CommingSoon',
    description: 'A dwarf planet in the Kuiper belt, known for its icy surface.',
    bio: 'Yeah Pluto\'s a dwarf planet, and this section is still a wip. Respect the process.'
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

const ZOOM_MIN = 0.3;
const ZOOM_MAX = 3.0;

const OrbitPath = ({ radius, color }: { radius: number; color: string }) => {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.02, 16, 128]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.06}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const Planet = ({
  type,
  onClick
}: {
  type: PlanetType;
  onClick?: () => void;
}) => {
  const { radius, color, label, description } = PLANET_CONFIG[type];
  const groupRef = useRef<THREE.Group>(null);
  const isActive = useCosmosStore((s) => s.activePlanet === type);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      const orbitalSpeed = 0.5 / (radius + 2);
      const angle = time * orbitalSpeed + radius * 10.5;
      groupRef.current.position.set(
        Math.cos(angle) * (type === 'SUN' ? 0 : radius),
        0,
        Math.sin(angle) * (type === 'SUN' ? 0 : radius)
      );
    }
  });

  const isSun = type === 'SUN';
  // Pull label closer down
  const surfaceOffset = isSun ? 7 : 1.2;

  return (
    <group
      ref={groupRef}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      onPointerOver={() => {
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      <group scale={hovered ? 1.08 : 1}>
        {isSun ? <BoilingSun /> : <PlanetBody type={type} color={color} />}
      </group>

      {/* Sci-Fi HUD Callout */}
      {isActive && (
        <Html
          distanceFactor={isSun ? 30 : 10}
          zIndexRange={[49, 0]}
          position={[surfaceOffset, surfaceOffset, 0]}
        >
          <div
            className={cn(
              'pointer-events-none relative transition-all duration-700 ease-out origin-bottom-left',
              isActive
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-50 translate-y-8'
            )}
          >
            {/* Tighter Angled Connecting Path */}
            <svg
              className="absolute left-0 top-0 w-16 h-16 overflow-visible"
              viewBox="0 0 50 50"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="0" cy="50" r="1.5" fill="#fff" />
              <path
                d="M 0 50 L 15 35 L 50 35"
                stroke="#fff"
                strokeWidth="1.5"
                strokeOpacity="0.8"
              />
              <circle cx="50" cy="35" r="1.5" fill="#fff" />
            </svg>

            {/* Info Card - Hugs the line tightly */}
            <div className="absolute w-52 top-2 left-[68px] bg-black/40 backdrop-blur-xl border-l-2 border-l-[#fff] p-3 shadow-[0_0_20px_rgba(59,130,246,0.2)] pointer-events-auto transition-colors cursor-crosshair font-orbitron!">
              <p className="text-xs font-bold tracking-[0.2em] text-[#fff] mb-1 uppercase">
                {type}
              </p>
              <p className="text-[#fff] text-[9px] font-medium leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};

const CameraRig = ({
  dragOffset,
  zoomLevel
}: {
  dragOffset: React.MutableRefObject<{ x: number; y: number }>;
  zoomLevel: React.MutableRefObject<number>;
}) => {
  const { camera } = useThree();
  const activePlanet = useCosmosStore((s) => s.activePlanet);
  const lookAtTarget = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const v1 = new THREE.Vector3();

    const getPos = (type: PlanetType) => {
      const { radius } = PLANET_CONFIG[type];
      if (type === 'SUN') return new THREE.Vector3(0, 0, 0);
      const orbitalSpeed = 0.5 / (radius + 2);
      const angle = time * orbitalSpeed + radius * 10.5;
      return new THREE.Vector3(
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius
      );
    };

    const targetPlanetPos = getPos(activePlanet);

    // Smoothly pan gaze towards the newly activated planet
    lookAtTarget.lerp(targetPlanetPos, 0.05);

    const isSun = activePlanet === 'SUN';

    // Base Macro-Zoom Distances
    const defaultOffsetZ = isSun ? 38 : 6.5;
    const defaultOffsetY = isSun ? 10 : 2;

    // Convert into seamless spherical coordinates
    const baseR = Math.sqrt(
      defaultOffsetZ * defaultOffsetZ + defaultOffsetY * defaultOffsetY
    );
    const R = baseR * zoomLevel.current;
    const basePhi = Math.acos(defaultOffsetY / baseR);

    // Apply drag interactions safely
    const targetPhi = Math.max(
      0.1,
      Math.min(Math.PI - 0.1, basePhi + dragOffset.current.y)
    );
    const targetTheta = dragOffset.current.x;

    // Convert back to cartesian offsets
    const offsetX = R * Math.sin(targetPhi) * Math.sin(targetTheta);
    const finalOffsetY = R * Math.cos(targetPhi);
    const finalOffsetZ = R * Math.sin(targetPhi) * Math.cos(targetTheta);

    v1.copy(lookAtTarget).add(
      new THREE.Vector3(offsetX, finalOffsetY, finalOffsetZ)
    );

    camera.position.lerp(v1, 0.05);
    camera.lookAt(lookAtTarget);
  });
  return null;
};

// --- Sub-component to manage Virtual Flight inside Canvas context ---
const VirtualPilot = ({
  targetProgress
}: {
  targetProgress: React.MutableRefObject<number>;
}) => {
  useFrame(() => {
    // Pause scroll progress updates while the drawer is open
    if (useSiteSettingStore.getState().openDrawer) return;

    const scrollProgress = useCosmosStore.getState().scrollProgress;
    const next = THREE.MathUtils.lerp(
      scrollProgress,
      targetProgress.current,
      0.05
    );
    useCosmosStore.getState().setScrollProgress(next);

    // Auto-update active planet purely linearly
    const mapped = next * (PLANET_ORDER.length - 1);
    const index = Math.max(
      0,
      Math.min(Math.round(mapped), PLANET_ORDER.length - 1)
    );
    useCosmosStore.getState().setActivePlanet(PLANET_ORDER[index]);
  });

  return null;
};

export const SolarSystemScene = ({ locked }: { locked?: boolean }) => {
  const targetProgress = useRef(0);
  const zoomLevel = useRef(1.0);

  // Drag State for Camera Viewport Rotation
  const dragOffset = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const previousMouse = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (locked) return;
    isDragging.current = true;
    previousMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (locked) return;
    if (isDragging.current) {
      const deltaX = e.clientX - previousMouse.current.x;
      const deltaY = e.clientY - previousMouse.current.y;

      dragOffset.current.x -= deltaX * 0.005;
      dragOffset.current.y -= deltaY * 0.005;

      previousMouse.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  // Wheel: plain = navigate, Ctrl/Meta = zoom
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (locked) return;
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        zoomLevel.current = Math.max(
          ZOOM_MIN,
          Math.min(ZOOM_MAX, zoomLevel.current - e.deltaY * 0.002)
        );
      } else {
        targetProgress.current = Math.max(
          0,
          Math.min(targetProgress.current + e.deltaY * 0.00025, 1)
        );
      }
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [locked]);

  // Pinch-to-zoom (mobile)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const getTouchDist = (touches: TouchList) => {
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };

    let startDist: number | null = null;
    let startZoom = 1.0;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        startDist = getTouchDist(e.touches);
        startZoom = zoomLevel.current;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && startDist !== null) {
        e.preventDefault();
        const scale = getTouchDist(e.touches) / startDist;
        zoomLevel.current = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, startZoom / scale));
      }
    };
    const onTouchEnd = () => { startDist = null; };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd);
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  const [fov, setFov] = useState(50);
  useEffect(() => {
    const updateFov = () => {
      const aspect = window.innerWidth / window.innerHeight;
      setFov(aspect < 1 ? 50 * (1.5 / aspect) : 50);
    };
    updateFov();
    window.addEventListener('resize', updateFov);
    return () => window.removeEventListener('resize', updateFov);
  }, []);

  const handlePlanetFocus = (index: number) => {
    const targetVal = index / (PLANET_ORDER.length - 1);
    targetProgress.current = targetVal;
    useCosmosStore.getState().setScrollProgress(targetVal);
    useCosmosStore.getState().setActivePlanet(PLANET_ORDER[index]);
  };

  return (
    <div
      ref={containerRef}
      className="h-full w-full relative overflow-hidden select-none bg-[#0a1128] touch-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: false }}>
        <color attach="background" args={['#0a1128']} />
        <PerspectiveCamera
          makeDefault
          fov={fov}
          position={[0, 50, 200]}
          far={2000}
        />
        <ambientLight intensity={0.2} />
        <pointLight
          position={[0, 0, 0]}
          intensity={20}
          color="#ffaa00"
          decay={1.5}
          distance={500}
        />
        <pointLight
          position={[0, 0, 0]}
          intensity={7}
          color="#ffffff"
          decay={2}
          distance={800}
        />
        <Stars
          radius={250}
          depth={60}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />

        <VirtualPilot targetProgress={targetProgress} />
        <CameraRig dragOffset={dragOffset} zoomLevel={zoomLevel} />

        {PLANET_ORDER.map((type, i) => (
          <React.Fragment key={type}>
            {PLANET_CONFIG[type].radius > 0 && (
              <OrbitPath
                radius={PLANET_CONFIG[type].radius}
                color={PLANET_CONFIG[type].color}
              />
            )}
            <Planet type={type} onClick={() => handlePlanetFocus(i)} />
          </React.Fragment>
        ))}

        <AsteroidBelt count={1000} />
        <EffectComposer enableNormalPass={false}>
          <Bloom
            luminanceThreshold={1.2}
            mipmapBlur
            intensity={0.8}
            radius={0.4}
          />
        </EffectComposer>
      </Canvas>

      {/* Navigation HUD Integration */}
      <div className="absolute top-10 md:top-1/2 left-8 md:left-10 md:-translate-y-1/2 flex flex-col z-50 pointer-events-auto mix-blend-difference font-orbitron!">
        {PLANET_ORDER.map((p, i) => {
          const active = useCosmosStore((s) => s.activePlanet) === p;
          return (
            <div
              key={p}
              className="flex items-center gap-4 group cursor-pointer"
              onClick={() => handlePlanetFocus(i)}
            >
              <div
                className={cn(
                  'w-1 h-6 transition-all duration-500',
                  active ? 'bg-blue-500 scale-y-150' : 'bg-white/10'
                )}
              />
              <span
                className={cn(
                  'text-xs font-black transition-colors uppercase tracking-[0.2em] mix-blend-difference',
                  active
                    ? 'text-white text-sm font-bold'
                    : 'text-white/20 group-hover:text-white/50 font-medium'
                )}
              >
                {p}
              </span>
            </div>
          );
        })}
      </div>

      {/* Zoom Controls */}
      <div className="absolute bottom-16 left-4 md:left-1/2 md:-translate-x-1/2 flex flex-row items-center gap-1 z-50 pointer-events-auto font-orbitron!">
        <button
          onClick={() => { zoomLevel.current = Math.max(ZOOM_MIN, zoomLevel.current - 0.25); }}
          className="w-7 h-7 flex items-center justify-center text-white/80 hover:text-white border border-white/50 hover:border-white/45 transition-all duration-200 text-sm leading-none"
          title="Zoom in"
        >
          +
        </button>
        <div className="h-px w-2 bg-white/50" />
        <button
          onClick={() => { zoomLevel.current = Math.min(ZOOM_MAX, zoomLevel.current + 0.25); }}
          className="w-7 h-7 flex items-center justify-center text-white/80 hover:text-white border border-white/50 hover:border-white/45 transition-all duration-200 text-sm leading-none"
          title="Zoom out"
        >
          −
        </button>
        <p className="ml-2 text-[6px] text-white/80 uppercase tracking-[0.2em] hidden md:block">
          ctrl+scroll
        </p>
      </div>
    </div>
  );
};
