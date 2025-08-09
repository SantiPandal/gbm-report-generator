'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { IndustryData } from '@/lib/processing/types';

interface IndustryBreakdownSlideProps {
  data: IndustryData[];
  period: string;
}

export const IndustryBreakdownSlide = ({ data, period }: IndustryBreakdownSlideProps) => {
  // Professional color palette matching the style guide
  const COLORS = [
    '#2c5282', // Primary blue
    '#4a90e2', // Medium blue
    '#a7c7e7', // Light blue
    '#718096', // Medium gray
    '#cbd5e0', // Light gray
    '#d8b2d8', // Accent pink
  ];
  
  // Format value for display
  const formatValue = (value: number): string => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}B`;
    }
    return `$${value.toFixed(0)}M`;
  };
  
  // Custom label for pie chart
  const renderCustomLabel = (entry: any) => {
    return `${entry.percentage.toFixed(1)}%`;
  };
  
  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 shadow-lg rounded border border-gray-200">
          <p className="font-semibold text-sm text-gray-800">{data.name}</p>
          <p className="text-xs text-gray-600 mt-1">Deals: {data.payload.count}</p>
          <p className="text-xs text-gray-600">Value: {formatValue(data.value)}</p>
          <p className="text-xs text-gray-600">Avg Size: {formatValue(data.payload.avgDealSize)}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="h-full w-full bg-white flex flex-col" style={{ padding: '50px' }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2d3748] mb-2">
          INDUSTRY BREAKDOWN
        </h1>
        <p className="text-base text-[#718096] italic">{period}</p>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Left side - Pie Chart */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-sm font-semibold text-[#4a5568] uppercase tracking-wider mb-4">
            Deal Value Distribution
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={150}
                fill="#8884d8"
                dataKey="totalValue"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Legend */}
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            {data.map((item, index) => (
              <div key={item.industry} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-sm mr-2" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-xs text-[#4a5568]">{item.industry}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Right side - Statistics Table */}
        <div className="w-2/5 pl-12">
          <h3 className="text-sm font-semibold text-[#4a5568] uppercase tracking-wider mb-4">
            Sector Statistics
          </h3>
          <div className="space-y-3">
            {data.slice(0, 5).map((item, index) => (
              <div key={item.industry} className="border-b border-gray-100 pb-3">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-sm font-medium text-[#2d3748]">{item.industry}</span>
                  <span className="text-sm font-bold text-[#2c5282]">
                    {item.percentage.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between text-xs text-[#718096]">
                  <span>{item.count} deals</span>
                  <span>{formatValue(item.totalValue)}</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Key Insights */}
          <div className="mt-8 p-4 bg-[#f7fafc] rounded border-l-4 border-[#4a90e2]">
            <h4 className="text-xs font-semibold text-[#4a5568] uppercase tracking-wider mb-2">
              Key Insights
            </h4>
            <ul className="space-y-1 text-xs text-[#718096]">
              <li>• {data[0].industry} leads with {data[0].percentage.toFixed(1)}% of total value</li>
              <li>• Average deal size: {formatValue(data[0].avgDealSize)}</li>
              <li>• Total sectors: {data.length}</li>
            </ul>
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
          <span className="text-[10px] text-[#718096]">2</span>
        </div>
      </div>
    </div>
  );
};