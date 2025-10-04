'use client';

import { SectionFrame } from '../SectionFrame';
import { SectionHeader } from '../SectionHeader';
import { colors } from '@/lib/design/tokens';
import { YieldProjectionChart, type YieldProjectionDatum } from '../../charts/YieldProjectionChart';

const mbonoData: YieldProjectionDatum[] = [
  { tenor: '3M', base: 7.05, projection: 7.10 },
  { tenor: '6M', base: 7.10, projection: 7.20 },
  { tenor: '1Y', base: 7.25, projection: 7.35 },
  { tenor: '2Y', base: 7.40, projection: 7.60 },
  { tenor: '3Y', base: 7.55, projection: 7.90 },
  { tenor: '5Y', base: 7.70, projection: 8.10 },
  { tenor: '7Y', base: 7.85, projection: 8.25 },
  { tenor: '10Y', base: 8.05, projection: 8.45 },
  { tenor: '20Y', base: 8.35, projection: 8.80 },
  { tenor: '30Y', base: 8.55, projection: 9.00 },
];

const tiieData: YieldProjectionDatum[] = [
  { tenor: '3M', base: 7.57, projection: 7.65 },
  { tenor: '6M', base: 7.59, projection: 7.70 },
  { tenor: '1Y', base: 7.63, projection: 7.85 },
  { tenor: '2Y', base: 7.74, projection: 8.05 },
  { tenor: '3Y', base: 7.87, projection: 8.20 },
  { tenor: '5Y', base: 7.97, projection: 8.35 },
  { tenor: '7Y', base: 8.05, projection: 8.45 },
  { tenor: '10Y', base: 8.12, projection: 8.58 },
  { tenor: '15Y', base: 8.20, projection: 8.75 },
  { tenor: '20Y', base: 8.28, projection: 8.90 },
];

export const RatePerspectiveSection = () => {
  return (
    <SectionFrame height={280} padding={16}>
      <SectionHeader
        title="Perspectiva de Tasas"
        period="Escenarios al cierre de julio 2025"
        borderColor={colors.primaryBlue}
      />

      <div className="grid grid-cols-2 gap-6 h-[200px]">
        <div className="flex flex-col h-full">
          <h4 className="text-[10px] font-semibold text-[#2d3748] uppercase tracking-widest mb-2">
            Proyección de rendimiento MBONO
          </h4>
          <YieldProjectionChart
            data={mbonoData}
            baseLabel="Curva spot"
            projectionLabel="Proyección 12M"
            lineColor={colors.primaryBlue}
            projectionColor={colors.accentPurple}
          />
        </div>

        <div className="flex flex-col h-full">
          <h4 className="text-[10px] font-semibold text-[#2d3748] uppercase tracking-widest mb-2">
            Proyección de rendimiento TIIE
          </h4>
          <YieldProjectionChart
            data={tiieData}
            baseLabel="Curva spot"
            projectionLabel="Proyección 12M"
            lineColor={colors.primaryBlue}
            projectionColor={colors.accentTeal}
          />
        </div>
      </div>
    </SectionFrame>
  );
};
