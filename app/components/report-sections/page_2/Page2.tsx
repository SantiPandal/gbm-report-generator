import { ResumenMexicoSection } from "./ResumenMexicoSection";
import { TransaccionesMexicoSection, type Transaction } from "./TransaccionesMexicoSection";

// Default transactions data (moved from TransaccionesMexicoSection for splitting)
const allTransactions: Transaction[] = [
  { objetivo: "CEMEX Dominicana", industria: "Materiales", comprador: "Camarera Progress Holdings", vendedor: "Cemex", monto: "950", porcentaje: "100%" },
  { objetivo: "Cemvir", industria: "Materiales", comprador: "Cie de Saint-Gobain", vendedor: "N/A", monto: "915", porcentaje: "100%" },
  { objetivo: "ALEATICA", industria: "Industrial", comprador: "IFM Investors Pty", vendedor: "N/A", monto: "496", porcentaje: "14%" },
  { objetivo: "Spare parts business/KUO", industria: "Bienes de consumo discrecional", comprador: "Fras-Le", vendedor: "Grupo KUO", monto: "389", porcentaje: "100%" },
  { objetivo: "Servicios Corporativos Javer", industria: "Bienes de consumo discrecional", comprador: "Vinte Viviendas Integrales", vendedor: "N/A", monto: "348", porcentaje: "100%" },
  { objetivo: "Solitario", industria: "Energía", comprador: "Grupo Tortugas", vendedor: "Fomento Economico Mexicano", monto: "207", porcentaje: "100%" },
  { objetivo: "Plastics solutions operations/Fomento Economico Mexicano", industria: "Industrial", comprador: "AMMI", vendedor: "Fomento Economico Mexicano", monto: "158", porcentaje: "100%" },
  { objetivo: "Portfolio of 2 warehouses/Nuevo Leon", industria: "Bienes de consumo básico", comprador: "Fibra MTY", vendedor: "N/A", monto: "73", porcentaje: "100%" },
  { objetivo: "Tejieres Del Futuro", industria: "Financiero", comprador: "Grupo Financiero Banorte", vendedor: "Rappi", monto: "50", porcentaje: "54%" },
  { objetivo: "Bonanza Gold Mine Project", industria: "Materiales", comprador: "Industrias Penoles", vendedor: "Asia Broadband", monto: "15", porcentaje: "100%" },
  { objetivo: "San Jose mine/Oaxaca", industria: "Tecnología", comprador: "Rio Ingenieria y Construccion", vendedor: "Fortuna Mining", monto: "7", porcentaje: "100%" },
  { objetivo: "Destileria Los Danzantes", industria: "Comunicaciones", comprador: "Emperador", vendedor: "N/A", monto: "4", porcentaje: "62%" },
  { objetivo: "Cimarron Project/Baja California", industria: "Energía", comprador: "Silver Viper Minerals", vendedor: "CSAC Holdings", monto: "1", porcentaje: "100%" },
  { objetivo: "Cabo Star Resort", industria: "Industrial", comprador: "BlackRock/Solaya Holdings", vendedor: "Hacienda Cabo", monto: "1", porcentaje: "100%" },
  { objetivo: "Los Ramones II Sur/Brookfield Asset Management", industria: "Energía", comprador: "Macquarie Asset Management Pty", vendedor: "Brookfield Asset Management", monto: "N/A", porcentaje: "0%" },
  { objetivo: "11 Tecnologias S", industria: "Tecnología", comprador: "ActiveCampaign", vendedor: "N/A", monto: "N/A", porcentaje: "100%" },
  { objetivo: "ED Forwarding", industria: "Industrial", comprador: "RGP International", vendedor: "N/A", monto: "N/A", porcentaje: "0%" },
  { objetivo: "Blue Tissue SAPI de CV BTC Paper", industria: "Bienes raíces, Materiales", comprador: "GranBelley Group", vendedor: "N/A", monto: "N/A", porcentaje: "100%" },
  { objetivo: "Portfolio of 3 properties/Ciudad Juarez", industria: "Bienes raíces", comprador: "Eite Capital SC", vendedor: "N/A", monto: "N/A", porcentaje: "100%" },
  { objetivo: "Hospitea Transacciones", industria: "Financiero", comprador: "Anvalite Inc", vendedor: "N/A", monto: "N/A", porcentaje: "100%" },
  { objetivo: "Los Lince Amistenty Mine/Oaxaca", industria: "Materiales", comprador: "EV Resources", vendedor: "N/A", monto: "N/A", porcentaje: "75%" },
  { objetivo: "Freixe Paperficios", industria: "Comunicaciones", comprador: "Emergent Cold LatAm Management", vendedor: "Wiseq Group", monto: "N/A", porcentaje: "100%" },
  { objetivo: "Media Sports Latinoamerica", industria: "Comunicaciones", comprador: "Fox Corp", vendedor: "N/A", monto: "N/A", porcentaje: "100%" },
  { objetivo: "Portfolio of 40 pawn stores/Mexico", industria: "Bienes de consumo discrecional", comprador: "EZCORP", vendedor: "N/A", monto: "N/A", porcentaje: "100%" },
  { objetivo: "NET Light", industria: "Materiales", comprador: "N/A", vendedor: "N/A", monto: "N/A", porcentaje: "100%" },
  { objetivo: "Prima Zinc & silver project/Zacatecas", industria: "Materiales", comprador: "Goldgroup Mining", vendedor: "N/A", monto: "N/A", porcentaje: "100%" },
  { objetivo: "Infraestructura Portuaria Mexicana", industria: "Comunicaciones", comprador: "MSC Mediterranean Shipping", vendedor: "Promotora y Operadora de Infraestructura", monto: "N/A", porcentaje: "100%" },
  { objetivo: "Claro Chile SPA", industria: "Comunicaciones", comprador: "America Movil", vendedor: "Liberty Latin America", monto: "N/A", porcentaje: "100%" },
  { objetivo: "Monterrey/Artepack de Mexico", industria: "Industrial", comprador: "Specialized Packaging Group", vendedor: "Artepack de Mexico", monto: "N/A", porcentaje: "100%" }
];

export const Page2 = () => {
  const MAX_TRANSACTIONS_FIRST_PAGE = 12;  // First page (with ResumenMexicoSection)
  const MAX_TRANSACTIONS_CONTINUATION_PAGE = 30;  // Continuation pages (full page) - increased to fit more

  // Split transactions into pages
  if (allTransactions.length <= MAX_TRANSACTIONS_FIRST_PAGE) {
    // Fits in one page
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <ResumenMexicoSection />
        <TransaccionesMexicoSection transactions={allTransactions} />
      </div>
    );
  }

  // Need multiple pages
  const pages = [];

  // First page with ResumenMexicoSection and first 14 transactions
  pages.push(
    <div key="page2-main" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <ResumenMexicoSection />
      <TransaccionesMexicoSection
        transactions={allTransactions.slice(0, MAX_TRANSACTIONS_FIRST_PAGE)}
        title="Transacciones en México 2025 YTD"
      />
    </div>
  );

  // Additional pages with remaining transactions (22 per page, dynamic height)
  let remainingTransactions = allTransactions.slice(MAX_TRANSACTIONS_FIRST_PAGE);
  let pageNumber = 2;

  while (remainingTransactions.length > 0) {
    const pageTransactions = remainingTransactions.slice(0, MAX_TRANSACTIONS_CONTINUATION_PAGE);
    pages.push(
      <TransaccionesMexicoSection
        key={`page2-continuation-${pageNumber}`}
        transactions={pageTransactions}
        title="Transacciones en México 2025 YTD (Continuación)"
        period="2025 YTD"
      />
    );
    remainingTransactions = remainingTransactions.slice(MAX_TRANSACTIONS_CONTINUATION_PAGE);
    pageNumber++;
  }

  return pages;
}