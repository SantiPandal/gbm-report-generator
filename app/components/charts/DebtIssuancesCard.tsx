'use client';

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts';

interface BreakdownSegment {
  label: string;
  value: number;
  color?: string;
}

interface HighlightedEmissionInfo {
  name: string;
  demand?: string;
  rate?: string;
  term?: string;
  details?: string;
}

interface DebtIssuancesCardProps {
  totalVolumeLabel: string;
  highlightedEmission?: HighlightedEmissionInfo;
  rateBreakdown: BreakdownSegment[];
  ratingBreakdown: BreakdownSegment[];
}

const defaultRateColors = ['#1e40af', '#93c5fd', '#60a5fa'];
const defaultRatingColors = ['#1e3a8a', '#4f46e5', '#818cf8'];

const buildStackData = (segments: BreakdownSegment[]) => {
  const entry: Record<string, number | string> = { name: '2025' };
  segments.forEach((segment, index) => {
    entry[`segment_${index}`] = segment.value;
  });
  return [entry];
};

const renderStackBars = (segments: BreakdownSegment[], palette: string[], stackId: string) => (
  segments.map((segment, index) => (
    <Bar
      key={`${stackId}-${segment.label}`}
      dataKey={`segment_${index}`}
      stackId={stackId}
      fill={segment.color ?? palette[index % palette.length]}
      radius={index === 0
        ? [0, 4, 4, 0]
        : index === segments.length - 1
          ? [4, 0, 0, 4]
          : [0, 0, 0, 0]
      }
    />
  ))
);

const renderLegend = (segments: BreakdownSegment[]) => (
  <div className="mt-1 flex flex-wrap justify-center gap-1">
    {segments.map((segment) => (
      <div key={segment.label} className="flex items-center gap-1">
        <span
          className="inline-block w-1.5 h-1.5 rounded"
          style={{ backgroundColor: segment.color }}
        />
        <span className="text-[7px] text-gray-600">
          {segment.label} ({segment.value}%)
        </span>
      </div>
    ))}
  </div>
);

export const DebtIssuancesCard = ({
  totalVolumeLabel,
  highlightedEmission,
  rateBreakdown,
  ratingBreakdown,
}: DebtIssuancesCardProps) => {
  const rateSegments = rateBreakdown.map((segment, index) => ({
    ...segment,
    color: segment.color ?? defaultRateColors[index % defaultRateColors.length],
  }));

  const ratingSegments = ratingBreakdown.map((segment, index) => ({
    ...segment,
    color: segment.color ?? defaultRatingColors[index % defaultRatingColors.length],
  }));

  const rateChartData = buildStackData(rateSegments);
  const ratingChartData = buildStackData(ratingSegments);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-2.5 flex flex-col h-full overflow-hidden">
      <div className="mb-1.5">
        <h2 className="text-[11px] font-bold text-gray-900">Emisiones de Deuda</h2>
        <p className="text-[9px] text-gray-600">Deuda Bursátil a largo plazo</p>
        <p className="text-[8px] text-gray-500 mt-0.5">
          Volumen Total YTD 2025: <span className="font-bold text-gray-900 text-[10px]">{totalVolumeLabel}</span>
        </p>
      </div>

      {highlightedEmission && (
        <div className="bg-gray-50 rounded-lg p-1 mb-1.5 text-[8px]">
          <span className="font-semibold text-gray-700">📌 Emisión destacada: </span>
          <span className="font-bold text-gray-900">{highlightedEmission.name}</span>
          <div className="text-gray-600 mt-0.5">
            {highlightedEmission.details ?? (
              <>
                {highlightedEmission.demand && <>Demanda: {highlightedEmission.demand}</>}
                {highlightedEmission.demand && highlightedEmission.rate && ' | '}
                {highlightedEmission.rate && <>Tasa: {highlightedEmission.rate}</>}
                {highlightedEmission.term && ` • Plazo: ${highlightedEmission.term}`}
              </>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 flex-1">
        <div className="flex flex-col h-full">
          <div className="mb-1 h-[24px]">
            <h3 className="text-[9px] font-semibold text-gray-700">Emisiones por tipo de tasa</h3>
            <p className="text-[9px] font-bold text-gray-900">{totalVolumeLabel}</p>
          </div>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height={90}>
              <BarChart
                data={rateChartData}
                layout="vertical"
                margin={{ top: 4, right: 12, bottom: 4, left: 0 }}
                barCategoryGap={12}
              >
                <CartesianGrid horizontal={false} stroke="#e2e8f0" strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis type="category" dataKey="name" hide />
                {renderStackBars(rateSegments, defaultRateColors, 'rate')}
              </BarChart>
            </ResponsiveContainer>
            {renderLegend(rateSegments)}
          </div>
        </div>

        <div className="flex flex-col h-full">
          <div className="mb-1 h-[24px]">
            <h3 className="text-[9px] font-semibold text-gray-700">Emisiones por calificación</h3>
            <p className="text-[9px] font-bold text-gray-900">{totalVolumeLabel}</p>
          </div>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height={90}>
              <BarChart
                data={ratingChartData}
                layout="vertical"
                margin={{ top: 4, right: 12, bottom: 4, left: 0 }}
                barCategoryGap={12}
              >
                <CartesianGrid horizontal={false} stroke="#e2e8f0" strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis type="category" dataKey="name" hide />
                {renderStackBars(ratingSegments, defaultRatingColors, 'rating')}
              </BarChart>
            </ResponsiveContainer>
            {renderLegend(ratingSegments)}
          </div>
        </div>
      </div>
    </div>
  );
};
