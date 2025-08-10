'use client';

import { TrendingUp } from 'lucide-react';
import { CHAR_BUDGETS, truncateText } from '@/lib/design/typography';

interface DebtIssuancesCardProps {
  title?: string;
  totalVolume?: string;
  volumeChange?: string;
  corporatePercent?: number;
  governmentPercent?: number;
  localOperations?: number;
  internationalOperations?: number;
}

export const DebtIssuancesCard = ({
  title = "Mercado de Deuda",
  totalVolume = "MXN 285,400 MM",
  volumeChange = "+15.3%",
  corporatePercent = 65,
  governmentPercent = 35,
  localOperations = 187,
  internationalOperations = 42
}: DebtIssuancesCardProps) => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="bg-gradient-to-br from-[#f7fafc] to-white rounded-lg border border-[#e2e8f0] p-3 flex flex-col h-full">
        <div className="border-b border-[#cbd5e0] pb-2 mb-3">
          <h2 className="text-base font-bold text-[#2c5282] mb-2">{title}</h2>
          <h3 className="text-sm font-bold text-[#2c5282] mb-1">Emisiones de Deuda</h3>
          <p className="text-[10px] text-[#718096]">Mercado Local e Internacional</p>
        </div>

        {/* Debt Metrics */}
        <div className="flex-1 space-y-2">
          <div className="flex items-start gap-2">
            <TrendingUp className="w-4 h-4 text-[#4a90e2] mt-0.5" />
            <div className="flex-1">
              <div className="text-xs font-semibold text-[#2d3748]">
                Volumen Total: {totalVolume}
              </div>
              <div className="text-[10px] text-[#718096]">
                {volumeChange} vs. 2024
              </div>
            </div>
          </div>

          <div className="bg-white rounded p-2 border-l-3 border-[#4a90e2]">
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div>
                <span className="text-[#718096]">Corporativo:</span>
                <span className="font-semibold text-[#2c5282] ml-1">{corporatePercent}%</span>
              </div>
              <div>
                <span className="text-[#718096]">Gobierno:</span>
                <span className="font-semibold text-[#2c5282] ml-1">{governmentPercent}%</span>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[10px]">
              <span className="text-[#718096]">Emisiones locales</span>
              <span className="font-semibold text-[#2d3748]">{localOperations} operaciones</span>
            </div>
            <div className="flex justify-between text-[10px]">
              <span className="text-[#718096]">Emisiones internacionales</span>
              <span className="font-semibold text-[#2d3748]">{internationalOperations} operaciones</span>
            </div>
          </div>

          {/* Mini trend indicator */}
          <div className="flex items-center justify-center pt-2">
            <div className="flex gap-1">
              {[1,2,3,4,5,6,7].map((i) => (
                <div 
                  key={i} 
                  className="w-1 bg-[#a7c7e7]" 
                  style={{ height: `${Math.random() * 20 + 10}px` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
