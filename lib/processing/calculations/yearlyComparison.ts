import { Deal, YearlyData } from '../types';

/**
 * Calculate yearly comparison data - aggregate deals by year
 * Groups deals by year and calculates comprehensive statistics
 */
export function getYearlyComparison(deals: Deal[]): YearlyData[] {
  if (!deals || deals.length === 0) {
    return [];
  }

  // Group deals by announcement year
  const yearMap = new Map<number, Deal[]>();
  
  deals.forEach(deal => {
    if (!deal.announceDate || isNaN(deal.announceDate.getTime())) {
      return; // Skip deals with invalid dates
    }
    
    const year = deal.announceDate.getFullYear();
    
    if (!yearMap.has(year)) {
      yearMap.set(year, []);
    }
    yearMap.get(year)!.push(deal);
  });

  // Convert map to YearlyData array
  const yearlyData: YearlyData[] = Array.from(yearMap.entries()).map(([year, yearDeals]) => {
    // Count deals by status
    const completedDeals = yearDeals.filter(deal => deal.dealStatus === 'Completed').length;
    const pendingDeals = yearDeals.filter(deal => deal.dealStatus === 'Pending').length;
    const terminatedDeals = yearDeals.filter(deal => deal.dealStatus === 'Terminated').length;
    
    // Calculate total value for deals with valid amounts
    const totalValue = yearDeals
      .filter(deal => deal.announcedValue && !isNaN(deal.announcedValue))
      .reduce((sum, deal) => sum + deal.announcedValue, 0);
    
    // Calculate average deal size
    const validDeals = yearDeals.filter(deal => deal.announcedValue && !isNaN(deal.announcedValue));
    const avgDealSize = validDeals.length > 0 ? totalValue / validDeals.length : 0;
    
    // Calculate success rate
    const successRate = yearDeals.length > 0 ? (completedDeals / yearDeals.length) * 100 : 0;

    return {
      year,
      dealCount: yearDeals.length,
      totalValue: Math.round(totalValue * 100) / 100, // Round to 2 decimal places
      completedDeals,
      pendingDeals,
      terminatedDeals,
      successRate: Math.round(successRate * 100) / 100, // Round to 2 decimal places
      avgDealSize: Math.round(avgDealSize * 100) / 100 // Round to 2 decimal places
    };
  });

  // Sort by year ascending
  return yearlyData.sort((a, b) => a.year - b.year);
}

/**
 * Get yearly data for specific year range
 */
export function getYearlyComparisonByRange(
  deals: Deal[], 
  startYear: number, 
  endYear: number
): YearlyData[] {
  const allYearlyData = getYearlyComparison(deals);
  
  return allYearlyData.filter(data => 
    data.year >= startYear && data.year <= endYear
  );
}

/**
 * Get year-over-year growth data
 */
export function getYearOverYearGrowth(deals: Deal[]): Array<{
  year: number;
  dealCountGrowth: number;
  dealCountGrowthPercent: number;
  valueGrowth: number;
  valueGrowthPercent: number;
}> {
  const yearlyData = getYearlyComparison(deals);
  
  if (yearlyData.length < 2) {
    return [];
  }

  const growthData = [];
  
  for (let i = 1; i < yearlyData.length; i++) {
    const currentYear = yearlyData[i];
    const previousYear = yearlyData[i - 1];
    
    // Calculate growth in deal count
    const dealCountGrowth = currentYear.dealCount - previousYear.dealCount;
    const dealCountGrowthPercent = previousYear.dealCount > 0 
      ? (dealCountGrowth / previousYear.dealCount) * 100 
      : 0;
    
    // Calculate growth in total value
    const valueGrowth = currentYear.totalValue - previousYear.totalValue;
    const valueGrowthPercent = previousYear.totalValue > 0 
      ? (valueGrowth / previousYear.totalValue) * 100 
      : 0;

    growthData.push({
      year: currentYear.year,
      dealCountGrowth,
      dealCountGrowthPercent: Math.round(dealCountGrowthPercent * 100) / 100,
      valueGrowth: Math.round(valueGrowth * 100) / 100,
      valueGrowthPercent: Math.round(valueGrowthPercent * 100) / 100
    });
  }
  
  return growthData;
}

/**
 * Get yearly data for a specific year
 */
export function getYearlyDataForYear(deals: Deal[], year: number): YearlyData | null {
  const yearlyData = getYearlyComparison(deals);
  return yearlyData.find(data => data.year === year) || null;
}

/**
 * Get the most recent complete year data
 */
export function getMostRecentYearData(deals: Deal[]): YearlyData | null {
  const yearlyData = getYearlyComparison(deals);
  
  if (yearlyData.length === 0) {
    return null;
  }
  
  const currentYear = new Date().getFullYear();
  
  // Find the most recent year that's not the current year (assuming current year is incomplete)
  const completeYearData = yearlyData
    .filter(data => data.year < currentYear)
    .sort((a, b) => b.year - a.year);
  
  return completeYearData.length > 0 ? completeYearData[0] : yearlyData[yearlyData.length - 1];
}

/**
 * Compare two specific years
 */
export function compareYears(deals: Deal[], year1: number, year2: number): {
  year1Data: YearlyData | null;
  year2Data: YearlyData | null;
  comparison: {
    dealCountChange: number;
    dealCountChangePercent: number;
    valueChange: number;
    valueChangePercent: number;
    successRateChange: number;
  } | null;
} {
  const year1Data = getYearlyDataForYear(deals, year1);
  const year2Data = getYearlyDataForYear(deals, year2);
  
  if (!year1Data || !year2Data) {
    return {
      year1Data,
      year2Data,
      comparison: null
    };
  }
  
  const dealCountChange = year2Data.dealCount - year1Data.dealCount;
  const dealCountChangePercent = year1Data.dealCount > 0 
    ? (dealCountChange / year1Data.dealCount) * 100 
    : 0;
  
  const valueChange = year2Data.totalValue - year1Data.totalValue;
  const valueChangePercent = year1Data.totalValue > 0 
    ? (valueChange / year1Data.totalValue) * 100 
    : 0;
  
  const successRateChange = year2Data.successRate - year1Data.successRate;
  
  return {
    year1Data,
    year2Data,
    comparison: {
      dealCountChange,
      dealCountChangePercent: Math.round(dealCountChangePercent * 100) / 100,
      valueChange: Math.round(valueChange * 100) / 100,
      valueChangePercent: Math.round(valueChangePercent * 100) / 100,
      successRateChange: Math.round(successRateChange * 100) / 100
    }
  };
}