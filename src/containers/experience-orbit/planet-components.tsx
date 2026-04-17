'use client';

import { PlanetType } from '@/shared/stores/use-cosmos-store';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

import { useTexture } from '@react-three/drei';

// Utilizing local HD maps from public/images/textures
const TEXTURE_URLS: Record<PlanetType, string> = {
  SUN: '/images/textures/sunmap.jpg',
  MERCURY: '/images/textures/mercurymap.jpg',
  VENUS: '/images/textures/venusmap.jpg',
  EARTH: '/images/textures/earthmap1k.jpg',
  MARS: '/images/textures/mars_1k_color.jpg',
  JUPITER: '/images/textures/jupitermap.jpg',
  SATURN: '/images/textures/saturnmap.jpg',
  URANUS: '/images/textures/uranusmap.jpg',
  NEPTUNE: '/images/textures/neptunemap.jpg',
  PLUTO: '/images/textures/plutomap1k.jpg'
};

export const PlanetBody = ({
  type,
  color
}: {
  type: PlanetType;
  color: string;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const url = TEXTURE_URLS[type];
  const [texture, cloud] = useTexture([
    url || '/images/textures/earthmap1k.jpg',
    '/images/textures/earthcloudmap.jpg'
  ]);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Primary Celestial Body */}
      <mesh>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          color={texture ? 'white' : color}
          roughness={0.8}
          metalness={0.2}
          emissive={color}
          emissiveIntensity={texture ? 0.02 : 0.3}
        />
      </mesh>

      {/* Special Case: Earth's Clound */}
      {type === 'EARTH' && (
        <mesh scale={[1.01, 1.01, 1.01]}>
          {/* Slightly larger */}
          <sphereGeometry args={[1.505, 64, 64]} />
          <meshStandardMaterial
            map={cloud}
            transparent
            opacity={0.5}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}

      {/* Special Case: Saturn's Rings (Procedural Color Fallback since no local ring texture) */}
      {type === 'SATURN' && (
        <mesh ref={ringRef} rotation={[-Math.PI / 2.2, 0, 0]}>
          <ringGeometry args={[2.2, 5, 128]} />
          <meshStandardMaterial
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
            color="#dfd195"
          />
        </mesh>
      )}

      {/* Atmospheric Soft Light Wrap */}
      <mesh scale={[1.15, 1.15, 1.15]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshLambertMaterial
          color={color}
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

export const AsteroidBelt = ({ count = 600 }: { count?: number }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { dummy, particles } = useMemo(() => {
    const dummy = new THREE.Object3D();
    const particles = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 55 + Math.random() * 8;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const scale = 0.05 + Math.random() * 0.15;
      particles.push({ x, y: (Math.random() - 0.5) * 2, z, scale });
    }
    return { dummy, particles };
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime() * 0.1;
    particles.forEach((p, i) => {
      dummy.position.set(p.x, p.y, p.z);
      dummy.rotation.set(time + i, time, 0);
      dummy.scale.set(p.scale, p.scale, p.scale);
      dummy.updateMatrix();
      meshRef.current?.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#444444" roughness={1} />
    </instancedMesh>
  );
};
