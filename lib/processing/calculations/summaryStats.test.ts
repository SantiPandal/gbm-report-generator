import { 
  getSummaryStats, 
  getSummaryStatsByStatus,
  getSummaryStatsByYear,
  getSummaryStatsByIndustry,
  getComparativeSummaryStats,
  getExtendedSummaryStats 
} from './summaryStats';
import { Deal } from '../types';

// Test data setup
const createTestDeal = (
  targetName: string,
  value: number,
  status: 'Completed' | 'Pending' | 'Terminated' = 'Completed',
  industry: string = 'Technology',
  announceDate: Date = new Date(2024, 0, 1),
  completionDate?: Date
): Deal => ({
  dealType: 'M&A',
  announceDate,
  targetName,
  acquirerName: 'Test Acquirer',
  announcedValue: value,
  paymentType: 'Cash',
  dealStatus: status,
  targetIndustry: industry,
  completionDate: completionDate || (status === 'Completed' ? new Date(2024, 1, 1) : undefined)
});

describe('Summary Statistics Calculations', () => {
  describe('getSummaryStats', () => {
    test('should calculate comprehensive summary statistics', () => {
      const deals: Deal[] = [
        createTestDeal('Deal 1', 1000, 'Completed', 'Technology'),
        createTestDeal('Deal 2', 500, 'Completed', 'Technology'),
        createTestDeal('Deal 3', 750, 'Pending', 'Finance'),
        createTestDeal('Deal 4', 300, 'Terminated', 'Energy'),
        createTestDeal('Deal 5', 400, 'Completed', 'Technology'),
      ];

      const result = getSummaryStats(deals);
      
      expect(result.totalDeals).toBe(5);
      expect(result.completedDeals).toBe(3);
      expect(result.pendingDeals).toBe(1);
      expect(result.terminatedDeals).toBe(1);
      expect(result.successRate).toBe(60); // 3/5 * 100
      expect(result.totalValue).toBe(2950); // 1000+500+750+300+400
      expect(result.avgDealSize).toBe(590); // 2950/5
      expect(result.medianDealSize).toBe(500); // Middle value when sorted
      expect(result.largestDeal!.targetName).toBe('Deal 1');
      expect(result.mostActiveSector).toBe('Technology'); // 3 deals vs 1 each for others
    });

    test('should handle deals with invalid values', () => {
      const deals: Deal[] = [
        createTestDeal('Valid Deal', 500, 'Completed'),
        createTestDeal('Zero Value', 0, 'Completed'),
        createTestDeal('NaN Value', NaN, 'Pending'),
        createTestDeal('Negative Value', -100, 'Terminated'),
      ];

      const result = getSummaryStats(deals);
      
      expect(result.totalDeals).toBe(4);
      expect(result.completedDeals).toBe(2); // Includes zero and negative value deals
      expect(result.pendingDeals).toBe(1);
      expect(result.terminatedDeals).toBe(1);
      expect(result.totalValue).toBe(500); // Only valid positive value
      expect(result.avgDealSize).toBe(500); // Only valid deal counted
      expect(result.medianDealSize).toBe(500); // Only valid deal
      expect(result.largestDeal!.targetName).toBe('Valid Deal');
    });

    test('should return zero stats for empty deals array', () => {
      const result = getSummaryStats([]);
      
      expect(result.totalDeals).toBe(0);
      expect(result.completedDeals).toBe(0);
      expect(result.pendingDeals).toBe(0);
      expect(result.terminatedDeals).toBe(0);
      expect(result.successRate).toBe(0);
      expect(result.totalValue).toBe(0);
      expect(result.avgDealSize).toBe(0);
      expect(result.medianDealSize).toBe(0);
      expect(result.largestDeal).toBeNull();
      expect(result.mostActiveSector).toBe('No data available');
    });

    test('should calculate median correctly for even and odd number of deals', () => {
      // Odd number of deals
      const oddDeals: Deal[] = [
        createTestDeal('Deal 1', 100),
        createTestDeal('Deal 2', 200),
        createTestDeal('Deal 3', 300), // Median
      ];
      
      const oddResult = getSummaryStats(oddDeals);
      expect(oddResult.medianDealSize).toBe(200); // Middle value
      
      // Even number of deals
      const evenDeals: Deal[] = [
        createTestDeal('Deal 1', 100),
        createTestDeal('Deal 2', 200), // Average of these two
        createTestDeal('Deal 3', 300), // is the median
        createTestDeal('Deal 4', 400),
      ];
      
      const evenResult = getSummaryStats(evenDeals);
      expect(evenResult.medianDealSize).toBe(250); // (200 + 300) / 2
    });
  });

  describe('getSummaryStatsByStatus', () => {
    test('should filter deals by status before calculating stats', () => {
      const deals: Deal[] = [
        createTestDeal('Completed 1', 1000, 'Completed'),
        createTestDeal('Completed 2', 500, 'Completed'),
        createTestDeal('Pending 1', 750, 'Pending'),
        createTestDeal('Terminated 1', 300, 'Terminated'),
      ];

      const completedResult = getSummaryStatsByStatus(deals, 'Completed');
      
      expect(completedResult.totalDeals).toBe(2);
      expect(completedResult.completedDeals).toBe(2);
      expect(completedResult.pendingDeals).toBe(0);
      expect(completedResult.terminatedDeals).toBe(0);
      expect(completedResult.successRate).toBe(100); // All filtered deals are completed
      expect(completedResult.totalValue).toBe(1500);
    });
  });

  describe('getSummaryStatsByYear', () => {
    test('should filter deals by announcement year', () => {
      const deals: Deal[] = [
        createTestDeal('2023 Deal', 500, 'Completed', 'Tech', new Date(2023, 0, 1)),
        createTestDeal('2024 Deal 1', 750, 'Completed', 'Tech', new Date(2024, 5, 15)),
        createTestDeal('2024 Deal 2', 300, 'Pending', 'Tech', new Date(2024, 8, 20)),
      ];

      const result2024 = getSummaryStatsByYear(deals, 2024);
      
      expect(result2024.totalDeals).toBe(2);
      expect(result2024.completedDeals).toBe(1);
      expect(result2024.pendingDeals).toBe(1);
      expect(result2024.totalValue).toBe(1050); // 750 + 300
    });

    test('should handle invalid announce dates', () => {
      const deals: Deal[] = [
        createTestDeal('Valid Deal', 500, 'Completed', 'Tech', new Date(2024, 0, 1)),
        {
          ...createTestDeal('Invalid Date', 300),
          announceDate: new Date('invalid')
        }
      ];

      const result = getSummaryStatsByYear(deals, 2024);
      
      expect(result.totalDeals).toBe(1); // Only valid date deal
      expect(result.totalValue).toBe(500);
    });
  });

  describe('getSummaryStatsByIndustry', () => {
    test('should filter deals by industry with partial matching', () => {
      const deals: Deal[] = [
        createTestDeal('Tech 1', 500, 'Completed', 'Technology'),
        createTestDeal('Tech 2', 300, 'Pending', 'Tech Services'),
        createTestDeal('Finance 1', 750, 'Completed', 'Financial Services'),
      ];

      const techResult = getSummaryStatsByIndustry(deals, 'tech');
      
      expect(techResult.totalDeals).toBe(2);
      expect(techResult.totalValue).toBe(800); // 500 + 300
      
      const financeResult = getSummaryStatsByIndustry(deals, 'financial');
      
      expect(financeResult.totalDeals).toBe(1);
      expect(financeResult.totalValue).toBe(750);
    });
  });

  describe('getComparativeSummaryStats', () => {
    test('should compare two periods correctly', () => {
      const currentDeals: Deal[] = [
        createTestDeal('Current 1', 1000, 'Completed'),
        createTestDeal('Current 2', 500, 'Completed'),
        createTestDeal('Current 3', 300, 'Pending'),
      ];

      const previousDeals: Deal[] = [
        createTestDeal('Previous 1', 800, 'Completed'),
        createTestDeal('Previous 2', 200, 'Terminated'),
      ];

      const result = getComparativeSummaryStats(currentDeals, previousDeals);
      
      expect(result.current.totalDeals).toBe(3);
      expect(result.previous.totalDeals).toBe(2);
      
      expect(result.comparison.totalDealsChange).toBe(1); // 3 - 2
      expect(result.comparison.totalDealsChangePercent).toBe(50); // (1/2) * 100
      
      expect(result.comparison.totalValueChange).toBe(800); // 1800 - 1000
      expect(result.comparison.totalValueChangePercent).toBe(80); // (800/1000) * 100
      
      expect(result.comparison.successRateChange).toBe(16.67); // 66.67 - 50 (rounded)
    });

    test('should handle division by zero gracefully', () => {
      const currentDeals: Deal[] = [createTestDeal('Current', 500, 'Completed')];
      const previousDeals: Deal[] = []; // Empty previous period

      const result = getComparativeSummaryStats(currentDeals, previousDeals);
      
      expect(result.comparison.totalDealsChangePercent).toBe(0);
      expect(result.comparison.totalValueChangePercent).toBe(0);
      expect(result.comparison.avgDealSizeChangePercent).toBe(0);
    });
  });

  describe('getExtendedSummaryStats', () => {
    test('should provide extended market insights', () => {
      const currentYear = new Date().getFullYear();
      
      const deals: Deal[] = [
        createTestDeal('Deal 1', 1000, 'Completed', 'Tech', new Date(currentYear, 0, 15)),
        createTestDeal('Deal 2', 500, 'Completed', 'Tech', new Date(currentYear, 1, 20)),
        createTestDeal('Deal 3', 200, 'Completed', 'Tech', new Date(currentYear, 2, 10)),
        createTestDeal('Deal 4', 300, 'Pending', 'Tech', new Date(currentYear, 0, 25)),
        createTestDeal('Deal 5', 100, 'Completed', 'Tech', new Date(2023, 0, 1)), // Previous year
      ];

      const result = getExtendedSummaryStats(deals);
      
      // Basic stats should be included
      expect(result.totalDeals).toBe(5);
      expect(result.totalValue).toBe(2100);
      
      // Market insights
      expect(result.marketInsights.dealVelocity).toBeGreaterThan(0); // Current year deals / months
      expect(result.marketInsights.marketConcentration).toBeGreaterThan(0); // Top 5 as % of total
      expect(result.marketInsights.volatilityIndex).toBeGreaterThan(0); // Coefficient of variation
      
      // Should have largest deal multiple (since we have median > 0)
      expect(result.marketInsights.largestDealMultiple).toBeGreaterThan(0);
    });

    test('should handle empty deals gracefully', () => {
      const result = getExtendedSummaryStats([]);
      
      expect(result.totalDeals).toBe(0);
      expect(result.marketInsights.dealVelocity).toBe(0);
      expect(result.marketInsights.marketConcentration).toBe(0);
      expect(result.marketInsights.volatilityIndex).toBe(0);
      expect(result.marketInsights.averageTimeToCompletion).toBeUndefined();
      expect(result.marketInsights.largestDealMultiple).toBeUndefined();
    });

    test('should calculate average time to completion when data available', () => {
      const announceDate = new Date(2024, 0, 1);
      const completionDate = new Date(2024, 1, 1); // 31 days later
      
      const deals: Deal[] = [
        createTestDeal('Deal 1', 500, 'Completed', 'Tech', announceDate, completionDate),
        createTestDeal('Deal 2', 300, 'Pending', 'Tech'), // No completion date
      ];

      const result = getExtendedSummaryStats(deals);
      
      expect(result.marketInsights.averageTimeToCompletion).toBe(31); // 31 days
    });
  });
});