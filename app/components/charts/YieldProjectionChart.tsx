'use client';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import { colors } from '@/lib/design/tokens';

export interface YieldProjectionDatum {
  tenor: string;
  latest: number | null;
  projection6M: number | null;
  projection12M: number | null;
}

interface YieldProjectionChartProps {
  data: YieldProjectionDatum[];
  latestLabel?: string;
  projection6MLabel?: string;
  projection12MLabel?: string;
  latestColor?: string;
  projection6MColor?: string;
  projection12MColor?: string;
  height?: number;
}

export const YieldProjectionChart = ({
  data,
  latestLabel = 'Curva spot',
  projection6MLabel = 'Proyección 6M',
  projection12MLabel = 'Proyección 12M',
  latestColor = colors.primaryBlue,
  projection6MColor = colors.accentPurple,
  projection12MColor = colors.accentTeal,
  height = 180,
}: YieldProjectionChartProps) => {
  const series = [
    { key: 'latest', label: latestLabel, color: latestColor, strokeWidth: 3, strokeDasharray: undefined },
    { key: 'projection6M', label: projection6MLabel, color: projection6MColor, strokeWidth: 2, strokeDasharray: '5 3' },
    { key: 'projection12M', label: projection12MLabel, color: projection12MColor, strokeWidth: 2, strokeDasharray: '4 4' },
  ] as const;

  const filteredSeries = series.filter((serie) => data.some((datum) => datum[serie.key] !== null && datum[serie.key] !== undefined));

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.paleGray} />
          <XAxis
            dataKey="tenor"
            tick={{ fontSize: 10, fill: colors.mediumGray }}
            axisLine={{ stroke: colors.paleGray }}
            tickLine={false}
            interval={0}
          />
          <YAxis
            domain={['auto', 'auto']}
            tick={{ fontSize: 10, fill: colors.mediumGray }}
            tickFormatter={(value) => `${value.toFixed(2)}%`}
            axisLine={{ stroke: colors.paleGray }}
            tickLine={false}
          />
          <Tooltip
            formatter={(value: number, name: string) => {
              const serie = filteredSeries.find((s) => s.key === name);
              return [`${value.toFixed(2)}%`, serie ? serie.label : name];
            }}
            labelFormatter={(label) => `Tenor ${label}`}
          />
          <Legend
            formatter={(value) => {
              const serie = filteredSeries.find((s) => s.key === value);
              return serie ? serie.label : value;
            }}
            wrapperStyle={{ fontSize: 10 }}
          />
          {filteredSeries.map((serie) => (
            <Line
              key={serie.key}
              type="monotone"
              dataKey={serie.key}
              stroke={serie.color}
              strokeWidth={serie.strokeWidth}
              strokeDasharray={serie.strokeDasharray}
              dot={{ r: serie.strokeWidth === 3 ? 4 : 3, fill: serie.color }}
              activeDot={{ r: serie.strokeWidth === 3 ? 5 : 4 }}
              isAnimationActive={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
