'use client';

import { SectionFrame } from '../SectionFrame';
import { SectionHeader } from '../SectionHeader';
import { colors } from '@/lib/design/tokens';
import { HistoricalValueChart } from '../../charts/HistoricalValueChart';
import { IndustryPieChart } from '../../charts/IndustryPieChart';

interface ResumenMexicoSectionProps {
  period?: string;
}

export const ResumenMexicoSection = ({ period = "Últimos 5 años (2020 - 2025 YTD)" }: ResumenMexicoSectionProps) => {
  // Historical data matching the mockup
  const historicalData = [
    { year: '2020', value: 1932, count: 59, label: '1,932' },
    { year: '2021', value: 11145, count: 90, label: '11,145' },
    { year: '2022', value: 4457, count: 91, label: '4,457' },
    { year: '2023', value: 8914, count: 72, label: '8,914' },
    { year: '2024', value: 10185, count: 64, label: '10,185' },
    { year: '2025 YTD', value: 3516, count: 29, label: '3,516' },
  ];

  // Industry breakdown data using project colors only
  const industryData = [
    { name: 'Servicios Públicos', value: 22, color: colors.primaryBlue },
    { name: 'Comunicaciones', value: 19, color: colors.accentTeal },
    { name: 'Bienes raíces', value: 13, color: colors.lightBlue },
    { name: 'Financiero', value: 12, color: colors.mediumBlue },
    { name: 'Bienes de consumo básico', value: 7, color: colors.accentPurple },
    { name: 'Materiales', value: 6, color: colors.accentPink },
    { name: 'Energía', value: 6, color: colors.darkGray },
    { name: 'Bienes de consumo discrecional', value: 5, color: colors.textGray },
    { name: 'Salud', value: 3, color: colors.mediumGray },
    { name: 'Otros', value: 4, color: colors.lightGray },
    { name: 'Tecnología', value: 2, color: colors.paleGray },
    { name: 'Industriales', value: 2, color: colors.paleBlue },
  ];

  return (
    <SectionFrame height={280} padding={16}>
      {/* Section Header */}
      <SectionHeader 
        title="Resumen de Fusiones y Adquisiciones en México" 
        period={period}
        borderColor={colors.primaryBlue}
      />

      {/* Content Area - Fixed dimensions for A4 */}
      <div className="flex gap-4 mt-3 h-[220px] pb-5">
        {/* Left Side - Historical Value Chart */}
        <div className="flex flex-col w-1/2 h-full">
          <h4 className="text-[10px] font-semibold text-[#718096] uppercase tracking-wider mb-2" style={{ height: '24px' }}>
            NÚMERO DE TRANSACCIONES Y VALOR ACUMULADO DE EMPRESAS EN MÉXICO
          </h4>
          {/* Chart fills the remaining space */}
          <div className="flex-1 min-h-[160px] -mx-5 pt-10">
            <HistoricalValueChart data={historicalData} />
          </div>
        </div>

        {/* Right Side - Industry Pie Chart */}
        <div className="flex flex-col w-1/2 h-full">
          <h4 className="text-[10px] font-semibold text-[#718096] uppercase tracking-wider mb-2" style={{ height: '24px' }}>
            VALOR ACUMULADO DE TRANSACCIONES POR INDUSTRIA
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