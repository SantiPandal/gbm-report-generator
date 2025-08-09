'use client';

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import { MonthlyData } from '@/lib/processing/types';

interface TransaccionesMexicoMesSlideProps {
  data: MonthlyData[];
  year: number;
}

export const TransaccionesMexicoMesSlide = ({ data, year }: TransaccionesMexicoMesSlideProps) => {
  // Format value for display
  const formatValue = (value: number): string => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}B`;
    }
    return `$${value.toFixed(0)}M`;
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 shadow-lg rounded border border-gray-200">
          <p className="font-semibold text-sm text-gray-800">{label}</p>
          <p className="text-xs text-gray-600 mt-1">Transacciones: {data.payload.count}</p>
          <p className="text-xs text-gray-600">Valor Total: {formatValue(data.value)}</p>
        </div>
      );
    }
    return null;
  };

  // Calculate totals for insights
  const totalDeals = data.reduce((sum, month) => sum + month.count, 0);
  const totalValue = data.reduce((sum, month) => sum + month.totalValue, 0);
  const avgPerMonth = totalValue / data.length;
  const peakMonth = data.reduce((max, month) => month.totalValue > max.totalValue ? month : max);

  return (
    <div className="h-full w-full bg-white flex flex-col" style={{ padding: '50px' }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2d3748] mb-2">
          TRANSACCIONES M&A EN MÉXICO POR MES
        </h1>
        <p className="text-base text-[#718096] italic">Año {year}</p>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Left side - Bar Chart */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-sm font-semibold text-[#4a5568] uppercase tracking-wider mb-4">
            Valor de Transacciones por Mes (USD Millones)
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 11, fill: '#718096' }}
                axisLine={{ stroke: '#e2e8f0' }}
              />
              <YAxis 
                tick={{ fontSize: 11, fill: '#718096' }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickFormatter={(value) => `$${value}M`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="totalValue" 
                fill="#4a90e2"
                radius={[4, 4, 0, 0]}
                name="Valor Total"
              />
            </BarChart>
          </ResponsiveContainer>
          
          {/* Monthly Summary Table */}
          <div className="mt-6">
            <h4 className="text-xs font-semibold text-[#4a5568] uppercase tracking-wider mb-3">
              Resumen Mensual
            </h4>
            <div className="grid grid-cols-6 gap-2">
              {data.map((month) => (
                <div key={month.month} className="text-center">
                  <div className="text-xs font-medium text-[#2d3748]">{month.month.substring(0, 3)}</div>
                  <div className="text-[10px] text-[#718096]">{month.count} deals</div>
                  <div className="text-[10px] text-[#2c5282] font-semibold">{formatValue(month.totalValue)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right side - Statistics */}
        <div className="w-1/3 pl-12">
          <h3 className="text-sm font-semibold text-[#4a5568] uppercase tracking-wider mb-4">
            Análisis del Año
          </h3>
          
          {/* Key Metrics */}
          <div className="space-y-6">
            <div className="bg-[#f7fafc] p-4 rounded">
              <div className="text-2xl font-bold text-[#2c5282]">{totalDeals}</div>
              <div className="text-xs text-[#718096] uppercase tracking-wider">Total Transacciones</div>
            </div>
            
            <div className="bg-[#f7fafc] p-4 rounded">
              <div className="text-2xl font-bold text-[#2c5282]">{formatValue(totalValue)}</div>
              <div className="text-xs text-[#718096] uppercase tracking-wider">Valor Total</div>
            </div>
            
            <div className="bg-[#f7fafc] p-4 rounded">
              <div className="text-2xl font-bold text-[#2c5282]">{formatValue(avgPerMonth)}</div>
              <div className="text-xs text-[#718096] uppercase tracking-wider">Promedio Mensual</div>
            </div>
          </div>
          
          {/* Key Insights */}
          <div className="mt-8 p-4 bg-[#fff5f5] rounded border-l-4 border-[#e53e3e]">
            <h4 className="text-xs font-semibold text-[#4a5568] uppercase tracking-wider mb-2">
              Aspectos Destacados
            </h4>
            <ul className="space-y-1 text-xs text-[#718096]">
              <li>• Mes pico: {peakMonth.month} con {formatValue(peakMonth.totalValue)}</li>
              <li>• {peakMonth.count} transacciones en {peakMonth.month}</li>
              <li>• Actividad promedio: {(totalDeals / 12).toFixed(1)} deals/mes</li>
            </ul>
          </div>
          
          {/* Trend Analysis */}
          <div className="mt-6 p-4 bg-[#f0fff4] rounded border-l-4 border-[#38a169]">
            <h4 className="text-xs font-semibold text-[#4a5568] uppercase tracking-wider mb-2">
              Tendencias
            </h4>
            <div className="text-xs text-[#718096]">
              Análisis de estacionalidad y patrones de actividad M&A en el mercado mexicano.
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
          <span className="text-[10px] text-[#718096]">4</span>
        </div>
      </div>
    </div>
  );
};