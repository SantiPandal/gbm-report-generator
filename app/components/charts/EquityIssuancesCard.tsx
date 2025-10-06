'use client';

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts';

interface EquityIssuancesCardProps {
  totalVolumeLabel: string;
  highlightedEmission?: {
    name: string;
    amountLabel: string;
  };
  ipoVolume: number;
  followOnVolume: number;
}

const formatMillions = (value: number) => `MXN ${value.toLocaleString('es-MX')} MM`;

export const EquityIssuancesCard = ({
  totalVolumeLabel,
  highlightedEmission,
  ipoVolume,
  followOnVolume,
}: EquityIssuancesCardProps) => {
  const ipoData = [{ name: 'IPOs', value: ipoVolume }];
  const followOnData = [{ name: 'Follow-Ons/Rights', value: followOnVolume }];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-2.5 flex flex-col h-full overflow-hidden">
      <div className="mb-1">
        <h2 className="text-[11px] font-bold text-gray-900">Emisiones de Capital</h2>
        <p className="text-[9px] text-gray-600">IPOs, Follow-Ons & Rights Offerings</p>
        <p className="text-[8px] text-gray-500 mt-0.5">
          Volumen Total YTD 2025: <span className="font-bold text-gray-900 text-[10px]">{totalVolumeLabel}</span>
        </p>
      </div>

      {highlightedEmission && (
        <div className="bg-gray-50 rounded p-1 mb-1 text-[8px]">
          <span className="font-semibold text-gray-700">📌 Emisión destacada: </span>
          <span className="font-bold text-gray-900">{highlightedEmission.name}</span>
          <span className="text-gray-600"> | Monto: {highlightedEmission.amountLabel}</span>
        </div>
      )}

      <div className="flex-1 flex flex-col">
        <h3 className="text-[9px] font-semibold text-gray-700 mb-2">Emisiones de Capital</h3>

        <div className="grid grid-cols-2 gap-3 flex-1">
          <div className="flex flex-col">
            <div className="mb-1">
              <h4 className="text-[9px] font-semibold text-gray-700">IPOs</h4>
              <p className="text-[10px] font-bold text-gray-900">{formatMillions(ipoVolume)}</p>
            </div>

            <div className="flex-1 flex flex-col justify-end">
              <ResponsiveContainer width="100%" height={110}>
                <BarChart data={ipoData} margin={{ top: 5, right: 12, bottom: 8, left: 12 }}>
                  <CartesianGrid vertical={false} stroke="#e5e7eb" strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={false} axisLine={{ stroke: '#e5e7eb', strokeWidth: 0.5 }} />
                  <YAxis hide domain={[0, Math.max(ipoVolume, followOnVolume) * 1.1 || 1]} />
                  <Bar dataKey="value" fill="#1e40af" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-[8px] text-gray-600 text-center -mt-1.5 font-medium">2025 YTD</p>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="mb-1">
              <h4 className="text-[9px] font-semibold text-gray-700">Follow-Ons/Rights Offerings</h4>
              <p className="text-[10px] font-bold text-gray-900">{formatMillions(followOnVolume)}</p>
            </div>

            <div className="flex-1 flex flex-col justify-end">
              <ResponsiveContainer width="100%" height={110}>
                <BarChart data={followOnData} margin={{ top: 5, right: 12, bottom: 8, left: 12 }}>
                  <CartesianGrid vertical={false} stroke="#e5e7eb" strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={false} axisLine={{ stroke: '#e5e7eb', strokeWidth: 0.5 }} />
                  <YAxis hide domain={[0, Math.max(ipoVolume, followOnVolume) * 1.1 || 1]} />
                  <Bar dataKey="value" fill="#60a5fa" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-[8px] text-gray-600 text-center -mt-1.5 font-medium">2025 YTD</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
