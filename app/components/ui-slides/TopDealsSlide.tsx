'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Deal } from '@/lib/processing/types';

interface TopDealsSlideProps {
  deals: Deal[];
  period: string;
}

export const TopDealsSlide = ({ deals, period }: TopDealsSlideProps) => {
  // Format value for display
  const formatValue = (value: number): string => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}B`;
    }
    return `${value.toFixed(0)}M`;
  };
  
  // Format date
  const formatDate = (date: Date): string => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };
  
  // Prepare data for horizontal bar chart
  const chartData = deals.map(deal => ({
    name: deal.targetName.length > 25 ? deal.targetName.substring(0, 25) + '...' : deal.targetName,
    value: deal.announcedValue,
    fullName: deal.targetName,
    acquirer: deal.acquirerName,
    status: deal.dealStatus,
    industry: deal.targetIndustry,
  })).reverse(); // Reverse to show highest value at top
  
  // Get color based on deal status
  const getBarColor = (status: string): string => {
    switch(status) {
      case 'Completed': return '#2c5282';
      case 'Pending': return '#4a90e2';
      case 'Terminated': return '#cbd5e0';
      default: return '#718096';
    }
  };
  
  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 shadow-lg rounded border border-gray-200 max-w-sm">
          <p className="font-semibold text-sm text-gray-800">{data.fullName}</p>
          <p className="text-xs text-gray-600 mt-1">Acquirer: {data.acquirer}</p>
          <p className="text-xs text-gray-600">Value: ${formatValue(data.value)}</p>
          <p className="text-xs text-gray-600">Industry: {data.industry}</p>
          <p className="text-xs text-gray-600">Status: {data.status}</p>
        </div>
      );
    }
    return null;
  };
  
  // Calculate total value and average
  const totalValue = deals.reduce((sum, deal) => sum + deal.announcedValue, 0);
  const avgValue = totalValue / deals.length;
  
  return (
    <div className="h-full w-full bg-white flex flex-col" style={{ padding: '50px' }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2d3748] mb-2">
          TOP TRANSACTIONS
        </h1>
        <p className="text-base text-[#718096] italic">{period} - Largest Deals by Value</p>
      </div>
      
      {/* Summary Stats */}
      <div className="flex gap-6 mb-8">
        <div className="flex items-center">
          <div className="w-1 h-8 bg-[#2c5282] mr-3" />
          <div>
            <div className="text-xl font-bold text-[#2c5282]">${formatValue(totalValue)}</div>
            <div className="text-xs text-[#718096] uppercase tracking-wider">Combined Value</div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-1 h-8 bg-[#4a90e2] mr-3" />
          <div>
            <div className="text-xl font-bold text-[#2c5282]">${formatValue(avgValue)}</div>
            <div className="text-xs text-[#718096] uppercase tracking-wider">Average Size</div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-1 h-8 bg-[#a7c7e7] mr-3" />
          <div>
            <div className="text-xl font-bold text-[#2c5282]">${formatValue(deals[0].announcedValue)}</div>
            <div className="text-xs text-[#718096] uppercase tracking-wider">Largest Deal</div>
          </div>
        </div>
      </div>
      
      {/* Main Content - Chart and Table */}
      <div className="flex-1 flex gap-8">
        {/* Horizontal Bar Chart */}
        <div className="flex-1">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart 
              data={chartData}
              layout="horizontal"
              margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                type="number"
                tick={{ fontSize: 11, fill: '#718096' }}
                tickFormatter={(value) => `$${formatValue(value)}`}
              />
              <YAxis 
                dataKey="name" 
                type="category"
                tick={{ fontSize: 10, fill: '#4a5568' }}
                width={90}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.status)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Deal Details Table */}
        <div className="w-2/5">
          <h3 className="text-sm font-semibold text-[#4a5568] uppercase tracking-wider mb-4">
            Transaction Details
          </h3>
          <div className="space-y-3">
            {deals.slice(0, 5).map((deal, index) => (
              <div key={index} className="border-b border-gray-100 pb-3">
                <div className="flex justify-between items-start mb-1">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#2c5282]">#{index + 1}</span>
                      <span className="text-sm font-medium text-[#2d3748] truncate">
                        {deal.targetName}
                      </span>
                    </div>
                    <div className="text-xs text-[#718096] mt-1">
                      {deal.acquirerName}
                    </div>
                  </div>
                  <div className="text-right ml-2">
                    <div className="text-sm font-bold text-[#2c5282]">
                      ${formatValue(deal.announcedValue)}
                    </div>
                    <div className={`text-xs px-2 py-0.5 rounded inline-block mt-1 ${
                      deal.dealStatus === 'Completed' ? 'bg-green-100 text-green-700' :
                      deal.dealStatus === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {deal.dealStatus}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-[#718096] mt-1">
                  <span>{deal.targetIndustry}</span>
                  <span>{formatDate(deal.announceDate)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex gap-6 justify-center mt-6">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-[#2c5282] rounded-sm mr-2" />
          <span className="text-xs text-[#4a5568]">Completed</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-[#4a90e2] rounded-sm mr-2" />
          <span className="text-xs text-[#4a5568]">Pending</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-[#cbd5e0] rounded-sm mr-2" />
          <span className="text-xs text-[#4a5568]">Terminated</span>
        </div>
      </div>
      
      {/* Footer */}
      <div className="border-t border-[#e2e8f0] pt-5 mt-8 flex justify-between items-center">
        <span className="text-[9px] text-[#718096] italic tracking-wide">
          CONFIDENTIAL AND PROPRIETARY
        </span>
        <div className="flex items-center">
          <div className="w-5 h-px bg-[#718096] mr-2" />
          <span className="text-[10px] text-[#718096]">5</span>
        </div>
      </div>
    </div>
  );
};