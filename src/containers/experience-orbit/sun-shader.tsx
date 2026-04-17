'use client';

import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const sunVertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const sunFragmentShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  uniform float uTime;
  uniform sampler2D sunTexture;

  // Simple noise function
  float noise(vec3 p) {
    return sin(p.x * 10.0 + uTime) * sin(p.y * 10.0 + uTime * 0.7) * sin(p.z * 10.0 + uTime * 0.5);
  }

  void main() {
    float n = noise(vPosition * 0.5);
    
    vec4 texColor = texture2D(sunTexture, vUv);

    // Base solar colors
    vec3 color1 = vec4(1.0, 0.9, 0.2, 1.0).rgb; // Yellow core
    vec3 color2 = vec4(1.0, 0.4, 0.0, 1.0).rgb; // Orange flares
    
    // Mix based on noise and time
    vec3 noiseColor = mix(color1, color2, n * 0.5 + 0.5);
    
    // Add texture tightly with the procedural noise so it never darkens
    vec3 finalColor = texColor.rgb + (noiseColor * 0.8);
    
    // Fresnel glow
    float fresnel = pow(1.0 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
    finalColor += vec3(1.0, 0.6, 0.2) * fresnel * 2.0;

    // Intensity boost
    gl_FragColor = vec4(finalColor * 1.5, 1.0);
  }
`;

export const BoilingSun = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const sunMap = useTexture('/images/textures/sunmap.jpg');

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        sunTexture: { value: sunMap }
    }), [sunMap]);

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
        }
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.003;
        }
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[8, 128, 128]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={sunVertexShader}
                fragmentShader={sunFragmentShader}
                uniforms={uniforms}
            />
            {/* Intense radiant light */}
            <pointLight 
                intensity={80} 
                distance={300} 
                color="#ffaa11" 
                decay={1.2}
            />
        </mesh>
    );
};
