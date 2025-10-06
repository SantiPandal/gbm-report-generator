'use client';

import { SectionFrame } from '../SectionFrame';
import { SectionHeader } from '../SectionHeader';
import { colors } from '@/lib/design/tokens';
import { YieldProjectionChart, type YieldProjectionDatum } from '../../charts/YieldProjectionChart';
import { useReportData } from '@/app/data-map/ReportDataContext';

export const RatePerspectiveSection = () => {
  const reportData = useReportData();
  const mbonoDataset = reportData['2_0_C'];
  const tiieDataset = reportData['2_0_D'];

  const mbonoData: YieldProjectionDatum[] = mbonoDataset.Data.map((row) => ({
    tenor: row.Term,
    latest: row.Latest,
    projection6M: row._6M_Projection,
    projection12M: row._12M_Projection,
  }));

  const tiieData: YieldProjectionDatum[] = tiieDataset.Data.map((row) => ({
    tenor: row.Term,
    latest: row.Latest,
    projection6M: row._6M_Projection,
    projection12M: row._12M_Projection,
  }));

  return (
    <SectionFrame height={280} padding={16}>
      <SectionHeader
        title={mbonoDataset.Section_Title}
        period="Escenarios al cierre de julio 2025"
        borderColor={colors.primaryBlue}
      />

      <div className="grid grid-cols-2 gap-6 h-[200px]">
        <div className="flex flex-col h-full">
          <h4 className="text-[10px] font-semibold text-[#2d3748] uppercase tracking-widest mb-2">
            {mbonoDataset.Chart_Title}
          </h4>
          <YieldProjectionChart
            data={mbonoData}
            latestLabel="Curva spot"
            projection6MLabel="Proyección 6M"
            projection12MLabel="Proyección 12M"
            latestColor={colors.primaryBlue}
            projection6MColor={colors.accentPurple}
            projection12MColor={colors.accentTeal}
          />
        </div>

        <div className="flex flex-col h-full">
          <h4 className="text-[10px] font-semibold text-[#2d3748] uppercase tracking-widest mb-2">
            {tiieDataset.Chart_Title}
          </h4>
          <YieldProjectionChart
            data={tiieData}
            latestLabel="Tasa actual"
            projection6MLabel="Proyección 6M"
            projection12MLabel="Proyección 12M"
            latestColor={colors.primaryBlue}
            projection6MColor={colors.accentPurple}
            projection12MColor={colors.accentTeal}
          />
        </div>
      </div>
    </SectionFrame>
  );
};
