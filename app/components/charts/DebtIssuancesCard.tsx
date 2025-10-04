'use client';

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface DebtIssuancesCardProps {
  totalVolume?: string;
  highlightedEmission?: {
    name: string;
    demand: string;
    rate: string;
    term: string;
  };
  fixedPercent?: number;
  variablePercent?: number;
  aaaPercent?: number;
  aaAPercent?: number;
}

export const DebtIssuancesCard = ({
  totalVolume = "Ps.$86,860 MM",
  highlightedEmission = {
    name: "Naturgy (NM 25 & NM 25-2)",
    demand: "3.4x",
    rate: "Variable TIIE + 63 bps & Fijo 9.98%",
    term: ""
  },
  fixedPercent = 60,
  variablePercent = 40,
  aaaPercent = 15,
  aaAPercent = 85
}: DebtIssuancesCardProps) => {
  const rateTypeData = [
    { name: '2025', Fija: fixedPercent, Variable: variablePercent }
  ];

  const ratingData = [
    { name: '2025', AAA: aaaPercent, AA_A: aaAPercent }
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-2.5 flex flex-col h-full">
      {/* Compact Header */}
      <div className="mb-1.5">
        <h2 className="text-[11px] font-bold text-gray-900">Emisiones de Deuda</h2>
        <p className="text-[9px] text-gray-600">Deuda Bursátil a largo plazo</p>
        <p className="text-[8px] text-gray-500 mt-0.5">
          Volumen Total YTD 2025: <span className="font-bold text-gray-900 text-[10px]">{totalVolume}</span>
        </p>
      </div>

      {/* Compact Highlighted Emission */}
      <div className="bg-gray-50 rounded-lg p-1.5 mb-2 text-[8px]">
        <span className="font-semibold text-gray-700">📌 Emisión destacada: </span>
        <span className="font-bold text-gray-900">{highlightedEmission.name}</span>
        <div className="text-gray-600 mt-0.5">
          Demanda: {highlightedEmission.demand} | {highlightedEmission.rate}
        </div>
      </div>

      {/* Charts Section - Main Focus */}
      <div className="grid grid-cols-2 gap-3 flex-1">
        {/* Chart 1: Emisiones por tipo de tasa */}
        <div className="flex flex-col h-full">
          <div className="mb-1.5 h-[28px]">
            <h3 className="text-[9px] font-semibold text-gray-700">Emisiones por tipo de tasa</h3>
            <p className="text-[9px] font-bold text-gray-900">Ps.$86,860 MM</p>
          </div>

          <div className="relative h-[70px]">
            <ResponsiveContainer width="100%" height={70}>
              <BarChart
                data={rateTypeData}
                layout="vertical"
                margin={{ top: 3, right: 13, bottom: 3, left: 0 }}
                barCategoryGap={5}
              >
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  hide
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  hide
                />
                <Bar dataKey="Variable" stackId="a" fill="#93c5fd" radius={[4, 0, 0, 4]} />
                <Bar dataKey="Fija" stackId="a" fill="#1e40af" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>

            {/* Inline percentage labels - positioned on the bars */}
            <div
              className="absolute text-[11px] font-bold text-gray-700"
              style={{
                top: '50%',
                left: `${variablePercent * 0.5}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {variablePercent}%
            </div>
            <div
              className="absolute text-[11px] font-bold text-white"
              style={{
                top: '50%',
                left: `${variablePercent + (fixedPercent * 0.5)}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {fixedPercent}%
            </div>

            {/* Legend below chart */}
            <div className="mt-2 flex justify-center gap-3 h-[20px]">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-[#93c5fd] rounded"></div>
                <span className="text-[8px] text-gray-600">Variable ({variablePercent}%)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-[#1e40af] rounded"></div>
                <span className="text-[8px] text-gray-600">Fija ({fixedPercent}%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chart 2: Emisiones por calificación */}
        <div className="flex flex-col h-full">
          <div className="mb-1.5 h-[28px]">
            <h3 className="text-[9px] font-semibold text-gray-700">Emisiones por calificación</h3>
            <p className="text-[9px] font-bold text-gray-900">Ps.$86,860 MM</p>
          </div>

          <div className="relative h-[70px]">
            <ResponsiveContainer width="100%" height={70}>
              <BarChart
                data={ratingData}
                layout="vertical"
                margin={{ top: 3, right: 13, bottom: 3, left: 0 }}
                barCategoryGap={5}
              >
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  hide
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  hide
                />
                <Bar dataKey="AAA" stackId="a" fill="#93c5fd" radius={[4, 0, 0, 4]} />
                <Bar dataKey="AA_A" stackId="a" fill="#1e40af" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>

            {/* Inline percentage labels - positioned on the bars */}
            <div
              className="absolute text-[11px] font-bold text-gray-700"
              style={{
                top: '50%',
                left: `${aaaPercent * 0.5}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {aaaPercent}%
            </div>
            <div
              className="absolute text-[11px] font-bold text-white"
              style={{
                top: '50%',
                left: `${aaaPercent + (aaAPercent * 0.5)}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {aaAPercent}%
            </div>

            {/* Legend below chart */}
            <div className="mt-2 flex justify-center gap-3 h-[20px]">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-[#93c5fd] rounded"></div>
                <span className="text-[8px] text-gray-600">AAA ({aaaPercent}%)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-[#1e40af] rounded"></div>
                <span className="text-[8px] text-gray-600">AA/A ({aaAPercent}%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};