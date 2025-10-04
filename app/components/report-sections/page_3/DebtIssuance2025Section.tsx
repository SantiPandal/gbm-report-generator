'use client';

import { SectionFrame } from '../SectionFrame';
import { SectionHeader } from '../SectionHeader';
import { colors } from '@/lib/design/tokens';

interface DebtIssuanceRow {
  issuer: string;
  issueDate: string;
  maturityDate: string;
  termYears: number;
  amount: string;
  rating: string;
  couponType: string;
  referenceRate: string;
  ipt: string;
  spread: string;
}

const debtIssuances2025: DebtIssuanceRow[] = [
  {
    issuer: 'GAP',
    issueDate: '04/02/2025',
    maturityDate: '04/03/2032',
    termYears: 7,
    amount: '3,000',
    rating: 'mxAAA (AA.mx)',
    couponType: 'Fija',
    referenceRate: 'MBONO 31 6.88%',
    ipt: '99',
    spread: '69'
  },
  {
    issuer: 'GAP',
    issueDate: '04/02/2025',
    maturityDate: '04/02/2030',
    termYears: 5,
    amount: '3,000',
    rating: 'mxAAA (AA.mx)',
    couponType: 'Variable',
    referenceRate: 'TIIE FONDEO',
    ipt: '99',
    spread: '63'
  },
  {
    issuer: 'BIMBO',
    issueDate: '14/02/2025',
    maturityDate: '16/02/2030',
    termYears: 5,
    amount: '12,726',
    rating: 'mxAAA (AA.mx)',
    couponType: 'Fija',
    referenceRate: 'MBONO 31 9.30%',
    ipt: '30',
    spread: '88'
  },
  {
    issuer: 'BIMBO',
    issueDate: '14/02/2025',
    maturityDate: '16/02/2028',
    termYears: 3,
    amount: '2,238',
    rating: 'mxAAA (AA.mx)',
    couponType: 'Variable',
    referenceRate: 'TIIE FONDEO',
    ipt: '30',
    spread: '88'
  },
  {
    issuer: 'ELEKTRA',
    issueDate: '28/02/2025',
    maturityDate: '28/02/2035',
    termYears: 10,
    amount: '5,500',
    rating: 'AA-(mex) / HR AA',
    couponType: 'Variable',
    referenceRate: 'TIIE FONDEO',
    ipt: '50',
    spread: '125'
  },
  {
    issuer: 'MOLYMET',
    issueDate: '18/03/2025',
    maturityDate: '18/03/2038',
    termYears: 13,
    amount: '5,500',
    rating: 'AA (mex) / HR AA',
    couponType: 'Variable',
    referenceRate: 'TIIE FONDEO',
    ipt: '50',
    spread: '125'
  },
  {
    issuer: 'ORBIAN',
    issueDate: '21/03/2025',
    maturityDate: '21/03/2030',
    termYears: 5,
    amount: '3,000',
    rating: 'AA+(mex) / HR AA',
    couponType: 'Variable',
    referenceRate: 'TIIE FONDEO',
    ipt: '45',
    spread: '110'
  },
  {
    issuer: 'ORBIAN',
    issueDate: '11/04/2025',
    maturityDate: '20/10/2035',
    termYears: 10,
    amount: '3,500',
    rating: 'AA+(mex) / HR AA',
    couponType: 'Fija',
    referenceRate: 'MBONO 33 9.10%',
    ipt: '65',
    spread: '180'
  },
  {
    issuer: 'FERROMK',
    issueDate: '12/05/2025',
    maturityDate: '31/12/2028',
    termYears: 4,
    amount: '5,500',
    rating: 'mxAAA / Aa.mx',
    couponType: 'Variable',
    referenceRate: 'TIIE FONDEO',
    ipt: '47',
    spread: '127'
  },
  {
    issuer: 'FSHOP',
    issueDate: '20/05/2025',
    maturityDate: '26/05/2028',
    termYears: 3,
    amount: '700',
    rating: 'AA-(mex) / HR AA',
    couponType: 'Variable',
    referenceRate: 'TIIE FONDEO',
    ipt: '125',
    spread: '220'
  },
  {
    issuer: 'FUNO',
    issueDate: '30/05/2025',
    maturityDate: '29/05/2028',
    termYears: 3,
    amount: '3,700',
    rating: 'AA(mex) / HR AA',
    couponType: 'Variable',
    referenceRate: 'TIIE FONDEO',
    ipt: '125',
    spread: '210'
  },
  {
    issuer: 'LAB',
    issueDate: '03/06/2025',
    maturityDate: '27/05/2031',
    termYears: 6,
    amount: '700',
    rating: 'AA+(mex) / HR AA',
    couponType: 'Variable',
    referenceRate: 'TIIE 28',
    ipt: '70',
    spread: '130'
  }
];

export const DebtIssuance2025Section = () => {
  return (
    <SectionFrame height={320} padding={16}>
      <SectionHeader
        title="Emisiones de Deuda en México 2025"
        period="Montos en Ps.$ MM"
        borderColor={colors.primaryBlue}
      />

      <div className="overflow-hidden rounded-md border border-gray-200">
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
            {debtIssuances2025.map((issuance, index) => (
              <tr
                key={`${issuance.issuer}-${issuance.issueDate}-${index}`}
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="py-1.5 px-2 font-semibold text-[#2d3748]">{issuance.issuer}</td>
                <td className="py-1.5 px-2 text-[#4a5568]">{issuance.issueDate}</td>
                <td className="py-1.5 px-2 text-[#4a5568]">{issuance.maturityDate}</td>
                <td className="py-1.5 px-2 text-center text-[#2d3748]">{issuance.termYears}</td>
                <td className="py-1.5 px-2 text-right text-[#2d3748]">{issuance.amount}</td>
                <td className="py-1.5 px-2 text-[#4a5568]">{issuance.rating}</td>
                <td className="py-1.5 px-2 text-[#4a5568]">{issuance.referenceRate}</td>
                <td className="py-1.5 px-2 text-center text-[#2d3748]">{issuance.ipt}</td>
                <td className="py-1.5 px-2 text-center text-[#2d3748]">{issuance.spread}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionFrame>
  );
};
