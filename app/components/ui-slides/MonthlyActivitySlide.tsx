'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import { MonthlyData } from '@/lib/processing/types';

interface MonthlyActivitySlideProps {
  data: MonthlyData[];
  year: number;
}

export const MonthlyActivitySlide = ({ data, year }: MonthlyActivitySlideProps) => {
  // Professional color gradient
  const getBarColor = (value: number, max: number): string => {
    const intensity = value / max;
    if (intensity > 0.75) return '#2c5282'; // Dark blue for high values
    if (intensity > 0.5) return '#4a90e2';  // Medium blue
    if (intensity > 0.25) return '#a7c7e7'; // Light blue
    return '#cbd5e0'; // Very light for low values
  };
  
  const maxValue = Math.max(...data.map(d => d.totalValue));
  
  // Format value for display
  const formatValue = (value: number): string => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}B`;
    }
    return `${value.toFixed(0)}M`;
  };
  
  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 shadow-lg rounded border border-gray-200">
          <p className="font-semibold text-sm text-gray-800">{data.month} {data.year}</p>
          <p className="text-xs text-gray-600 mt-1">Deals: {data.count}</p>
          <p className="text-xs text-gray-600">Value: ${formatValue(data.totalValue)}</p>
          <p className="text-xs text-gray-600">Avg Size: ${formatValue(data.totalValue / data.count)}</p>
        </div>
      );
    }
    return null;
  };
  
  // Calculate summary stats
  const totalDeals = data.reduce((sum, d) => sum + d.count, 0);
  const totalValue = data.reduce((sum, d) => sum + d.totalValue, 0);
  const avgMonthlyDeals = (totalDeals / data.length).toFixed(1);
  const avgMonthlyValue = totalValue / data.length;
  
  return (
    <div className="h-full w-full bg-white flex flex-col" style={{ padding: '50px' }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2d3748] mb-2">
          MONTHLY M&A ACTIVITY
        </h1>
        <p className="text-base text-[#718096] italic">{year} Transaction Volume</p>
      </div>
      
      {/* Summary Stats */}
      <div className="flex gap-8 mb-8">
        <div className="flex-1 border-l-3 border-[#2c5282] pl-4">
          <div className="text-2xl font-bold text-[#2c5282]">{totalDeals}</div>
          <div className="text-xs text-[#718096] uppercase tracking-wider">Total Transactions</div>
        </div>
        <div className="flex-1 border-l-3 border-[#4a90e2] pl-4">
          <div className="text-2xl font-bold text-[#2c5282]">${formatValue(totalValue)}</div>
          <div className="text-xs text-[#718096] uppercase tracking-wider">Total Value</div>
        </div>
        <div className="flex-1 border-l-3 border-[#a7c7e7] pl-4">
          <div className="text-2xl font-bold text-[#2c5282]">{avgMonthlyDeals}</div>
          <div className="text-xs text-[#718096] uppercase tracking-wider">Avg Monthly Deals</div>
        </div>
        <div className="flex-1 border-l-3 border-[#cbd5e0] pl-4">
          <div className="text-2xl font-bold text-[#2c5282]">${formatValue(avgMonthlyValue)}</div>
          <div className="text-xs text-[#718096] uppercase tracking-wider">Avg Monthly Value</div>
        </div>
      </div>
      
      {/* Main Chart */}
      <div className="flex-1">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart 
            data={data} 
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 11, fill: '#718096' }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              tick={{ fontSize: 11, fill: '#718096' }}
              label={{ 
                value: 'Deal Value (USD Millions)', 
                angle: -90, 
                position: 'insideLeft',
                style: { fontSize: 12, fill: '#4a5568' }
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="totalValue" 
              radius={[4, 4, 0, 0]}
              maxBarSize={60}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.totalValue, maxValue)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        
        {/* Trend Line Text */}
        <div className="mt-4 flex items-center justify-center">
          <div className="text-xs text-[#718096] italic">
            Peak activity in {data.reduce((max, d) => d.totalValue > max.totalValue ? d : max).month} 
            {' '}with ${formatValue(maxValue)} in deal value
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="border-t border-[#e2e8f0] pt-5 mt-8 flex justify-between items-center">
        <span className="text-[9px] text-[#718096] italic tracking-wide">
          CONFIDENTIAL AND PROPRIETARY
        </span>
        <div className="flex items-center">
          <div className="w-5 h-px bg-[#718096] mr-2" />
          <span className="text-[10px] text-[#718096]">3</span>
        </div>
      </div>
    </div>
  );
};