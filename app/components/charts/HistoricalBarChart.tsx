'use client';

import { PieChart, Pie, Cell, Tooltip } from 'recharts';

interface IndustryData {
  name: string;
  value: number;
  color: string;
}

interface IndustryPieChartProps {
  data: IndustryData[];
  width: number;
  height: number;
}

export const IndustryPieChart = ({ 
  data,
  width,
  height
}: IndustryPieChartProps) => {

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
    
    const radius = innerRadius + (outerRadius - innerRadius) * 1.3;
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

  const innerRadius = 45;
  const outerRadius = 70;

  return (
    <div style={{ width: `${width}px`, height: `${height}px` }}>
      <PieChart width={width} height={height}>
        <Pie
          data={data}
          cx={width / 2}
          cy={height / 2}
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
    </div>
  );
};