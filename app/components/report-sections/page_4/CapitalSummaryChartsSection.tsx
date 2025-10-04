'use client';

import { SectionFrame } from '../SectionFrame';
import { SectionHeader } from '../SectionHeader';
import { colors } from '@/lib/design/tokens';
import { BarLineTrendChart, type BarLineTrendDatum } from '../../charts/BarLineTrendChart';
import { IndustryPieChart } from '../../charts/IndustryPieChart';

const ipoTrendData: BarLineTrendDatum[] = [
  { category: '2020', barValue: 12_637, lineValue: 2, barLabel: '12,637' },
  { category: '2021', barValue: 28_227, lineValue: 3, barLabel: '28,227' },
  { category: '2022', barValue: 2_454, lineValue: 2, barLabel: '2,454' },
  { category: '2023', barValue: 9_628, lineValue: 3, barLabel: '9,628' },
  { category: '2024', barValue: 8_628, lineValue: 3, barLabel: '8,628' },
  { category: '2025 YTD', barValue: 8_008, lineValue: 1, barLabel: '8,008' },
];

const followOnTrendData: BarLineTrendDatum[] = [
  { category: '2020', barValue: 779, lineValue: 1, barLabel: '779' },
  { category: '2021', barValue: 17_192, lineValue: 1, barLabel: '17,192' },
  { category: '2022', barValue: 13_110, lineValue: 2, barLabel: '13,110' },
  { category: '2023', barValue: 10_140, lineValue: 3, barLabel: '10,140' },
  { category: '2024', barValue: 25_677, lineValue: 3, barLabel: '25,677' },
  { category: '2025 YTD', barValue: 1_145, lineValue: 0, barLabel: '1,145' },
];

const rightsOfferingTrendData: BarLineTrendDatum[] = [
  { category: '2020', barValue: 9_816, lineValue: 4, barLabel: '9,816' },
  { category: '2021', barValue: 2_700, lineValue: 2, barLabel: '2,700' },
  { category: '2022', barValue: 2_588, lineValue: 2, barLabel: '2,588' },
  { category: '2023', barValue: 2_877, lineValue: 2, barLabel: '2,877' },
  { category: '2024', barValue: 22_913, lineValue: 8, barLabel: '22,913' },
  { category: '2025 YTD', barValue: 0, lineValue: 0, barLabel: '0' },
];

const equityIndustryData = [
  { name: 'FIBRAs E', value: 60, color: colors.primaryBlue },
  { name: 'FIBRAs', value: 25, color: colors.accentTeal },
  { name: 'Empresas', value: 15, color: colors.lightBlue },
];

const pesoFormatter = (value: number) => `${value.toLocaleString('es-MX')}`;

export const CapitalSummaryChartsSection = () => {
  return (
    <SectionFrame height={540} padding={20}>
      <SectionHeader
        title="Resumen de Emisiones de Capital en México"
        period="Últimos 5 años (2020 - 2025 YTD)"
        borderColor={colors.primaryBlue}
      />

      <div className="flex flex-col gap-4 h-[440px] mt-3">
        {/* Top row - IPOs and Industry Breakdown */}
        <div className="grid grid-cols-2 gap-8 h-[210px]">
          {/* IPO Chart Container */}
          <div className="flex flex-col h-full">
            <div className="h-[28px] mb-2">
              <h4 className="text-[10px] font-semibold text-[#2d3748] uppercase tracking-widest leading-tight">
                Número de transacciones y valor acumulado de IPOs en México
              </h4>
            </div>
            <div className="flex-1">
              <BarLineTrendChart
                data={ipoTrendData}
                barLabel="Monto (Ps.$ MM)"
                lineLabel="Transacciones"
                yAxisLeftLabel="Monto (Ps.$ MM)"
                yAxisRightLabel="Transacciones"
                valueFormatter={pesoFormatter}
                height={170}
              />
            </div>
          </div>

          {/* Industry Pie Chart Container */}
          <div className="flex flex-col h-full">
            <div className="h-[28px] mb-2">
              <h4 className="text-[10px] font-semibold text-[#2d3748] uppercase tracking-widest leading-tight">
                Transacciones de empresas mexicanas por industria - YTD 2025
              </h4>
            </div>
            <div className="flex-1 flex flex-col">
              <div className="h-[140px] flex items-center justify-center">
                <IndustryPieChart data={equityIndustryData} />
              </div>
              <div className="mt-auto pt-2 flex items-center justify-center gap-4 text-[9px] text-[#4a5568]">
                {equityIndustryData.map((item) => (
                  <div key={item.name} className="flex items-center gap-1.5">
                    <span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: item.color }} />
                    <span>{item.name}: {item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row - Follow Ons and Rights Offerings */}
        <div className="grid grid-cols-2 gap-8 h-[210px]">
          {/* Follow Ons Chart Container */}
          <div className="flex flex-col h-full">
            <div className="h-[28px] mb-2">
              <h4 className="text-[10px] font-semibold text-[#2d3748] uppercase tracking-widest leading-tight">
                Número de transacciones y valor acumulado de Follow Ons
              </h4>
            </div>
            <div className="flex-1">
              <BarLineTrendChart
                data={followOnTrendData}
                barLabel="Monto (Ps.$ MM)"
                lineLabel="Transacciones"
                yAxisLeftLabel="Monto (Ps.$ MM)"
                yAxisRightLabel="Transacciones"
                valueFormatter={pesoFormatter}
                height={170}
                barColor={colors.accentPurple}
              />
            </div>
          </div>

          {/* Rights Offerings Chart Container */}
          <div className="flex flex-col h-full">
            <div className="h-[28px] mb-2">
              <h4 className="text-[10px] font-semibold text-[#2d3748] uppercase tracking-widest leading-tight">
                Número de transacciones y valor acumulado de Rights Offerings
              </h4>
            </div>
            <div className="flex-1">
              <BarLineTrendChart
                data={rightsOfferingTrendData}
                barLabel="Monto (Ps.$ MM)"
                lineLabel="Transacciones"
                yAxisLeftLabel="Monto (Ps.$ MM)"
                yAxisRightLabel="Transacciones"
                valueFormatter={pesoFormatter}
                height={170}
                barColor={colors.accentTeal}
              />
            </div>
          </div>
        </div>
      </div>
    </SectionFrame>
  );
};
