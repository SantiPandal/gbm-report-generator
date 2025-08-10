'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import { colors } from '@/lib/design/tokens';

interface MonthlyData {
  month: string;
  count: number;
  isCurrentMonth?: boolean;
}

interface MonthlyBarChartProps {
  data: MonthlyData[];
  height?: number;
  title?: string;
}

export const MonthlyBarChart = ({ 
  data, 
  height = 160, 
  title = "Transacciones por Mes - Últimos 12 Meses" 
}: MonthlyBarChartProps) => {
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 shadow-lg rounded border border-gray-200">
          <p className="font-semibold text-xs text-gray-800">{data.month}</p>
          <p className="text-xs text-gray-600">Transacciones: {data.count}</p>
        </div>
      );
    }
    return null;
  };

  // Fixed dimensions - matching IndustryBreakdownChart structure
  const CHART_WIDTH = 280; // Adjust to match your container
  const CHART_HEIGHT = height;
  const Y_AXIS_WIDTH = 25;
  const MARGINS = { top: 5, right: 5, left: 0, bottom: 35 };

  return (
    <div className="w-full">
      <h4 className="text-[9px] font-semibold text-[#718096] uppercase tracking-wider mb-2">
        {title}
      </h4>
      <BarChart 
        width={CHART_WIDTH}
        height={CHART_HEIGHT}
        data={data} 
        margin={MARGINS}
        barCategoryGap="20%"
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis 
          dataKey="month" 
          tick={{ fontSize: 8, fill: colors.mediumGray }}
          angle={-45}
          textAnchor="end"
          height={35}
          axisLine={{ stroke: colors.paleGray }}
        />
        <YAxis 
          tick={{ fontSize: 8, fill: colors.mediumGray }}
          domain={[0, 16]}
          axisLine={{ stroke: colors.paleGray }}
          width={Y_AXIS_WIDTH}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="count" radius={[2, 2, 0, 0]} maxBarSize={28}>
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={entry.isCurrentMonth ? colors.primaryBlue : colors.lightGray} 
            />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
};