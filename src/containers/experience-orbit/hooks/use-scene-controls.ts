'use client';

import { useCosmosStore } from '@/shared/stores/use-cosmos-store';
import { useCallback, useEffect, useRef, useState } from 'react';
import { PLANET_ORDER, ZOOM_MIN, ZOOM_MAX } from '../config';

/**
 * Encapsulates all interaction logic for the 3D solar system scene:
 * - Pointer drag (camera rotation)
 * - Mouse wheel navigation (plain) and zoom (Ctrl/Meta)
 * - Pinch-to-zoom (mobile)
 * - Responsive FOV
 * - Planet focus navigation
 */
export function useSceneControls(locked: boolean) {
  // Mirror locked in a ref so event handlers never capture a stale value
  const lockedRef = useRef(locked);
  useEffect(() => {
    lockedRef.current = locked;
  }, [locked]);

  // --- Transient refs (change every frame, never trigger re-renders) ---
  const targetProgress = useRef(0);
  const zoomLevel = useRef(1.0);
  const dragOffset = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const previousMouse = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // --- Stable pointer handlers via useCallback ---
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (lockedRef.current) return;
    isDragging.current = true;
    previousMouse.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (lockedRef.current || !isDragging.current) return;
    const deltaX = e.clientX - previousMouse.current.x;
    const deltaY = e.clientY - previousMouse.current.y;
    dragOffset.current.x -= deltaX * 0.005;
    dragOffset.current.y -= deltaY * 0.005;
    previousMouse.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  // --- Wheel: plain = navigate planets, Ctrl/Meta = zoom ---
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (lockedRef.current) return;
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
  }, []);

  // --- Pinch-to-zoom (mobile two-finger gesture) ---
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
      if (e.touches.length !== 2 || startDist === null) return;
      e.preventDefault();
      const scale = getTouchDist(e.touches) / startDist;
      zoomLevel.current = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, startZoom / scale));
    };
    const onTouchEnd = () => {
      startDist = null;
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd);
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  // --- Responsive FOV ---
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

  // --- Planet focus: snap camera directly to a planet by index ---
  const handlePlanetFocus = useCallback((index: number) => {
    const targetVal = index / (PLANET_ORDER.length - 1);
    targetProgress.current = targetVal;
    useCosmosStore.getState().setScrollProgress(targetVal);
    useCosmosStore.getState().setActivePlanet(PLANET_ORDER[index]);
  }, []);

  // --- Zoom button helper (+delta zooms in, -delta zooms out) ---
  const adjustZoom = useCallback((delta: number) => {
    zoomLevel.current = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, zoomLevel.current + delta));
  }, []);

  return {
    containerRef,
    fov,
    zoomLevel,
    targetProgress,
    dragOffset,
    pointerHandlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      onPointerLeave: handlePointerUp,
    },
    handlePlanetFocus,
    adjustZoom,
  };
}
