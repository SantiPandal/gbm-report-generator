// Enhanced types for M&A data processing matching Excel CSV structure

export interface Deal {
  dealType: string;                    // "Deal Type"
  announceDate: Date;                  // "Announce Date" 
  targetName: string;                  // "Target Name"
  acquirerName: string;                // "Acquirer Name"
  sellerName?: string;                 // "Seller Name"
  announcedValue: number;              // "Announced Total Value (mil.)" - parsed to number
  paymentType: string;                 // "Payment Type"
  tvEbitda?: string;                   // "TV/EBITDA"
  dealStatus: 'Completed' | 'Pending' | 'Terminated'; // "Deal Status"
  targetIndustry: string;              // "Target Industry Sector"
  completionDate?: Date;               // "Completion/Termination Date"
}

export interface MonthlyData {
  month: string;                       // Spanish month name
  monthNumber: number;                 // 1-12
  year: number;
  count: number;                       // Number of deals
  totalValue: number;                  // Total value in millions
}

export interface IndustryData {
  industry: string;                    // Industry sector name
  count: number;                       // Number of deals
  totalValue: number;                  // Total value in millions
  percentage: number;                  // Percentage of total deals
  avgDealSize: number;                 // Average deal size
}

export interface YearlyData {
  year: number;
  dealCount: number;                   // Total deals in year
  totalValue: number;                  // Total value in millions
  completedDeals: number;              // Completed deals count
  pendingDeals: number;                // Pending deals count
  terminatedDeals: number;             // Terminated deals count
  successRate: number;                 // Percentage completed
  avgDealSize: number;                 // Average deal size
}

export interface YTDComparisonData {
  currentYTD: {
    year: number;
    dealCount: number;
    totalValue: number;
    asOfDate: Date;
  };
  previousYTD: {
    year: number;
    dealCount: number;
    totalValue: number;
    asOfDate: Date;
  };
  comparison: {
    dealCountChange: number;           // Absolute change
    dealCountChangePercent: number;    // Percentage change
    valueChange: number;               // Absolute change in millions
    valueChangePercent: number;        // Percentage change
  };
}

export interface SummaryStats {
  totalDeals: number;
  completedDeals: number;
  pendingDeals: number;
  terminatedDeals: number;
  successRate: number;                 // Percentage
  totalValue: number;                  // Total in millions
  avgDealSize: number;                 // Average size in millions
  medianDealSize: number;              // Median size in millions
  largestDeal: Deal | null;            // Largest deal by value
  mostActiveSector: string;            // Industry with most deals
}

// Spanish month names for display
export const SPANISH_MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

// Utility type for raw CSV data before parsing
export interface RawDealData {
  'Deal Type': string;
  'Announce Date': string;
  'Target Name': string;
  'Acquirer Name': string;
  'Seller Name'?: string;
  'Announced Total Value (mil.)': string;
  'Payment Type': string;
  'TV/EBITDA'?: string;
  'Deal Status': string;
  'Target Industry Sector': string;
  'Completion/Termination Date'?: string;
}