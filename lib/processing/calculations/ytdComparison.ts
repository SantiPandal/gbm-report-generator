import { Deal, YTDComparisonData } from '../types';

/**
 * Calculate YTD (Year-to-Date) comparison data
 * Compares current year-to-date with previous year-to-date up to the same day of year
 */
export function getYTDComparison(
  deals: Deal[], 
  asOfDate: Date = new Date()
): YTDComparisonData | null {
  if (!deals || deals.length === 0) {
    return null;
  }

  const currentYear = asOfDate.getFullYear();
  const previousYear = currentYear - 1;
  
  // Calculate day of year for the as-of date
  const dayOfYear = getDayOfYear(asOfDate);
  
  // Get current YTD deals (announced this year up to as-of date)
  const currentYTDDeals = deals.filter(deal => {
    if (!deal.announceDate || isNaN(deal.announceDate.getTime())) {
      return false;
    }
    
    const dealYear = deal.announceDate.getFullYear();
    const dealDayOfYear = getDayOfYear(deal.announceDate);
    
    return dealYear === currentYear && dealDayOfYear <= dayOfYear;
  });
  
  // Get previous YTD deals (announced last year up to same day of year)
  const previousYTDDeals = deals.filter(deal => {
    if (!deal.announceDate || isNaN(deal.announceDate.getTime())) {
      return false;
    }
    
    const dealYear = deal.announceDate.getFullYear();
    const dealDayOfYear = getDayOfYear(deal.announceDate);
    
    return dealYear === previousYear && dealDayOfYear <= dayOfYear;
  });
  
  // Calculate current YTD metrics
  const currentYTDValue = currentYTDDeals
    .filter(deal => deal.announcedValue && !isNaN(deal.announcedValue))
    .reduce((sum, deal) => sum + deal.announcedValue, 0);
  
  // Calculate previous YTD metrics
  const previousYTDValue = previousYTDDeals
    .filter(deal => deal.announcedValue && !isNaN(deal.announcedValue))
    .reduce((sum, deal) => sum + deal.announcedValue, 0);
  
  // Calculate comparison metrics
  const dealCountChange = currentYTDDeals.length - previousYTDDeals.length;
  const dealCountChangePercent = previousYTDDeals.length > 0 
    ? (dealCountChange / previousYTDDeals.length) * 100 
    : 0;
  
  const valueChange = currentYTDValue - previousYTDValue;
  const valueChangePercent = previousYTDValue > 0 
    ? (valueChange / previousYTDValue) * 100 
    : 0;

  return {
    currentYTD: {
      year: currentYear,
      dealCount: currentYTDDeals.length,
      totalValue: Math.round(currentYTDValue * 100) / 100,
      asOfDate: new Date(asOfDate)
    },
    previousYTD: {
      year: previousYear,
      dealCount: previousYTDDeals.length,
      totalValue: Math.round(previousYTDValue * 100) / 100,
      asOfDate: new Date(previousYear, asOfDate.getMonth(), asOfDate.getDate())
    },
    comparison: {
      dealCountChange,
      dealCountChangePercent: Math.round(dealCountChangePercent * 100) / 100,
      valueChange: Math.round(valueChange * 100) / 100,
      valueChangePercent: Math.round(valueChangePercent * 100) / 100
    }
  };
}

/**
 * Get YTD comparison for a specific month (e.g., March YTD)
 */
export function getMonthlyYTDComparison(
  deals: Deal[], 
  month: number, // 0-11 (January = 0)
  year?: number
): YTDComparisonData | null {
  const targetYear = year || new Date().getFullYear();
  
  // Last day of the specified month in the target year
  const endOfMonth = new Date(targetYear, month + 1, 0); // Last day of month
  
  return getYTDComparison(deals, endOfMonth);
}

/**
 * Get quarterly YTD comparison (Q1, Q2, Q3, Q4)
 */
export function getQuarterlyYTDComparison(
  deals: Deal[], 
  quarter: 1 | 2 | 3 | 4,
  year?: number
): YTDComparisonData | null {
  const targetYear = year || new Date().getFullYear();
  
  // Last day of each quarter
  const quarterEndDates = {
    1: new Date(targetYear, 2, 31), // March 31
    2: new Date(targetYear, 5, 30), // June 30  
    3: new Date(targetYear, 8, 30), // September 30
    4: new Date(targetYear, 11, 31) // December 31
  };
  
  return getYTDComparison(deals, quarterEndDates[quarter]);
}

/**
 * Calculate day of year (1-366)
 */
function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

/**
 * Get YTD deals for current year
 */
export function getCurrentYTDDeals(
  deals: Deal[], 
  asOfDate: Date = new Date()
): Deal[] {
  const currentYear = asOfDate.getFullYear();
  const dayOfYear = getDayOfYear(asOfDate);
  
  return deals.filter(deal => {
    if (!deal.announceDate || isNaN(deal.announceDate.getTime())) {
      return false;
    }
    
    const dealYear = deal.announceDate.getFullYear();
    const dealDayOfYear = getDayOfYear(deal.announceDate);
    
    return dealYear === currentYear && dealDayOfYear <= dayOfYear;
  });
}

/**
 * Get YTD deals for previous year (same period)
 */
export function getPreviousYTDDeals(
  deals: Deal[], 
  asOfDate: Date = new Date()
): Deal[] {
  const previousYear = asOfDate.getFullYear() - 1;
  const dayOfYear = getDayOfYear(asOfDate);
  
  return deals.filter(deal => {
    if (!deal.announceDate || isNaN(deal.announceDate.getTime())) {
      return false;
    }
    
    const dealYear = deal.announceDate.getFullYear();
    const dealDayOfYear = getDayOfYear(deal.announceDate);
    
    return dealYear === previousYear && dealDayOfYear <= dayOfYear;
  });
}

/**
 * Format YTD comparison for display
 */
export function formatYTDComparison(ytdData: YTDComparisonData): {
  currentYTDFormatted: string;
  previousYTDFormatted: string;
  dealCountTrend: 'up' | 'down' | 'flat';
  valueTrend: 'up' | 'down' | 'flat';
} {
  const dealCountTrend = ytdData.comparison.dealCountChange > 0 ? 'up' : 
                        ytdData.comparison.dealCountChange < 0 ? 'down' : 'flat';
  
  const valueTrend = ytdData.comparison.valueChange > 0 ? 'up' : 
                    ytdData.comparison.valueChange < 0 ? 'down' : 'flat';
  
  return {
    currentYTDFormatted: `${ytdData.currentYTD.dealCount} deals, $${ytdData.currentYTD.totalValue.toLocaleString()}M`,
    previousYTDFormatted: `${ytdData.previousYTD.dealCount} deals, $${ytdData.previousYTD.totalValue.toLocaleString()}M`,
    dealCountTrend,
    valueTrend
  };
}