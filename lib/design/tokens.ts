// Shared design tokens for both Web (Tailwind/DOM) and PDF (react-pdf)
// Professional McKinsey/BCG style design system

export const colors = {
  // Primary blues (main brand colors)
  primaryBlue: '#2c5282',
  mediumBlue: '#4a90e2',
  lightBlue: '#a7c7e7',
  paleBlue: '#e6f2ff',

  // Grays (text and UI elements)
  darkGray: '#2d3748',
  textGray: '#4a5568',
  mediumGray: '#718096',
  lightGray: '#cbd5e0',
  paleGray: '#e2e8f0',
  backgroundGray: '#f7fafc',

  // Accent colors (use sparingly)
  accentPink: '#d8b2d8',
  accentTeal: '#4fd1c5',
  accentPurple: '#9f7aea',

  // Base
  white: '#ffffff',
  black: '#1a202c',
} as const;

// Professional typography scale (McKinsey/BCG style)
export const typography = {
  // Main titles
  title: {
    fontSize: 28,
    fontWeight: 700,
    letterSpacing: -0.3,
    marginBottom: 25,
  },
  
  // Slide/section titles
  slideTitle: {
    fontSize: 38,
    fontWeight: 700,
    letterSpacing: -0.3,
    textTransform: 'uppercase' as const,
  },
  
  // Subtitles
  subtitle: {
    fontSize: 16,
    fontWeight: 400,
    marginBottom: 15,
  },
  
  slideSubtitle: {
    fontSize: 22,
    fontWeight: 400,
  },
  
  // Body text
  text: {
    fontSize: 11,
    lineHeight: 1.7,
  },
  
  // Data labels and values
  dataLabel: {
    fontSize: 10,
    fontWeight: 500,
  },
  
  dataValue: {
    fontSize: 11,
    fontWeight: 700,
  },
  
  // Stats and metrics
  statValue: {
    fontSize: 32,
    fontWeight: 700,
  },
  
  statLabel: {
    fontSize: 11,
    fontWeight: 400,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.8,
  },
  
  // Chart elements
  chartTitle: {
    fontSize: 14,
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
    marginBottom: 15,
  },
  
  chartSource: {
    fontSize: 9,
    fontStyle: 'italic' as const,
    marginTop: 10,
  },
  
  // Small text
  confidential: {
    fontSize: 9,
    fontStyle: 'italic' as const,
    letterSpacing: 0.3,
  },
  
  date: {
    fontSize: 11,
    letterSpacing: 0.3,
  },
} as const;

// Layout and spacing
export const layout = {
  // A4 specific
  a4PagePadding: 50,
  a4SectionSpacing: 25,
  
  // Legacy section dimensions
  sectionHeightPx: 280,
  sectionPaddingPx: 16,
  
  // Professional spacing patterns
  headerPaddingBottom: 20,
  headerMarginBottom: 50,
  statsContainerPadding: 35,
  chartContainerPadding: 20,
  chartMarginVertical: 15,
  
  // Border and divider patterns
  dividerMarginVertical: 20,
  statsBorderRadius: 4,
  
  // Content areas
  titleContentPaddingHorizontal: 80,
  
  // Logo dimensions
  logoWidth: 120,
  logoHeight: 40,
} as const;

// Border and styling patterns
export const borders = {
  headerBorder: `2px solid ${colors.primaryBlue}`,
  statsBorder: `3px solid ${colors.mediumBlue}`,
  footerBorder: `1px solid ${colors.paleGray}`,
  dividerBorder: `1px solid ${colors.paleGray}`,
} as const;


