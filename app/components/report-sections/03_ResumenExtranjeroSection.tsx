'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

interface ResumenExtranjeroSlideProps {
  period: string;
}

// Mock data for foreign transactions
const countryData = [
  { country: 'Estados Unidos', deals: 45, value: 8234.5, percentage: 35 },
  { country: 'Brasil', deals: 28, value: 4567.2, percentage: 22 },
  { country: 'Colombia', deals: 18, value: 2345.8, percentage: 14 },
  { country: 'Chile', deals: 15, value: 1890.3, percentage: 12 },
  { country: 'Perú', deals: 12, value: 1234.6, percentage: 9 },
  { country: 'Otros', deals: 10, value: 987.4, percentage: 8 },
];

const sectorData = [
  { sector: 'Tecnología', value: 4567.8, deals: 32 },
  { sector: 'Energía', value: 3890.2, deals: 25 },
  { sector: 'Consumo', value: 2345.6, deals: 20 },
  { sector: 'Financiero', value: 1987.3, deals: 18 },
  { sector: 'Industrial', value: 1234.5, deals: 15 },
];

export const ResumenExtranjeroSlide = ({ period }: ResumenExtranjeroSlideProps) => {
  const COLORS = ['#2c5282', '#4a90e2', '#a7c7e7', '#718096', '#cbd5e0', '#d8b2d8'];
  
  const formatValue = (value: number): string => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}B`;
    }
    return `${value.toFixed(0)}M`;
  };
  
  const totalDeals = countryData.reduce((sum, d) => sum + d.deals, 0);
  const totalValue = countryData.reduce((sum, d) => sum + d.value, 0);
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 shadow-lg rounded border border-gray-200">
          <p className="font-semibold text-sm text-gray-800">{data.name || data.payload.country}</p>
          <p className="text-xs text-gray-600 mt-1">Transacciones: {data.payload.deals}</p>
          <p className="text-xs text-gray-600">Valor: USD {formatValue(data.value || data.payload.value)}</p>
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
          TRANSACCIONES DE EMPRESAS MEXICANAS EN EL EXTRANJERO
        </h1>
        <p className="text-base text-[#718096] italic">{period}</p>
      </div>
      
      {/* Summary Stats */}
      <div className="flex gap-6 mb-8">
        <div className="flex items-center">
          <div className="w-1 h-10 bg-[#2c5282] mr-3" />
          <div>
            <div className="text-2xl font-bold text-[#2c5282]">{totalDeals}</div>
            <div className="text-xs text-[#718096] uppercase tracking-wider">Transacciones Totales</div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-1 h-10 bg-[#4a90e2] mr-3" />
          <div>
            <div className="text-2xl font-bold text-[#2c5282]">USD {formatValue(totalValue)}</div>
            <div className="text-xs text-[#718096] uppercase tracking-wider">Valor Total</div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-1 h-10 bg-[#a7c7e7] mr-3" />
          <div>
            <div className="text-2xl font-bold text-[#2c5282]">6</div>
            <div className="text-xs text-[#718096] uppercase tracking-wider">Países Destino</div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-1 h-10 bg-[#cbd5e0] mr-3" />
          <div>
            <div className="text-2xl font-bold text-[#2c5282]">USD {formatValue(totalValue / totalDeals)}</div>
            <div className="text-xs text-[#718096] uppercase tracking-wider">Tamaño Promedio</div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex gap-8">
        {/* Left - Country Distribution Pie Chart */}
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-[#4a5568] uppercase tracking-wider mb-4">
            Distribución por País Destino
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={countryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.percentage}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {countryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Legend */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            {countryData.map((item, index) => (
              <div key={item.country} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-sm mr-2" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-xs text-[#4a5568]">{item.country}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Right - Sector Breakdown Bar Chart */}
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-[#4a5568] uppercase tracking-wider mb-4">
            Distribución por Sector
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart 
              data={sectorData}
              layout="horizontal"
              margin={{ top: 5, right: 30, left: 70, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                type="number"
                tick={{ fontSize: 10, fill: '#718096' }}
                tickFormatter={(value) => `$${formatValue(value)}`}
              />
              <YAxis 
                dataKey="sector" 
                type="category"
                tick={{ fontSize: 10, fill: '#4a5568' }}
                width={60}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" fill="#4a90e2" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
          
          {/* Key Insights */}
          <div className="mt-4 p-3 bg-[#f7fafc] rounded border-l-4 border-[#4a90e2]">
            <h4 className="text-xs font-semibold text-[#4a5568] uppercase tracking-wider mb-2">
              Puntos Clave
            </h4>
            <ul className="space-y-1 text-xs text-[#718096]">
              <li>• EE.UU. lidera con 35% del valor total</li>
              <li>• Latinoamérica representa 65% de las inversiones</li>
              <li>• Tecnología es el sector más activo</li>
            </ul>
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
          <span className="text-[10px] text-[#718096]">3</span>
        </div>
      </div>
    </div>
  );
};