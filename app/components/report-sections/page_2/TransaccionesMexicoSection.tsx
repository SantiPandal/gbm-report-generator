'use client';

import { SectionHeader } from '../SectionHeader';
import { colors } from '@/lib/design/tokens';
import { useReportData } from '@/app/data-map/ReportDataContext';
import type { Section1_1_Row } from '@/app/data-map/types';

interface TransaccionesMexicoSectionProps {
  period?: string;
  transactions?: Section1_1_Row[];
  title?: string;
  fullHeight?: boolean;
}

const TABLE_HEADINGS = [
  'Objetivo',
  'Industria',
  'Comprador',
  'Vendedor',
  'Monto (US$ MM)',
  '% Adquirido',
];

export const TransaccionesMexicoSection = ({
  period = '2025 YTD',
  transactions,
  title,
  fullHeight = false,
}: TransaccionesMexicoSectionProps) => {
  const reportData = useReportData();
  const dataset = reportData['1_1'];
  const rows = transactions ?? dataset.Data;
  const effectiveTitle = title ?? dataset.Table_Title;
  const footnote = dataset.Footnote;

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-3 ${fullHeight ? 'h-full flex flex-col' : ''}`}>
      <SectionHeader
        title={effectiveTitle}
        period={period}
        borderColor={colors.primaryBlue}
      />

      <div className={`mt-2 overflow-hidden rounded-md border border-gray-200 ${fullHeight ? 'flex-1 flex flex-col' : ''}`}>
        <table className="w-full text-[9px]">
          <thead>
            <tr className="bg-[#f7fafc] text-[9px] text-[#4a5568] uppercase tracking-widest">
              {TABLE_HEADINGS.map((heading) => (
                <th key={heading} className="py-2 px-2 text-left font-semibold">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((transaction, index) => (
              <tr
                key={`${transaction.Target}-${transaction.Buyer}-${index}`}
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="py-1.5 px-2 font-semibold text-[#2d3748]">{transaction.Target}</td>
                <td className="py-1.5 px-2 text-[#4a5568]">{transaction.Industry}</td>
                <td className="py-1.5 px-2 text-[#4a5568]">{transaction.Buyer}</td>
                <td className="py-1.5 px-2 text-[#4a5568]">{transaction.Seller}</td>
                <td className="py-1.5 px-2 text-[#4a5568]">{transaction.Amount_USD_MM}</td>
                <td className="py-1.5 px-2 text-[#4a5568]">{transaction.Percentage_Acquired}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {footnote && !fullHeight && (
        <p className="text-[8px] text-[#718096] italic mt-2">{footnote}</p>
      )}
    </div>
  );
};
