import { 
  getYearlyComparison, 
  getYearlyComparisonByRange,
  getYearOverYearGrowth,
  getYearlyDataForYear,
  getMostRecentYearData,
  compareYears 
} from './yearlyComparison';
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

describe('Yearly Comparison Calculations', () => {
  describe('getYearlyComparison', () => {
    test('should correctly aggregate deals by announcement year', () => {
      const deals: Deal[] = [
        // 2023 deals
        createTestDeal('2023 Deal 1', new Date(2023, 0, 15), 500, 'Completed'),
        createTestDeal('2023 Deal 2', new Date(2023, 5, 20), 300, 'Pending'),
        createTestDeal('2023 Deal 3', new Date(2023, 11, 10), 200, 'Terminated'),
        
        // 2024 deals
        createTestDeal('2024 Deal 1', new Date(2024, 2, 10), 800, 'Completed'),
        createTestDeal('2024 Deal 2', new Date(2024, 7, 25), 400, 'Completed'),
      ];

      const result = getYearlyComparison(deals);
      
      expect(result).toHaveLength(2);
      
      // Check 2023 data
      const data2023 = result.find(r => r.year === 2023)!;
      expect(data2023.dealCount).toBe(3);
      expect(data2023.totalValue).toBe(1000); // 500 + 300 + 200
      expect(data2023.completedDeals).toBe(1);
      expect(data2023.pendingDeals).toBe(1);
      expect(data2023.terminatedDeals).toBe(1);
      expect(data2023.successRate).toBe(33.33); // 1/3 * 100, rounded
      expect(data2023.avgDealSize).toBe(333.33); // 1000/3, rounded
      
      // Check 2024 data
      const data2024 = result.find(r => r.year === 2024)!;
      expect(data2024.dealCount).toBe(2);
      expect(data2024.totalValue).toBe(1200); // 800 + 400
      expect(data2024.completedDeals).toBe(2);
      expect(data2024.pendingDeals).toBe(0);
      expect(data2024.terminatedDeals).toBe(0);
      expect(data2024.successRate).toBe(100); // 2/2 * 100
      expect(data2024.avgDealSize).toBe(600); // 1200/2
    });

    test('should handle deals with invalid dates and values', () => {
      const deals: Deal[] = [
        createTestDeal('Valid Deal', new Date(2024, 0, 1), 100),
        createTestDeal('Invalid Date', new Date('invalid'), 200),
        createTestDeal('NaN Value', new Date(2024, 1, 1), NaN),
        { // Deal with null announce date
          ...createTestDeal('Null Date', new Date(2024, 2, 1), 300),
          announceDate: null as any
        }
      ];

      const result = getYearlyComparison(deals);
      
      expect(result).toHaveLength(1);
      
      const data2024 = result[0];
      expect(data2024.year).toBe(2024);
      expect(data2024.dealCount).toBe(2); // Valid deal + NaN value deal
      expect(data2024.totalValue).toBe(100); // Only valid value counted
      expect(data2024.avgDealSize).toBe(100); // Average of valid values only
    });

    test('should return empty array for no deals', () => {
      const result = getYearlyComparison([]);
      expect(result).toEqual([]);
    });

    test('should sort results by year ascending', () => {
      const deals: Deal[] = [
        createTestDeal('2025 Deal', new Date(2025, 0, 1), 100),
        createTestDeal('2023 Deal', new Date(2023, 0, 1), 200),
        createTestDeal('2024 Deal', new Date(2024, 0, 1), 300),
      ];

      const result = getYearlyComparison(deals);
      
      expect(result).toHaveLength(3);
      expect(result[0].year).toBe(2023);
      expect(result[1].year).toBe(2024);
      expect(result[2].year).toBe(2025);
    });
  });

  describe('getYearlyComparisonByRange', () => {
    test('should filter years by range correctly', () => {
      const deals: Deal[] = [
        createTestDeal('2022 Deal', new Date(2022, 0, 1), 100),
        createTestDeal('2023 Deal', new Date(2023, 0, 1), 200),
        createTestDeal('2024 Deal', new Date(2024, 0, 1), 300),
        createTestDeal('2025 Deal', new Date(2025, 0, 1), 400),
      ];

      const result = getYearlyComparisonByRange(deals, 2023, 2024);
      
      expect(result).toHaveLength(2);
      expect(result[0].year).toBe(2023);
      expect(result[1].year).toBe(2024);
    });
  });

  describe('getYearOverYearGrowth', () => {
    test('should calculate year-over-year growth correctly', () => {
      const deals: Deal[] = [
        // 2023: 2 deals, $600M total
        createTestDeal('2023 Deal 1', new Date(2023, 0, 1), 400),
        createTestDeal('2023 Deal 2', new Date(2023, 6, 1), 200),
        
        // 2024: 3 deals, $900M total  
        createTestDeal('2024 Deal 1', new Date(2024, 0, 1), 300),
        createTestDeal('2024 Deal 2', new Date(2024, 3, 1), 300),
        createTestDeal('2024 Deal 3', new Date(2024, 8, 1), 300),
      ];

      const result = getYearOverYearGrowth(deals);
      
      expect(result).toHaveLength(1);
      
      const growth2024 = result[0];
      expect(growth2024.year).toBe(2024);
      expect(growth2024.dealCountGrowth).toBe(1); // 3 - 2
      expect(growth2024.dealCountGrowthPercent).toBe(50); // (1/2) * 100
      expect(growth2024.valueGrowth).toBe(300); // 900 - 600
      expect(growth2024.valueGrowthPercent).toBe(50); // (300/600) * 100
    });

    test('should return empty array for insufficient data', () => {
      const deals: Deal[] = [
        createTestDeal('Single Deal', new Date(2024, 0, 1), 100),
      ];

      const result = getYearOverYearGrowth(deals);
      expect(result).toEqual([]);
    });
  });

  describe('getYearlyDataForYear', () => {
    test('should return data for specific year', () => {
      const deals: Deal[] = [
        createTestDeal('2023 Deal', new Date(2023, 0, 1), 100),
        createTestDeal('2024 Deal', new Date(2024, 0, 1), 200),
      ];

      const result = getYearlyDataForYear(deals, 2023);
      
      expect(result).not.toBeNull();
      expect(result!.year).toBe(2023);
      expect(result!.totalValue).toBe(100);
    });

    test('should return null for non-existent year', () => {
      const deals: Deal[] = [
        createTestDeal('2024 Deal', new Date(2024, 0, 1), 100),
      ];

      const result = getYearlyDataForYear(deals, 2023);
      expect(result).toBeNull();
    });
  });

  describe('getMostRecentYearData', () => {
    test('should return most recent complete year data', () => {
      // Mock current year as 2025
      const originalDate = Date;
      const mockDate = class extends Date {
        constructor() {
          super();
          return new originalDate(2025, 0, 1);
        }
        static now() {
          return new originalDate(2025, 0, 1).getTime();
        }
        getFullYear() {
          return 2025;
        }
      };
      global.Date = mockDate as any;

      const deals: Deal[] = [
        createTestDeal('2022 Deal', new Date(2022, 0, 1), 100),
        createTestDeal('2023 Deal', new Date(2023, 0, 1), 200),
        createTestDeal('2024 Deal', new Date(2024, 0, 1), 300),
        createTestDeal('2025 Deal', new Date(2025, 0, 1), 400), // Current year
      ];

      const result = getMostRecentYearData(deals);
      
      expect(result).not.toBeNull();
      expect(result!.year).toBe(2024); // Most recent complete year
      
      // Restore original Date
      global.Date = originalDate;
    });
  });

  describe('compareYears', () => {
    test('should compare two years correctly', () => {
      const deals: Deal[] = [
        createTestDeal('2023 Deal 1', new Date(2023, 0, 1), 200, 'Completed'),
        createTestDeal('2023 Deal 2', new Date(2023, 6, 1), 100, 'Terminated'),
        createTestDeal('2024 Deal 1', new Date(2024, 0, 1), 400, 'Completed'),
        createTestDeal('2024 Deal 2', new Date(2024, 3, 1), 200, 'Completed'),
        createTestDeal('2024 Deal 3', new Date(2024, 8, 1), 100, 'Completed'),
      ];

      const result = compareYears(deals, 2023, 2024);
      
      expect(result.year1Data).not.toBeNull();
      expect(result.year2Data).not.toBeNull();
      expect(result.comparison).not.toBeNull();
      
      const comparison = result.comparison!;
      expect(comparison.dealCountChange).toBe(1); // 3 - 2
      expect(comparison.dealCountChangePercent).toBe(50); // (1/2) * 100
      expect(comparison.valueChange).toBe(400); // 700 - 300
      expect(comparison.valueChangePercent).toBe(133.33); // (400/300) * 100, rounded
      expect(comparison.successRateChange).toBe(50); // 100 - 50
    });

    test('should handle missing year data', () => {
      const deals: Deal[] = [
        createTestDeal('2024 Deal', new Date(2024, 0, 1), 100),
      ];

      const result = compareYears(deals, 2023, 2024);
      
      expect(result.year1Data).toBeNull();
      expect(result.year2Data).not.toBeNull();
      expect(result.comparison).toBeNull();
    });
  });
});