'use client';

import { SectionFrame } from '../SectionFrame';
import { SectionHeader } from '../SectionHeader';
import { colors } from '@/lib/design/tokens';
import { useReportData } from '@/app/data-map/ReportDataContext';
import type { Section2_1_Row } from '@/app/data-map/types';

interface DebtIssuance2025SectionProps {
  issuances?: Section2_1_Row[];
  title?: string;
  period?: string;
  fullHeight?: boolean;
}

export const DebtIssuance2025Section = ({
  issuances,
  title,
  period = 'Montos en Ps.$ MM',
  fullHeight = false,
}: DebtIssuance2025SectionProps) => {
  const reportData = useReportData();
  const dataset = reportData['2_1'];
  const rows = issuances ?? dataset.Data ?? [];
  const effectiveTitle = title ?? dataset.Section_Title;

  return (
    <SectionFrame
      height={fullHeight ? undefined : 320}
      padding={16}
      className={fullHeight ? 'flex-1 flex flex-col' : ''}
    >
      <SectionHeader
        title={effectiveTitle}
        period={period}
        borderColor={colors.primaryBlue}
      />

      <div className={`overflow-hidden rounded-md border border-gray-200 ${fullHeight ? 'mt-2 flex-1 flex flex-col' : ''}`}>
        <table className="w-full text-[9px]">
          <thead>
            <tr className="bg-[#f7fafc] text-[9px] text-[#4a5568] uppercase tracking-widest">
              <th className="py-2 px-2 text-left font-semibold">Emisor</th>
              <th className="py-2 px-2 text-left font-semibold">Fecha de emisión</th>
              <th className="py-2 px-2 text-left font-semibold">Fecha de vencimiento</th>
              <th className="py-2 px-2 text-center font-semibold">Plazo</th>
              <th className="py-2 px-2 text-right font-semibold">Monto (Ps.$ MM)</th>
              <th className="py-2 px-2 text-left font-semibold">Calificación</th>
              <th className="py-2 px-2 text-left font-semibold">Tasa de referencia</th>
              <th className="py-2 px-2 text-center font-semibold">IPT</th>
              <th className="py-2 px-2 text-center font-semibold">Spread de salida (bps)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((issuance, index) => (
              <tr
                key={`${issuance.Issuer}-${issuance.Issue_Date}-${index}`}
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="py-1.5 px-2 font-semibold text-[#2d3748]">{issuance.Issuer}</td>
                <td className="py-1.5 px-2 text-[#4a5568]">{issuance.Issue_Date}</td>
                <td className="py-1.5 px-2 text-[#4a5568]">{issuance.Maturity_Date}</td>
                <td className="py-1.5 px-2 text-center text-[#2d3748]">{issuance.Term_Years ?? ''}</td>
                <td className="py-1.5 px-2 text-right text-[#2d3748]">{issuance.Amount_MXN_MM?.toLocaleString('es-MX') ?? issuance.Amount_MXN_MM}</td>
                <td className="py-1.5 px-2 text-[#4a5568]">{issuance.Rating_Fitch_SP_Moodys_HR}</td>
                <td className="py-1.5 px-2 text-[#4a5568]">{issuance.Rate_Reference}</td>
                <td className="py-1.5 px-2 text-center text-[#2d3748]">{issuance.IPT}</td>
                <td className="py-1.5 px-2 text-center text-[#2d3748]">{issuance.Spread_bps}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionFrame>
  );
};
