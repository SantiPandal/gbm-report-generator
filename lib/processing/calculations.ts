import { Deal, ProcessedData } from '@/types';

export function calculateMetrics(): ProcessedData {
  return { totalDeals: 0, successRate: 0, industryBreakdown: [], topDeals: [], trends: [] };
}