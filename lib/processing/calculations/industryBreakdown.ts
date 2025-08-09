import { Deal, IndustryData } from '../types';

/**
 * Calculate industry breakdown - replicates Excel COUNTIF formula
 * Formula: =COUNTIF($D$12:$D$40, "Industry Name")
 * 
 * Groups deals by targetIndustry and calculates counts, totals, and percentages
 */
export function getIndustryBreakdown(deals: Deal[]): IndustryData[] {
  if (!deals || deals.length === 0) {
    return [];
  }

  // Group deals by industry sector
  const industryMap = new Map<string, Deal[]>();
  
  deals.forEach(deal => {
    // Clean and normalize industry name (trim whitespace, handle empty values)
    const industry = (deal.targetIndustry || 'Other').trim();
    
    if (!industryMap.has(industry)) {
      industryMap.set(industry, []);
    }
    industryMap.get(industry)!.push(deal);
  });

  // Calculate total deals for percentage calculation
  const totalDeals = deals.length;
  
  // Calculate total value across all deals
  const totalValue = deals
    .filter(deal => deal.announcedValue && !isNaN(deal.announcedValue))
    .reduce((sum, deal) => sum + deal.announcedValue, 0);

  // Convert map to IndustryData array
  const industryData: IndustryData[] = Array.from(industryMap.entries()).map(([industry, industryDeals]) => {
    // Calculate total value for this industry
    const industryValue = industryDeals
      .filter(deal => deal.announcedValue && !isNaN(deal.announcedValue))
      .reduce((sum, deal) => sum + deal.announcedValue, 0);
    
    // Calculate average deal size (only for deals with valid values)
    const validDeals = industryDeals.filter(deal => deal.announcedValue && !isNaN(deal.announcedValue));
    const avgDealSize = validDeals.length > 0 ? industryValue / validDeals.length : 0;

    return {
      industry,
      count: industryDeals.length,
      totalValue: Math.round(industryValue * 100) / 100, // Round to 2 decimal places
      percentage: Math.round((industryDeals.length / totalDeals) * 10000) / 100, // Round to 2 decimal places
      avgDealSize: Math.round(avgDealSize * 100) / 100 // Round to 2 decimal places
    };
  });

  // Sort by count descending, then by total value descending
  return industryData.sort((a, b) => {
    if (a.count !== b.count) {
      return b.count - a.count; // Higher count first
    }
    return b.totalValue - a.totalValue; // Higher value first
  });
}

/**
 * Get industry breakdown filtered by deal status
 */
export function getIndustryBreakdownByStatus(
  deals: Deal[], 
  status?: 'Completed' | 'Pending' | 'Terminated'
): IndustryData[] {
  const filteredDeals = status ? deals.filter(deal => deal.dealStatus === status) : deals;
  return getIndustryBreakdown(filteredDeals);
}

/**
 * Get top N industries by deal count
 */
export function getTopIndustriesByCount(deals: Deal[], topN: number = 5): IndustryData[] {
  const allIndustries = getIndustryBreakdown(deals);
  return allIndustries.slice(0, topN);
}

/**
 * Get top N industries by total value
 */
export function getTopIndustriesByValue(deals: Deal[], topN: number = 5): IndustryData[] {
  const allIndustries = getIndustryBreakdown(deals);
  
  // Sort by total value descending
  const sortedByValue = allIndustries.sort((a, b) => b.totalValue - a.totalValue);
  
  return sortedByValue.slice(0, topN);
}

/**
 * Get industry with most deals (most active sector)
 */
export function getMostActiveSector(deals: Deal[]): string {
  const industryData = getIndustryBreakdown(deals);
  
  if (industryData.length === 0) {
    return 'No data available';
  }
  
  // First industry in sorted array has highest count
  return industryData[0].industry;
}