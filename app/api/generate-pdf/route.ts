import React from 'react';
import { pdf } from '@react-pdf/renderer';
import { NextResponse } from 'next/server';
import Papa from 'papaparse';
import { A4Report } from '@/lib/pdf/A4ReportComponents';

interface ProcessedReportData {
  totalDeals: number;
  totalValue: string;
  completedDeals: number;
  pendingDeals: number;
  terminatedDeals: number;
  successRate: string;
  avgDealSize: string;
  topDeals: Record<string, string | number>[];
  industries: [string, number][];
  period: string;
}

function processCSVData(csvData: Record<string, string>[]): ProcessedReportData {
  const deals = csvData.slice(0, 20); // Process more deals for A4 report
  
  const totalValue = deals
    .filter(deal => deal['Announced Total Value (mil.)'])
    .reduce((acc, deal) => acc + parseFloat(deal['Announced Total Value (mil.)'] || '0'), 0);
  
  const completedDeals = deals.filter(deal => deal['Deal Status'] === 'Completed').length;
  const pendingDeals = deals.filter(deal => deal['Deal Status'] === 'Pending').length;
  const terminatedDeals = deals.filter(deal => deal['Deal Status'] === 'Terminated').length;
  
  // Get top deals by value
  const topDeals = deals
    .filter(deal => deal['Announced Total Value (mil.)'])
    .sort((a, b) => parseFloat(b['Announced Total Value (mil.)']) - parseFloat(a['Announced Total Value (mil.)']))
    .slice(0, 8); // More deals for A4 format
    
  // Industry breakdown
  const industries: { [key: string]: number } = {};
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
    avgDealSize: (totalValue / deals.length).toFixed(1),
    topDeals,
    industries: Object.entries(industries).slice(0, 6), // More industries for A4
    period: new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long' }),
  };
}


export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('csvFile') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No CSV file provided' }, { status: 400 });
    }
    
    const csvText = await file.text();
    const parseResult = Papa.parse(csvText, { header: true, skipEmptyLines: true });
    
    if (parseResult.errors.length > 0) {
      return NextResponse.json({ error: 'CSV parsing failed', details: parseResult.errors }, { status: 400 });
    }
    
    const processedData = processCSVData(parseResult.data as Record<string, string>[]);
    
    // Generate PDF using the A4Report component
    // @ts-expect-error - A4Report is a valid Document component but TypeScript doesn't recognize it
    const pdfBuffer = await pdf(React.createElement(A4Report, { data: processedData })).toBuffer();
    
    return new Response(pdfBuffer as unknown as BodyInit, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="ma-report-a4.pdf"',
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}