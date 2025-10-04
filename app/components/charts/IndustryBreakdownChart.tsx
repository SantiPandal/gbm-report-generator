'use client';

import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { colors } from '@/lib/design/tokens';

interface IndustryData {
  name: string;
  value: number;
  color: string;
}

interface IndustryBreakdownChartProps {
  data: IndustryData[];
  height?: number;
  title?: string;
  showLegend?: boolean;
}

export const IndustryBreakdownChart = ({ 
  data, 
  height = 140, 
  title = "Transacciones de empresas mexicanas por industria",
  showLegend = true
}: IndustryBreakdownChartProps) => {
  
  // Custom tooltip
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

  // Fixed dimensions for PDF - 1:1 ratio
  const CHART_WIDTH = 280;
  const SECTION_WIDTH = CHART_WIDTH / 2; // 140px each for perfect 50/50 split
  
  return (
    <div className="w-full">
      <h4 className="text-[9px] font-semibold text-[#718096] uppercase tracking-wider mb-0">
        {title}
      </h4>

      <div className="flex items-start" style={{ height: `${height}px`, width: `${CHART_WIDTH}px` }}>
        {/* Doughnut Chart - Left side (50%) */}
        <div style={{ width: `${SECTION_WIDTH}px`, height: `${height}px` }} className="flex items-start justify-center">
          <PieChart width={SECTION_WIDTH} height={height}>
            <Pie
              data={data}
              cx={SECTION_WIDTH / 2}
              cy={60}
              innerRadius={28}  // Doughnut inner radius
              outerRadius={48}  // Doughnut outer radius
              paddingAngle={1}  // Small gap between segments
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </div>

        {/* Legend - Right side (50%) */}
        {showLegend && (
          <div style={{ width: `${SECTION_WIDTH}px` }} className="flex items-start">
            <div className="w-full space-y-0.5 mt-3">
              {data.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center flex-1 min-w-0 mr-2">
                    <div 
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-[7px] text-[#4a5568] ml-1 truncate">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-[7px] font-semibold text-[#2d3748] whitespace-nowrap">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};