import { Deal } from './types';
import {
  getMonthlyTransactions,
  getYearlyComparison,
  getYTDComparison,
  getIndustryBreakdown,
  getTopDeals,
  getSummaryStats,
  getExtendedSummaryStats
} from './calculations/index';

/**
 * Main orchestrator function that processes M&A data and returns comprehensive analysis
 * Combines all individual calculation functions into a single result
 */
export function processMAData(
  deals: Deal[], 
  options: {
    year?: number;
    includeExtended?: boolean;
    topDealsCount?: number;
    asOfDate?: Date;
  } = {}
) {
  const {
    year = new Date().getFullYear(),
    includeExtended = false,
    topDealsCount = 10,
    asOfDate = new Date()
  } = options;

  if (!deals || deals.length === 0) {
    return {
      monthlyTransactions: [],
      yearlyComparison: [],
      ytdComparison: null,
      industryBreakdown: [],
      topDeals: [],
      summary: getSummaryStats([]),
      metadata: {
        totalDealsProcessed: 0,
        validDealsCount: 0,
        processingDate: new Date().toISOString(),
        year,
        asOfDate: asOfDate.toISOString()
      }
    };
  }

  // Filter valid deals (those with valid announce dates)
  const validDeals = deals.filter(deal => 
    deal.announceDate && !isNaN(deal.announceDate.getTime())
  );

  // Calculate all metrics
  const monthlyTransactions = getMonthlyTransactions(validDeals, year);
  const yearlyComparison = getYearlyComparison(validDeals);
  const ytdComparison = getYTDComparison(validDeals, asOfDate);
  const industryBreakdown = getIndustryBreakdown(validDeals);
  const topDeals = getTopDeals(validDeals, topDealsCount);
  const summary = includeExtended 
    ? getExtendedSummaryStats(validDeals)
    : getSummaryStats(validDeals);

  return {
    monthlyTransactions,
    yearlyComparison,
    ytdComparison,
    industryBreakdown,
    topDeals,
    summary,
    metadata: {
      totalDealsProcessed: deals.length,
      validDealsCount: validDeals.length,
      processingDate: new Date().toISOString(),
      year,
      asOfDate: asOfDate.toISOString()
    }
  };
}

/**
 * Legacy function for backward compatibility
 * @deprecated Use processMAData instead
 */
export function calculateMetrics(deals: Deal[] = []) {
  const result = processMAData(deals);
  
  // Transform to match old interface
  return {
    totalDeals: result.summary.totalDeals,
    successRate: result.summary.successRate,
    industryBreakdown: result.industryBreakdown,
    topDeals: result.topDeals,
    trends: result.yearlyComparison.map(year => ({
      period: year.year.toString(),
      value: year.totalValue
    }))
  };
}

/**
 * Quick analysis function for dashboard display
 */
export function getQuickAnalysis(deals: Deal[]) {
  const summary = getSummaryStats(deals);
  const topDeals = getTopDeals(deals, 5);
  const ytdComparison = getYTDComparison(deals);
  
  return {
    totalDeals: summary.totalDeals,
    totalValue: summary.totalValue,
    successRate: summary.successRate,
    largestDeal: summary.largestDeal,
    mostActiveSector: summary.mostActiveSector,
    topDeals: topDeals.slice(0, 3), // Top 3 for quick view
    ytdTrend: ytdComparison ? {
      current: ytdComparison.currentYTD,
      change: ytdComparison.comparison.dealCountChangePercent
    } : null
  };
}

/**
 * Generate insights text for reports
 */
export function generateInsights(deals: Deal[]): string[] {
  const summary = getSummaryStats(deals);
  const industryData = getIndustryBreakdown(deals);
  const ytdData = getYTDComparison(deals);
  const insights: string[] = [];

  // Total deals insight
  insights.push(`Se anunciaron ${summary.totalDeals} transacciones en el período analizado`);

  // Success rate insight
  if (summary.totalDeals > 0) {
    insights.push(`La tasa de éxito fue del ${summary.successRate}% con ${summary.completedDeals} transacciones completadas`);
  }

  // Value insight
  if (summary.totalValue > 0) {
    insights.push(`El valor total de las transacciones alcanzó $${summary.totalValue.toLocaleString()}M USD`);
  }

  // Industry insight
  if (industryData.length > 0) {
    const topIndustry = industryData[0];
    insights.push(`El sector más activo fue ${topIndustry.industry} con ${topIndustry.count} transacciones`);
  }

  // YTD comparison insight
  if (ytdData && ytdData.comparison.dealCountChange !== 0) {
    const trend = ytdData.comparison.dealCountChange > 0 ? 'aumento' : 'disminución';
    const percent = Math.abs(ytdData.comparison.dealCountChangePercent);
    insights.push(`Comparado con el año anterior, hubo un ${trend} del ${percent}% en el número de transacciones`);
  }

  // Average deal size insight
  if (summary.avgDealSize > 0) {
    insights.push(`El tamaño promedio de transacción fue de $${summary.avgDealSize.toFixed(1)}M USD`);
  }

  return insights;
}