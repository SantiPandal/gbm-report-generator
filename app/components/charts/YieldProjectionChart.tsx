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
  base: number;
  projection: number;
}

interface YieldProjectionChartProps {
  data: YieldProjectionDatum[];
  baseLabel?: string;
  projectionLabel?: string;
  lineColor?: string;
  projectionColor?: string;
  height?: number;
}

export const YieldProjectionChart = ({
  data,
  baseLabel = 'Spot',
  projectionLabel = 'Proyección',
  lineColor = colors.primaryBlue,
  projectionColor = colors.accentTeal,
  height = 180,
}: YieldProjectionChartProps) => {
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
              const label = name === 'base' ? baseLabel : projectionLabel;
              return [`${value.toFixed(2)}%`, label];
            }}
            labelFormatter={(label) => `Tenor ${label}`}
          />
          <Legend
            formatter={(value) => (value === 'base' ? baseLabel : projectionLabel)}
            wrapperStyle={{ fontSize: 10 }}
          />
          <Line
            type="monotone"
            dataKey="base"
            stroke={lineColor}
            strokeWidth={3}
            dot={{ r: 4, fill: lineColor }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="projection"
            stroke={projectionColor}
            strokeWidth={2}
            strokeDasharray="5 3"
            dot={{ r: 3, fill: projectionColor }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
