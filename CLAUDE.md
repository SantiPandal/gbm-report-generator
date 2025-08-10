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

### Browser Automation (Playwright MCP)
- Use Playwright MCP for browser automation and screenshots.
- Always resize the window to `{ width: 1470, height: 956 }` for consistent visuals.
- Example resize call:

```ts
// Standard MCP resize
// mcp_playwright_browser_resize({ width: 1470, height: 956 })
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

## 🎨 Design System & Style Guide

### Visual Style: McKinsey/BCG Professional Financial Presentation

The application follows a **professional investment banking/consulting presentation style** with these characteristics:

### Color Palette
```typescript
// Professional financial/consulting color palette
const colors = {
  // Primary blues (main brand colors)
  primaryBlue: '#2c5282',   // Dark blue - headers, primary data
  mediumBlue: '#4a90e2',    // Medium blue - secondary elements
  lightBlue: '#a7c7e7',     // Light blue - tertiary elements
  paleBlue: '#e6f2ff',      // Very light blue - backgrounds
  
  // Grays (text and UI elements)
  darkGray: '#2d3748',      // Main text, headers
  textGray: '#4a5568',      // Body text
  mediumGray: '#718096',    // Secondary text, labels
  lightGray: '#cbd5e0',     // Borders, dividers
  paleGray: '#e2e8f0',      // Light borders
  backgroundGray: '#f7fafc', // Background fills
  
  // Accent colors (use sparingly)
  accentPink: '#d8b2d8',    // Special highlights
  accentTeal: '#4fd1c5',    // Alternative accent
  accentPurple: '#9f7aea',  // Additional accent
  
  // Base
  white: '#ffffff',         // Primary background
  black: '#1a202c',         // Maximum contrast
};
```

### Design Principles

1. **Clean & Minimalist**
   - Lots of white space for breathing room
   - No unnecessary decorative elements
   - Focus on data and insights
   - High contrast for readability

2. **Professional Typography**
   - Headers: Bold, uppercase for major titles
   - Subheaders: Regular weight, proper case
   - Body: Clean sans-serif (Helvetica/Arial)
   - Data labels: Small, uppercase with letter-spacing

3. **Chart Styling**
   - 2D only, no 3D effects or shadows
   - Muted color progression from dark to light
   - Direct labeling on charts when possible
   - Clean gridlines with subtle coloring
   - Professional tooltips with relevant data

4. **Layout Structure**
   - **16:9 aspect ratio** (1280x720px) for all slides
   - Consistent 50px padding on all sides
   - Clear visual hierarchy with size and color
   - Grouped related information
   - Strategic use of dividers and borders

### Slide Components

Each slide follows this structure:
```
┌─────────────────────────────────────┐
│  HEADER (Title + Period)            │
│  ─────────────────────────          │
│                                      │
│  KEY METRICS BAR (if applicable)    │
│                                      │
│  MAIN CONTENT AREA                  │
│  - Charts (left)                    │
│  - Tables/Details (right)           │
│                                      │
│  ─────────────────────────          │
│  FOOTER (Confidential | Page #)     │
└─────────────────────────────────────┘
```

### Chart Types & Usage

1. **Pie Charts** - Distribution and portfolio breakdown
2. **Bar Charts** - Time series and comparisons
3. **Stacked Bar Charts** - Status distributions
4. **Horizontal Bar Charts** - Rankings and top items
5. **Line Charts** - Trends over time
6. **Data Tables** - Detailed supporting information

### Visual Hierarchy

1. **Primary Focus**: Main chart or visualization (60% of space)
2. **Secondary**: Supporting data table or metrics (30% of space)
3. **Tertiary**: Labels, legends, footnotes (10% of space)

### Professional Touches

- **Confidentiality notices** on every slide
- **Page numbers** with visual separator
- **Source citations** when using external data
- **Italicized quotes** for emphasis
- **Color-coded status indicators** (green/yellow/red)
- **Uppercase labels** for sections with letter-spacing

### Responsive Scaling

- Default view at **75%** for standard screens
- **50%** for overview/thumbnail view
- **100%** for detailed examination
- Maintains aspect ratio at all zoom levels

## 📧 Contact & Support

This project uses a clean architecture separating concerns between:
- **UI Components** (Recharts for web preview)
- **PDF Components** (@react-pdf/renderer for generation)
- **Data Processing** (TypeScript utilities)
- **API Layer** (Next.js routes)

For implementation questions or architectural decisions, refer to the established patterns in the existing codebase and maintain separation of concerns between web UI and PDF generation.