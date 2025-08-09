'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TitleSlideProps {
  data: {
    totalDeals: number;
    totalValue: string;
    monthlyData?: Array<{ month: string; deals: number; year: string }>;
    yearlyData?: Array<{ year: string; value: number; deals: number }>;
  };
}

// Mock data for the charts
const monthlyTransactions = [
  { month: 'Mar', deals: 12, year: '24' },
  { month: 'Apr', deals: 22, year: '24' },
  { month: 'May', deals: 14, year: '24' },
  { month: 'Jun', deals: 17, year: '24' },
  { month: 'Jul', deals: 19, year: '24' },
  { month: 'Aug', deals: 13, year: '24' },
  { month: 'Sep', deals: 14, year: '24' },
  { month: 'Oct', deals: 16, year: '24' },
  { month: 'Nov', deals: 14, year: '24' },
  { month: 'Dec', deals: 12, year: '24' },
  { month: 'Jan', deals: 15, year: '25' },
  { month: 'Feb', deals: 16, year: '25' },
  { month: 'Mar', deals: 14, year: '25' },
];

const yearlyValue = [
  { year: '2021', value: 8200, deals: 150 },
  { year: '2022', value: 18015, deals: 201 },
  { year: '2023', value: 9648, deals: 156 },
  { year: '2024', value: 15301, deals: 183 },
];

export default function TitleSlide({ data }: TitleSlideProps) {
  const currentMonth = 14; // March 2025
  const previousMonth = 16; // February 2025
  const monthChange = currentMonth - previousMonth;
  const yearAgoMonth = 12; // March 2024
  const yearChange = currentMonth - yearAgoMonth;

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-50 to-blue-50 p-10 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-blue-600 font-semibold text-lg">Seale & Associates</h3>
          </div>
        </div>
        <div className="text-right">
          <p className="text-gray-500 text-sm font-medium">MÉXICO F&A MARZO 2025</p>
        </div>
      </div>

      {/* Main Title */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Resumen de Fusiones y Adquisiciones en México
        </h1>
        <div className="flex flex-wrap gap-2 text-gray-700">
          <p>
            En marzo de 2025, se anunciaron <span className="font-bold text-blue-600">{currentMonth} transacciones</span> en México,
          </p>
          <p className="flex items-center gap-1">
            representando un decremento de
            <span className="font-bold text-red-600 flex items-center gap-1">
              {Math.abs(monthChange)} transacciones
              <TrendingDown className="w-4 h-4" />
            </span>
            con respecto al mes anterior.
          </p>
          <p>
            Comparado con el mismo periodo del año pasado, el volumen de transacciones aumentó
            <span className="font-bold text-green-600 flex items-center gap-1 ml-1">
              {yearChange} transacciones
              <TrendingUp className="w-4 h-4" />
            </span>
            .
          </p>
        </div>
      </div>

      {/* Charts Container */}
      <div className="grid grid-cols-2 gap-6" style={{ height: 'calc(100% - 280px)' }}>
        {/* Monthly Transactions Chart */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative flex flex-col">
          <h3 className="text-sm font-semibold text-gray-700 mb-1">Volumen Acumulado Revelado de Transacciones en México</h3>
          <p className="text-xs text-gray-500 mb-3"># de Transacciones por Mes</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={monthlyTransactions} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 11 }}
                axisLine={{ stroke: '#e0e0e0' }}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 11 }}
                axisLine={{ stroke: '#e0e0e0' }}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Bar dataKey="deals" radius={[4, 4, 0, 0]}>
                {monthlyTransactions.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.year === '25' ? '#1e40af' : '#94a3b8'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-3 flex items-center justify-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 bg-gray-400 rounded"></div>
              <span className="text-gray-600">2024</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 bg-blue-700 rounded"></div>
              <span className="text-gray-600">T1 2025</span>
            </div>
          </div>
        </div>

        {/* Yearly Value Chart */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col">
          <h3 className="text-sm font-semibold text-gray-700 mb-1">Valor y Volumen Acumulado Revelado de Transacciones en México</h3>
          <p className="text-xs text-gray-500 mb-3">Transacciones Anuales (US$ millones)</p>
          <div className="space-y-2.5 flex-1">
            {yearlyValue.map((year, index) => (
              <div key={year.year} className="flex items-center gap-4">
                <span className="text-sm font-semibold text-gray-700 w-12">{year.year}</span>
                <div className="flex-1 flex items-center gap-3">
                  <div className="flex-1 bg-gray-100 rounded-lg h-7 relative overflow-hidden">
                    <div 
                      className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-between px-3"
                      style={{ width: `${(year.value / 20000) * 100}%` }}
                    >
                      <span className="text-xs font-semibold text-white">${year.value.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="bg-gray-100 rounded-lg px-3 py-1">
                    <span className="text-xs font-semibold text-gray-700">{year.deals}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-blue-50 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-600 mb-1">Mar. Acum. '24</p>
              <p className="text-lg font-bold text-blue-700">$1,133.5</p>
              <p className="text-xs text-gray-600">41 transacciones</p>
            </div>
            <div className="bg-green-50 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-600 mb-1">Mar. Acum. '25</p>
              <p className="text-lg font-bold text-green-700">$1,592.5</p>
              <p className="text-xs text-gray-600">45 transacciones</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-10 right-10">
        <div className="text-[9px] text-gray-400 leading-relaxed">
          <p className="italic">Nota: los datos incluidos en este reporte se componen de transacciones de empresas en etapa madura y excluyen transacciones de venture capital y aumentos de capital. Asimismo, se han incluido algunas transacciones que pueden estar sujetas a condiciones de cierre habituales y aprobaciones regulatorias.</p>
          <p className="text-gray-500 mt-0.5">Fuentes: Capital IQ, Comunicados de Prensa, Mergermarket, TTR</p>
        </div>
      </div>
    </div>
  );
}