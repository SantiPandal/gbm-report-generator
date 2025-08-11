'use client';

import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, LabelList } from 'recharts';
import { colors } from '@/lib/design/tokens';

interface HistoricalData {
  year: string;
  value: number;
  count: number;
  label: string;
}

interface HistoricalValueChartProps {
  data: HistoricalData[];
}

export const HistoricalValueChart = ({ 
  data
}: HistoricalValueChartProps) => {

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: any[] }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 shadow-lg rounded border border-gray-200">
          <p className="font-semibold text-xs text-gray-800">{data.year}</p>
          <p className="text-xs text-gray-600">Valor: ${data.label}M</p>
          <p className="text-xs text-gray-600">Transacciones: {data.count}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="relative w-full h-full scale-120 origin-center">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart 
          data={data}
          margin={{ top: 6, right: 24, left: 24, bottom: 10 }}
          barCategoryGap="15%"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="year" 
            tick={{ fontSize: 7, fill: colors.mediumGray }}
            axisLine={{ stroke: colors.paleGray }}
            angle={0}
            textAnchor="middle"
          />
          <YAxis 
            yAxisId="left"
            tick={{ fontSize: 7, fill: colors.mediumGray }}
            domain={[0, 12000]}
            ticks={[0, 3000, 6000, 9000, 12000]}
            axisLine={{ stroke: colors.paleGray }}
            label={{ 
              value: 'Valor (MM)', 
              angle: -90, 
              position: 'insideLeft',
              offset: 12,
              style: { fontSize: 7, fill: colors.mediumGray, textAnchor: 'middle' } 
            }}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 7, fill: colors.mediumGray }}
            domain={[0, 100]}
            ticks={[0, 25, 50, 75, 100]}
            axisLine={{ stroke: colors.paleGray }}
            label={{ 
              value: 'Transacciones', 
              angle: 90, 
              position: 'insideRight',
              offset: 12,
              style: { fontSize: 7, fill: colors.mediumGray, textAnchor: 'middle' } 
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            yAxisId="left" 
            dataKey="value" 
            fill={colors.lightBlue} 
            radius={[4, 4, 0, 0]}
            maxBarSize={96}
          >
            <LabelList
              dataKey="label"
              position="top"
              fill={colors.mediumGray}
              fontSize={6}
              formatter={(value) => `$${value}M`}
            />
          </Bar>
          <Line 
            yAxisId="right" 
            type="monotone" 
            dataKey="count" 
            stroke={colors.primaryBlue} 
            strokeWidth={3}
            dot={{ fill: colors.primaryBlue, r: 5, strokeWidth: 0 }}
            activeDot={{ r: 6 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};