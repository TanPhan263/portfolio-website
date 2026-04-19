'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { BinanceKlineMessage, StreamState } from './types';
import type { ChartCandle, ChartVolume } from './types';
import { CHART_COLORS } from './config';
import { Time } from 'lightweight-charts';

interface UseStreamOptions {
  wsUrl: string;
  onCandle: (candle: ChartCandle, volume: ChartVolume) => void;
  onStateChange?: (state: Partial<StreamState>) => void;
}

export function useBinanceStream({ wsUrl, onCandle, onStateChange }: UseStreamOptions) {
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const onCandleRef = useRef(onCandle);
  const onStateRef = useRef(onStateChange);

  // Keep refs up to date without re-triggering effect
  useEffect(() => { onCandleRef.current = onCandle; }, [onCandle]);
  useEffect(() => { onStateRef.current = onStateChange; }, [onStateChange]);

  const connect = useCallback(() => {
    // Avoid duplicate connections
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
      onStateRef.current?.({ isConnected: true });
    };

    ws.onclose = () => {
      setIsConnected(false);
      onStateRef.current?.({ isConnected: false });
      reconnectTimerRef.current = setTimeout(connect, 3000);
    };

    ws.onerror = () => ws.close();

    ws.onmessage = event => {
      const msg: BinanceKlineMessage = JSON.parse(event.data);
      const k = msg.k;

      const candle: ChartCandle = {
        time: Math.floor(k.t / 1000) as Time,
        open: parseFloat(k.o),
        high: parseFloat(k.h),
        low: parseFloat(k.l),
        close: parseFloat(k.c),
      };

      const closePrice = parseFloat(k.c);
      const openPrice = parseFloat(k.o);
      const volume: ChartVolume = {
        time: Math.floor(k.t / 1000) as Time,
        value: parseFloat(k.v),
        color: closePrice >= openPrice ? CHART_COLORS.volumeUp : CHART_COLORS.volumeDown,
      };

      onCandleRef.current(candle, volume);
      onStateRef.current?.({ price: closePrice });
    };
  }, [wsUrl]);

  useEffect(() => {
    connect();
    return () => {
      if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
      wsRef.current?.close();
    };
  }, [connect]);

  return { isConnected };
}
