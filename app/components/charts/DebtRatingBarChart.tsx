'use client';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
} from 'recharts';
import { colors } from '@/lib/design/tokens';

export interface DebtRatingDatum {
  year: string;
  aaa: number;
  aa: number;
  a: number;
  total: number;
}

interface DebtRatingBarChartProps {
  data: DebtRatingDatum[];
  height?: number;
}

const seriesConfig = [
  { key: 'aaa', label: 'AAA', color: colors.primaryBlue },
  { key: 'aa', label: 'AA', color: colors.mediumBlue },
  { key: 'a', label: 'A', color: colors.lightBlue },
] as const;

const formatCurrency = (value: number) => `Ps.$${value.toLocaleString('es-MX')}`;

export const DebtRatingBarChart = ({ data, height = 180 }: DebtRatingBarChartProps) => {
  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barCategoryGap={24} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
          <CartesianGrid vertical={false} stroke={colors.paleGray} />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 10, fill: colors.mediumGray }}
            axisLine={{ stroke: colors.paleGray }}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            ticks={[0, 20, 40, 60, 80, 100]}
            tickFormatter={(value) => `${value}%`}
            tick={{ fontSize: 10, fill: colors.mediumGray }}
            axisLine={{ stroke: colors.paleGray }}
            tickLine={false}
          />
          <Tooltip
            formatter={(value: number, name: string) => {
              const series = seriesConfig.find((s) => s.key === name);
              return [`${value.toLocaleString('es-MX')}%`, series ? series.label : name];
            }}
            labelFormatter={(label) => `Año ${label}`}
          />
          {seriesConfig.map((series, index) => (
            <Bar
              key={series.key}
              dataKey={series.key}
              stackId="rating"
              fill={series.color}
              radius={index === 0 ? [4, 4, 0, 0] : [0, 0, 0, 0]}
            >
              {series.key === 'a' && (
                <LabelList
                  dataKey="total"
                  position="top"
                  formatter={(value: number) => formatCurrency(value)}
                  fill={colors.mediumGray}
                  fontSize={9}
                  offset={8}
                />
              )}
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
