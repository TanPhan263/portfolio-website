// Chart visual configuration for lightweight-charts v5

import type { DeepPartial, ChartOptions } from 'lightweight-charts';

export const CHART_COLORS = {
  up: '#22c55e',
  down: '#ef4444',
  volumeUp: 'rgba(34,197,94,0.35)',
  volumeDown: 'rgba(239,68,68,0.35)',
  grid: 'rgba(255,255,255,0.05)',
  border: 'rgba(255,255,255,0.1)',
  text: '#9CA3AF',
  background: 'transparent',
} as const;

export const BASE_CHART_OPTIONS: DeepPartial<ChartOptions> = {
  layout: {
    background: { color: CHART_COLORS.background },
    textColor: CHART_COLORS.text,
  },
  grid: {
    vertLines: { color: CHART_COLORS.grid },
    horzLines: { color: CHART_COLORS.grid },
  },
  crosshair: {
    mode: 1, // Normal crosshair
  },
  rightPriceScale: {
    borderColor: CHART_COLORS.border,
    textColor: CHART_COLORS.text,
    scaleMargins: {
      top: 0.05,
      bottom: 0.25, // Reserve space for volume at the bottom
    },
  },
  leftPriceScale: {
    visible: false,
  },
  timeScale: {
    borderColor: CHART_COLORS.border,
    timeVisible: true,
    secondsVisible: false,
    rightOffset: 5,
    barSpacing: 6,
  },
  handleScroll: true,
  handleScale: true,
};

export const CANDLESTICK_OPTIONS = {
  upColor: CHART_COLORS.up,
  downColor: CHART_COLORS.down,
  borderUpColor: CHART_COLORS.up,
  borderDownColor: CHART_COLORS.down,
  wickUpColor: CHART_COLORS.up,
  wickDownColor: CHART_COLORS.down,
};

export const VOLUME_OPTIONS = {
  priceFormat: { type: 'volume' as const },
  priceScaleId: 'volume',
};

export const VOLUME_PRICE_SCALE_OPTIONS = {
  scaleMargins: {
    top: 0.78, // Volume occupies bottom 22%
    bottom: 0,
  },
  visible: false, // Hide volume price axis
};
