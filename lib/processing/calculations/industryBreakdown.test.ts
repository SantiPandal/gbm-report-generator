import { 
  getIndustryBreakdown, 
  getIndustryBreakdownByStatus,
  getTopIndustriesByCount,
  getTopIndustriesByValue,
  getMostActiveSector 
} from './industryBreakdown';
import { Deal } from '../types';

// Test data setup
const createTestDeal = (
  targetName: string,
  industry: string,
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
  targetIndustry: industry,
  completionDate: new Date('2024-02-01')
});

describe('Industry Breakdown Calculations', () => {
  describe('getIndustryBreakdown', () => {
    test('should correctly group and count deals by industry', () => {
      const deals: Deal[] = [
        createTestDeal('Tech Deal 1', 'Technology', 500),
        createTestDeal('Tech Deal 2', 'Technology', 300),
        createTestDeal('Finance Deal', 'Financial Services', 200),
        createTestDeal('Energy Deal', 'Energy', 400),
        createTestDeal('Finance Deal 2', 'Financial Services', 100),
      ];

      const result = getIndustryBreakdown(deals);
      
      // Should be sorted by count (Technology: 2, Financial Services: 2, Energy: 1)
      // Then by value for ties
      expect(result).toHaveLength(3);
      
      // Technology should be first (2 deals, higher total value: 800)
      expect(result[0].industry).toBe('Technology');
      expect(result[0].count).toBe(2);
      expect(result[0].totalValue).toBe(800);
      expect(result[0].percentage).toBe(40); // 2/5 * 100
      expect(result[0].avgDealSize).toBe(400); // 800/2
      
      // Financial Services should be second (2 deals, lower total value: 300)
      expect(result[1].industry).toBe('Financial Services');
      expect(result[1].count).toBe(2);
      expect(result[1].totalValue).toBe(300);
      expect(result[1].percentage).toBe(40); // 2/5 * 100
      expect(result[1].avgDealSize).toBe(150); // 300/2
      
      // Energy should be third (1 deal)
      expect(result[2].industry).toBe('Energy');
      expect(result[2].count).toBe(1);
      expect(result[2].totalValue).toBe(400);
      expect(result[2].percentage).toBe(20); // 1/5 * 100
      expect(result[2].avgDealSize).toBe(400);
    });

    test('should handle edge cases and data cleaning', () => {
      const deals: Deal[] = [
        createTestDeal('Deal 1', '  Technology  ', 100), // Whitespace
        createTestDeal('Deal 2', '', 200), // Empty industry
        createTestDeal('Deal 3', 'Technology', NaN), // Invalid value
        { // Deal with null industry
          ...createTestDeal('Deal 4', 'Finance', 300),
          targetIndustry: null as any
        }
      ];

      const result = getIndustryBreakdown(deals);
      
      // Should clean whitespace and handle nulls
      const techIndustry = result.find(r => r.industry === 'Technology');
      expect(techIndustry).toBeDefined();
      expect(techIndustry!.count).toBe(2); // Both Technology deals
      
      // Should group empty/null industries as 'Other'
      const otherIndustry = result.find(r => r.industry === 'Other');
      expect(otherIndustry).toBeDefined();
      expect(otherIndustry!.count).toBe(2); // Empty string and null
    });

    test('should return empty array for no deals', () => {
      const result = getIndustryBreakdown([]);
      expect(result).toEqual([]);
    });

    test('should handle deals with no announced value', () => {
      const deals: Deal[] = [
        createTestDeal('Deal 1', 'Technology', 0),
        createTestDeal('Deal 2', 'Technology', NaN),
        createTestDeal('Deal 3', 'Technology', 100),
      ];

      const result = getIndustryBreakdown(deals);
      
      expect(result).toHaveLength(1);
      expect(result[0].industry).toBe('Technology');
      expect(result[0].count).toBe(3); // All deals counted
      expect(result[0].totalValue).toBe(100); // Only valid value
      expect(result[0].avgDealSize).toBe(100); // Average of valid deals only
    });
  });

  describe('getIndustryBreakdownByStatus', () => {
    test('should filter deals by status correctly', () => {
      const deals: Deal[] = [
        createTestDeal('Completed Tech', 'Technology', 100, 'Completed'),
        createTestDeal('Pending Tech', 'Technology', 200, 'Pending'),
        createTestDeal('Completed Finance', 'Finance', 150, 'Completed'),
      ];

      const completedResult = getIndustryBreakdownByStatus(deals, 'Completed');
      
      expect(completedResult).toHaveLength(2);
      
      const techCompleted = completedResult.find(r => r.industry === 'Technology');
      expect(techCompleted!.count).toBe(1);
      expect(techCompleted!.totalValue).toBe(100);
      
      const financeCompleted = completedResult.find(r => r.industry === 'Finance');
      expect(financeCompleted!.count).toBe(1);
      expect(financeCompleted!.totalValue).toBe(150);
    });
  });

  describe('getTopIndustriesByCount', () => {
    test('should return top N industries by deal count', () => {
      const deals: Deal[] = [
        ...Array(5).fill(null).map((_, i) => createTestDeal(`Tech ${i}`, 'Technology', 100)),
        ...Array(3).fill(null).map((_, i) => createTestDeal(`Finance ${i}`, 'Finance', 100)),
        ...Array(2).fill(null).map((_, i) => createTestDeal(`Energy ${i}`, 'Energy', 100)),
      ];

      const result = getTopIndustriesByCount(deals, 2);
      
      expect(result).toHaveLength(2);
      expect(result[0].industry).toBe('Technology');
      expect(result[0].count).toBe(5);
      expect(result[1].industry).toBe('Finance');
      expect(result[1].count).toBe(3);
    });
  });

  describe('getTopIndustriesByValue', () => {
    test('should return top N industries by total value', () => {
      const deals: Deal[] = [
        createTestDeal('Tech 1', 'Technology', 100),
        createTestDeal('Finance 1', 'Finance', 500), // Highest value industry
        createTestDeal('Energy 1', 'Energy', 300),
        createTestDeal('Energy 2', 'Energy', 200), // Total: 500, but fewer deals
      ];

      const result = getTopIndustriesByValue(deals, 2);
      
      expect(result).toHaveLength(2);
      
      // Should be sorted by total value
      expect(result[0].industry).toBe('Finance');
      expect(result[0].totalValue).toBe(500);
      expect(result[1].industry).toBe('Energy');
      expect(result[1].totalValue).toBe(500);
    });
  });

  describe('getMostActiveSector', () => {
    test('should return industry with most deals', () => {
      const deals: Deal[] = [
        createTestDeal('Tech 1', 'Technology', 100),
        createTestDeal('Tech 2', 'Technology', 200),
        createTestDeal('Finance 1', 'Finance', 500),
      ];

      const result = getMostActiveSector(deals);
      expect(result).toBe('Technology');
    });

    test('should handle no deals', () => {
      const result = getMostActiveSector([]);
      expect(result).toBe('No data available');
    });
  });
});