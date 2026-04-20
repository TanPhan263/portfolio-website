'use client';

import { PlanetType, useCosmosStore } from '@/shared/stores/use-cosmos-store';
import { useSiteSettingStore } from '@/shared/stores/use-site-setting-store';
import { cn } from '@/shared/utils/common';
import { Html, PerspectiveCamera, Sparkles, Stars } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';
import React, { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { PLANET_CONFIG, PLANET_ORDER } from './config';
import { useSceneControls } from './hooks/use-scene-controls';
import { PlanetNav } from './hud/planet-nav';
import { AsteroidBelt, PlanetBody } from './planet-components';
import { BoilingSun } from './sun-shader';
export { PLANET_CONFIG, PLANET_ORDER } from './config';

// ─── Three.js Internal Components ────────────────────────────────────────────

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
  const { radius, color, description } = PLANET_CONFIG[type];
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

            <div className="absolute w-52 top-2 left-17 bg-black/40 backdrop-blur-xl border-l-2 border-l-white p-3 shadow-[0_0_20px_rgba(59,130,246,0.2)] pointer-events-auto transition-colors cursor-crosshair font-orbitron!">
              <p className="text-xs font-bold tracking-[0.2em] text-white mb-1 uppercase">
                {type}
              </p>
              <p className="text-white text-[9px] font-medium leading-relaxed">
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

const Galaxy = () => {
  return (
    <group rotation={[Math.PI / 3, 0, Math.PI / 4]}>
      {/* Galactic Core */}
      <Sparkles
        count={50}
        scale={[200, 100, 100]}
        size={20}
        speed={0}
        opacity={0.3}
        color="#fff4d6"
      />
      {/* Galactic Disc (Oval) */}
      <Sparkles
        count={200}
        scale={[1600, 50, 800]}
        size={10}
        speed={1}
        opacity={0.15}
        color="#ffe0fb"
      />
      {/* Distant Arms (Wide Oval) */}
      <Sparkles
        count={100}
        scale={[2400, 100, 1200]}
        size={15}
        speed={0}
        opacity={0.1}
        color="#ccf0dd"
      />
    </group>
  );
};

export const SolarSystemScene = ({ locked }: { locked?: boolean }) => {
  const {
    containerRef,
    fov,
    zoomLevel,
    targetProgress,
    dragOffset,
    pointerHandlers,
    handlePlanetFocus,
    adjustZoom
  } = useSceneControls(locked ?? false);

  return (
    <div
      ref={containerRef}
      className="h-full w-full relative overflow-hidden select-none touch-none"
      {...pointerHandlers}
    >
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: false }}>
        <color attach="background" args={['#1c1c1c']} />
        <PerspectiveCamera
          makeDefault
          fov={fov}
          position={[0, 50, 200]}
          far={3000}
        />
        <ambientLight intensity={0.15} />
        <pointLight
          position={[0, 0, 0]}
          intensity={30}
          color="#ffaa00"
          decay={1.5}
          distance={600}
        />
        <pointLight
          position={[0, 0, 0]}
          intensity={5}
          color="#ffffff"
          decay={2}
          distance={1000}
        />
        <Stars
          radius={300}
          depth={150}
          count={8000}
          factor={6}
          saturation={0.5}
          fade
          speed={0}
        />
        <Galaxy />

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

        <AsteroidBelt count={1200} />
        <EffectComposer enableNormalPass={false}>
          <Bloom
            luminanceThreshold={1.1}
            mipmapBlur
            intensity={1.2}
            radius={0.5}
          />
          <Vignette offset={0.15} darkness={0.3} />
        </EffectComposer>
      </Canvas>

      <PlanetNav onFocus={handlePlanetFocus} />

      {/* Zoom Controls */}
      <div className="absolute bottom-16 left-4 md:left-1/2 md:-translate-x-1/2 flex flex-row items-center gap-1 z-50 pointer-events-auto font-orbitron!">
        <button
          onClick={() => adjustZoom(-0.25)}
          className="w-7 h-7 flex items-center justify-center text-white/80 hover:text-white border border-white/50 hover:border-white/45 transition-all duration-200 text-sm leading-none"
          title="Zoom in"
        >
          +
        </button>
        <div className="h-px w-2 bg-white/50" />
        <button
          onClick={() => adjustZoom(0.25)}
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
