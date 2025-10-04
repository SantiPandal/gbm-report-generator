'use client';

import { SectionFrame } from '../SectionFrame';
import { SectionHeader } from '../SectionHeader';
import { colors } from '@/lib/design/tokens';

interface CapitalIssuanceRow {
  instrumentType: string;
  clave: string;
  serie: string;
  offeringType: string;
  paymentDate: string;
  issuedTitles: string;
  placementPrice: string;
  amountPlaced: string;
}

const capitalIssuances2025: CapitalIssuanceRow[] = [
  {
    instrumentType: 'Fibra E',
    clave: 'XFRA',
    serie: '22',
    offeringType: 'Follow-on',
    paymentDate: '02/06/2025',
    issuedTitles: '257',
    placementPrice: '20',
    amountPlaced: '5,148'
  },
  {
    instrumentType: 'Fibra E',
    clave: 'FIEMEX',
    serie: '25-2D',
    offeringType: 'Emisión inicial (non-cash OPI)',
    paymentDate: '16/06/2025',
    issuedTitles: '21',
    placementPrice: '103',
    amountPlaced: '2,208'
  },
  {
    instrumentType: 'Fibra E',
    clave: 'FIEMEX',
    serie: '25D',
    offeringType: 'Emisión inicial (non-cash OPI)',
    paymentDate: '16/06/2025',
    issuedTitles: '22',
    placementPrice: '103',
    amountPlaced: '2,293'
  },
  {
    instrumentType: 'Fibra E',
    clave: 'FNEXT',
    serie: 'NEXT25',
    offeringType: 'Emisión inicial',
    paymentDate: '24/07/2025',
    issuedTitles: '80',
    placementPrice: '100',
    amountPlaced: '8,000'
  }
];

export const CapitalIssuance2025Section = () => {
  return (
    <SectionFrame height={210} padding={16}>
      <SectionHeader
        title="Emisiones de Capital en México 2025"
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
            {capitalIssuances2025.map((issuance, index) => (
              <tr
                key={`${issuance.instrumentType}-${issuance.clave}-${issuance.serie}`}
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="py-1.5 px-2 font-semibold text-[#2d3748]">{issuance.instrumentType}</td>
                <td className="py-1.5 px-2 text-[#4a5568]">{issuance.clave}</td>
                <td className="py-1.5 px-2 text-[#4a5568]">{issuance.serie}</td>
                <td className="py-1.5 px-2 text-[#4a5568]">{issuance.offeringType}</td>
                <td className="py-1.5 px-2 text-[#4a5568]">{issuance.paymentDate}</td>
                <td className="py-1.5 px-2 text-right text-[#2d3748]">{issuance.issuedTitles}</td>
                <td className="py-1.5 px-2 text-right text-[#2d3748]">{issuance.placementPrice}</td>
                <td className="py-1.5 px-2 text-right text-[#2d3748]">{issuance.amountPlaced}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionFrame>
  );
};
