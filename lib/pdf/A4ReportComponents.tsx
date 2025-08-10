import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { colors, typography, layout, borders } from '@/lib/design/tokens';

// A4 dimensions in points (595.28 x 841.89)
const A4_WIDTH = 595.28;
const A4_HEIGHT = 841.89;

export const styles = StyleSheet.create({
  // A4 Page Layout
  page: {
    padding: layout.a4PagePadding,
    backgroundColor: colors.white,
    fontFamily: 'Helvetica',
    display: 'flex',
    flexDirection: 'column',
    width: A4_WIDTH,
    height: A4_HEIGHT,
  },
  
  // Header and Footer
  pageHeader: {
    borderBottom: borders.headerBorder,
    paddingBottom: layout.headerPaddingBottom,
    marginBottom: layout.headerMarginBottom,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  pageFooter: {
    borderTop: borders.footerBorder,
    paddingTop: 15,
    marginTop: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  // Typography Styles - Professional McKinsey/BCG
  reportTitle: {
    fontSize: typography.slideTitle.fontSize,
    fontWeight: typography.slideTitle.fontWeight,
    color: colors.primaryBlue,
    letterSpacing: typography.slideTitle.letterSpacing,
    textTransform: typography.slideTitle.textTransform,
    textAlign: 'center',
    marginBottom: 15,
  },
  
  reportSubtitle: {
    fontSize: typography.slideSubtitle.fontSize,
    fontWeight: typography.slideSubtitle.fontWeight,
    color: colors.textGray,
    textAlign: 'center',
    marginBottom: 8,
  },
  
  sectionTitle: {
    fontSize: typography.title.fontSize,
    fontWeight: typography.title.fontWeight,
    color: colors.darkGray,
    letterSpacing: typography.title.letterSpacing,
    marginBottom: typography.title.marginBottom,
  },
  
  bodyText: {
    fontSize: typography.text.fontSize,
    color: colors.textGray,
    lineHeight: typography.text.lineHeight,
    marginBottom: 8,
  },
  
  // Stats and Data Display
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.backgroundGray,
    borderRadius: layout.statsBorderRadius,
    padding: layout.statsContainerPadding,
    marginVertical: 25,
    borderTop: borders.statsBorder,
  },
  
  statBox: {
    alignItems: 'center',
  },
  
  statValue: {
    fontSize: typography.statValue.fontSize,
    fontWeight: typography.statValue.fontWeight,
    color: colors.primaryBlue,
    marginBottom: 6,
  },
  
  statLabel: {
    fontSize: typography.statLabel.fontSize,
    fontWeight: typography.statLabel.fontWeight,
    color: colors.mediumGray,
    textTransform: typography.statLabel.textTransform,
    letterSpacing: typography.statLabel.letterSpacing,
  },
  
  // Table Styles
  table: {
    marginVertical: 20,
  },
  
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundGray,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: `${layout.statsBorderRadius}px ${layout.statsBorderRadius}px 0 0`,
  },
  
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.paleGray,
  },
  
  tableColHeader: {
    flex: 1,
    fontSize: typography.dataLabel.fontSize,
    fontWeight: typography.dataLabel.fontWeight,
    color: colors.darkGray,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  
  tableCol: {
    flex: 1,
    fontSize: typography.text.fontSize,
    color: colors.textGray,
  },
  
  // Content Cards
  contentCard: {
    backgroundColor: colors.backgroundGray,
    padding: 20,
    borderRadius: layout.statsBorderRadius,
    marginVertical: 15,
    borderLeft: `4px solid ${colors.mediumBlue}`,
  },
  
  cardTitle: {
    fontSize: typography.subtitle.fontSize,
    fontWeight: typography.subtitle.fontWeight,
    color: colors.darkGray,
    marginBottom: typography.subtitle.marginBottom,
  },
  
  bulletPoint: {
    fontSize: typography.text.fontSize,
    color: colors.textGray,
    lineHeight: typography.text.lineHeight,
    marginBottom: 6,
  },
  
  // Footer Elements
  confidentialText: {
    fontSize: typography.confidential.fontSize,
    color: colors.mediumGray,
    fontStyle: typography.confidential.fontStyle,
    letterSpacing: typography.confidential.letterSpacing,
  },
  
  pageNumber: {
    fontSize: typography.date.fontSize,
    color: colors.mediumGray,
    letterSpacing: typography.date.letterSpacing,
  },
  
  // Brand Elements
  brandTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: colors.primaryBlue,
  },
  
  brandDate: {
    fontSize: typography.date.fontSize,
    color: colors.mediumGray,
    letterSpacing: typography.date.letterSpacing,
  },
});

interface ReportData {
  totalDeals: number;
  totalValue: string;
  completedDeals: number;
  pendingDeals: number;
  terminatedDeals: number;
  successRate: string;
  avgDealSize: string;
  topDeals: Record<string, any>[];
  industries: [string, number][];
  period: string;
}

// A4 Report Components
export const TitlePage = ({ data }: { data: ReportData }) => (
  <View style={styles.page}>
    {/* Header */}
    <View style={styles.pageHeader}>
      <Text style={styles.brandTitle}>GBM Investment Banking</Text>
      <Text style={styles.brandDate}>{data.period}</Text>
    </View>
    
    {/* Main Content */}
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text style={styles.reportTitle}>Reporte de Fusiones y Adquisiciones</Text>
      <Text style={styles.reportSubtitle}>Análisis del Mercado Mexicano</Text>
      
      {/* Key Statistics */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{data.totalDeals}</Text>
          <Text style={styles.statLabel}>TRANSACCIONES</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>${data.totalValue}M</Text>
          <Text style={styles.statLabel}>VALOR TOTAL</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{data.successRate}%</Text>
          <Text style={styles.statLabel}>COMPLETADAS</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>${data.avgDealSize}M</Text>
          <Text style={styles.statLabel}>PROMEDIO</Text>
        </View>
      </View>
    </View>
    
    {/* Footer */}
    <View style={styles.pageFooter}>
      <Text style={styles.confidentialText}>Confidencial y Propietario • GBM Investment Banking</Text>
      <Text style={styles.pageNumber}>1</Text>
    </View>
  </View>
);

export const ExecutiveSummaryPage = ({ data }: { data: ReportData }) => (
  <View style={styles.page}>
    {/* Header */}
    <View style={styles.pageHeader}>
      <Text style={styles.brandTitle}>Resumen Ejecutivo</Text>
      <Text style={styles.brandDate}>{data.period}</Text>
    </View>
    
    {/* Content */}
    <Text style={styles.sectionTitle}>Resumen del Mercado M&A</Text>
    
    <View style={styles.contentCard}>
      <Text style={styles.cardTitle}>Indicadores Principales</Text>
      <Text style={styles.bulletPoint}>• {data.completedDeals} transacciones completadas de {data.totalDeals} anunciadas</Text>
      <Text style={styles.bulletPoint}>• {data.pendingDeals} operaciones pendientes de cierre</Text>
      <Text style={styles.bulletPoint}>• {data.terminatedDeals} transacciones terminadas durante el período</Text>
      <Text style={styles.bulletPoint}>• Tamaño promedio de transacción: ${data.avgDealSize}M USD</Text>
    </View>
    
    <View style={styles.contentCard}>
      <Text style={styles.cardTitle}>Análisis Sectorial</Text>
      <Text style={styles.bodyText}>
        El mercado mexicano de fusiones y adquisiciones muestra una diversificación significativa 
        across {data.industries.length}+ sectores principales, con {data.industries[0]?.[0]} liderando 
        la actividad con {data.industries[0]?.[1]} transacciones.
      </Text>
    </View>
    
    {/* Footer */}
    <View style={styles.pageFooter}>
      <Text style={styles.confidentialText}>Confidencial y Propietario • GBM Investment Banking</Text>
      <Text style={styles.pageNumber}>2</Text>
    </View>
  </View>
);

export const TopDealsPage = ({ data }: { data: ReportData }) => (
  <View style={styles.page}>
    {/* Header */}
    <View style={styles.pageHeader}>
      <Text style={styles.brandTitle}>Principales Transacciones</Text>
      <Text style={styles.brandDate}>{data.period}</Text>
    </View>
    
    <Text style={styles.sectionTitle}>Transacciones por Valor</Text>
    
    <View style={styles.table}>
      <View style={styles.tableHeader}>
        <Text style={[styles.tableColHeader, { flex: 2 }]}>Empresa Objetivo</Text>
        <Text style={[styles.tableColHeader, { flex: 2 }]}>Adquirente</Text>
        <Text style={styles.tableColHeader}>Valor ($M)</Text>
        <Text style={styles.tableColHeader}>Estado</Text>
        <Text style={[styles.tableColHeader, { flex: 1.5 }]}>Sector</Text>
      </View>
      {data.topDeals.map((deal: Record<string, any>, index: number) => (
        <View style={styles.tableRow} key={index}>
          <Text style={[styles.tableCol, { flex: 2 }]}>
            {deal['Target Name']?.substring(0, 30) || 'N/A'}
          </Text>
          <Text style={[styles.tableCol, { flex: 2 }]}>
            {deal['Acquirer Name']?.substring(0, 30) || 'N/A'}
          </Text>
          <Text style={styles.tableCol}>
            ${deal['Announced Total Value (mil.)'] || 'N/A'}
          </Text>
          <Text style={styles.tableCol}>
            {deal['Deal Status'] || 'N/A'}
          </Text>
          <Text style={[styles.tableCol, { flex: 1.5 }]}>
            {deal['Target Industry Sector']?.substring(0, 15) || 'N/A'}
          </Text>
        </View>
      ))}
    </View>
    
    {/* Footer */}
    <View style={styles.pageFooter}>
      <Text style={styles.confidentialText}>Confidencial y Propietario • GBM Investment Banking</Text>
      <Text style={styles.pageNumber}>3</Text>
    </View>
  </View>
);

export const IndustryAnalysisPage = ({ data }: { data: ReportData }) => (
  <View style={styles.page}>
    {/* Header */}
    <View style={styles.pageHeader}>
      <Text style={styles.brandTitle}>Análisis por Industria</Text>
      <Text style={styles.brandDate}>{data.period}</Text>
    </View>
    
    <Text style={styles.sectionTitle}>Distribución Sectorial</Text>
    
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      {data.industries.map(([industry, count]: [string, number], index: number) => (
        <View key={index} style={[styles.statBox, { width: '30%', marginBottom: 20, padding: 15, backgroundColor: colors.backgroundGray, borderRadius: layout.statsBorderRadius }]}>
          <Text style={[styles.statValue, { fontSize: 24 }]}>{count}</Text>
          <Text style={[styles.statLabel, { fontSize: 9, textAlign: 'center' }]}>{industry}</Text>
        </View>
      ))}
    </View>
    
    <View style={styles.contentCard}>
      <Text style={styles.cardTitle}>Perspectivas Sectoriales</Text>
      <Text style={styles.bulletPoint}>• Sector más activo: {data.industries[0]?.[0]} con {data.industries[0]?.[1]} transacciones</Text>
      <Text style={styles.bulletPoint}>• Diversificación robusta across {data.industries.length} sectores principales</Text>
      <Text style={styles.bulletPoint}>• Actividad equilibrada entre sectores tradicionales y emergentes</Text>
      <Text style={styles.bulletPoint}>• Concentración del {((data.industries[0]?.[1] / data.totalDeals) * 100).toFixed(1)}% en el sector líder</Text>
    </View>
    
    {/* Footer */}
    <View style={styles.pageFooter}>
      <Text style={styles.confidentialText}>Confidencial y Propietario • GBM Investment Banking</Text>
      <Text style={styles.pageNumber}>4</Text>
    </View>
  </View>
);

// Main A4 Report Document
export const A4Report = ({ data }: { data: ReportData }) => (
  <Document>
    <Page size="A4" orientation="portrait">
      <TitlePage data={data} />
    </Page>
    <Page size="A4" orientation="portrait">
      <ExecutiveSummaryPage data={data} />
    </Page>
    <Page size="A4" orientation="portrait">
      <TopDealsPage data={data} />
    </Page>
    <Page size="A4" orientation="portrait">
      <IndustryAnalysisPage data={data} />
    </Page>
  </Document>
);