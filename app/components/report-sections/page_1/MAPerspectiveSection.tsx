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
    <SectionFrame height={336}>
      {/* Section Header */}
      <SectionHeader 
        title="Perspectiva de M&A México 2025" 
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
              La actividad de M&A mostró <strong className="text-[#2c5282] font-semibold">tendencia positiva</strong> en el último trimestre con un promedio de <strong className="text-[#2c5282] font-semibold">11 operaciones mensuales</strong>, superando el promedio histórico del año.
            </p>
          </div>

          {/* Bar Chart */}
          <div className="flex-1 flex items-center justify-center">
            <MonthlyBarChart
              data={monthlyData}
              height={160}
            />
          </div>
        </div>

        {/* Right Side - Industry Breakdown with text box */}
        <div className="w-1/2 min-h-0 flex flex-col gap-2" style={{ paddingTop: '8px', paddingBottom: '8px' }}>
          {/* Text box above pie chart */}
          <div className="bg-gradient-to-br from-white to-[#f8fafc] rounded-md p-3 border border-[#e2e8f0]">
            <p className="text-xs text-[#4a5568] leading-relaxed">
              Los sectores <strong className="text-[#2c5282] font-semibold">Industrial y Materiales</strong> concentraron el <strong className="text-[#2c5282] font-semibold">41% del total</strong> de las transacciones, reflejando el dinamismo del nearshoring en México.
            </p>
          </div>

          {/* Pie Chart */}
          <div className="flex-1 flex items-center justify-center">
            <IndustryBreakdownChart
              data={industryData}
              height={160}
              showLegend={true}
            />
          </div>
        </div>
      </div>
    </SectionFrame>
  );
};