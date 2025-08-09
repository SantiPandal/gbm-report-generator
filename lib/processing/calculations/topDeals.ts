import { Deal } from '../types';

/**
 * Get top N deals sorted by announced value descending
 * Filters out deals with invalid or zero values
 */
export function getTopDeals(
  deals: Deal[], 
  topN: number = 10
): Deal[] {
  if (!deals || deals.length === 0) {
    return [];
  }

  // Filter deals with valid announced values
  const validDeals = deals.filter(deal => 
    deal.announcedValue && 
    !isNaN(deal.announcedValue) && 
    deal.announcedValue > 0
  );

  // Sort by announced value descending
  const sortedDeals = validDeals.sort((a, b) => b.announcedValue - a.announcedValue);

  // Return top N deals
  return sortedDeals.slice(0, topN);
}

/**
 * Get top deals by status
 */
export function getTopDealsByStatus(
  deals: Deal[], 
  status: 'Completed' | 'Pending' | 'Terminated',
  topN: number = 10
): Deal[] {
  const statusDeals = deals.filter(deal => deal.dealStatus === status);
  return getTopDeals(statusDeals, topN);
}

/**
 * Get top deals by industry sector
 */
export function getTopDealsByIndustry(
  deals: Deal[], 
  industry: string,
  topN: number = 10
): Deal[] {
  const industryDeals = deals.filter(deal => 
    deal.targetIndustry.toLowerCase().includes(industry.toLowerCase())
  );
  return getTopDeals(industryDeals, topN);
}

/**
 * Get top deals by year
 */
export function getTopDealsByYear(
  deals: Deal[], 
  year: number,
  topN: number = 10
): Deal[] {
  const yearDeals = deals.filter(deal => {
    if (!deal.announceDate || isNaN(deal.announceDate.getTime())) {
      return false;
    }
    return deal.announceDate.getFullYear() === year;
  });
  return getTopDeals(yearDeals, topN);
}

/**
 * Get top deals by date range
 */
export function getTopDealsByDateRange(
  deals: Deal[], 
  startDate: Date,
  endDate: Date,
  topN: number = 10
): Deal[] {
  const rangeDeals = deals.filter(deal => {
    if (!deal.announceDate || isNaN(deal.announceDate.getTime())) {
      return false;
    }
    return deal.announceDate >= startDate && deal.announceDate <= endDate;
  });
  return getTopDeals(rangeDeals, topN);
}

/**
 * Get largest deal (single deal with highest value)
 */
export function getLargestDeal(deals: Deal[]): Deal | null {
  const topDeals = getTopDeals(deals, 1);
  return topDeals.length > 0 ? topDeals[0] : null;
}

/**
 * Get deal rankings with additional context
 */
export interface DealRanking {
  deal: Deal;
  rank: number;
  percentileRank: number; // 0-100, where 100 is the largest deal
  valueRelativeToLargest: number; // Percentage relative to largest deal
}

export function getTopDealsWithRankings(
  deals: Deal[], 
  topN: number = 10
): DealRanking[] {
  const topDeals = getTopDeals(deals, topN);
  const largestValue = topDeals.length > 0 ? topDeals[0].announcedValue : 0;
  const totalDeals = deals.filter(deal => 
    deal.announcedValue && !isNaN(deal.announcedValue) && deal.announcedValue > 0
  ).length;

  return topDeals.map((deal, index) => ({
    deal,
    rank: index + 1,
    percentileRank: Math.round(((totalDeals - index) / totalDeals) * 10000) / 100, // Round to 2 decimals
    valueRelativeToLargest: largestValue > 0 
      ? Math.round((deal.announcedValue / largestValue) * 10000) / 100 
      : 0
  }));
}

/**
 * Get deal size categories
 */
export interface DealSizeCategory {
  category: string;
  minValue: number;
  maxValue: number;
  deals: Deal[];
  count: number;
  totalValue: number;
  avgValue: number;
}

export function getDealsBySize(deals: Deal[]): DealSizeCategory[] {
  const validDeals = deals.filter(deal => 
    deal.announcedValue && !isNaN(deal.announcedValue) && deal.announcedValue > 0
  );

  const categories = [
    { category: 'Mega Deals', minValue: 1000, maxValue: Infinity },
    { category: 'Large Deals', minValue: 500, maxValue: 999.99 },
    { category: 'Mid-Market', minValue: 100, maxValue: 499.99 },
    { category: 'Small Deals', minValue: 10, maxValue: 99.99 },
    { category: 'Micro Deals', minValue: 0, maxValue: 9.99 }
  ];

  return categories.map(({ category, minValue, maxValue }) => {
    const categoryDeals = validDeals.filter(deal => 
      deal.announcedValue >= minValue && 
      (maxValue === Infinity ? true : deal.announcedValue <= maxValue)
    );

    const totalValue = categoryDeals.reduce((sum, deal) => sum + deal.announcedValue, 0);
    const avgValue = categoryDeals.length > 0 ? totalValue / categoryDeals.length : 0;

    return {
      category,
      minValue,
      maxValue,
      deals: categoryDeals.sort((a, b) => b.announcedValue - a.announcedValue),
      count: categoryDeals.length,
      totalValue: Math.round(totalValue * 100) / 100,
      avgValue: Math.round(avgValue * 100) / 100
    };
  }).filter(category => category.count > 0); // Only return categories with deals
}

/**
 * Get top deals summary for display
 */
export function getTopDealsSummary(deals: Deal[], topN: number = 5): {
  topDeals: Deal[];
  largestDeal: Deal | null;
  topNTotalValue: number;
  topNAvgValue: number;
  topNPercentOfTotal: number;
} {
  const topDeals = getTopDeals(deals, topN);
  const largestDeal = getLargestDeal(deals);
  
  const topNTotalValue = topDeals.reduce((sum, deal) => sum + deal.announcedValue, 0);
  const topNAvgValue = topDeals.length > 0 ? topNTotalValue / topDeals.length : 0;
  
  // Calculate percentage of total market value
  const allValidDeals = deals.filter(deal => 
    deal.announcedValue && !isNaN(deal.announcedValue) && deal.announcedValue > 0
  );
  const totalMarketValue = allValidDeals.reduce((sum, deal) => sum + deal.announcedValue, 0);
  const topNPercentOfTotal = totalMarketValue > 0 ? (topNTotalValue / totalMarketValue) * 100 : 0;

  return {
    topDeals,
    largestDeal,
    topNTotalValue: Math.round(topNTotalValue * 100) / 100,
    topNAvgValue: Math.round(topNAvgValue * 100) / 100,
    topNPercentOfTotal: Math.round(topNPercentOfTotal * 100) / 100
  };
}