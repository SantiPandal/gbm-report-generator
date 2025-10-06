'use client';

import { SectionFrame } from '../SectionFrame';
import { SectionHeader } from '../SectionHeader';
import { colors } from '@/lib/design/tokens';
import { useReportData } from '@/app/data-map/ReportDataContext';

export const CapitalIssuance2025Section = () => {
  const reportData = useReportData();
  const dataset = reportData['3_1'];
  const issuances = dataset.Data;

  return (
    <SectionFrame height={210} padding={16}>
      <SectionHeader
        title={dataset.Section_Title}
        period="Montos en Ps.$ MM"
        borderColor={colors.primaryBlue}
      />

      <div className="overflow-hidden rounded-md border border-gray-200">
        <table className="w-full text-[9px]">
          <thead>
            <tr className="bg-[#f7fafc] text-[9px] text-[#4a5568] uppercase tracking-widest">
              <th className="py-2 px-2 text-left font-semibold">Tipo de instrumento</th>
              <th className="py-2 px-2 text-left font-semibold">Clave</th>
              <th className="py-2 px-2 text-left font-semibold">Serie</th>
              <th className="py-2 px-2 text-left font-semibold">Tipo de colocación</th>
              <th className="py-2 px-2 text-left font-semibold">Fecha de pago</th>
              <th className="py-2 px-2 text-right font-semibold">Títulos emitidos (MM)</th>
              <th className="py-2 px-2 text-right font-semibold">Precio de colocación (Ps.$)</th>
              <th className="py-2 px-2 text-right font-semibold">Monto colocado (Ps.$ MM)</th>
            </tr>
          </thead>
          <tbody>
            {issuances.map((issuance, index) => (
              <tr
                key={`${issuance.Instrument_Type}-${issuance.Ticker}-${issuance.Series}-${index}`}
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="py-1.5 px-2 font-semibold text-[#2d3748]">{issuance.Instrument_Type}</td>
                <td className="py-1.5 px-2 text-[#4a5568]">{issuance.Ticker}</td>
                <td className="py-1.5 px-2 text-[#4a5568]">{issuance.Series}</td>
                <td className="py-1.5 px-2 text-[#4a5568]">{issuance.Placement_Type}</td>
                <td className="py-1.5 px-2 text-[#4a5568]">{issuance.Payment_Date}</td>
                <td className="py-1.5 px-2 text-right text-[#2d3748]">{issuance.Shares_Issued_MM ?? ''}</td>
                <td className="py-1.5 px-2 text-right text-[#2d3748]">{issuance.Placement_Price_MXN ?? ''}</td>
                <td className="py-1.5 px-2 text-right text-[#2d3748]">{issuance.Amount_Placed_MXN_MM?.toLocaleString('es-MX') ?? issuance.Amount_Placed_MXN_MM}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionFrame>
  );
};
