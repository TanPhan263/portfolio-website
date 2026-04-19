'use client';

import { CandlestickSeries, createChart, HistogramSeries } from 'lightweight-charts';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  BASE_CHART_OPTIONS,
  CANDLESTICK_OPTIONS,
  CHART_COLORS,
  VOLUME_OPTIONS,
  VOLUME_PRICE_SCALE_OPTIONS,
} from './config';
import { buildRestUrl, buildWsUrl, DEFAULT_SYMBOL, getSymbol } from './symbols';
import type { BinanceRawKline, ChartCandle, ChartVolume, Interval } from './types';
import { useBinanceStream } from './use-binance-stream';
import { useHistoricalData } from './use-historical-data';

interface LiveChartProps {
  symbolKey?: string;
  interval?: Interval;
}

const INTERVALS: Interval[] = ['1m', '5m', '15m', '1h', '4h', '1d'];
/** Fetch 200 candles per batch */
const BATCH_SIZE = 200;
/** How many bars from the left edge triggers a history load */
const LOAD_MORE_THRESHOLD = 15;

export function LiveChart({
  symbolKey = DEFAULT_SYMBOL,
  interval: defaultInterval = '1m',
}: LiveChartProps) {
  const [interval, setInterval] = useState<Interval>(defaultInterval);
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chartRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const candleSeriesRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const volumeSeriesRef = useRef<any>(null);
  const [livePrice, setLivePrice] = useState<number | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // ── Infinite-scroll state tracked in refs (no re-render needed) ──────────
  /** All accumulated candles sorted asc by time */
  const allCandlesRef = useRef<ChartCandle[]>([]);
  const allVolumesRef = useRef<ChartVolume[]>([]);
  /** Oldest candle time in seconds — used as endTime cursor for next fetch */
  const oldestTimeRef = useRef<number | null>(null);
  /** Prevents concurrent history fetches */
  const isFetchingMoreRef = useRef(false);
  /** True once we have loaded as far back as Binance can give */
  const reachedBeginningRef = useRef(false);

  const symbolDef = getSymbol(symbolKey);
  const restUrl = buildRestUrl(symbolDef.symbol, interval, BATCH_SIZE);
  const wsUrl = buildWsUrl(symbolDef.streamSymbol, interval);

  // Historical data (initial load)
  const { candles, volumes, changePercent, closePrice, isLoading, error } =
    useHistoricalData(restUrl);

  // ─── Helper: raw kline array → ChartCandle[] + ChartVolume[] ─────────────
  const parseRawKlines = useCallback(
    (raw: BinanceRawKline[]): { candles: ChartCandle[]; volumes: ChartVolume[] } => {
      const parsedCandles: ChartCandle[] = raw.map(k => ({
        time: Math.floor(Number(k[0]) / 1000) as ChartCandle['time'],
        open: parseFloat(k[1] as string),
        high: parseFloat(k[2] as string),
        low: parseFloat(k[3] as string),
        close: parseFloat(k[4] as string),
      }));
      const parsedVolumes: ChartVolume[] = raw.map(k => {
        const close = parseFloat(k[4] as string);
        const open = parseFloat(k[1] as string);
        return {
          time: Math.floor(Number(k[0]) / 1000) as ChartVolume['time'],
          value: parseFloat(k[5] as string),
          color: close >= open ? CHART_COLORS.volumeUp : CHART_COLORS.volumeDown,
        };
      });
      return { candles: parsedCandles, volumes: parsedVolumes };
    },
    []
  );

  // ─── Fetch & prepend older history ────────────────────────────────────────
  const fetchMoreHistory = useCallback(async () => {
    if (
      isFetchingMoreRef.current ||
      reachedBeginningRef.current ||
      oldestTimeRef.current === null ||
      !candleSeriesRef.current
    ) return;

    isFetchingMoreRef.current = true;
    setIsLoadingMore(true);

    try {
      // endTime = 1 ms before our oldest candle (convert s → ms)
      const endTimeMs = oldestTimeRef.current * 1000 - 1;
      const url = buildRestUrl(symbolDef.symbol, interval, BATCH_SIZE, endTimeMs);
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const raw: BinanceRawKline[] = await res.json();

      if (raw.length === 0) {
        reachedBeginningRef.current = true;
        return;
      }

      const { candles: newCandles, volumes: newVolumes } = parseRawKlines(raw);

      // Prepend to accumulated arrays (oldest first is guaranteed by Binance)
      allCandlesRef.current = [...newCandles, ...allCandlesRef.current];
      allVolumesRef.current = [...newVolumes, ...allVolumesRef.current];

      // Update the cursor
      oldestTimeRef.current = newCandles[0].time as number;

      // Re-render the chart with the merged dataset
      candleSeriesRef.current.setData(allCandlesRef.current);
      volumeSeriesRef.current?.setData(allVolumesRef.current);

      if (raw.length < BATCH_SIZE) {
        reachedBeginningRef.current = true;
      }
    } catch (err) {
      console.error('[LiveChart] fetchMoreHistory error:', err);
    } finally {
      isFetchingMoreRef.current = false;
      setIsLoadingMore(false);
    }
  }, [symbolDef.symbol, interval, parseRawKlines]);

  // ─── Init chart once ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      ...BASE_CHART_OPTIONS,
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
    });
    chartRef.current = chart;

    // Candlestick series
    const candleSeries = chart.addSeries(CandlestickSeries, CANDLESTICK_OPTIONS);
    candleSeriesRef.current = candleSeries;

    // Volume series with independent price scale
    const volSeries = chart.addSeries(HistogramSeries, {
      ...VOLUME_OPTIONS,
      color: CHART_COLORS.volumeUp,
    });
    volSeries.priceScale().applyOptions(VOLUME_PRICE_SCALE_OPTIONS);
    volumeSeriesRef.current = volSeries;

    // ── Visible range subscription → trigger history load when near left edge ─
    chart.timeScale().subscribeVisibleLogicalRangeChange(range => {
      if (range === null) return;
      if (range.from < LOAD_MORE_THRESHOLD) {
        fetchMoreHistory();
      }
    });

    // ── Stop page scroll from stealing wheel events over the chart ────────────
    const el = containerRef.current;
    const captureWheel = (e: WheelEvent) => {
      e.stopPropagation();
      if (e.ctrlKey || e.metaKey) e.preventDefault();
    };
    el.addEventListener('wheel', captureWheel, { passive: false });

    // Resize observer
    const ro = new ResizeObserver(() => {
      if (containerRef.current) {
        chart.applyOptions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    });
    ro.observe(containerRef.current);

    return () => {
      ro.disconnect();
      el.removeEventListener('wheel', captureWheel);
      chart.remove();
    };
    // fetchMoreHistory is stable via useCallback with its own deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Re-subscribe when fetchMoreHistory changes (interval/symbol changes) ──
  useEffect(() => {
    if (!chartRef.current) return;
    chartRef.current.timeScale().unsubscribeVisibleLogicalRangeChange();
    chartRef.current.timeScale().subscribeVisibleLogicalRangeChange((range: { from: number } | null) => {
      if (range === null) return;
      if (range.from < LOAD_MORE_THRESHOLD) fetchMoreHistory();
    });
  }, [fetchMoreHistory]);

  // ─── Load initial historical data into chart ───────────────────────────────
  useEffect(() => {
    if (!candleSeriesRef.current || !volumeSeriesRef.current || candles.length === 0) return;

    // Reset pagination state on symbol/interval change
    allCandlesRef.current = [...candles];
    allVolumesRef.current = [...volumes];
    oldestTimeRef.current = candles[0].time as number;
    reachedBeginningRef.current = false;

    candleSeriesRef.current.setData(candles);
    volumeSeriesRef.current.setData(volumes);
    chartRef.current?.timeScale().fitContent();
  }, [candles, volumes]);

  // ─── Live stream handler ───────────────────────────────────────────────────
  const handleCandle = useCallback((candle: ChartCandle, volume: ChartVolume) => {
    candleSeriesRef.current?.update(candle);
    volumeSeriesRef.current?.update(volume);
    setLivePrice(candle.close);
  }, []);

  const { isConnected } = useBinanceStream({ wsUrl, onCandle: handleCandle });

  const displayPrice = livePrice ?? closePrice;
  const isPositive = changePercent >= 0;

  return (
    <div className="relative w-full h-full flex flex-col bg-transparent">
      {/* ── Top Bar ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-3 pt-2 pb-1 shrink-0 gap-2">
        <div className="min-w-0">
          <p className="text-[9px] text-neutral-500 uppercase tracking-widest truncate">
            {symbolDef.label}
          </p>
          <div className="flex items-baseline gap-2">
            <p className="text-lg font-bold text-white leading-none tabular-nums">
              {displayPrice != null
                ? `$${displayPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                : '—'}
            </p>
            {displayPrice != null && (
              <span className={`text-[10px] font-semibold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                {isPositive ? '+' : ''}{changePercent.toFixed(2)}%
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end gap-1 shrink-0">
          <div className="flex gap-0.5">
            {INTERVALS.map(iv => (
              <button
                key={iv}
                onClick={() => setInterval(iv)}
                className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase transition-colors ${
                  interval === iv ? 'bg-white/15 text-white' : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                {iv}
              </button>
            ))}
          </div>
          <span className="flex items-center gap-1 text-[9px] text-neutral-500">
            <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
            {isConnected ? 'LIVE' : 'Reconnecting...'}
          </span>
        </div>
      </div>

      {/* ── Chart Container ─────────────────────────────────────────── */}
      <div className="relative flex-1 min-h-0 w-full">
        {/* Initial loading */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/30 backdrop-blur-sm rounded-lg">
            <div className="flex gap-1.5">
              {[0, 1, 2].map(i => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
              ))}
            </div>
          </div>
        )}
        {/* "Loading more history" indicator — subtle top-left badge */}
        {isLoadingMore && (
          <div className="absolute top-2 left-2 z-10 flex items-center gap-1.5 px-2 py-1 rounded bg-black/60 backdrop-blur-sm text-[9px] text-neutral-400 uppercase tracking-widest">
            <span className="w-1 h-1 rounded-full bg-blue-400 animate-pulse" />
            Loading history…
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center z-10 text-red-400 text-xs text-center px-4">
            {error}
          </div>
        )}
        <div ref={containerRef} className="w-full h-full" />
      </div>
    </div>
  );
}
