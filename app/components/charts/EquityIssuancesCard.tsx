'use client';

import { Activity } from 'lucide-react';
import { CHAR_BUDGETS, truncateText } from '@/lib/design/typography';

interface EquityIssuancesCardProps {
  title?: string;
  totalVolume?: string;
  volumeChange?: string;
  highlightIPO?: string;
  highlightAmount?: string;
  newIPOs?: number;
  followOns?: number;
  fibras?: number;
}

export const EquityIssuancesCard = ({
  title = "Mercado de Capitales",
  totalVolume = "MXN 45,200 MM",
  volumeChange = "+230%",
  highlightIPO = "Fibra Next",
  highlightAmount = "MXN 8,000 MM",
  newIPOs = 3,
  followOns = 12,
  fibras = 5
}: EquityIssuancesCardProps) => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="bg-gradient-to-br from-[#f7fafc] to-white rounded-lg border border-[#e2e8f0] p-3 flex flex-col h-full">
        <div className="border-b border-[#cbd5e0] pb-2 mb-3">
          <h3 className="text-sm font-bold text-[#2c5282] mb-1">Emisiones de Capital</h3>
          <p className="text-[10px] text-[#718096]">IPOs y Follow-ons</p>
        </div>

        {/* Equity Metrics */}
        <div className="flex-1 space-y-2">
          <div className="flex items-start gap-2">
            <Activity className="w-4 h-4 text-[#4a90e2] mt-0.5" />
            <div className="flex-1">
              <div className="text-xs font-semibold text-[#2d3748]">
                Volumen Total: {totalVolume}
              </div>
              <div className="text-[10px] text-[#718096]">
                {volumeChange} vs. 2024
              </div>
            </div>
          </div>

          <div className="bg-white rounded p-2 border-l-3 border-[#a7c7e7]">
            <div className="space-y-1">
              <div className="text-[10px]">
                {truncateText(`IPO destacado: ${highlightIPO}`, CHAR_BUDGETS.capitalMarkets.equityHighlight)}
              </div>
              <div className="text-[10px]">
                <span className="text-[#718096]">Monto:</span>
                <span className="font-semibold text-[#2c5282] ml-1">{highlightAmount}</span>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[10px]">
              <span className="text-[#718096]">Nuevas emisiones (IPOs)</span>
              <span className="font-semibold text-[#2d3748]">{newIPOs}</span>
            </div>
            <div className="flex justify-between text-[10px]">
              <span className="text-[#718096]">Follow-ons</span>
              <span className="font-semibold text-[#2d3748]">{followOns}</span>
            </div>
            <div className="flex justify-between text-[10px]">
              <span className="text-[#718096]">FIBRAs</span>
              <span className="font-semibold text-[#2d3748]">{fibras}</span>
            </div>
          </div>

          {/* Success indicator */}
          <div className="mt-auto pt-2">
            <div className="bg-gradient-to-r from-[#a7c7e7] to-[#4a90e2] rounded-full h-1.5 relative">
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-[#2c5282] rounded-full border-2 border-white" />
            </div>
            <div className="text-[9px] text-[#718096] text-center mt-1">
              Momentum positivo en mercado de capitales
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};