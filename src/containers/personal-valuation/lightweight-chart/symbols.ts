// Symbol registry for Binance market data integration

import type { SymbolDefinition } from './types';

export const SYMBOLS: Record<string, SymbolDefinition> = {
  PAXGUSDT: {
    symbol: 'PAXGUSDT',
    streamSymbol: 'paxgusdt',
    label: 'Pax Gold / USDT',
    shortName: 'PAXG',
    currency: 'USDT',
  },
  BTCUSDT: {
    symbol: 'BTCUSDT',
    streamSymbol: 'btcusdt',
    label: 'Bitcoin / USDT',
    shortName: 'BTC',
    currency: 'USDT',
  },
  ETHUSDT: {
    symbol: 'ETHUSDT',
    streamSymbol: 'ethusdt',
    label: 'Ethereum / USDT',
    shortName: 'ETH',
    currency: 'USDT',
  },
};

export const DEFAULT_SYMBOL = 'PAXGUSDT';

export function getSymbol(key: string): SymbolDefinition {
  return SYMBOLS[key] ?? SYMBOLS[DEFAULT_SYMBOL];
}

/**
 * Build a Binance klines REST URL.
 * @param endTime  Optional upper bound timestamp (ms). Used for paginated history loads.
 */
export function buildRestUrl(symbol: string, interval: string, limit = 200, endTime?: number): string {
  const base = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`;
  return endTime ? `${base}&endTime=${endTime}` : base;
}

export function buildWsUrl(streamSymbol: string, interval: string): string {
  // Use :9443 (or :443 as fallback for environments that block :9443)
  return `wss://stream.binance.com:9443/ws/${streamSymbol}@kline_${interval}`;
}
