import { getMonthlyTransactions, getMonthlyTransactionsByYears, getCurrentYearMonthlyTransactions } from './monthlyTransactions';
import { Deal } from '../types';

// Test data setup
const createTestDeal = (
  targetName: string,
  completionDate: Date | null,
  value: number = 100,
  status: 'Completed' | 'Pending' | 'Terminated' = 'Completed'
): Deal => ({
  dealType: 'M&A',
  announceDate: new Date('2024-01-01'),
  targetName,
  acquirerName: 'Test Acquirer',
  announcedValue: value,
  paymentType: 'Cash',
  dealStatus: status,
  targetIndustry: 'Technology',
  completionDate: completionDate || undefined
});

describe('Monthly Transactions Calculations', () => {
  describe('getMonthlyTransactions', () => {
    test('should correctly count deals by completion month', () => {
      const deals: Deal[] = [
        createTestDeal('Deal Jan 1', new Date(2024, 0, 15), 100), // January
        createTestDeal('Deal Jan 2', new Date(2024, 0, 30), 200), // January  
        createTestDeal('Deal Feb 1', new Date(2024, 1, 10), 150), // February
        createTestDeal('Deal Mar 1', new Date(2024, 2, 5), 300),  // March
      ];

      const result = getMonthlyTransactions(deals, 2024);
      
      // Check January
      expect(result[0].month).toBe('Enero');
      expect(result[0].count).toBe(2);
      expect(result[0].totalValue).toBe(300);
      
      // Check February  
      expect(result[1].month).toBe('Febrero');
      expect(result[1].count).toBe(1);
      expect(result[1].totalValue).toBe(150);
      
      // Check March
      expect(result[2].month).toBe('Marzo');
      expect(result[2].count).toBe(1);
      expect(result[2].totalValue).toBe(300);
      
      // Check empty months
      expect(result[3].month).toBe('Abril');
      expect(result[3].count).toBe(0);
      expect(result[3].totalValue).toBe(0);
    });

    test('should handle edge cases and invalid data', () => {
      const deals: Deal[] = [
        createTestDeal('No completion date', null),
        createTestDeal('Invalid date', new Date('invalid')),
        createTestDeal('Valid deal', new Date(2024, 0, 1), 500),
      ];

      const result = getMonthlyTransactions(deals, 2024);
      
      // Should only count the valid deal
      expect(result[0].count).toBe(1);
      expect(result[0].totalValue).toBe(500);
      
      // Other months should be zero
      expect(result[1].count).toBe(0);
    });

    test('should return empty array for no deals', () => {
      const result = getMonthlyTransactions([], 2024);
      expect(result).toEqual([]);
    });

    test('should replicate Excel COUNTIFS boundary logic', () => {
      const deals: Deal[] = [
        // Exactly on month boundary - should be included
        createTestDeal('Month Start', new Date(2024, 1, 1), 100), // Feb 1st
        
        // Last day of month - should be included  
        createTestDeal('Month End', new Date(2024, 1, 29), 200), // Feb 29th (2024 is leap year)
        
        // First day of next month - should NOT be included in February
        createTestDeal('Next Month', new Date(2024, 2, 1), 300), // Mar 1st
      ];

      const result = getMonthlyTransactions(deals, 2024);
      
      // February should include first two deals
      expect(result[1].month).toBe('Febrero');
      expect(result[1].count).toBe(2);
      expect(result[1].totalValue).toBe(300);
      
      // March should include the third deal
      expect(result[2].month).toBe('Marzo');
      expect(result[2].count).toBe(1);
      expect(result[2].totalValue).toBe(300);
    });
  });

  describe('getMonthlyTransactionsByYears', () => {
    test('should combine multiple years correctly', () => {
      const deals: Deal[] = [
        createTestDeal('2023 Deal', new Date(2023, 0, 15), 100),
        createTestDeal('2024 Deal', new Date(2024, 0, 15), 200),
      ];

      const result = getMonthlyTransactionsByYears(deals, [2023, 2024]);
      
      // Should return 24 months (12 * 2 years)
      expect(result).toHaveLength(24);
      
      // Check data is sorted by year then month
      expect(result[0].year).toBe(2023);
      expect(result[12].year).toBe(2024);
      
      // Check correct counts
      expect(result[0].count).toBe(1); // Jan 2023
      expect(result[12].count).toBe(1); // Jan 2024
    });
  });

  describe('getCurrentYearMonthlyTransactions', () => {
    test('should return data up to current month only', () => {
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      
      const deals: Deal[] = [
        createTestDeal('Current Year', new Date(currentYear, 0, 15), 100),
      ];

      const result = getCurrentYearMonthlyTransactions(deals);
      
      // Should only return months up to current month (inclusive)
      expect(result).toHaveLength(currentMonth + 1);
      expect(result[0].year).toBe(currentYear);
    });
  });
});