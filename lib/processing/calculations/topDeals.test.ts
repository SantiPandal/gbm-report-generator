import { 
  getTopDeals, 
  getTopDealsByStatus,
  getTopDealsByIndustry,
  getTopDealsByYear,
  getTopDealsByDateRange,
  getLargestDeal,
  getTopDealsWithRankings,
  getDealsBySize,
  getTopDealsSummary 
} from './topDeals';
import { Deal } from '../types';

// Test data setup
const createTestDeal = (
  targetName: string,
  value: number,
  status: 'Completed' | 'Pending' | 'Terminated' = 'Completed',
  industry: string = 'Technology',
  announceDate: Date = new Date(2024, 0, 1)
): Deal => ({
  dealType: 'M&A',
  announceDate,
  targetName,
  acquirerName: 'Test Acquirer',
  announcedValue: value,
  paymentType: 'Cash',
  dealStatus: status,
  targetIndustry: industry,
  completionDate: new Date('2024-02-01')
});

describe('Top Deals Calculations', () => {
  describe('getTopDeals', () => {
    test('should return top N deals sorted by value descending', () => {
      const deals: Deal[] = [
        createTestDeal('Deal A', 500),
        createTestDeal('Deal B', 1000), // Largest
        createTestDeal('Deal C', 200),
        createTestDeal('Deal D', 750),
        createTestDeal('Deal E', 300),
      ];

      const result = getTopDeals(deals, 3);
      
      expect(result).toHaveLength(3);
      expect(result[0].targetName).toBe('Deal B'); // $1000M
      expect(result[0].announcedValue).toBe(1000);
      expect(result[1].targetName).toBe('Deal D'); // $750M
      expect(result[1].announcedValue).toBe(750);
      expect(result[2].targetName).toBe('Deal A'); // $500M
      expect(result[2].announcedValue).toBe(500);
    });

    test('should filter out deals with invalid values', () => {
      const deals: Deal[] = [
        createTestDeal('Valid Deal', 500),
        createTestDeal('Zero Value', 0),
        createTestDeal('NaN Value', NaN),
        createTestDeal('Null Value', null as any),
        createTestDeal('Negative Value', -100),
      ];

      const result = getTopDeals(deals, 10);
      
      expect(result).toHaveLength(1);
      expect(result[0].targetName).toBe('Valid Deal');
    });

    test('should return empty array for no valid deals', () => {
      const deals: Deal[] = [
        createTestDeal('Zero Value', 0),
        createTestDeal('NaN Value', NaN),
      ];

      const result = getTopDeals(deals, 5);
      expect(result).toEqual([]);
    });

    test('should handle empty deals array', () => {
      const result = getTopDeals([], 5);
      expect(result).toEqual([]);
    });

    test('should return all deals if topN is larger than deal count', () => {
      const deals: Deal[] = [
        createTestDeal('Deal A', 500),
        createTestDeal('Deal B', 300),
      ];

      const result = getTopDeals(deals, 10);
      
      expect(result).toHaveLength(2);
      expect(result[0].announcedValue).toBe(500);
      expect(result[1].announcedValue).toBe(300);
    });
  });

  describe('getTopDealsByStatus', () => {
    test('should filter deals by status before sorting', () => {
      const deals: Deal[] = [
        createTestDeal('Completed High', 1000, 'Completed'),
        createTestDeal('Pending High', 900, 'Pending'),
        createTestDeal('Completed Low', 200, 'Completed'),
        createTestDeal('Terminated Mid', 500, 'Terminated'),
      ];

      const completedResult = getTopDealsByStatus(deals, 'Completed', 5);
      
      expect(completedResult).toHaveLength(2);
      expect(completedResult[0].targetName).toBe('Completed High');
      expect(completedResult[1].targetName).toBe('Completed Low');
      
      // All results should have Completed status
      completedResult.forEach(deal => {
        expect(deal.dealStatus).toBe('Completed');
      });
    });
  });

  describe('getTopDealsByIndustry', () => {
    test('should filter deals by industry before sorting', () => {
      const deals: Deal[] = [
        createTestDeal('Tech High', 1000, 'Completed', 'Technology'),
        createTestDeal('Finance High', 900, 'Completed', 'Financial Services'),
        createTestDeal('Tech Low', 200, 'Completed', 'Technology'),
        createTestDeal('Energy Mid', 500, 'Completed', 'Energy'),
      ];

      const techResult = getTopDealsByIndustry(deals, 'Technology', 5);
      
      expect(techResult).toHaveLength(2);
      expect(techResult[0].targetName).toBe('Tech High');
      expect(techResult[1].targetName).toBe('Tech Low');
      
      // All results should contain 'Technology' in industry
      techResult.forEach(deal => {
        expect(deal.targetIndustry.toLowerCase()).toContain('technology');
      });
    });

    test('should handle partial industry name matching', () => {
      const deals: Deal[] = [
        createTestDeal('Deal 1', 500, 'Completed', 'Financial Services'),
        createTestDeal('Deal 2', 300, 'Completed', 'Finance'),
        createTestDeal('Deal 3', 400, 'Completed', 'Technology'),
      ];

      const financeResult = getTopDealsByIndustry(deals, 'financ', 5);
      
      expect(financeResult).toHaveLength(2);
      expect(financeResult[0].announcedValue).toBe(500);
      expect(financeResult[1].announcedValue).toBe(300);
    });
  });

  describe('getTopDealsByYear', () => {
    test('should filter deals by announcement year', () => {
      const deals: Deal[] = [
        createTestDeal('2023 High', 1000, 'Completed', 'Tech', new Date(2023, 5, 15)),
        createTestDeal('2024 High', 900, 'Completed', 'Tech', new Date(2024, 2, 10)),
        createTestDeal('2023 Low', 200, 'Completed', 'Tech', new Date(2023, 8, 20)),
      ];

      const result2023 = getTopDealsByYear(deals, 2023, 5);
      
      expect(result2023).toHaveLength(2);
      expect(result2023[0].targetName).toBe('2023 High');
      expect(result2023[1].targetName).toBe('2023 Low');
      
      // All results should be from 2023
      result2023.forEach(deal => {
        expect(deal.announceDate.getFullYear()).toBe(2023);
      });
    });

    test('should handle invalid announce dates', () => {
      const deals: Deal[] = [
        createTestDeal('Valid Deal', 1000, 'Completed', 'Tech', new Date(2024, 0, 1)),
        { // Deal with invalid date
          ...createTestDeal('Invalid Date', 500),
          announceDate: new Date('invalid')
        }
      ];

      const result = getTopDealsByYear(deals, 2024, 5);
      
      expect(result).toHaveLength(1);
      expect(result[0].targetName).toBe('Valid Deal');
    });
  });

  describe('getTopDealsByDateRange', () => {
    test('should filter deals by date range', () => {
      const deals: Deal[] = [
        createTestDeal('Q1 Deal', 1000, 'Completed', 'Tech', new Date(2024, 1, 15)), // Feb
        createTestDeal('Q2 Deal', 900, 'Completed', 'Tech', new Date(2024, 4, 10)),  // May
        createTestDeal('Q3 Deal', 800, 'Completed', 'Tech', new Date(2024, 7, 20)),  // Aug
      ];

      const startDate = new Date(2024, 0, 1); // Jan 1
      const endDate = new Date(2024, 5, 30);   // June 30
      
      const result = getTopDealsByDateRange(deals, startDate, endDate, 5);
      
      expect(result).toHaveLength(2);
      expect(result[0].targetName).toBe('Q1 Deal');
      expect(result[1].targetName).toBe('Q2 Deal');
    });
  });

  describe('getLargestDeal', () => {
    test('should return the single largest deal', () => {
      const deals: Deal[] = [
        createTestDeal('Deal A', 500),
        createTestDeal('Deal B', 1000), // Largest
        createTestDeal('Deal C', 750),
      ];

      const result = getLargestDeal(deals);
      
      expect(result).not.toBeNull();
      expect(result!.targetName).toBe('Deal B');
      expect(result!.announcedValue).toBe(1000);
    });

    test('should return null for no valid deals', () => {
      const deals: Deal[] = [
        createTestDeal('Zero Deal', 0),
        createTestDeal('NaN Deal', NaN),
      ];

      const result = getLargestDeal(deals);
      expect(result).toBeNull();
    });
  });

  describe('getTopDealsWithRankings', () => {
    test('should return deals with ranking information', () => {
      const deals: Deal[] = [
        createTestDeal('Deal A', 500),
        createTestDeal('Deal B', 1000), // Largest
        createTestDeal('Deal C', 250),
        createTestDeal('Deal D', 750),
      ];

      const result = getTopDealsWithRankings(deals, 3);
      
      expect(result).toHaveLength(3);
      
      // Check largest deal
      expect(result[0].deal.targetName).toBe('Deal B');
      expect(result[0].rank).toBe(1);
      expect(result[0].valueRelativeToLargest).toBe(100); // 100% of largest
      expect(result[0].percentileRank).toBe(100); // Top percentile
      
      // Check second largest
      expect(result[1].deal.targetName).toBe('Deal D');
      expect(result[1].rank).toBe(2);
      expect(result[1].valueRelativeToLargest).toBe(75); // 75% of largest (750/1000)
      expect(result[1].percentileRank).toBe(75); // 3rd out of 4 valid deals
      
      // Check third largest
      expect(result[2].deal.targetName).toBe('Deal A');
      expect(result[2].rank).toBe(3);
      expect(result[2].valueRelativeToLargest).toBe(50); // 50% of largest (500/1000)
      expect(result[2].percentileRank).toBe(50); // 2nd out of 4 valid deals
    });
  });

  describe('getDealsBySize', () => {
    test('should categorize deals by size correctly', () => {
      const deals: Deal[] = [
        createTestDeal('Mega Deal', 1500),      // Mega (>= 1000)
        createTestDeal('Large Deal', 750),      // Large (500-999.99)
        createTestDeal('Mid Deal', 250),        // Mid-Market (100-499.99)  
        createTestDeal('Small Deal', 50),       // Small (10-99.99)
        createTestDeal('Micro Deal', 5),        // Micro (0-9.99)
      ];

      const result = getDealsBySize(deals);
      
      // Should have 5 categories (all with deals)
      expect(result).toHaveLength(5);
      
      const megaCategory = result.find(cat => cat.category === 'Mega Deals');
      expect(megaCategory).toBeDefined();
      expect(megaCategory!.count).toBe(1);
      expect(megaCategory!.deals[0].targetName).toBe('Mega Deal');
      
      const largeCategory = result.find(cat => cat.category === 'Large Deals');
      expect(largeCategory).toBeDefined();
      expect(largeCategory!.count).toBe(1);
      
      const midCategory = result.find(cat => cat.category === 'Mid-Market');
      expect(midCategory).toBeDefined();
      expect(midCategory!.count).toBe(1);
    });

    test('should only return categories with deals', () => {
      const deals: Deal[] = [
        createTestDeal('Small Deal', 50), // Only small deals
      ];

      const result = getDealsBySize(deals);
      
      expect(result).toHaveLength(1);
      expect(result[0].category).toBe('Small Deals');
    });
  });

  describe('getTopDealsSummary', () => {
    test('should provide comprehensive top deals summary', () => {
      const deals: Deal[] = [
        createTestDeal('Deal 1', 1000),
        createTestDeal('Deal 2', 800),
        createTestDeal('Deal 3', 600),
        createTestDeal('Deal 4', 400),
        createTestDeal('Deal 5', 200),
        createTestDeal('Deal 6', 100), // Not in top 5
      ];

      const result = getTopDealsSummary(deals, 5);
      
      expect(result.topDeals).toHaveLength(5);
      expect(result.largestDeal!.targetName).toBe('Deal 1');
      expect(result.topNTotalValue).toBe(3000); // 1000+800+600+400+200
      expect(result.topNAvgValue).toBe(600); // 3000/5
      
      // Top 5 represent 3000 out of 3100 total = ~96.77%
      expect(result.topNPercentOfTotal).toBeCloseTo(96.77, 1);
    });

    test('should handle edge cases', () => {
      const deals: Deal[] = [
        createTestDeal('Only Deal', 500),
      ];

      const result = getTopDealsSummary(deals, 5);
      
      expect(result.topDeals).toHaveLength(1);
      expect(result.largestDeal!.targetName).toBe('Only Deal');
      expect(result.topNTotalValue).toBe(500);
      expect(result.topNAvgValue).toBe(500);
      expect(result.topNPercentOfTotal).toBe(100); // 100% of total
    });
  });
});