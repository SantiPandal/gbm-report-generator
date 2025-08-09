# M&A Report Generator

A Next.js 15 application that transforms M&A data from CSV/Excel files into professional PowerPoint-style PDF reports using @react-pdf/renderer.

## 🏗️ Architecture Overview

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict mode)
- **PDF Generation**: @react-pdf/renderer (NOT Puppeteer)
- **Charts**: Recharts for UI preview, SVG/Canvas for PDF
- **Styling**: Tailwind CSS for UI, @react-pdf/renderer StyleSheet for PDFs
- **Data Processing**: Papa Parse for CSV, XLSX for Excel files

### Project Structure
```
/app
  /api
    /generate-pdf/route.ts       # PDF generation endpoint
    /generate-summary/route.ts   # AI summary endpoint (future)
  /components
    /pdf-slides/                 # @react-pdf/renderer components
      styles.ts                  # Shared PDF styles
      TitleSlide.tsx            # Title slide component
      ChartSlide.tsx            # Generic reusable chart slide
      SummarySlide.tsx          # Summary slide component
      ComparisonSlide.tsx       # Comparison slide component
      PDFDocument.tsx           # Main PDF document wrapper
    /charts/                    # Recharts components for UI preview
      RevenueChart.tsx
      IndustryPieChart.tsx
      TrendLineChart.tsx
      DealFlowChart.tsx
    /ui-slides/                 # React components for web preview
      SlidePreview.tsx
  page.tsx                      # Main upload interface
  layout.tsx                    # Root layout

/lib
  /processing/                  # Data processing utilities
    excelParser.ts             # Excel/CSV parsing logic
    calculations.ts            # M&A calculations, deal analysis
    dataTransform.ts          # Transform raw data for charts
    chartImageGenerator.ts    # Generate chart images for PDF

/types
  index.ts                     # TypeScript interfaces for all data structures

/source_data/                  # Sample data files
  MA_MEX/                     # M&A Mexico data (2020-2025)
  Emisiones_Equity/           # Equity emissions data

/scripts/                     # Utility scripts
  take-screenshot.sh          # macOS screenshot automation
  screenshot-cleanup.js       # Cleanup old screenshots
```

## 📊 Data Flow

1. **Upload**: User uploads CSV/Excel file via drag-and-drop interface
2. **Parse**: File parsed using Papa Parse (CSV) or XLSX (Excel)
3. **Process**: Data transformed into structured insights (totals, success rates, industry breakdown)
4. **Generate**: PDF created using @react-pdf/renderer with multiple slides
5. **Download**: PDF automatically downloaded to user's device

## 🎯 Key Features

### Current Features
- **File Upload**: Drag-and-drop interface for CSV/Excel files
- **Data Processing**: Automatic calculation of deal metrics, success rates, industry analysis
- **PDF Generation**: Professional PowerPoint-style reports (16:9 aspect ratio)
- **Multiple Slides**: Title, Executive Summary, Top Deals, Industry Breakdown
- **Bilingual Support**: English/Spanish content
- **Chart Visualization**: Bar charts, pie charts, trend analysis
- **Screenshot Automation**: Built-in screenshot tools for development

### Planned Features
- **AI Summaries**: OpenAI/Anthropic integration for intelligent insights
- **Interactive Preview**: Web-based slide preview before PDF generation
- **Advanced Charts**: More chart types and customization options
- **Template System**: Multiple report templates/themes
- **Data Validation**: Enhanced error handling and data validation

## 🔧 Development

### Setup Commands
```bash
npm install                    # Install dependencies
npm run dev                   # Start development server
npm run build                 # Build for production
npm run lint                  # Run ESLint
npm run screenshot            # Take full screen screenshot
npm run screenshot:window     # Take active window screenshot
npm run clean:screenshots     # Clean old screenshots
npm run clean:tmp            # Clean temporary files
```

### Key Dependencies
- `@react-pdf/renderer` - PDF generation
- `next` - React framework
- `react-dropzone` - File upload interface
- `papaparse` - CSV parsing
- `recharts` - Chart components
- `@nivo/core, @nivo/bar, @nivo/pie, @nivo/line` - Advanced charts
- `lucide-react` - Icons
- `tailwindcss` - Styling

## 📝 Data Structure

### Input Data Format (CSV)
```csv
Deal Type,Announce Date,Target Name,Acquirer Name,Announced Total Value (mil.),
Deal Status,Target Industry Sector,Completion/Termination Date
```

### TypeScript Interfaces
```typescript
interface Deal {
  dealType: string;
  announceDate: Date;
  targetName: string;
  acquirerName: string;
  value: number;
  status: string;
  industry: string;
}

interface ProcessedData {
  totalDeals: number;
  successRate: number;
  industryBreakdown: IndustryData[];
  topDeals: Deal[];
  trends: TrendData[];
}
```

## 🎨 PDF Generation Strategy

### Chart Rendering in PDF
Since Recharts doesn't work in @react-pdf/renderer, we use:
1. **SVG Components**: Custom SVG paths for simple charts
2. **Canvas API**: @react-pdf/renderer's Canvas for complex visualizations
3. **View Components**: Calculated widths/heights for bar charts
4. **Fallback**: Server-side image generation if needed

### Slide Components
Each slide is a separate @react-pdf/renderer component:
- **TitleSlide**: Company branding, summary statistics
- **ChartSlide**: Generic reusable component for any chart type
- **SummarySlide**: Key metrics and insights
- **ComparisonSlide**: Year-over-year or period comparisons

## 🚀 Deployment

### Production Checklist
- [ ] Environment variables configured
- [ ] TypeScript compilation passes
- [ ] All imports/exports working
- [ ] PDF generation tested with sample data
- [ ] File upload limits configured
- [ ] Error handling implemented
- [ ] Performance optimized for large datasets

### Performance Considerations
- **File Size Limits**: Currently supports files up to 10MB
- **Processing Time**: Large datasets may take 10-15 seconds to process
- **Memory Usage**: PDF generation is memory-intensive for complex reports
- **Caching**: Consider caching processed data for repeat generations

## 🔍 Development Notes

### Current Architecture Status
- ✅ Folder structure established
- ✅ TypeScript interfaces defined
- ✅ Component skeletons created
- ✅ API route stubs in place
- ⏳ Implementation logic pending
- ⏳ Chart rendering strategy pending
- ⏳ AI integration pending

### Known Issues
- Recharts components need conversion to PDF-compatible format
- Chart image generation strategy needs implementation
- Error handling needs expansion
- Type safety needs refinement throughout

### Testing Strategy
- **Unit Tests**: Data processing functions
- **Integration Tests**: PDF generation pipeline
- **E2E Tests**: File upload → PDF download flow
- **Visual Tests**: PDF output quality and formatting

## 📧 Contact & Support

This project uses a clean architecture separating concerns between:
- **UI Components** (Recharts for web preview)
- **PDF Components** (@react-pdf/renderer for generation)
- **Data Processing** (TypeScript utilities)
- **API Layer** (Next.js routes)

For implementation questions or architectural decisions, refer to the established patterns in the existing codebase and maintain separation of concerns between web UI and PDF generation.