'use client';

import {
  CandlestickData,
  CandlestickSeries,
  createChart,
  Time
} from 'lightweight-charts';
import { useEffect, useRef, useState } from 'react';

const SYMBOL = 'paxgusdt';
const INTERVAL = '1m';
const WS_URL = `wss://stream.binance.com:9443/ws/${SYMBOL}@kline_${INTERVAL}`;
const REST_URL = `https://api.binance.com/api/v3/klines?symbol=PAXGUSDT&interval=${INTERVAL}&limit=100`;

export function RealTimeChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const seriesRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chartRef = useRef<any>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const [price, setPrice] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [change, setChange] = useState<number>(0);

  const isMounted = useRef(true);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  useEffect(() => {
    if (!containerRef.current) return;
    isMounted.current = true;

    const chart = createChart(containerRef.current, {
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
      layout: {
        background: { color: 'transparent' },
        textColor: '#9CA3AF'
      },
      grid: {
        vertLines: { color: 'rgba(255,255,255,0.05)' },
        horzLines: { color: 'rgba(255,255,255,0.05)' }
      },
      crosshair: { mode: 1 },
      rightPriceScale: {
        borderColor: 'rgba(255,255,255,0.1)',
        textColor: '#9CA3AF'
      },
      timeScale: {
        borderColor: 'rgba(255,255,255,0.1)',
        timeVisible: true,
        secondsVisible: false
      }
    });
    chartRef.current = chart;

    const series = chart.addSeries(CandlestickSeries, {
      upColor: '#22c55e',
      downColor: '#ef4444',
      borderUpColor: '#22c55e',
      borderDownColor: '#ef4444',
      wickUpColor: '#22c55e',
      wickDownColor: '#ef4444'
    });
    seriesRef.current = series;

    // Load historical candles
    fetch(REST_URL)
      .then((r) => r.json())
      .then((raw: number[][]) => {
        if (!isMounted.current || !seriesRef.current) return;
        const candles: CandlestickData<Time>[] = raw.map((k) => ({
          time: Math.floor(k[0] / 1000) as Time,
          open: parseFloat(k[1] as unknown as string),
          high: parseFloat(k[2] as unknown as string),
          low: parseFloat(k[3] as unknown as string),
          close: parseFloat(k[4] as unknown as string)
        }));
        seriesRef.current?.setData(candles);

        if (candles.length >= 2) {
          const first = candles[0].close;
          const last = candles[candles.length - 1].close;
          setChange(((last - first) / first) * 100);
          setPrice(last.toFixed(2));
        }
        chartRef.current?.timeScale().fitContent();
      })
      .catch(console.error);

    // WebSocket live feed
    const connect = () => {
      if (!isMounted.current) return;
      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;
      ws.onopen = () => {
        if (isMounted.current) setIsConnected(true);
      };
      ws.onclose = () => {
        if (isMounted.current) {
          setIsConnected(false);
          reconnectTimeoutRef.current = setTimeout(connect, 3000);
        }
      };
      ws.onerror = () => ws.close();
      ws.onmessage = (event) => {
        if (!isMounted.current || !seriesRef.current) return;
        const { k } = JSON.parse(event.data);
        seriesRef.current?.update({
          time: Math.floor(k.t / 1000) as Time,
          open: parseFloat(k.o),
          high: parseFloat(k.h),
          low: parseFloat(k.l),
          close: parseFloat(k.c)
        });
        setPrice(parseFloat(k.c).toFixed(2));
      };
    };
    connect();

    const observer = new ResizeObserver(() => {
      if (containerRef.current && isMounted.current && chartRef.current) {
        chartRef.current?.applyOptions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    });
    observer.observe(containerRef.current);

    return () => {
      isMounted.current = false;
      if (reconnectTimeoutRef.current)
        clearTimeout(reconnectTimeoutRef.current);
      observer.disconnect();
      wsRef.current?.close();
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, []);

  const isPositive = change >= 0;

  return (
    <div className="relative w-full h-full flex flex-col">
      <div className="flex items-start justify-between px-3 pt-2 pb-1 shrink-0">
        <div>
          <p className="text-[10px] text-neutral-400 uppercase tracking-widest">
            PAXG/USDT · Gold · 1m
          </p>
          <p className="text-xl font-bold text-white leading-none">
            {price ? `$${price}` : '—'}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              isPositive
                ? 'bg-emerald-500/20 text-emerald-400'
                : 'bg-red-500/20 text-red-400'
            }`}
          >
            {isPositive ? '+' : ''}
            {change.toFixed(2)}%
          </span>
          <span className="flex items-center gap-1 text-[9px] text-neutral-500">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'
              }`}
            />
            {isConnected ? 'LIVE' : 'Reconnecting...'}
          </span>
        </div>
      </div>
      <div ref={containerRef} className="flex-1 w-full min-h-0" />
    </div>
  );
}
