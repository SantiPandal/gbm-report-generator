export const CHAR_BUDGETS = {
  panoramaHeader: {
    highlightDetail: 120,
    ipoDetail: 140,
    quote: 240,
  },
  maPerspective: {
    summary: 140,
  },
  capitalMarkets: {
    equityHighlight: 120,
  },
} as const;

export function truncateText(text: string, limit: number): string {
  if (!text) return text;
  if (text.length <= limit) return text;
  return text.slice(0, Math.max(0, limit - 1)).trimEnd() + '…';
}


