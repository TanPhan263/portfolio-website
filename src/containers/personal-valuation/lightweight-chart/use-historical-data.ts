'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { BinanceRawKline, ChartCandle, ChartVolume } from './types';
import { CHART_COLORS } from './config';
import { Time } from 'lightweight-charts';

interface UseHistoricalDataResult {
  isLoading: boolean;
  error: string | null;
  candles: ChartCandle[];
  volumes: ChartVolume[];
  changePercent: number;
  openPrice: number | null;
  closePrice: number | null;
}

export function useHistoricalData(restUrl: string): UseHistoricalDataResult {
  const [state, setState] = useState<UseHistoricalDataResult>({
    isLoading: true,
    error: null,
    candles: [],
    volumes: [],
    changePercent: 0,
    openPrice: null,
    closePrice: null,
  });

  const abortRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const res = await fetch(restUrl, { signal: controller.signal });
      if (!res.ok) throw new Error(`Binance API error: ${res.status}`);
      const raw: BinanceRawKline[] = await res.json();

      const candles: ChartCandle[] = raw.map(k => ({
        time: Math.floor(Number(k[0]) / 1000) as Time,
        open: parseFloat(k[1] as string),
        high: parseFloat(k[2] as string),
        low: parseFloat(k[3] as string),
        close: parseFloat(k[4] as string),
      }));

      const volumes: ChartVolume[] = raw.map(k => {
        const close = parseFloat(k[4] as string);
        const open = parseFloat(k[1] as string);
        return {
          time: Math.floor(Number(k[0]) / 1000) as Time,
          value: parseFloat(k[5] as string),
          color: close >= open ? CHART_COLORS.volumeUp : CHART_COLORS.volumeDown,
        };
      });

      const firstClose = candles[0]?.close ?? 0;
      const lastClose = candles[candles.length - 1]?.close ?? 0;
      const changePercent = firstClose > 0 ? ((lastClose - firstClose) / firstClose) * 100 : 0;

      setState({
        isLoading: false,
        error: null,
        candles,
        volumes,
        changePercent,
        openPrice: firstClose,
        closePrice: lastClose,
      });
    } catch (err) {
      if ((err as Error).name === 'AbortError') return;
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: (err as Error).message,
      }));
    }
  }, [restUrl]);

  useEffect(() => {
    fetchData();
    return () => abortRef.current?.abort();
  }, [fetchData]);

  return state;
}
