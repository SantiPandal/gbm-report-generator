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
  articleTitle: 45,        // "El Regreso de las Grandes Ofertas" = 34 chars
  authorName: 20,          // "Javier Pagani" = 13 chars
  authorTitle: 35,         // "Head Investment Banking GBM" = 28 chars
  articleContent: 280,     // Total article content - same as Twitter/X limit
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

      {/* Main Content - 3:1 Ratio Layout with Fixed Dimensions */}
      <div className="h-[340px] flex gap-6 overflow-hidden">
        {/* Left Side - Key Insights/Metrics (25% - 1 part) */}
        <div className="w-[240px] h-full flex flex-col overflow-hidden">
          <h3 className="text-xs font-semibold text-[#2d3748] uppercase tracking-[0.5px] mb-3 border-b border-[#e2e8f0] pb-2 truncate">
            {sectionHeader}
          </h3>
          
          {/* Key Metrics - Left Number, Right Description */}
          <div className="flex-1 flex flex-col gap-4 overflow-hidden">
            {/* Primary Metric */}
            <div className="h-[75px] bg-gradient-to-br from-white to-[#f8fafc] rounded-md p-3 border-2 border-[#2c5282] overflow-hidden">
              <div className="flex items-center gap-3 h-full">
                {/* Number - Left */}
                <div className="flex-shrink-0">
                  <div className="text-2xl font-bold text-[#2c5282] leading-none">
                    29
                  </div>
                </div>
                {/* Description - Right */}
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-[#2d3748] leading-tight">
                    Transacciones M&A
                  </div>
                  <div className="text-[10px] text-[#718096] leading-tight mt-0.5">
                    Completadas 2025
                  </div>
                </div>
              </div>
            </div>
            
            {/* Secondary Metric */}
            <div className="h-[55px] bg-gradient-to-br from-[#f7fafc] to-white rounded-md p-3 border border-[#4a90e2] overflow-hidden">
              <div className="flex items-center gap-3 h-full">
                {/* Number - Left */}
                <div className="flex-shrink-0">
                  <div className="text-lg font-bold text-[#4a90e2] leading-none">
                    US$ 800MM
                  </div>
                </div>
                {/* Description - Right */}
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-medium text-[#4a5568] leading-tight">
                    Pinfra + Altamira
                  </div>
                </div>
              </div>
            </div>

            {/* Tertiary Metric */}
            <div className="h-[55px] bg-gradient-to-br from-[#e6f2ff] to-white rounded-md p-3 border border-[#a7c7e7] overflow-hidden">
              <div className="flex items-center gap-3 h-full">
                {/* Number - Left */}
                <div className="flex-shrink-0">
                  <div className="text-lg font-bold text-[#2c5282] leading-none">
                    Ps. 8.0B
                  </div>
                </div>
                {/* Description - Right */}
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-medium text-[#4a5568] leading-tight">
                    IPO Fibra Next
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Article/Commentary (75% - 3 parts) */}
        <div className="flex-1 h-full overflow-hidden">
          <EditorQuoteChart
            title={articleTitle}
            authorName={authorName}
            authorTitle={authorTitle}
            authorInitials="JP"
            content={
              <>
                <strong className="text-[#2d3748] font-semibold not-italic">Fibra Next</strong> marcó el mayor IPO mexicano en 6+ años con Ps. 8B. Las <strong className="text-[#2d3748] font-semibold not-italic">29 operaciones M&A</strong> completadas YTD demuestran el renovado apetito del mercado por transacciones de gran escala.
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