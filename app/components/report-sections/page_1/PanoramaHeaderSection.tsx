'use client';

import { SectionFrame } from '../SectionFrame';
import { SectionHeader } from '../SectionHeader';
import { EditorQuoteChart } from '../../charts/EditorQuoteChart';
import { useReportData } from '@/app/data-map/ReportDataContext';

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
  const reportData = useReportData();
  const marketOverview = reportData['0_1'];

  // Validate all text content against character limits
  const sectionTitle = validateText(marketOverview.Market_Overview_Title, CHAR_LIMITS.sectionTitle, "sectionTitle");
  const sectionHeader = validateText("Hechos Destacados", CHAR_LIMITS.sectionHeader, "sectionHeader");
  const articleTitle = validateText(marketOverview.Article_Title, CHAR_LIMITS.articleTitle, "articleTitle");
  const authorName = validateText(marketOverview.Article_Author, CHAR_LIMITS.authorName, "authorName");
  const authorTitle = validateText(marketOverview.Author_Professional_Title, CHAR_LIMITS.authorTitle, "authorTitle");
  const highlights = [marketOverview.Highlight_1, marketOverview.Highlight_2]
    .filter((highlight): highlight is string => Boolean(highlight))
    .map((highlight, index) =>
      validateText(highlight, CHAR_LIMITS.hechosDestacadosParagraph, `highlight${index + 1}`)
    );

  const articleContent = validateText(
    marketOverview.Article_Content,
    CHAR_LIMITS.articleContent,
    "articleContent"
  );

  const authorInitials = authorName
    .split(' ')
    .filter((part) => part.length > 0)
    .map((part) => part[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
  return (
    <SectionFrame>
      {/* Section Header */}
      <SectionHeader 
        title={sectionTitle} 
        period={period}
        borderColor="#2c5282"
      />

      {/* Main Content - Adjusted Layout with Larger Quote Section */}
      <div className="h-[220px] flex gap-6 overflow-hidden">
        {/* Left Side - Hechos Destacados with 2 paragraphs (narrower) */}
        <div className="w-[200px] h-full flex flex-col overflow-hidden">
          <h3 className="text-xs font-semibold text-[#2d3748] uppercase tracking-[0.5px] mb-3 border-b border-[#e2e8f0] pb-2 truncate">
            {sectionHeader}
          </h3>

          {/* Two paragraph sections */}
          <div className="flex-1 flex flex-col gap-3 overflow-hidden">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className={`rounded-md p-2 border border-[#e2e8f0] overflow-hidden ${
                  index % 2 === 0 ? 'bg-gradient-to-br from-white to-[#f8fafc]' : 'bg-gradient-to-br from-[#f7fafc] to-white'
                }`}
              >
                <p className="text-[10px] text-[#4a5568] leading-[1.3]">
                  {highlight}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Article/Commentary (expanded to fill more space) */}
        <div className="flex-1 h-full overflow-hidden">
          <EditorQuoteChart
            title={articleTitle}
            authorName={authorName}
            authorTitle={authorTitle}
            authorInitials={authorInitials || 'NA'}
            content={
              <>
                {articleContent}
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
