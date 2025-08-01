import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';
import { NextResponse } from 'next/server';
import Papa from 'papaparse';

// PowerPoint-style 16:9 dimensions (792x612 points)
const SLIDE_WIDTH = 792;
const SLIDE_HEIGHT = 612;

const styles = StyleSheet.create({
  // Slide layouts
  slide: {
    padding: 60,
    backgroundColor: '#FFFFFF',
    width: SLIDE_WIDTH,
    height: SLIDE_HEIGHT,
  },
  slideHeader: {
    marginBottom: 40,
  },
  slideFooter: {
    position: 'absolute',
    bottom: 20,
    left: 60,
    right: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  // Typography
  slideTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 16,
    textAlign: 'center',
  },
  slideSubtitle: {
    fontSize: 20,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 30,
  },
  bodyText: {
    fontSize: 18,
    color: '#333333',
    lineHeight: 1.4,
    marginBottom: 12,
  },
  
  // Cards and containers
  card: {
    backgroundColor: '#f8f9fa',
    padding: 24,
    borderRadius: 8,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  statBox: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 8,
    width: '22%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  
  // Table styling
  table: {
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tableColHeader: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
  },
  tableCol: {
    flex: 1,
    fontSize: 12,
    color: '#4b5563',
  },
  
  // Slide number
  slideNumber: {
    fontSize: 12,
    color: '#9ca3af',
  },
  
  // Brand
  brandText: {
    fontSize: 12,
    color: '#9ca3af',
  },
});

function processCSVData(csvData) {
  const deals = csvData.slice(0, 15); // Take more deals for analysis
  
  const totalValue = deals
    .filter(deal => deal['Announced Total Value (mil.)'])
    .reduce((acc, deal) => acc + parseFloat(deal['Announced Total Value (mil.)'] || 0), 0);
  
  const completedDeals = deals.filter(deal => deal['Deal Status'] === 'Completed').length;
  const pendingDeals = deals.filter(deal => deal['Deal Status'] === 'Pending').length;
  const terminatedDeals = deals.filter(deal => deal['Deal Status'] === 'Terminated').length;
  
  // Get top deals by value
  const topDeals = deals
    .filter(deal => deal['Announced Total Value (mil.)'])
    .sort((a, b) => parseFloat(b['Announced Total Value (mil.)']) - parseFloat(a['Announced Total Value (mil.)']))
    .slice(0, 5);
    
  // Industry breakdown
  const industries = {};
  deals.forEach(deal => {
    const industry = deal['Target Industry Sector'] || 'Other';
    industries[industry] = (industries[industry] || 0) + 1;
  });
  
  return {
    totalDeals: deals.length,
    totalValue: totalValue.toLocaleString(),
    completedDeals,
    pendingDeals,
    terminatedDeals,
    successRate: ((completedDeals / deals.length) * 100).toFixed(1),
    topDeals,
    industries: Object.entries(industries).slice(0, 4),
    deals: deals.slice(0, 8) // Show more deals in table
  };
}

// Individual Slide Components
const TitleSlide = ({ data }) => (
  <View style={styles.slide}>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={styles.slideTitle}>M&A Market Report</Text>
      <Text style={styles.slideSubtitle}>Mexico Market Analysis 2024</Text>
      <View style={styles.card}>
        <Text style={[styles.bodyText, { textAlign: 'center', marginBottom: 8 }]}>
          {data.totalDeals} transactions analyzed
        </Text>
        <Text style={[styles.bodyText, { textAlign: 'center', fontSize: 16, color: '#666' }]}>
          Total value: ${data.totalValue}M USD
        </Text>
      </View>
    </View>
    <View style={styles.slideFooter}>
      <Text style={styles.brandText}>M&A Intelligence Report</Text>
      <Text style={styles.slideNumber}>1</Text>
    </View>
  </View>
);

const ExecutiveSummarySlide = ({ data }) => (
  <View style={styles.slide}>
    <View style={styles.slideHeader}>
      <Text style={styles.sectionTitle}>Executive Summary</Text>
    </View>
    
    <View style={styles.statsContainer}>
      <View style={styles.statBox}>
        <Text style={styles.statNumber}>{data.totalDeals}</Text>
        <Text style={styles.statLabel}>Total Deals</Text>
      </View>
      <View style={styles.statBox}>
        <Text style={styles.statNumber}>${data.totalValue}M</Text>
        <Text style={styles.statLabel}>Total Value</Text>
      </View>
      <View style={styles.statBox}>
        <Text style={styles.statNumber}>{data.successRate}%</Text>
        <Text style={styles.statLabel}>Success Rate</Text>
      </View>
      <View style={styles.statBox}>
        <Text style={styles.statNumber}>{data.completedDeals}</Text>
        <Text style={styles.statLabel}>Completed</Text>
      </View>
    </View>

    <View style={[styles.card, { marginTop: 40 }]}>
      <Text style={[styles.bodyText, { fontWeight: 'bold', marginBottom: 20 }]}>
        Key Market Insights
      </Text>
      <Text style={styles.bodyText}>
        • {data.completedDeals} deals successfully completed out of {data.totalDeals} announced
      </Text>
      <Text style={styles.bodyText}>
        • {data.pendingDeals} transactions currently pending closure
      </Text>
      <Text style={styles.bodyText}>
        • {data.terminatedDeals} deals terminated during the period
      </Text>
      <Text style={styles.bodyText}>
        • Average deal size: ${(parseFloat(data.totalValue.replace(/,/g, '')) / data.totalDeals).toFixed(1)}M
      </Text>
    </View>

    <View style={styles.slideFooter}>
      <Text style={styles.brandText}>M&A Intelligence Report</Text>
      <Text style={styles.slideNumber}>2</Text>
    </View>
  </View>
);

const TopDealsSlide = ({ data }) => (
  <View style={styles.slide}>
    <View style={styles.slideHeader}>
      <Text style={styles.sectionTitle}>Top Transactions by Value</Text>
    </View>
    
    <View style={styles.table}>
      <View style={styles.tableHeader}>
        <Text style={[styles.tableColHeader, { flex: 2 }]}>Target Company</Text>
        <Text style={[styles.tableColHeader, { flex: 2 }]}>Acquirer</Text>
        <Text style={styles.tableColHeader}>Value ($M)</Text>
        <Text style={styles.tableColHeader}>Status</Text>
        <Text style={[styles.tableColHeader, { flex: 1.5 }]}>Sector</Text>
      </View>
      {data.topDeals.map((deal, index) => (
        <View style={styles.tableRow} key={index}>
          <Text style={[styles.tableCol, { flex: 2 }]}>
            {deal['Target Name']?.substring(0, 35) || 'N/A'}
          </Text>
          <Text style={[styles.tableCol, { flex: 2 }]}>
            {deal['Acquirer Name']?.substring(0, 35) || 'N/A'}
          </Text>
          <Text style={styles.tableCol}>
            ${deal['Announced Total Value (mil.)'] || 'N/A'}
          </Text>
          <Text style={styles.tableCol}>
            {deal['Deal Status'] || 'N/A'}
          </Text>
          <Text style={[styles.tableCol, { flex: 1.5 }]}>
            {deal['Target Industry Sector']?.substring(0, 20) || 'N/A'}
          </Text>
        </View>
      ))}
    </View>

    <View style={styles.slideFooter}>
      <Text style={styles.brandText}>M&A Intelligence Report</Text>
      <Text style={styles.slideNumber}>3</Text>
    </View>
  </View>
);

const IndustryBreakdownSlide = ({ data }) => (
  <View style={styles.slide}>
    <View style={styles.slideHeader}>
      <Text style={styles.sectionTitle}>Industry Breakdown</Text>
    </View>
    
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      {data.industries.map(([industry, count], index) => (
        <View key={index} style={[styles.statBox, { width: '48%', marginBottom: 20 }]}>
          <Text style={styles.statNumber}>{count}</Text>
          <Text style={styles.statLabel}>{industry}</Text>
        </View>
      ))}
    </View>

    <View style={[styles.card, { marginTop: 30 }]}>
      <Text style={[styles.bodyText, { fontWeight: 'bold', marginBottom: 20 }]}>
        Sector Analysis
      </Text>
      <Text style={styles.bodyText}>
        • Most active sector: {data.industries[0]?.[0]} ({data.industries[0]?.[1]} deals)
      </Text>
      <Text style={styles.bodyText}>
        • Diversified deal flow across {data.industries.length}+ sectors
      </Text>
      <Text style={styles.bodyText}>
        • Strong activity in traditional industries and emerging sectors
      </Text>
    </View>

    <View style={styles.slideFooter}>
      <Text style={styles.brandText}>M&A Intelligence Report</Text>
      <Text style={styles.slideNumber}>4</Text>
    </View>
  </View>
);

// Main Presentation Document
const MAPresentation = ({ data }) => (
  <Document>
    {/* Slide 1: Title */}
    <Page size={[SLIDE_WIDTH, SLIDE_HEIGHT]} orientation="landscape">
      <TitleSlide data={data} />
    </Page>
    
    {/* Slide 2: Executive Summary */}
    <Page size={[SLIDE_WIDTH, SLIDE_HEIGHT]} orientation="landscape">
      <ExecutiveSummarySlide data={data} />
    </Page>
    
    {/* Slide 3: Top Deals */}
    <Page size={[SLIDE_WIDTH, SLIDE_HEIGHT]} orientation="landscape">
      <TopDealsSlide data={data} />
    </Page>
    
    {/* Slide 4: Industry Breakdown */}
    <Page size={[SLIDE_WIDTH, SLIDE_HEIGHT]} orientation="landscape">
      <IndustryBreakdownSlide data={data} />
    </Page>
  </Document>
);

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('csvFile');
    
    if (!file) {
      return NextResponse.json({ error: 'No CSV file provided' }, { status: 400 });
    }
    
    const csvText = await file.text();
    const parseResult = Papa.parse(csvText, { header: true, skipEmptyLines: true });
    
    if (parseResult.errors.length > 0) {
      return NextResponse.json({ error: 'CSV parsing failed', details: parseResult.errors }, { status: 400 });
    }
    
    const processedData = processCSVData(parseResult.data);
    const pdfBuffer = await pdf(<MAPresentation data={processedData} />).toBuffer();
    
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="ma-presentation.pdf"',
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}