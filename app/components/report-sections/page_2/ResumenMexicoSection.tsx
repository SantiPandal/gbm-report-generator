'use client';

import { SectionFrame } from '../SectionFrame';
import { SectionHeader } from '../SectionHeader';
import { colors } from '@/lib/design/tokens';
import { HistoricalValueChart } from '../../charts/HistoricalValueChart';
import { IndustryPieChart } from '../../charts/IndustryPieChart';
import { useReportData } from '@/app/data-map/ReportDataContext';

interface ResumenMexicoSectionProps {
  period?: string;
}

export const ResumenMexicoSection = ({ period = "Últimos 5 años (2020 - 2025 YTD)" }: ResumenMexicoSectionProps) => {
  const reportData = useReportData();
  const summary = reportData['1_0_A'];
  const industrySummary = reportData['1_0_B'];

  const historicalData = summary.Data.map((row) => ({
    year: row.Year,
    value: row.Accumulated_Transaction_Value_USD_MM ?? 0,
    count: row.Number_of_Transactions ?? 0,
    label: (row.Accumulated_Transaction_Value_USD_MM ?? 0).toLocaleString('en-US'),
  }));

  const industryPalette = [
    colors.primaryBlue,
    colors.mediumBlue,
    colors.lightBlue,
    colors.accentPurple,
    colors.accentTeal,
    colors.accentPink,
    colors.darkGray,
    colors.textGray,
    colors.mediumGray,
    colors.lightGray,
    colors.paleBlue,
    colors.paleGray,
  ];

  const industryData = industrySummary.Data.map((row, index) => ({
    name: row.Industry,
    value: row.Percentage ?? 0,
    color: industryPalette[index % industryPalette.length],
  }));

  return (
    <SectionFrame padding={16}>
      {/* Section Header */}
      <SectionHeader 
        title={summary.Table_Title}
        period={period}
        borderColor={colors.primaryBlue}
      />

      {/* Content Area - Flexible dimensions */}
      <div className="flex gap-4 mt-3 flex-1">
        {/* Left Side - Historical Value Chart */}
        <div className="flex flex-col w-1/2 h-full">
          <h4 className="text-[10px] font-semibold text-[#718096] uppercase tracking-wider mb-2" style={{ height: '24px' }}>
            {summary.Table_Title}
          </h4>
          {/* Chart fills the remaining space */}
          <div className="flex-1">
            <HistoricalValueChart data={historicalData} />
          </div>
        </div>

        {/* Right Side - Industry Pie Chart */}
        <div className="flex flex-col w-1/2 h-full">
          <h4 className="text-[10px] font-semibold text-[#718096] uppercase tracking-wider mb-2" style={{ height: '24px' }}>
            {industrySummary.Table_Title}
          </h4>
          <div className="flex-1">
            <IndustryPieChart
              data={industryData}
            />
          </div>
        </div>
      </div>
    </SectionFrame>
  );
};
