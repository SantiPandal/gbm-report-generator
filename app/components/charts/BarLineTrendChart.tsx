'use client';

import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LabelList,
} from 'recharts';
import { colors } from '@/lib/design/tokens';

export interface BarLineTrendDatum {
  category: string;
  barValue: number;
  lineValue: number;
  barLabel?: string;
  lineLabel?: number;
}

interface BarLineTrendChartProps {
  data: BarLineTrendDatum[];
  barLabel?: string;
  lineLabel?: string;
  height?: number;
  barColor?: string;
  lineColor?: string;
  yAxisLeftLabel?: string;
  yAxisRightLabel?: string;
  valueFormatter?: (value: number) => string;
}

const defaultValueFormatter = (value: number) => value.toLocaleString('es-MX');

export const BarLineTrendChart = ({
  data,
  barLabel = 'Valor',
  lineLabel = 'Transacciones',
  height = 180,
  barColor = colors.lightBlue,
  lineColor = colors.primaryBlue,
  yAxisLeftLabel,
  yAxisRightLabel,
  valueFormatter = defaultValueFormatter,
}: BarLineTrendChartProps) => {
  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 8, right: 24, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.paleGray} />
          <XAxis
            dataKey="category"
            tick={{ fontSize: 10, fill: colors.mediumGray }}
            axisLine={{ stroke: colors.paleGray }}
            tickLine={false}
          />
          <YAxis
            yAxisId="left"
            tick={{ fontSize: 10, fill: colors.mediumGray }}
            tickFormatter={(value) => valueFormatter(value)}
            axisLine={{ stroke: colors.paleGray }}
            tickLine={false}
            label={
              yAxisLeftLabel
                ? {
                    value: yAxisLeftLabel,
                    angle: -90,
                    position: 'insideLeft',
                    style: { fontSize: 10, fill: colors.mediumGray },
                    offset: 10,
                  }
                : undefined
            }
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 10, fill: colors.mediumGray }}
            axisLine={{ stroke: colors.paleGray }}
            tickLine={false}
            label={
              yAxisRightLabel
                ? {
                    value: yAxisRightLabel,
                    angle: 90,
                    position: 'insideRight',
                    style: { fontSize: 10, fill: colors.mediumGray },
                    offset: 10,
                  }
                : undefined
            }
          />
          <Tooltip
            formatter={(value: number, name: string) => {
              if (name === 'barValue') {
                return [valueFormatter(value), barLabel];
              }
              return [value.toLocaleString('es-MX'), lineLabel];
            }}
            labelFormatter={(label) => label}
          />
          <Bar
            yAxisId="left"
            dataKey="barValue"
            fill={barColor}
            radius={[4, 4, 0, 0]}
            maxBarSize={42}
          >
            <LabelList
              dataKey="barLabel"
              position="top"
              fill={colors.mediumGray}
              fontSize={9}
            />
          </Bar>
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="lineValue"
            stroke={lineColor}
            strokeWidth={3}
            dot={{ r: 4, fill: lineColor }}
            activeDot={{ r: 5 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
