'use client';

import { SectionFrame } from '../SectionFrame';
import { SectionHeader } from '../SectionHeader';
import { colors } from '@/lib/design/tokens';

interface Transaction {
  objetivo: string;
  industria: string;
  comprador: string;
  vendedor: string;
  monto: string;
  porcentaje: string;
}

interface TransaccionesMexicoSectionProps {
  period?: string;
}

export const TransaccionesMexicoSection = ({ period = "2025 YTD" }: TransaccionesMexicoSectionProps) => {
  // Sample transaction data matching the mockup
  const transactions: Transaction[] = [
    {
      objetivo: "CEMEX Dominicana",
      industria: "Materiales",
      comprador: "Camarera Progress Holdings",
      vendedor: "Cemex",
      monto: "950",
      porcentaje: "100%"
    },
    {
      objetivo: "Cemvir",
      industria: "Materiales",
      comprador: "Cie de Saint-Gobain",
      vendedor: "N/A",
      monto: "915",
      porcentaje: "100%"
    },
    {
      objetivo: "ALEATICA",
      industria: "Industrial",
      comprador: "IFM Investors Pty",
      vendedor: "N/A",
      monto: "496",
      porcentaje: "14%"
    },
    {
      objetivo: "Spare parts business/KUO",
      industria: "Bienes de consumo discrecional",
      comprador: "Fras-Le",
      vendedor: "Grupo KUO",
      monto: "389",
      porcentaje: "100%"
    },
    {
      objetivo: "Servicios Corporativos Javer",
      industria: "Bienes de consumo discrecional",
      comprador: "Vinte Viviendas Integrales",
      vendedor: "N/A",
      monto: "348",
      porcentaje: "100%"
    },
    {
      objetivo: "Solitario",
      industria: "Energía",
      comprador: "Grupo Tortugas",
      vendedor: "Fomento Economico Mexicano",
      monto: "207",
      porcentaje: "100%"
    },
    {
      objetivo: "Plastics solutions operations/Fomento Economico Mexicano",
      industria: "Industrial",
      comprador: "AMMI",
      vendedor: "Fomento Economico Mexicano",
      monto: "158",
      porcentaje: "100%"
    },
    {
      objetivo: "Portfolio of 2 warehouses/Nuevo Leon",
      industria: "Bienes de consumo básico",
      comprador: "Fibra MTY",
      vendedor: "N/A",
      monto: "73",
      porcentaje: "100%"
    },
    {
      objetivo: "Tejieres Del Futuro",
      industria: "Financiero",
      comprador: "Grupo Financiero Banorte",
      vendedor: "Rappi",
      monto: "50",
      porcentaje: "54%"
    },
    {
      objetivo: "Bonanza Gold Mine Project",
      industria: "Materiales",
      comprador: "Industrias Penoles",
      vendedor: "Asia Broadband",
      monto: "15",
      porcentaje: "100%"
    },
    {
      objetivo: "San Jose mine/Oaxaca",
      industria: "Tecnología",
      comprador: "Rio Ingenieria y Construccion",
      vendedor: "Fortuna Mining",
      monto: "7",
      porcentaje: "100%"
    },
    {
      objetivo: "Destileria Los Danzantes",
      industria: "Comunicaciones",
      comprador: "Emperador",
      vendedor: "N/A",
      monto: "4",
      porcentaje: "62%"
    },
    {
      objetivo: "Cimarron Project/Baja California",
      industria: "Energía",
      comprador: "Silver Viper Minerals",
      vendedor: "CSAC Holdings",
      monto: "1",
      porcentaje: "100%"
    },
    {
      objetivo: "Cabo Star Resort",
      industria: "Industrial",
      comprador: "BlackRock/Solaya Holdings",
      vendedor: "Hacienda Cabo",
      monto: "1",
      porcentaje: "100%"
    },
    {
      objetivo: "Los Ramones II Sur/Brookfield Asset Management",
      industria: "Energía",
      comprador: "Macquarie Asset Management Pty",
      vendedor: "Brookfield Asset Management",
      monto: "N/A",
      porcentaje: "0%"
    },
    {
      objetivo: "11 Tecnologias S",
      industria: "Tecnología",
      comprador: "ActiveCampaign",
      vendedor: "N/A",
      monto: "N/A",
      porcentaje: "100%"
    },
    {
      objetivo: "ED Forwarding",
      industria: "Industrial",
      comprador: "RGP International",
      vendedor: "N/A",
      monto: "N/A",
      porcentaje: "0%"
    },
    {
      objetivo: "Blue Tissue SAPI de CV BTC Paper",
      industria: "Bienes raíces, Materiales",
      comprador: "GranBelley Group",
      vendedor: "N/A",
      monto: "N/A",
      porcentaje: "100%"
    },
    {
      objetivo: "Portfolio of 3 properties/Ciudad Juarez",
      industria: "Bienes raíces",
      comprador: "Eite Capital SC",
      vendedor: "N/A",
      monto: "N/A",
      porcentaje: "100%"
    },
    {
      objetivo: "Hospitea Transacciones",
      industria: "Financiero",
      comprador: "Anvalite Inc",
      vendedor: "N/A",
      monto: "N/A",
      porcentaje: "100%"
    },
    {
      objetivo: "Los Lince Amistenty Mine/Oaxaca",
      industria: "Materiales",
      comprador: "EV Resources",
      vendedor: "N/A",
      monto: "N/A",
      porcentaje: "75%"
    },
    {
      objetivo: "Freixe Paperficios",
      industria: "Comunicaciones",
      comprador: "Emergent Cold LatAm Management",
      vendedor: "Wiseq Group",
      monto: "N/A",
      porcentaje: "100%"
    },
    {
      objetivo: "Media Sports Latinoamerica",
      industria: "Comunicaciones",
      comprador: "Fox Corp",
      vendedor: "N/A",
      monto: "N/A",
      porcentaje: "100%"
    },
    {
      objetivo: "Portfolio of 40 pawn stores/Mexico",
      industria: "Bienes de consumo discrecional",
      comprador: "EZCORP",
      vendedor: "N/A",
      monto: "N/A",
      porcentaje: "100%"
    },
    {
      objetivo: "NET Light",
      industria: "Materiales",
      comprador: "N/A",
      vendedor: "N/A",
      monto: "N/A",
      porcentaje: "100%"
    },
    {
      objetivo: "Prima Zinc & silver project/Zacatecas",
      industria: "Materiales",
      comprador: "Goldgroup Mining",
      vendedor: "N/A",
      monto: "N/A",
      porcentaje: "100%"
    },
    {
      objetivo: "Infraestructura Portuaria Mexicana",
      industria: "Comunicaciones",
      comprador: "MSC Mediterranean Shipping",
      vendedor: "Promotora y Operadora de Infraestructura",
      monto: "N/A",
      porcentaje: "100%"
    },
    {
      objetivo: "Claro Chile SPA",
      industria: "Comunicaciones",
      comprador: "America Movil",
      vendedor: "Liberty Latin America",
      monto: "N/A",
      porcentaje: "100%"
    },
    {
      objetivo: "Monterrey/Artepack de Mexico",
      industria: "Industrial",
      comprador: "Specialized Packaging Group",
      vendedor: "Artepack de Mexico",
      monto: "N/A",
      porcentaje: "100%"
    }
  ];

  return (
    <SectionFrame height={560} padding={12}>
      {/* Section Header */}
      <SectionHeader 
        title="Transacciones en México 2025 YTD" 
        period={period}
        borderColor={colors.primaryBlue}
      />

      {/* Table Container */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-[9px]">
          <thead>
            <tr className="bg-[#f7fafc] border-b border-gray-200">
              <th className="text-left py-2 px-2 font-semibold text-[#2c5282] uppercase tracking-wider">Objetivo</th>
              <th className="text-left py-2 px-2 font-semibold text-[#2c5282] uppercase tracking-wider">Industria</th>
              <th className="text-left py-2 px-2 font-semibold text-[#2c5282] uppercase tracking-wider">Comprador</th>
              <th className="text-left py-2 px-2 font-semibold text-[#2c5282] uppercase tracking-wider">Vendedor</th>
              <th className="text-right py-2 px-2 font-semibold text-[#2c5282] uppercase tracking-wider">Monto (US $ MM)</th>
              <th className="text-right py-2 px-2 font-semibold text-[#2c5282] uppercase tracking-wider">Porcentaje Adquirido</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr 
                key={index} 
                className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-[#fafbfc]'} hover:bg-[#e6f2ff] transition-colors`}
              >
                <td className="py-1.5 px-2 text-[#2d3748]">{transaction.objetivo}</td>
                <td className="py-1.5 px-2 text-[#4a5568]">{transaction.industria}</td>
                <td className="py-1.5 px-2 text-[#4a5568]">{transaction.comprador}</td>
                <td className="py-1.5 px-2 text-[#4a5568]">{transaction.vendedor}</td>
                <td className="py-1.5 px-2 text-right font-semibold text-[#2c5282]">
                  {transaction.monto}
                </td>
                <td className="py-1.5 px-2 text-right font-semibold text-[#2c5282]">
                  {transaction.porcentaje}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Note */}
      <div className="mt-2 pt-2 border-t border-gray-200">
        <p className="text-[8px] text-gray-500 italic">
          Fuente: S&P Capital IQ, Bloomberg, Informes públicos de empresas
        </p>
      </div>
    </SectionFrame>
  );
};