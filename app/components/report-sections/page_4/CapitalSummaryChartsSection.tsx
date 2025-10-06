'use client';

import { SectionFrame } from '../SectionFrame';
import { SectionHeader } from '../SectionHeader';
import { colors } from '@/lib/design/tokens';
import { BarLineTrendChart } from '../../charts/BarLineTrendChart';
import { IndustryPieChart } from '../../charts/IndustryPieChart';
import { useReportData } from '@/app/data-map/ReportDataContext';
import type { BarLineTrendDatum } from '../../charts/BarLineTrendChart';

const pesoFormatter = (value: number) => `${value.toLocaleString('es-MX')}`;

export const CapitalSummaryChartsSection = () => {
  const reportData = useReportData();
  const ipoDataset = reportData['3_0_A'];
  const issuerTypeDataset = reportData['3_0_B'];
  const followOnDataset = reportData['3_0_C'];
  const rightsDataset = reportData['3_0_D'];

  const ipoTrendData: BarLineTrendDatum[] = ipoDataset.Data.map((row) => ({
    category: row.Year,
    barValue: row.Accumulated_Value_MXN_MM ?? 0,
    lineValue: row.Number_of_Transactions ?? 0,
    barLabel: (row.Accumulated_Value_MXN_MM ?? 0).toLocaleString('es-MX'),
  }));

  const followOnTrendData: BarLineTrendDatum[] = followOnDataset.Data.map((row) => ({
    category: row.Year,
    barValue: row.Accumulated_Value_MXN_MM ?? 0,
    lineValue: row.Number_of_Transactions ?? 0,
    barLabel: (row.Accumulated_Value_MXN_MM ?? 0).toLocaleString('es-MX'),
  }));

  const rightsOfferingTrendData: BarLineTrendDatum[] = rightsDataset.Data.map((row) => ({
    category: row.Year,
    barValue: row.Accumulated_Value_MXN_MM ?? 0,
    lineValue: row.Number_of_Transactions ?? 0,
    barLabel: (row.Accumulated_Value_MXN_MM ?? 0).toLocaleString('es-MX'),
  }));

  const industryPalette = [
    colors.primaryBlue,
    colors.accentTeal,
    colors.lightBlue,
    colors.accentPurple,
    colors.accentPink,
    colors.mediumBlue,
  ];

  const equityIndustryData = issuerTypeDataset.Data.map((row, index) => ({
    name: row.Issuer_Type,
    value: row.Percentage ?? 0,
    color: industryPalette[index % industryPalette.length],
  }));

  const periodLabel = `${ipoTrendData[0]?.category ?? ''} - ${ipoTrendData[ipoTrendData.length - 1]?.category ?? ''}`;

  return (
    <SectionFrame height={540} padding={20}>
      <SectionHeader
        title={ipoDataset.Section_Title}
        period={periodLabel}
        borderColor={colors.primaryBlue}
      />

      <div className="flex flex-col gap-4 h-[440px] mt-3">
        <div className="grid grid-cols-2 gap-8 h-[210px]">
          <div className="flex flex-col h-full">
            <div className="h-[28px] mb-2">
              <h4 className="text-[10px] font-semibold text-[#2d3748] uppercase tracking-widest leading-tight">
                {ipoDataset.Chart_Title}
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

          <div className="flex flex-col h-full">
            <div className="h-[28px] mb-2">
              <h4 className="text-[10px] font-semibold text-[#2d3748] uppercase tracking-widest leading-tight">
                {issuerTypeDataset.Chart_Title}
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

        <div className="grid grid-cols-2 gap-8 h-[210px]">
          <div className="flex flex-col h-full">
            <div className="h-[28px] mb-2">
              <h4 className="text-[10px] font-semibold text-[#2d3748] uppercase tracking-widest leading-tight">
                {followOnDataset.Chart_Title}
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

          <div className="flex flex-col h-full">
            <div className="h-[28px] mb-2">
              <h4 className="text-[10px] font-semibold text-[#2d3748] uppercase tracking-widest leading-tight">
                {rightsDataset.Chart_Title}
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
