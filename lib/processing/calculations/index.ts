// Export all calculation functions for clean imports

// Monthly transactions
export {
  getMonthlyTransactions,
  getMonthlyTransactionsByYears,
  getCurrentYearMonthlyTransactions
} from './monthlyTransactions';

// Industry breakdown
export {
  getIndustryBreakdown,
  getIndustryBreakdownByStatus,
  getTopIndustriesByCount,
  getTopIndustriesByValue,
  getMostActiveSector
} from './industryBreakdown';

// Yearly comparison
export {
  getYearlyComparison,
  getYearlyComparisonByRange,
  getYearOverYearGrowth,
  getYearlyDataForYear,
  getMostRecentYearData,
  compareYears
} from './yearlyComparison';

// YTD comparison
export {
  getYTDComparison,
  getMonthlyYTDComparison,
  getQuarterlyYTDComparison,
  getCurrentYTDDeals,
  getPreviousYTDDeals,
  formatYTDComparison
} from './ytdComparison';

// Top deals
export {
  getTopDeals,
  getTopDealsByStatus,
  getTopDealsByIndustry,
  getTopDealsByYear,
  getTopDealsByDateRange,
  getLargestDeal,
  getTopDealsWithRankings,
  getDealsBySize,
  getTopDealsSummary,
  type DealRanking,
  type DealSizeCategory
} from './topDeals';

// Summary statistics
export {
  getSummaryStats,
  getSummaryStatsByStatus,
  getSummaryStatsByYear,
  getSummaryStatsByIndustry,
  getComparativeSummaryStats,
  getExtendedSummaryStats,
  type ComparativeSummary,
  type ExtendedSummaryStats
} from './summaryStats';