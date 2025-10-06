'use client';

import { SectionFrame } from '../SectionFrame';
import { SectionHeader } from '../SectionHeader';
import { colors } from '@/lib/design/tokens';
import { MonthlyBarChart } from '../../charts/MonthlyBarChart';
import { IndustryBreakdownChart } from '../../charts/IndustryBreakdownChart';
import { useReportData } from '@/app/data-map/ReportDataContext';

interface MAPerspectiveSectionProps {
  period?: string;
}

export const MAPerspectiveSection = ({ period = "YTD 2025" }: MAPerspectiveSectionProps) => {
  const reportData = useReportData();
  const monthlySummary = reportData['0_2_A'];
  const industrySummary = reportData['0_2_B'];

  const monthlyData = monthlySummary.Data.map((row, index, array) => ({
    month: row.Month,
    count: row.Number_of_Transactions ?? 0,
    isCurrentMonth: index === array.length - 1,
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
    colors.lightGray,
    colors.paleBlue,
  ];

  const industryData = industrySummary.Data.map((row, index) => ({
    name: row.Industry,
    value: row.Percentage ?? 0,
    color: industryPalette[index % industryPalette.length],
  }));

  return (
    <SectionFrame height={336}>
      {/* Section Header */}
      <SectionHeader 
        title={monthlySummary.Table_Title}
        period={period}
        borderColor={colors.primaryBlue}
      />

      {/* Content Area */}
      <div className="flex-1 min-h-0 flex gap-4">
        {/* Left Side - Bar Chart with text box */}
        <div className="w-1/2 min-h-0 flex flex-col gap-2" style={{ paddingTop: '8px', paddingBottom: '8px' }}>
          {/* Text box above bar chart */}
          <div className="bg-gradient-to-br from-white to-[#f8fafc] rounded-md p-3 border border-[#e2e8f0]">
            <p className="text-xs text-[#4a5568] leading-relaxed">
              {monthlySummary.Summary_Paragraph}
            </p>
          </div>

          {/* Bar Chart */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <MonthlyBarChart
              data={monthlyData}
              height={160}
              title={monthlySummary.Chart_Title}
            />
            {monthlySummary.Chart_Footnote && (
              <p className="text-[8px] text-[#718096] italic mt-1 text-center px-2">
                {monthlySummary.Chart_Footnote}
              </p>
            )}
          </div>
        </div>

        {/* Right Side - Industry Breakdown with text box */}
        <div className="w-1/2 min-h-0 flex flex-col gap-2" style={{ paddingTop: '8px', paddingBottom: '8px' }}>
          {/* Text box above pie chart */}
          <div className="bg-gradient-to-br from-white to-[#f8fafc] rounded-md p-3 border border-[#e2e8f0]">
            <p className="text-xs text-[#4a5568] leading-relaxed">
              {industrySummary.Summary_Paragraph}
            </p>
          </div>

          {/* Pie Chart */}
          <div className="flex-1 flex items-center justify-center">
            <IndustryBreakdownChart
              data={industryData}
              height={160}
              showLegend={true}
              title={industrySummary.Chart_Title}
            />
          </div>
        </div>
      </div>
    </SectionFrame>
  );
};
