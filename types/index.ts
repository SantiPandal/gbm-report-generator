export interface Deal {
  dealType: string;
  announceDate: Date;
  targetName: string;
  acquirerName: string;
  value: number;
  status: string;
  industry: string;
}

export interface ProcessedData {
  totalDeals: number;
  successRate: number;
  industryBreakdown: IndustryData[];
  topDeals: Deal[];
  trends: TrendData[];
}

export interface IndustryData {
  sector: string;
  count: number;
}

export interface TrendData {
  period: string;
  value: number;
}

export interface SlideProps {
  data: ProcessedData;
  title: string;
}