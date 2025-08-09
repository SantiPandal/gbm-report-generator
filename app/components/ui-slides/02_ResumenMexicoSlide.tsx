'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine, LabelList } from 'recharts';

interface ResumenMexicoSlideProps {
  period: string;
  currentMonth?: string;
}

export const ResumenMexicoSlide = ({ period, currentMonth = 'Diciembre' }: ResumenMexicoSlideProps) => {
  // Mock data for 12 months with year suffix
  const monthlyTransactions = [
    { month: "Ene '24", count: 8, isCurrentMonth: false },
    { month: "Feb '24", count: 12, isCurrentMonth: false },
    { month: "Mar '24", count: 15, isCurrentMonth: false },
    { month: "Abr '24", count: 10, isCurrentMonth: false },
    { month: "May '24", count: 9, isCurrentMonth: false },
    { month: "Jun '24", count: 14, isCurrentMonth: false },
    { month: "Jul '24", count: 11, isCurrentMonth: false },
    { month: "Ago '24", count: 7, isCurrentMonth: false },
    { month: "Sep '24", count: 13, isCurrentMonth: false },
    { month: "Oct '24", count: 10, isCurrentMonth: false },
    { month: "Nov '24", count: 9, isCurrentMonth: false },
    { month: "Dic '24", count: 12, isCurrentMonth: true },
  ];
  
  // Calculate average for reference line
  const averageTransactions = monthlyTransactions.reduce((sum, month) => sum + month.count, 0) / monthlyTransactions.length;
  
  // Mock metrics for current month
  const currentMonthTransactions = 12;
  const currentMonthValue = 1455; // millions USD
  const netTransactionChange = 2; // net change in transactions vs last year
  const yoyVolumeChange = 24.8; // percentage
  
  // Format value for display
  const formatValue = (value: number): string => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}B`;
    }
    return `${value.toFixed(0)}M`;
  };
  
  // Get bar color based on current month
  const getBarColor = (isCurrentMonth: boolean): string => {
    return isCurrentMonth ? '#2c5282' : '#cbd5e0';
  };
  
  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 shadow-lg rounded border border-gray-200">
          <p className="font-semibold text-sm text-gray-800">{data.month} 2024</p>
          <p className="text-xs text-gray-600 mt-1">Transacciones: {data.count}</p>
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
          RESUMEN DE FUSIONES Y ADQUISICIONES EN MÉXICO
        </h1>
        <p className="text-base text-[#718096] italic">{period}</p>
      </div>
      
      {/* Key Metrics Row - Simplified to 3 metrics */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-[#f7fafc] rounded p-4 border-l-4 border-[#2c5282]">
          <div className="text-2xl font-bold text-[#2c5282]">{currentMonthTransactions}</div>
          <div className="text-xs text-[#718096] uppercase tracking-wider mt-1">Transacciones {currentMonth}</div>
        </div>
        <div className="bg-[#f7fafc] rounded p-4 border-l-4 border-[#4a90e2]">
          <div className="text-2xl font-bold text-[#2c5282]">USD {formatValue(currentMonthValue)}</div>
          <div className="text-xs text-[#718096] uppercase tracking-wider mt-1">Valor Total {currentMonth}</div>
        </div>
        <div className="bg-[#f7fafc] rounded p-4 border-l-4 border-[#a7c7e7]">
          <div className="text-2xl font-bold text-[#2c5282]">+{netTransactionChange}</div>
          <div className="text-xs text-[#718096] uppercase tracking-wider mt-1">vs. Dic '23</div>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex gap-8">
        {/* Left - 12-Month Bar Chart */}
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-[#4a5568] uppercase tracking-wider mb-4">
            Transacciones por Mes - Últimos 12 Meses
          </h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart 
              data={monthlyTransactions} 
              margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 11, fill: '#718096' }}
                axisLine={{ stroke: '#e2e8f0' }}
              />
              <YAxis 
                tick={{ fontSize: 11, fill: '#718096' }}
                axisLine={{ stroke: '#e2e8f0' }}
                label={{ 
                  value: 'Número de Transacciones', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { fontSize: 11, fill: '#4a5568' }
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]} maxBarSize={40}>
                <LabelList 
                  dataKey="count" 
                  position="center" 
                  fontSize={11} 
                  fill="#ffffff" 
                  fontWeight="600"
                />
                {monthlyTransactions.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.isCurrentMonth)} />
                ))}
              </Bar>
              <ReferenceLine 
                y={averageTransactions} 
                stroke="#718096" 
                strokeDasharray="5 5"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Right - Volume Change Focus */}
        <div className="w-1/3">
          <h3 className="text-sm font-semibold text-[#4a5568] uppercase tracking-wider mb-4">
            Cambio en Volumen
          </h3>
          
          <div className="bg-[#f7fafc] rounded p-6 border-l-4 border-[#4a90e2]">
            <div className="text-center">
              {/* Large percentage display */}
              <div className={`text-5xl font-bold mb-2 ${
                yoyVolumeChange >= 0 ? 'text-[#4a90e2]' : 'text-[#e53e3e]'
              }`}>
                {yoyVolumeChange >= 0 ? '+' : ''}{yoyVolumeChange}%
              </div>
              
              {/* Subtitle */}
              <div className="text-sm text-[#718096] mb-3">
                vs. {currentMonth} 2023
              </div>
              
              {/* Minimal explanation */}
              <div className="text-xs text-[#718096]">
                Valor total de transacciones
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="border-t border-[#e2e8f0] pt-5 mt-8 flex justify-between items-center">
        <span className="text-[9px] text-[#718096] italic tracking-wide">
          CONFIDENCIAL Y PROPIETARIO
        </span>
        <div className="flex items-center">
          <div className="w-5 h-px bg-[#718096] mr-2" />
          <span className="text-[10px] text-[#718096]">2</span>
        </div>
      </div>
    </div>
  );
};