import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';
import { NextResponse } from 'next/server';
import Papa from 'papaparse';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableCol: {
    width: '20%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 8,
  },
});

function processCSVData(csvData) {
  const deals = csvData.slice(0, 10); // Take first 10 deals
  
  const totalValue = deals
    .filter(deal => deal['Announced Total Value (mil.)'])
    .reduce((acc, deal) => acc + parseFloat(deal['Announced Total Value (mil.)'] || 0), 0);
  
  const completedDeals = deals.filter(deal => deal['Deal Status'] === 'Completed').length;
  
  return {
    totalDeals: deals.length,
    totalValue: `$${totalValue.toLocaleString()}M`,
    completedDeals,
    deals: deals.slice(0, 5) // Show top 5 in table
  };
}

const MAReport = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>M&A Market Report - Mexico 2024</Text>
      
      <View style={styles.section}>
        <Text style={styles.title}>Market Summary</Text>
        <Text style={styles.text}>Total Deals Analyzed: {data.totalDeals}</Text>
        <Text style={styles.text}>Total Transaction Value: {data.totalValue}</Text>
        <Text style={styles.text}>Completed Deals: {data.completedDeals}</Text>
        <Text style={styles.text}>Success Rate: {((data.completedDeals / data.totalDeals) * 100).toFixed(1)}%</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Top Transactions</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}><Text style={styles.tableCell}>Target</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>Acquirer</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>Value (M)</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>Status</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>Sector</Text></View>
          </View>
          {data.deals.map((deal, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{deal['Target Name']?.substring(0, 25) || 'N/A'}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{deal['Acquirer Name']?.substring(0, 25) || 'N/A'}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>${deal['Announced Total Value (mil.)'] || 'N/A'}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{deal['Deal Status'] || 'N/A'}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{deal['Target Industry Sector']?.substring(0, 15) || 'N/A'}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
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
    const pdfBuffer = await pdf(<MAReport data={processedData} />).toBuffer();
    
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="ma-report.pdf"',
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}