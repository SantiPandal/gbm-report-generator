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

export interface DebtRateDatum {
  year: string;
  fija: number;
  variable: number;
  total: number;
}

interface DebtRateBarChartProps {
  data: DebtRateDatum[];
  height?: number;
}

const formatCurrency = (value: number) => `Ps.$${value.toLocaleString('es-MX')}`;

export const DebtRateBarChart = ({ data, height = 180 }: DebtRateBarChartProps) => {
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
            formatter={(value: number, name: string) => [
              `${value.toLocaleString('es-MX')}%`,
              name === 'fija' ? 'Fija' : 'Variable',
            ]}
            labelFormatter={(label) => `Año ${label}`}
          />
          <Bar dataKey="variable" stackId="rate" fill={colors.lightBlue} radius={[4, 4, 0, 0]}>
            <LabelList
              dataKey="total"
              position="top"
              formatter={(value) => formatCurrency(value as number)}
              fill={colors.mediumGray}
              fontSize={9}
              offset={8}
            />
          </Bar>
          <Bar dataKey="fija" stackId="rate" fill={colors.primaryBlue} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
