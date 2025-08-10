'use client';

import { SectionFrame } from '../SectionFrame';
import { SectionHeader } from '../SectionHeader';
import { colors } from '@/lib/design/tokens';
import { MonthlyBarChart } from '../../charts/MonthlyBarChart';
import { IndustryBreakdownChart } from '../../charts/IndustryBreakdownChart';

interface MAPerspectiveSectionProps {
  period?: string;
}

export const MAPerspectiveSection = ({ period = "YTD 2025" }: MAPerspectiveSectionProps) => {
  // 12-month data matching ResumenMexicoSlide
  const monthlyData = [
    { month: "Ene '24", count: 8, isCurrentMonth: false },
    { month: "Feb '24", count: 12, isCurrentMonth: false },
    { month: "Mar '24", count: 15, isCurrentMonth: false },
    { month: "Abr '24", count: 10, isCurrentMonth: false },
    { month: "May '24", count: 9, isCurrentMonth: false },
    { month: "Jun '24", count: 14, isCurrentMonth: false },
    { month: "Jul '24", count: 11, isCurrentMonth: false },
    { month: "Ago '24", count: 7, isCurrentMonth: false },
    { month: "Sep '24", count: 13, isCurrentMonth: false },
    { month: "Oct '24", count: 10, isCurrentMonth: false },
    { month: "Nov '24", count: 9, isCurrentMonth: false },
    { month: "Dic '24", count: 12, isCurrentMonth: true },
  ];

  // Metrics from ResumenMexicoSlide
  const currentMonthTransactions = 12;
  const currentMonthValue = 1455; // millions USD
  const netTransactionChange = 2; // vs last year
  const yoyVolumeChange = 24.8; // percentage
  
  // Format value for display
  const formatValue = (value: number): string => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}B`;
    }
    return `${value.toFixed(0)}M`;
  };

  // Mock industry data
  const industryData = [
    { name: 'Industrial', value: 24, color: '#2c5282' },
    { name: 'Materiales', value: 17, color: '#4a90e2' },
    { name: 'Bienes raíces', value: 10, color: '#a7c7e7' },
    { name: 'Tecnología', value: 7, color: '#718096' },
    { name: 'Consumo', value: 3, color: '#cbd5e0' },
    { name: 'Energía', value: 7, color: '#d8b2d8' },
    { name: 'Financiero', value: 7, color: '#9f7aea' },
    { name: 'Comunicaciones', value: 3, color: '#4fd1c5' },
    { name: 'Bienes de consumo básico', value: 3, color: '#e2e8f0' },
  ];

  return (
    <SectionFrame>
      {/* Section Header */}
      <SectionHeader 
        title="Perspectiva de M&A México 2025" 
        period={period}
        borderColor={colors.primaryBlue}
      />

      {/* Content Area */}
      <div className="flex-1 min-h-0 flex gap-4">
        {/* Left Side - Metrics and Chart */}
        <div className="w-1/2 min-h-0 flex flex-col" style={{ paddingTop: '8px', paddingBottom: '8px' }}>
          {/* Three Separated Metrics */}
          <div className="flex gap-1 mb-4">
            {/* Metric 1 - Transactions */}
            <div className="flex-1 bg-white rounded p-1.5 border-l-2 border-[#2c5282] shadow-sm">
              <div className="text-center">
                <div className="text-sm font-bold" style={{ color: colors.primaryBlue }}>
                  {currentMonthTransactions}
                </div>
                <div className="text-[8px] uppercase tracking-wide" style={{ color: colors.mediumGray }}>
                  Trans. Dic
                </div>
              </div>
            </div>

            {/* Metric 2 - Value */}
            <div className="flex-1 bg-white rounded p-1.5 border-l-2 border-[#4a90e2] shadow-sm">
              <div className="text-center">
                <div className="text-sm font-bold" style={{ color: colors.mediumBlue }}>
                  USD {formatValue(currentMonthValue)}
                </div>
                <div className="text-[8px] uppercase tracking-wide" style={{ color: colors.mediumGray }}>
                  Valor Dic
                </div>
              </div>
            </div>

            {/* Metric 3 - YoY Change */}
            <div className="flex-1 bg-white rounded p-1.5 border-l-2 border-[#a7c7e7] shadow-sm">
              <div className="text-center">
                <div className="text-sm font-bold" style={{ color: colors.lightBlue }}>
                  +{yoyVolumeChange}%
                </div>
                <div className="text-[8px] uppercase tracking-wide" style={{ color: colors.mediumGray }}>
                  vs '23
                </div>
              </div>
            </div>
          </div>

          {/* Bar Chart - Direct, no wrapper */}
          <div className="flex-1 flex items-center justify-center">
            <MonthlyBarChart 
              data={monthlyData}
              height={140}
            />
          </div>
        </div>

        {/* Right Side - Industry Breakdown */}
        <div className="w-1/2 min-h-0 flex flex-col" style={{ paddingTop: '8px', paddingBottom: '8px' }}>
          <div className="flex-1 flex items-center justify-center">
            <IndustryBreakdownChart 
              data={industryData}
              height={140}
              showLegend={true}
            />
          </div>
        </div>
      </div>
    </SectionFrame>
  );
};