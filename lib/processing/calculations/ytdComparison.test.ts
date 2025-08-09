import { 
  getYTDComparison, 
  getMonthlyYTDComparison,
  getQuarterlyYTDComparison,
  getCurrentYTDDeals,
  getPreviousYTDDeals,
  formatYTDComparison 
} from './ytdComparison';
import { Deal } from '../types';

// Test data setup
const createTestDeal = (
  targetName: string,
  announceDate: Date,
  value: number = 100,
  status: 'Completed' | 'Pending' | 'Terminated' = 'Completed'
): Deal => ({
  dealType: 'M&A',
  announceDate,
  targetName,
  acquirerName: 'Test Acquirer',
  announcedValue: value,
  paymentType: 'Cash',
  dealStatus: status,
  targetIndustry: 'Technology',
  completionDate: new Date('2024-02-01')
});

describe('YTD Comparison Calculations', () => {
  describe('getYTDComparison', () => {
    test('should calculate YTD comparison correctly', () => {
      const deals: Deal[] = [
        // Previous year (2023) - first quarter deals
        createTestDeal('2023 Q1 Deal 1', new Date(2023, 0, 15), 300), // Jan 15
        createTestDeal('2023 Q1 Deal 2', new Date(2023, 1, 20), 200), // Feb 20
        createTestDeal('2023 Q1 Deal 3', new Date(2023, 2, 10), 100), // Mar 10
        
        // Previous year (2023) - later in year (should not be counted for March YTD)
        createTestDeal('2023 Later Deal', new Date(2023, 6, 15), 500), // July
        
        // Current year (2024) - first quarter deals  
        createTestDeal('2024 Q1 Deal 1', new Date(2024, 0, 10), 400), // Jan 10
        createTestDeal('2024 Q1 Deal 2', new Date(2024, 2, 5), 350),  // Mar 5
        
        // Current year (2024) - later in year (should not be counted for March YTD)
        createTestDeal('2024 Later Deal', new Date(2024, 8, 20), 600), // September
      ];

      // Compare YTD as of March 15th, 2024
      const asOfDate = new Date(2024, 2, 15); // March 15, 2024
      const result = getYTDComparison(deals, asOfDate);
      
      expect(result).not.toBeNull();
      
      // Current YTD (2024): Should include Jan 10, Mar 5 deals
      expect(result!.currentYTD.year).toBe(2024);
      expect(result!.currentYTD.dealCount).toBe(2);
      expect(result!.currentYTD.totalValue).toBe(750); // 400 + 350
      
      // Previous YTD (2023): Should include Jan 15, Feb 20, Mar 10 deals
      expect(result!.previousYTD.year).toBe(2023);
      expect(result!.previousYTD.dealCount).toBe(3);
      expect(result!.previousYTD.totalValue).toBe(600); // 300 + 200 + 100
      
      // Comparison
      expect(result!.comparison.dealCountChange).toBe(-1); // 2 - 3
      expect(result!.comparison.dealCountChangePercent).toBe(-33.33); // (-1/3) * 100
      expect(result!.comparison.valueChange).toBe(150); // 750 - 600
      expect(result!.comparison.valueChangePercent).toBe(25); // (150/600) * 100
    });

    test('should handle edge cases and invalid data', () => {
      const deals: Deal[] = [
        createTestDeal('Valid Deal', new Date(2024, 0, 15), 100),
        createTestDeal('Invalid Date', new Date('invalid'), 200),
        createTestDeal('NaN Value', new Date(2024, 1, 10), NaN),
        { // Deal with null announce date
          ...createTestDeal('Null Date', new Date(2024, 2, 1), 300),
          announceDate: null as any
        }
      ];

      const result = getYTDComparison(deals, new Date(2024, 2, 31));
      
      expect(result).not.toBeNull();
      expect(result!.currentYTD.dealCount).toBe(2); // Valid deal + NaN value deal
      expect(result!.currentYTD.totalValue).toBe(100); // Only valid value
    });

    test('should return null for empty deals array', () => {
      const result = getYTDComparison([], new Date(2024, 2, 15));
      expect(result).toBeNull();
    });

    test('should handle leap year calculations correctly', () => {
      const deals: Deal[] = [
        // 2024 is a leap year - Feb 29 exists
        createTestDeal('Leap Year Deal', new Date(2024, 1, 29), 100), // Feb 29, 2024
        
        // 2023 is not a leap year - compare with same day of year
        createTestDeal('Regular Year Deal', new Date(2023, 1, 28), 200), // Feb 28, 2023
      ];

      const asOfDate = new Date(2024, 2, 1); // March 1, 2024
      const result = getYTDComparison(deals, asOfDate);
      
      expect(result).not.toBeNull();
      expect(result!.currentYTD.dealCount).toBe(1);
      expect(result!.previousYTD.dealCount).toBe(1);
    });
  });

  describe('getMonthlyYTDComparison', () => {
    test('should calculate monthly YTD comparison', () => {
      const deals: Deal[] = [
        createTestDeal('Jan 2023', new Date(2023, 0, 15), 100),
        createTestDeal('Feb 2023', new Date(2023, 1, 15), 200),
        createTestDeal('Jan 2024', new Date(2024, 0, 15), 150),
        createTestDeal('Feb 2024', new Date(2024, 1, 15), 250),
      ];

      // February YTD comparison
      const result = getMonthlyYTDComparison(deals, 1, 2024); // February (month 1)
      
      expect(result).not.toBeNull();
      expect(result!.currentYTD.dealCount).toBe(2); // Jan + Feb 2024
      expect(result!.currentYTD.totalValue).toBe(400); // 150 + 250
      expect(result!.previousYTD.dealCount).toBe(2); // Jan + Feb 2023  
      expect(result!.previousYTD.totalValue).toBe(300); // 100 + 200
    });
  });

  describe('getQuarterlyYTDComparison', () => {
    test('should calculate quarterly YTD comparison', () => {
      const deals: Deal[] = [
        // Q1 2023
        createTestDeal('Q1 2023 Deal', new Date(2023, 2, 15), 300), // March
        
        // Q1 2024
        createTestDeal('Q1 2024 Deal', new Date(2024, 1, 15), 400), // February
      ];

      const result = getQuarterlyYTDComparison(deals, 1, 2024); // Q1 2024
      
      expect(result).not.toBeNull();
      expect(result!.currentYTD.dealCount).toBe(1);
      expect(result!.currentYTD.totalValue).toBe(400);
      expect(result!.previousYTD.dealCount).toBe(1);
      expect(result!.previousYTD.totalValue).toBe(300);
    });
  });

  describe('getCurrentYTDDeals', () => {
    test('should return current YTD deals only', () => {
      const deals: Deal[] = [
        createTestDeal('Current YTD', new Date(2024, 1, 15), 100),
        createTestDeal('Current Later', new Date(2024, 6, 15), 200),
        createTestDeal('Previous Year', new Date(2023, 1, 15), 300),
      ];

      const asOfDate = new Date(2024, 2, 31); // March 31, 2024
      const result = getCurrentYTDDeals(deals, asOfDate);
      
      expect(result).toHaveLength(1);
      expect(result[0].targetName).toBe('Current YTD');
    });
  });

  describe('getPreviousYTDDeals', () => {
    test('should return previous YTD deals only', () => {
      const deals: Deal[] = [
        createTestDeal('Current YTD', new Date(2024, 1, 15), 100),
        createTestDeal('Previous YTD', new Date(2023, 1, 15), 200),
        createTestDeal('Previous Later', new Date(2023, 6, 15), 300),
      ];

      const asOfDate = new Date(2024, 2, 31); // March 31, 2024
      const result = getPreviousYTDDeals(deals, asOfDate);
      
      expect(result).toHaveLength(1);
      expect(result[0].targetName).toBe('Previous YTD');
    });
  });

  describe('formatYTDComparison', () => {
    test('should format YTD comparison data correctly', () => {
      const ytdData = {
        currentYTD: {
          year: 2024,
          dealCount: 5,
          totalValue: 1500.5,
          asOfDate: new Date(2024, 2, 31)
        },
        previousYTD: {
          year: 2023,
          dealCount: 3,
          totalValue: 800.25,
          asOfDate: new Date(2023, 2, 31)
        },
        comparison: {
          dealCountChange: 2,
          dealCountChangePercent: 66.67,
          valueChange: 700.25,
          valueChangePercent: 87.5
        }
      };

      const result = formatYTDComparison(ytdData);
      
      expect(result.currentYTDFormatted).toBe('5 deals, $1,500.5M');
      expect(result.previousYTDFormatted).toBe('3 deals, $800.25M');
      expect(result.dealCountTrend).toBe('up');
      expect(result.valueTrend).toBe('up');
    });

    test('should handle negative trends', () => {
      const ytdData = {
        currentYTD: {
          year: 2024,
          dealCount: 2,
          totalValue: 500,
          asOfDate: new Date(2024, 2, 31)
        },
        previousYTD: {
          year: 2023,
          dealCount: 5,
          totalValue: 1000,
          asOfDate: new Date(2023, 2, 31)
        },
        comparison: {
          dealCountChange: -3,
          dealCountChangePercent: -60,
          valueChange: -500,
          valueChangePercent: -50
        }
      };

      const result = formatYTDComparison(ytdData);
      
      expect(result.dealCountTrend).toBe('down');
      expect(result.valueTrend).toBe('down');
    });

    test('should handle flat trends', () => {
      const ytdData = {
        currentYTD: {
          year: 2024,
          dealCount: 3,
          totalValue: 1000,
          asOfDate: new Date(2024, 2, 31)
        },
        previousYTD: {
          year: 2023,
          dealCount: 3,
          totalValue: 1000,
          asOfDate: new Date(2023, 2, 31)
        },
        comparison: {
          dealCountChange: 0,
          dealCountChangePercent: 0,
          valueChange: 0,
          valueChangePercent: 0
        }
      };

      const result = formatYTDComparison(ytdData);
      
      expect(result.dealCountTrend).toBe('flat');
      expect(result.valueTrend).toBe('flat');
    });
  });
});