// TypeScript types for the lightweight-chart integration

import type { CandlestickData, HistogramData, Time } from 'lightweight-charts';

export interface BinanceKline {
  /** Kline open time (ms) */
  t: number;
  /** Open */
  o: string;
  /** High */
  h: string;
  /** Low */
  l: string;
  /** Close */
  c: string;
  /** Volume */
  v: string;
  /** Is kline closed? */
  x: boolean;
}

export interface BinanceKlineMessage {
  e: string;
  s: string;
  k: BinanceKline;
}

export interface BinanceRawKline extends Array<number | string> {
  0: number; // Open time
  1: string; // Open
  2: string; // High
  3: string; // Low
  4: string; // Close
  5: string; // Volume
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ChartCandle extends CandlestickData<Time> {}

export interface ChartVolume extends HistogramData<Time> {
  color: string;
}

export interface SymbolDefinition {
  /** Binance symbol (e.g. PAXGUSDT) */
  symbol: string;
  /** Lowercase for WS stream (e.g. paxgusdt) */
  streamSymbol: string;
  /** Human readable label */
  label: string;
  /** Short display name */
  shortName: string;
  /** Currency suffix */
  currency: string;
}

export type Interval = '1s' | '1m' | '3m' | '5m' | '15m' | '30m' | '1h' | '4h' | '1d';

export interface StreamState {
  price: number | null;
  changePercent: number;
  volume24h: number;
  isConnected: boolean;
}
