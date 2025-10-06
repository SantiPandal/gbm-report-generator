'use client';

import { SectionFrame } from '../SectionFrame';
import { SectionHeader } from '../SectionHeader';
import { colors } from '@/lib/design/tokens';
import { DebtRateBarChart, type DebtRateDatum } from '../../charts/DebtRateBarChart';
import { DebtRatingBarChart, type DebtRatingDatum } from '../../charts/DebtRatingBarChart';
import { useReportData } from '@/app/data-map/ReportDataContext';

export const DebtSummarySection = () => {
  const reportData = useReportData();
  const rateDataset = reportData['2_0_A'];
  const ratingDataset = reportData['2_0_B'];

  const rateData: DebtRateDatum[] = rateDataset.Data.map((row) => ({
    year: row.Year,
    fija: row.Fixed_Rate_Percentage ?? 0,
    variable: row.Variable_Rate_Percentage ?? 0,
    total: row.Total_Amount_MXN_MM ?? 0,
  }));

  const ratingData: DebtRatingDatum[] = ratingDataset.Data.map((row) => ({
    year: row.Year,
    aaa: row.AAA_Percentage ?? 0,
    aa: row.AA_Percentage ?? 0,
    a: row.A_Percentage ?? 0,
    total: row.Total_Amount_MXN_MM ?? 0,
  }));

  const periodLabel = rateData.length > 1
    ? `${rateData[0].year} - ${rateData[rateData.length - 1].year}`
    : rateData[0]?.year ?? '';

  return (
    <SectionFrame height={280} padding={16}>
      <SectionHeader
        title={rateDataset.Section_Title}
        period={periodLabel}
        borderColor={colors.primaryBlue}
      />

      <div className="grid grid-cols-2 gap-6 h-[200px]">
        <div className="flex flex-col h-full">
          <h4 className="text-[10px] font-semibold text-[#2d3748] uppercase tracking-widest mb-2">
            {rateDataset.Chart_Title}
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
          <h4 className="text-[10px] font-semibold text-[#2d3748] uppercase tracking-widest mb-[0.6rem]">
            {ratingDataset.Chart_Title}
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
