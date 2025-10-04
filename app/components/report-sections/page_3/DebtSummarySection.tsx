'use client';

import { SectionFrame } from '../SectionFrame';
import { SectionHeader } from '../SectionHeader';
import { colors } from '@/lib/design/tokens';
import { DebtRateBarChart, type DebtRateDatum } from '../../charts/DebtRateBarChart';
import { DebtRatingBarChart, type DebtRatingDatum } from '../../charts/DebtRatingBarChart';

const rateData: DebtRateDatum[] = [
  { year: '2022', fija: 61, variable: 39, total: 103_477 },
  { year: '2023', fija: 64, variable: 36, total: 112_050 },
  { year: '2024', fija: 63, variable: 37, total: 123_334 },
  { year: '2025 YTD', fija: 60, variable: 40, total: 86_860 },
];

const ratingData: DebtRatingDatum[] = [
  { year: '2022', aaa: 68, aa: 24, a: 8, total: 103_477 },
  { year: '2023', aaa: 81, aa: 17, a: 2, total: 112_050 },
  { year: '2024', aaa: 80, aa: 10, a: 10, total: 123_334 },
  { year: '2025 YTD', aaa: 85, aa: 9, a: 6, total: 86_860 },
];

export const DebtSummarySection = () => {
  return (
    <SectionFrame height={280} padding={16}>
      <SectionHeader
        title="Resumen de Emisiones de Deuda en México"
        period="2022 - 2025 YTD"
        borderColor={colors.primaryBlue}
      />

      <div className="grid grid-cols-2 gap-6 h-[200px]">
        <div className="flex flex-col h-full">
          <h4 className="text-[10px] font-semibold text-[#2d3748] uppercase tracking-widest mb-2">
            Monto emitido local por tasa
          </h4>
          <DebtRateBarChart data={rateData} />
          <div className="mt-3 flex items-center gap-4 text-[9px] text-[#4a5568]">
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: colors.primaryBlue }} />
              <span>Fija</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: colors.lightBlue }} />
              <span>Variable</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col h-full">
          <h4 className="text-[10px] font-semibold text-[#2d3748] uppercase tracking-widest mb-2">
            Emisiones por calificación crediticia
          </h4>
          <DebtRatingBarChart data={ratingData} />
          <div className="mt-3 flex items-center gap-4 text-[9px] text-[#4a5568] flex-wrap">
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: colors.primaryBlue }} />
              <span>AAA</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: colors.mediumBlue }} />
              <span>AA</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: colors.lightBlue }} />
              <span>A</span>
            </div>
          </div>
        </div>
      </div>
    </SectionFrame>
  );
};
