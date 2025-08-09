import { StyleSheet, Font } from '@react-pdf/renderer';

// Register custom fonts for professional appearance
Font.register({
  family: 'Helvetica-Bold',
  fonts: [
    { src: '/fonts/Helvetica-Bold.ttf', fontWeight: 700 },
  ]
});

// Professional financial/consulting color palette
export const colors = {
  // Primary blues
  primaryBlue: '#2c5282',
  mediumBlue: '#4a90e2', 
  lightBlue: '#a7c7e7',
  paleBlue: '#e6f2ff',
  
  // Grays
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
};

export const styles = StyleSheet.create({
  // Page styles - clean with lots of white space
  page: {
    padding: 50,
    backgroundColor: colors.white,
    fontFamily: 'Helvetica',
    display: 'flex',
    flexDirection: 'column',
  },
  
  // Title Slide specific styles
  titleSlideContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  
  titleSlideHeader: {
    borderBottom: `2px solid ${colors.primaryBlue}`,
    paddingBottom: 20,
    marginBottom: 50,
  },
  
  titleSlideLogoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  
  titleSlideLogo: {
    width: 120,
    height: 40,
  },
  
  titleSlideDate: {
    fontSize: 11,
    color: colors.mediumGray,
    textAlign: 'right',
    letterSpacing: 0.3,
  },
  
  titleSlideMainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 80,
  },
  
  titleSlideTitle: {
    fontSize: 38,
    fontWeight: 700,
    color: colors.primaryBlue,
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: -0.3,
    textTransform: 'uppercase',
  },
  
  titleSlideSubtitle: {
    fontSize: 22,
    color: colors.textGray,
    marginBottom: 8,
    textAlign: 'center',
    fontWeight: 400,
  },
  
  titleSlidePeriod: {
    fontSize: 16,
    color: colors.mediumGray,
    textAlign: 'center',
    marginBottom: 50,
    fontStyle: 'italic',
  },
  
  titleSlideStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.backgroundGray,
    borderRadius: 4,
    padding: 35,
    marginTop: 50,
    borderTop: `3px solid ${colors.mediumBlue}`,
  },
  
  titleSlideStat: {
    alignItems: 'center',
  },
  
  titleSlideStatValue: {
    fontSize: 32,
    fontWeight: 700,
    color: colors.primaryBlue,
    marginBottom: 6,
  },
  
  titleSlideStatLabel: {
    fontSize: 11,
    color: colors.mediumGray,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    fontWeight: 400,
  },
  
  titleSlideFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    borderTop: `1px solid ${colors.paleGray}`,
  },
  
  titleSlideConfidential: {
    fontSize: 9,
    color: colors.mediumGray,
    fontStyle: 'italic',
    letterSpacing: 0.3,
  },
  
  titleSlidePageNumber: {
    fontSize: 10,
    color: colors.mediumGray,
  },
  
  // Generic reusable styles - McKinsey/BCG style
  title: {
    fontSize: 28,
    marginBottom: 25,
    fontWeight: 700,
    color: colors.darkGray,
    letterSpacing: -0.3,
  },
  
  subtitle: {
    fontSize: 16,
    marginBottom: 15,
    color: colors.textGray,
    fontWeight: 400,
  },
  
  text: {
    fontSize: 11,
    color: colors.textGray,
    lineHeight: 1.7,
  },
  
  emphasis: {
    fontWeight: 700,
    color: colors.primaryBlue,
  },
  
  divider: {
    borderBottom: `1px solid ${colors.paleGray}`,
    marginVertical: 20,
  },
  
  // Chart-specific styles
  chartContainer: {
    backgroundColor: colors.white,
    padding: 20,
    marginVertical: 15,
  },
  
  chartTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: colors.darkGray,
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  
  chartSource: {
    fontSize: 9,
    color: colors.mediumGray,
    marginTop: 10,
    fontStyle: 'italic',
  },
  
  // Data labels
  dataLabel: {
    fontSize: 10,
    color: colors.textGray,
    fontWeight: 500,
  },
  
  dataValue: {
    fontSize: 11,
    color: colors.darkGray,
    fontWeight: 700,
  },
});