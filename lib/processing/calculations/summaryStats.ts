import { Deal, SummaryStats } from '../types';
import { getLargestDeal } from './topDeals';
import { getMostActiveSector } from './industryBreakdown';

/**
 * Calculate comprehensive summary statistics for M&A deals
 * Provides overview metrics including totals, success rates, and key insights
 */
export function getSummaryStats(deals: Deal[]): SummaryStats {
  if (!deals || deals.length === 0) {
    return {
      totalDeals: 0,
      completedDeals: 0,
      pendingDeals: 0,
      terminatedDeals: 0,
      successRate: 0,
      totalValue: 0,
      avgDealSize: 0,
      medianDealSize: 0,
      largestDeal: null,
      mostActiveSector: 'No data available'
    };
  }

  // Count deals by status
  const completedDeals = deals.filter(deal => deal.dealStatus === 'Completed').length;
  const pendingDeals = deals.filter(deal => deal.dealStatus === 'Pending').length;
  const terminatedDeals = deals.filter(deal => deal.dealStatus === 'Terminated').length;
  
  // Calculate success rate (completed / total)
  const successRate = deals.length > 0 ? (completedDeals / deals.length) * 100 : 0;
  
  // Get deals with valid values for financial calculations
  const validValueDeals = deals.filter(deal => 
    deal.announcedValue && !isNaN(deal.announcedValue) && deal.announcedValue > 0
  );
  
  // Calculate total value
  const totalValue = validValueDeals.reduce((sum, deal) => sum + deal.announcedValue, 0);
  
  // Calculate average deal size
  const avgDealSize = validValueDeals.length > 0 ? totalValue / validValueDeals.length : 0;
  
  // Calculate median deal size
  const medianDealSize = calculateMedian(validValueDeals.map(deal => deal.announcedValue));
  
  // Get largest deal
  const largestDeal = getLargestDeal(deals);
  
  // Get most active sector
  const mostActiveSector = getMostActiveSector(deals);

  return {
    totalDeals: deals.length,
    completedDeals,
    pendingDeals,
    terminatedDeals,
    successRate: Math.round(successRate * 100) / 100, // Round to 2 decimal places
    totalValue: Math.round(totalValue * 100) / 100,
    avgDealSize: Math.round(avgDealSize * 100) / 100,
    medianDealSize: Math.round(medianDealSize * 100) / 100,
    largestDeal,
    mostActiveSector
  };
}

/**
 * Calculate median value from array of numbers
 */
function calculateMedian(values: number[]): number {
  if (values.length === 0) {
    return 0;
  }
  
  const sortedValues = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sortedValues.length / 2);
  
  if (sortedValues.length % 2 === 0) {
    // Even number of values - average of two middle values
    return (sortedValues[middle - 1] + sortedValues[middle]) / 2;
  } else {
    // Odd number of values - middle value
    return sortedValues[middle];
  }
}

/**
 * Get summary stats for specific status
 */
export function getSummaryStatsByStatus(
  deals: Deal[], 
  status: 'Completed' | 'Pending' | 'Terminated'
): SummaryStats {
  const statusDeals = deals.filter(deal => deal.dealStatus === status);
  return getSummaryStats(statusDeals);
}

/**
 * Get summary stats for specific year
 */
export function getSummaryStatsByYear(deals: Deal[], year: number): SummaryStats {
  const yearDeals = deals.filter(deal => {
    if (!deal.announceDate || isNaN(deal.announceDate.getTime())) {
      return false;
    }
    return deal.announceDate.getFullYear() === year;
  });
  return getSummaryStats(yearDeals);
}

/**
 * Get summary stats for specific industry
 */
export function getSummaryStatsByIndustry(deals: Deal[], industry: string): SummaryStats {
  const industryDeals = deals.filter(deal => 
    deal.targetIndustry.toLowerCase().includes(industry.toLowerCase())
  );
  return getSummaryStats(industryDeals);
}

/**
 * Get comparative summary stats (current vs previous period)
 */
export interface ComparativeSummary {
  current: SummaryStats;
  previous: SummaryStats;
  comparison: {
    totalDealsChange: number;
    totalDealsChangePercent: number;
    successRateChange: number;
    totalValueChange: number;
    totalValueChangePercent: number;
    avgDealSizeChange: number;
    avgDealSizeChangePercent: number;
  };
}

export function getComparativeSummaryStats(
  currentDeals: Deal[], 
  previousDeals: Deal[]
): ComparativeSummary {
  const current = getSummaryStats(currentDeals);
  const previous = getSummaryStats(previousDeals);
  
  // Calculate changes
  const totalDealsChange = current.totalDeals - previous.totalDeals;
  const totalDealsChangePercent = previous.totalDeals > 0 
    ? (totalDealsChange / previous.totalDeals) * 100 
    : 0;
  
  const successRateChange = current.successRate - previous.successRate;
  
  const totalValueChange = current.totalValue - previous.totalValue;
  const totalValueChangePercent = previous.totalValue > 0 
    ? (totalValueChange / previous.totalValue) * 100 
    : 0;
  
  const avgDealSizeChange = current.avgDealSize - previous.avgDealSize;
  const avgDealSizeChangePercent = previous.avgDealSize > 0 
    ? (avgDealSizeChange / previous.avgDealSize) * 100 
    : 0;

  return {
    current,
    previous,
    comparison: {
      totalDealsChange,
      totalDealsChangePercent: Math.round(totalDealsChangePercent * 100) / 100,
      successRateChange: Math.round(successRateChange * 100) / 100,
      totalValueChange: Math.round(totalValueChange * 100) / 100,
      totalValueChangePercent: Math.round(totalValueChangePercent * 100) / 100,
      avgDealSizeChange: Math.round(avgDealSizeChange * 100) / 100,
      avgDealSizeChangePercent: Math.round(avgDealSizeChangePercent * 100) / 100
    }
  };
}

/**
 * Get summary statistics with additional market insights
 */
export interface ExtendedSummaryStats extends SummaryStats {
  marketInsights: {
    dealVelocity: number; // Deals per month (for current year)
    marketConcentration: number; // Percentage of total value from top 5 deals
    averageTimeToCompletion?: number; // Days (if completion dates available)
    volatilityIndex: number; // Coefficient of variation in deal sizes
    largestDealMultiple?: number; // How many times larger than median
  };
}

export function getExtendedSummaryStats(deals: Deal[]): ExtendedSummaryStats {
  const basicStats = getSummaryStats(deals);
  
  if (deals.length === 0) {
    return {
      ...basicStats,
      marketInsights: {
        dealVelocity: 0,
        marketConcentration: 0,
        volatilityIndex: 0
      }
    };
  }
  
  // Calculate deal velocity (deals per month for current year)
  const currentYear = new Date().getFullYear();
  const currentYearDeals = deals.filter(deal => {
    if (!deal.announceDate || isNaN(deal.announceDate.getTime())) return false;
    return deal.announceDate.getFullYear() === currentYear;
  });
  const currentMonth = new Date().getMonth() + 1; // 1-12
  const dealVelocity = currentYearDeals.length / currentMonth;
  
  // Calculate market concentration (top 5 deals as % of total)
  const validValueDeals = deals.filter(deal => 
    deal.announcedValue && !isNaN(deal.announcedValue) && deal.announcedValue > 0
  );
  const sortedDeals = validValueDeals.sort((a, b) => b.announcedValue - a.announcedValue);
  const top5Value = sortedDeals.slice(0, 5).reduce((sum, deal) => sum + deal.announcedValue, 0);
  const marketConcentration = basicStats.totalValue > 0 ? (top5Value / basicStats.totalValue) * 100 : 0;
  
  // Calculate average time to completion
  const completedDealsWithDates = deals.filter(deal => 
    deal.dealStatus === 'Completed' &&
    deal.announceDate && !isNaN(deal.announceDate.getTime()) &&
    deal.completionDate && !isNaN(deal.completionDate.getTime())
  );
  
  const avgTimeToCompletion = completedDealsWithDates.length > 0
    ? completedDealsWithDates.reduce((sum, deal) => {
        const timeDiff = deal.completionDate!.getTime() - deal.announceDate.getTime();
        return sum + (timeDiff / (1000 * 60 * 60 * 24)); // Convert to days
      }, 0) / completedDealsWithDates.length
    : undefined;
  
  // Calculate volatility index (coefficient of variation)
  const dealValues = validValueDeals.map(deal => deal.announcedValue);
  const volatilityIndex = calculateCoefficientOfVariation(dealValues);
  
  // Calculate largest deal multiple
  const largestDealMultiple = basicStats.largestDeal && basicStats.medianDealSize > 0
    ? basicStats.largestDeal.announcedValue / basicStats.medianDealSize
    : undefined;

  return {
    ...basicStats,
    marketInsights: {
      dealVelocity: Math.round(dealVelocity * 100) / 100,
      marketConcentration: Math.round(marketConcentration * 100) / 100,
      averageTimeToCompletion: avgTimeToCompletion 
        ? Math.round(avgTimeToCompletion * 100) / 100 
        : undefined,
      volatilityIndex: Math.round(volatilityIndex * 100) / 100,
      largestDealMultiple: largestDealMultiple 
        ? Math.round(largestDealMultiple * 100) / 100 
        : undefined
    }
  };
}

/**
 * Calculate coefficient of variation (standard deviation / mean)
 */
function calculateCoefficientOfVariation(values: number[]): number {
  if (values.length <= 1) {
    return 0;
  }
  
  const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
  
  if (mean === 0) {
    return 0;
  }
  
  const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
  const standardDeviation = Math.sqrt(variance);
  
  return (standardDeviation / mean) * 100; // Return as percentage
}