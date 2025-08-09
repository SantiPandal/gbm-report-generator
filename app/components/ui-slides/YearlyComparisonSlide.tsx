'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { YearlyData } from '@/lib/processing/types';

interface YearlyComparisonSlideProps {
  data: YearlyData[];
}

export const YearlyComparisonSlide = ({ data }: YearlyComparisonSlideProps) => {
  // Transform data for grouped bar chart
  const chartData = data.map(year => ({
    year: year.year.toString(),
    'Deal Count': year.dealCount,
    'Completed': year.completedDeals,
    'Pending': year.pendingDeals,
    'Terminated': year.terminatedDeals,
    totalValue: year.totalValue,
    avgDealSize: year.avgDealSize,
    successRate: year.successRate,
  }));
  
  // Format value for display
  const formatValue = (value: number): string => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}B`;
    }
    return `${value.toFixed(0)}M`;
  };
  
  // Calculate YoY changes
  const calculateChange = (current: number, previous: number): string => {
    const change = ((current - previous) / previous * 100).toFixed(1);
    return change.startsWith('-') ? change : `+${change}`;
  };
  
  const yoyDealChange = data.length > 1 ? calculateChange(data[1].dealCount, data[0].dealCount) : '0';
  const yoyValueChange = data.length > 1 ? calculateChange(data[1].totalValue, data[0].totalValue) : '0';
  
  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const yearData = data.find(d => d.year.toString() === label);
      return (
        <div className="bg-white p-3 shadow-lg rounded border border-gray-200">
          <p className="font-semibold text-sm text-gray-800 mb-2">{label}</p>
          <div className="space-y-1 text-xs">
            <p className="text-gray-600">Total Deals: {yearData?.dealCount}</p>
            <p className="text-gray-600">Total Value: ${formatValue(yearData?.totalValue || 0)}</p>
            <p className="text-gray-600">Success Rate: {yearData?.successRate.toFixed(1)}%</p>
            <p className="text-gray-600">Avg Size: ${formatValue(yearData?.avgDealSize || 0)}</p>
          </div>
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
          YEAR-OVER-YEAR COMPARISON
        </h1>
        <p className="text-base text-[#718096] italic">Deal Status Analysis</p>
      </div>
      
      {/* Key Metrics Row */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-[#f7fafc] rounded p-4 border-t-3 border-[#2c5282]">
          <div className="text-xs text-[#718096] uppercase tracking-wider mb-1">Deal Growth</div>
          <div className="text-2xl font-bold text-[#2c5282]">{yoyDealChange}%</div>
          <div className="text-xs text-[#718096] mt-1">YoY Change</div>
        </div>
        <div className="bg-[#f7fafc] rounded p-4 border-t-3 border-[#4a90e2]">
          <div className="text-xs text-[#718096] uppercase tracking-wider mb-1">Value Growth</div>
          <div className="text-2xl font-bold text-[#2c5282]">{yoyValueChange}%</div>
          <div className="text-xs text-[#718096] mt-1">YoY Change</div>
        </div>
        <div className="bg-[#f7fafc] rounded p-4 border-t-3 border-[#a7c7e7]">
          <div className="text-xs text-[#718096] uppercase tracking-wider mb-1">Latest Success Rate</div>
          <div className="text-2xl font-bold text-[#2c5282]">{data[data.length - 1]?.successRate.toFixed(0)}%</div>
          <div className="text-xs text-[#718096] mt-1">Completion Rate</div>
        </div>
        <div className="bg-[#f7fafc] rounded p-4 border-t-3 border-[#cbd5e0]">
          <div className="text-xs text-[#718096] uppercase tracking-wider mb-1">Latest Avg Deal</div>
          <div className="text-2xl font-bold text-[#2c5282]">${formatValue(data[data.length - 1]?.avgDealSize || 0)}</div>
          <div className="text-xs text-[#718096] mt-1">Average Size</div>
        </div>
      </div>
      
      {/* Main Chart */}
      <div className="flex-1 flex gap-8">
        {/* Stacked Bar Chart */}
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-[#4a5568] uppercase tracking-wider mb-4">
            Deal Status Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart 
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="year" 
                tick={{ fontSize: 12, fill: '#718096' }}
              />
              <YAxis 
                tick={{ fontSize: 11, fill: '#718096' }}
                label={{ 
                  value: 'Number of Deals', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { fontSize: 12, fill: '#4a5568' }
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="rect"
              />
              <Bar dataKey="Completed" stackId="a" fill="#2c5282" />
              <Bar dataKey="Pending" stackId="a" fill="#4a90e2" />
              <Bar dataKey="Terminated" stackId="a" fill="#cbd5e0" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Year comparison table */}
        <div className="w-1/3">
          <h3 className="text-sm font-semibold text-[#4a5568] uppercase tracking-wider mb-4">
            Detailed Metrics
          </h3>
          <div className="space-y-4">
            {data.map((year, index) => (
              <div key={year.year} className="border rounded p-3 bg-[#f7fafc]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-[#2d3748]">{year.year}</span>
                  {index === data.length - 1 && (
                    <span className="text-xs bg-[#4a90e2] text-white px-2 py-0.5 rounded">Current</span>
                  )}
                </div>
                <div className="space-y-1 text-xs text-[#718096]">
                  <div className="flex justify-between">
                    <span>Total Deals:</span>
                    <span className="font-medium text-[#2d3748]">{year.dealCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Value:</span>
                    <span className="font-medium text-[#2d3748]">${formatValue(year.totalValue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Success Rate:</span>
                    <span className="font-medium text-[#2d3748]">{year.successRate.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            ))}
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
          <span className="text-[10px] text-[#718096]">4</span>
        </div>
      </div>
    </div>
  );
};