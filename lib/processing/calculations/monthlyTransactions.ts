import { Deal, MonthlyData, SPANISH_MONTHS } from '../types';

/**
 * Calculate monthly transaction counts - replicates Excel COUNTIFS formula
 * Formula: =COUNTIFS($C$12:$C$40, ">="&DATE(2025,1,1), $C$12:$C$40, "<"&DATE(2025,2,1))
 * 
 * Uses completionDate (not announceDate) to match Excel logic
 * Counts deals where completionDate >= first day of month AND < first day of next month
 */
export function getMonthlyTransactions(
  deals: Deal[], 
  year: number = new Date().getFullYear()
): MonthlyData[] {
  if (!deals || deals.length === 0) {
    return [];
  }

  const monthlyData: MonthlyData[] = [];
  
  // Process each month of the year
  for (let month = 0; month < 12; month++) {
    const monthStart = new Date(year, month, 1);
    const monthEnd = new Date(year, month + 1, 1); // First day of next month
    
    // Filter deals completed in this month (replicates COUNTIFS logic)
    const monthDeals = deals.filter(deal => {
      if (!deal.completionDate || isNaN(deal.completionDate.getTime())) {
        return false;
      }
      
      // Excel logic: >= month start AND < month end
      return deal.completionDate >= monthStart && deal.completionDate < monthEnd;
    });
    
    // Calculate total value for the month
    const totalValue = monthDeals
      .filter(deal => deal.announcedValue && !isNaN(deal.announcedValue))
      .reduce((sum, deal) => sum + deal.announcedValue, 0);
    
    monthlyData.push({
      month: SPANISH_MONTHS[month],
      monthNumber: month + 1,
      year,
      count: monthDeals.length,
      totalValue: Math.round(totalValue * 100) / 100 // Round to 2 decimal places
    });
  }
  
  return monthlyData;
}

/**
 * Get monthly transactions for multiple years
 */
export function getMonthlyTransactionsByYears(
  deals: Deal[], 
  years: number[]
): MonthlyData[] {
  const allMonthlyData: MonthlyData[] = [];
  
  for (const year of years) {
    const yearData = getMonthlyTransactions(deals, year);
    allMonthlyData.push(...yearData);
  }
  
  return allMonthlyData.sort((a, b) => {
    if (a.year !== b.year) {
      return a.year - b.year;
    }
    return a.monthNumber - b.monthNumber;
  });
}

/**
 * Get monthly transactions for current year up to current month
 */
export function getCurrentYearMonthlyTransactions(deals: Deal[]): MonthlyData[] {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  
  const allMonthlyData = getMonthlyTransactions(deals, currentYear);
  
  // Return only up to current month
  return allMonthlyData.slice(0, currentMonth + 1);
}