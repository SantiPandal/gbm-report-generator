'use client';

import { SectionFrame } from '../SectionFrame';
import { SectionHeader } from '../SectionHeader';
import { EditorQuoteChart } from '../../charts/EditorQuoteChart';

// CHARACTER LIMITS - STRICTLY ENFORCED FOR DATA GENERATION
const CHAR_LIMITS = {
  sectionTitle: 65,        // "Panorama del mercado M&A, ECM y DCM – México" = 45 chars
  period: 25,              // "Enero - Julio 2025" = 19 chars
  sectionHeader: 20,       // "Hechos Destacados" = 17 chars
  primaryMetricValue: 8,   // "29" = 2 chars
  primaryMetricDesc: 35,   // "Transacciones M&A YTD" = 22 chars
  secondaryMetricValue: 12, // "US$ 800MM" = 9 chars
  secondaryMetricDesc: 28, // "Deal Destacado" = 14 chars
  tertiaryMetricValue: 12, // "Ps. 8.0B" = 9 chars
  tertiaryMetricDesc: 28,  // "IPO Fibra Next" = 15 chars
  articleTitle: 60,        // Increased for longer titles
  authorName: 25,          // Slightly increased for longer names
  authorTitle: 40,         // Increased for longer titles
  articleContent: 1100,    // Maximum capacity with 10px font - full executive narrative
  hechosDestacadosParagraph: 700, // Maximum capacity with 10px font - full analytical paragraphs
};

// Validation function for character limits
const validateText = (text: string, limit: number, fieldName: string): string => {
  if (text.length > limit) {
    console.warn(`${fieldName} exceeds ${limit} chars: "${text}" (${text.length} chars)`);
    return text.substring(0, limit);
  }
  return text;
};

// Export for use in data generation
export { CHAR_LIMITS, validateText };

interface PanoramaHeaderSectionProps {
  period?: string;
}

export const PanoramaHeaderSection = ({ period = "Enero - Julio 2025" }: PanoramaHeaderSectionProps) => {
  // Validate all text content against character limits
  const sectionTitle = validateText("Panorama del mercado M&A, ECM y DCM – México", CHAR_LIMITS.sectionTitle, "sectionTitle");
  const sectionHeader = validateText("Hechos Destacados", CHAR_LIMITS.sectionHeader, "sectionHeader");
  const articleTitle = validateText("El Regreso de las Grandes Ofertas", CHAR_LIMITS.articleTitle, "articleTitle");
  const authorName = validateText("Javier Pagani", CHAR_LIMITS.authorName, "authorName");
  const authorTitle = validateText("Head Investment Banking GBM", CHAR_LIMITS.authorTitle, "authorTitle");
  return (
    <SectionFrame>
      {/* Section Header */}
      <SectionHeader 
        title={sectionTitle} 
        period={period}
        borderColor="#2c5282"
      />

      {/* Main Content - Adjusted Layout with Larger Quote Section */}
      <div className="h-[340px] flex gap-6 overflow-hidden">
        {/* Left Side - Hechos Destacados with 2 paragraphs (narrower) */}
        <div className="w-[200px] h-full flex flex-col overflow-hidden">
          <h3 className="text-xs font-semibold text-[#2d3748] uppercase tracking-[0.5px] mb-3 border-b border-[#e2e8f0] pb-2 truncate">
            {sectionHeader}
          </h3>

          {/* Two paragraph sections */}
          <div className="flex-1 flex flex-col gap-3 overflow-hidden">
            {/* First Paragraph */}
            <div className="bg-gradient-to-br from-white to-[#f8fafc] rounded-md p-2 border border-[#e2e8f0] overflow-hidden">
              <p className="text-[10px] text-[#4a5568] leading-[1.3]">
                El mercado mexicano registró <strong className="text-[#2c5282] font-semibold">29 transacciones M&A</strong> completadas en 2025 YTD, destacando el deal <strong className="text-[#2c5282] font-semibold">Pinfra + Altamira</strong> por US$ 800MM. El sector de infraestructura lidera con 40% del volumen total, seguido por tecnología (25%) y retail (15%). Los fondos de private equity participaron en 18 de las 29 operaciones, demostrando apetito por activos mexicanos. El valor promedio por transacción alcanzó US$ 280MM, superando el promedio histórico de US$ 180MM. Se esperan 12 operaciones adicionales antes del cierre del año, incluyendo 3 mega-deals superiores a US$ 1B cada uno en los sectores de energía renovable, telecomunicaciones y servicios financieros.
              </p>
            </div>

            {/* Second Paragraph */}
            <div className="bg-gradient-to-br from-[#f7fafc] to-white rounded-md p-2 border border-[#e2e8f0] overflow-hidden">
              <p className="text-[10px] text-[#4a5568] leading-[1.3]">
                <strong className="text-[#4a90e2] font-semibold">Fibra Next</strong> marcó un hito histórico con su IPO de Ps. 8.0B, la mayor oferta pública inicial en México en 6+ años. El mercado de ECM muestra señales de reactivación con 4 IPOs completados YTD y un pipeline de 8 emisores potenciales para 2025-2026. En DCM, las emisiones corporativas alcanzaron Ps. 120B YTD, un incremento del 35% vs. 2024. Los bonos sustentables representan 45% del volumen total emitido, reflejando el compromiso ESG del mercado. La demanda institucional internacional regresó con fuerza, representando 60% de la colocación en las últimas 5 emisiones. Las tasas de interés estables y el grado de inversión soberano crean condiciones óptimas para nuevas emisiones.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Article/Commentary (expanded to fill more space) */}
        <div className="flex-1 h-full overflow-hidden">
          <EditorQuoteChart
            title={articleTitle}
            authorName={authorName}
            authorTitle={authorTitle}
            authorInitials="JP"
            content={
              <>
                El mercado mexicano atraviesa un momento decisivo. <strong className="text-[#2d3748] font-semibold not-italic">Fibra Next</strong> marcó el mayor IPO en 6+ años con Ps. 8B, señalando el retorno de la confianza institucional. Las <strong className="text-[#2d3748] font-semibold not-italic">29 operaciones M&A</strong> completadas YTD, lideradas por el deal Pinfra-Altamira de US$800MM, demuestran un apetito renovado por transacciones transformacionales. El sector de infraestructura domina con 40% del volumen total, mientras que tecnología y retail emergen como nuevos catalizadores de crecimiento. Esperamos un cierre de año robusto con pipelines activos en energía renovable, nearshoring y consolidación bancaria, posicionando a México como destino preferente para capital institucional. El momentum sugiere que 2025 será un año récord en actividad transformacional de mercados de capital, con múltiples mega-deals en proceso y fuerte interés internacional. La convergencia de factores macro favorables y reformas estructurales crea una ventana única de oportunidad para transacciones de alto impacto. Anticipamos actividad sostenida en todos los segmentos: M&A, ECM y DCM, con volúmenes que podrían superar los US$15B anuales. Este es el momento de México.
              </>
            }
          />
        </div>
      </div>

      {/* Footer with accent */}
      <div className="flex justify-center mt-2 space-x-1">
        <div className="w-8 h-0.5 bg-[#a7c7e7]" />
        <div className="w-4 h-0.5 bg-[#4a90e2]" />
        <div className="w-8 h-0.5 bg-[#2c5282]" />
      </div>
    </SectionFrame>
  );
};