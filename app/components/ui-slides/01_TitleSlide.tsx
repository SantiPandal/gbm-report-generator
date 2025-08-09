import { SummaryStats } from '@/lib/processing/types';

interface TitleSlideProps {
  data: SummaryStats;
  period: string;
  title?: string;
  subtitle?: string;
  companyName?: string;
}

export const TitleSlide = ({ 
  data,
  period,
  title = "MERGERS & ACQUISITIONS",
  subtitle = "Mexico Market Analysis",
  companyName = "GBM INVESTMENT BANKING"
}: TitleSlideProps) => {
  
  // Format numbers for display - professional financial style
  const formatValue = (value: number): string => {
    if (value >= 1000) {
      return `USD ${(value / 1000).toFixed(1)}bn`;
    }
    return `USD ${value.toFixed(0)}m`;
  };
  
  const formatDate = (): string => {
    const date = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };
  
  return (
    <div className="h-full w-full bg-white flex flex-col" style={{ padding: '50px' }}>
      {/* Header */}
      <div className="border-b-2 border-[#2c5282] pb-5 mb-12">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {/* Logo */}
            <div className="w-9 h-9 bg-[#2c5282] rounded flex items-center justify-center mr-3">
              <span className="text-white font-bold text-xl">G</span>
            </div>
            <span className="text-sm font-bold text-[#2d3748] tracking-wider">
              {companyName}
            </span>
          </div>
          <span className="text-xs text-[#718096] tracking-wide">
            {formatDate()}
          </span>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center items-center px-20">
        <h1 className="text-5xl font-bold text-[#2c5282] text-center mb-3 tracking-tight uppercase">
          {title}
        </h1>
        <h2 className="text-3xl text-[#4a5568] text-center mb-2 font-normal">
          {subtitle}
        </h2>
        <p className="text-xl text-[#718096] text-center mb-12 italic">
          {period}
        </p>
        
        {/* Statistics Container */}
        <div className="w-full bg-[#f7fafc] rounded border-t-4 border-[#4a90e2] p-9 mt-12">
          <div className="flex justify-around items-center">
            {/* Stat 1 */}
            <div className="text-center">
              <div className="text-4xl font-bold text-[#2c5282] mb-2">
                {data.totalDeals}
              </div>
              <div className="text-xs text-[#718096] uppercase tracking-wider font-normal">
                Transactions
              </div>
            </div>
            
            {/* Divider */}
            <div className="w-px h-16 bg-[#cbd5e0]" />
            
            {/* Stat 2 */}
            <div className="text-center">
              <div className="text-4xl font-bold text-[#2c5282] mb-2">
                {formatValue(data.totalValue)}
              </div>
              <div className="text-xs text-[#718096] uppercase tracking-wider font-normal">
                Deal Value
              </div>
            </div>
            
            {/* Divider */}
            <div className="w-px h-16 bg-[#cbd5e0]" />
            
            {/* Stat 3 */}
            <div className="text-center">
              <div className="text-4xl font-bold text-[#2c5282] mb-2">
                {data.successRate.toFixed(0)}%
              </div>
              <div className="text-xs text-[#718096] uppercase tracking-wider font-normal">
                Completion Rate
              </div>
            </div>
            
            {/* Divider */}
            <div className="w-px h-16 bg-[#cbd5e0]" />
            
            {/* Stat 4 */}
            <div className="text-center">
              <div className="text-4xl font-bold text-[#2c5282] mb-2">
                {formatValue(data.avgDealSize)}
              </div>
              <div className="text-xs text-[#718096] uppercase tracking-wider font-normal">
                Average Size
              </div>
            </div>
          </div>
        </div>
        
        {/* Visual accent */}
        <div className="flex justify-center mt-8 space-x-2">
          <div className="w-5 h-1 bg-[#a7c7e7]" />
          <div className="w-3 h-1 bg-[#4a90e2]" />
          <div className="w-5 h-1 bg-[#2c5282]" />
        </div>
      </div>
      
      {/* Footer */}
      <div className="border-t border-[#e2e8f0] pt-5 flex justify-between items-center">
        <span className="text-[9px] text-[#718096] italic tracking-wide">
          CONFIDENTIAL AND PROPRIETARY
        </span>
        <div className="flex items-center">
          <div className="w-5 h-px bg-[#718096] mr-2" />
          <span className="text-[10px] text-[#718096]">1</span>
        </div>
      </div>
    </div>
  );
};