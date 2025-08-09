import { SummaryStats } from '@/lib/processing/types';

interface TitleSectionProps {
  data: SummaryStats;
  period: string;
  title?: string;
  subtitle?: string;
  companyName?: string;
}

export const TitleSection = ({ 
  data,
  period,
  title = "REPORTE DE FUSIONES Y ADQUISICIONES",
  subtitle = "Análisis del Mercado Mexicano",
  companyName = "GBM INVESTMENT BANKING"
}: TitleSectionProps) => {
  
  // Format numbers for display - professional financial style
  const formatValue = (value: number): string => {
    if (value >= 1000) {
      return `USD ${(value / 1000).toFixed(1)}B`;
    }
    return `USD ${value.toFixed(0)}M`;
  };
  
  const formatDate = (): string => {
    const date = new Date();
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                   'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };
  
  return (
    <div 
      className="w-full h-full bg-white border border-gray-200 rounded-lg flex flex-col"
      style={{ 
        height: '280px',
        padding: '12px',
        margin: '0',
        boxSizing: 'border-box'
      }}
    >
      {/* Section Header */}
      <div className="border-b border-[#2c5282] pb-2 mb-3 flex-shrink-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-[#2c5282] rounded flex items-center justify-center mr-2">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="text-xs font-bold text-[#2d3748] tracking-wider">
              {companyName}
            </span>
          </div>
          <span className="text-xs text-[#718096]">
            {formatDate()}
          </span>
        </div>
      </div>
      
      {/* Title Content */}
      <div className="text-center mb-3 flex-shrink-0">
        <h1 className="text-base font-bold text-[#2c5282] mb-1 uppercase leading-tight">
          {title}
        </h1>
        <h2 className="text-sm text-[#4a5568] mb-1 font-normal leading-tight">
          {subtitle}
        </h2>
        <p className="text-xs text-[#718096] italic">
          {period}
        </p>
      </div>
      
      {/* Metrics Grid - Flex grow to fill remaining space */}
      <div className="bg-[#f7fafc] rounded p-3 border-t-2 border-[#4a90e2] flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-2 gap-3 h-full items-center">
          {/* Metric 1 */}
          <div className="text-center py-1">
            <div className="text-xl font-bold text-[#2c5282] leading-tight mb-1">
              {data.totalDeals}
            </div>
            <div className="text-[10px] text-[#718096] uppercase tracking-wide leading-tight">
              Transacciones
            </div>
          </div>
          
          {/* Metric 2 */}
          <div className="text-center py-1">
            <div className="text-xl font-bold text-[#2c5282] leading-tight mb-1">
              {formatValue(data.totalValue)}
            </div>
            <div className="text-[10px] text-[#718096] uppercase tracking-wide leading-tight">
              Valor Total
            </div>
          </div>
          
          {/* Metric 3 */}
          <div className="text-center py-1">
            <div className="text-xl font-bold text-[#2c5282] leading-tight mb-1">
              {data.successRate.toFixed(0)}%
            </div>
            <div className="text-[10px] text-[#718096] uppercase tracking-wide leading-tight">
              Tasa Finalización
            </div>
          </div>
          
          {/* Metric 4 */}
          <div className="text-center py-1">
            <div className="text-xl font-bold text-[#2c5282] leading-tight mb-1">
              {formatValue(data.avgDealSize)}
            </div>
            <div className="text-[10px] text-[#718096] uppercase tracking-wide leading-tight">
              Tamaño Promedio
            </div>
          </div>
        </div>
      </div>
      
      {/* Small accent */}
      <div className="flex justify-center mt-2 space-x-1 flex-shrink-0">
        <div className="w-2 h-0.5 bg-[#a7c7e7]" />
        <div className="w-1 h-0.5 bg-[#4a90e2]" />
        <div className="w-2 h-0.5 bg-[#2c5282]" />
      </div>
    </div>
  );
};