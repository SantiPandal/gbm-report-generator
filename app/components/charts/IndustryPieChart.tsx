'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface IndustryData {
  name: string;
  value: number;
  color: string;
}

interface IndustryPieChartProps {
  data: IndustryData[];
  innerRadius?: number;
  outerRadius?: number;
}

export const IndustryPieChart = ({
  data,
  innerRadius = 36, // Reduced by 20% from 45
  outerRadius = 60 // Reduced by 20% from 75
}: IndustryPieChartProps) => {
  // Early return if no data
  if (!data || data.length === 0) {
    return <div className="w-full h-full flex items-center justify-center text-gray-400">No data available</div>;
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 shadow-lg rounded border border-gray-200">
          <p className="font-semibold text-xs text-gray-800">{data.name}</p>
          <p className="text-xs text-gray-600">{data.value}% del total</p>
        </div>
      );
    }
    return null;
  };

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value
  }: any) => {
    if (value < 3) return null; // Don't show labels for < 3%
    
    const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="#4a5568"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize="8px"
        fontWeight="500"
      >
        {`${name}, ${value}%`}
      </text>
    );
  };

  return (
    <div className="relative w-full" style={{ height: '200px' }}>
      <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={1}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
    </div>
  );
};