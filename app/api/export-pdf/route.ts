import { NextRequest, NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import React from 'react';
import { A4Report } from '@/lib/pdf/A4ReportComponents';
import type { ReportData } from '@/app/data-map/types';

export async function POST(request: NextRequest) {
  try {
    const { reportData } = await request.json() as { reportData: ReportData };

    if (!reportData) {
      return NextResponse.json(
        { error: 'No report data provided' },
        { status: 400 }
      );
    }

    // TODO: Transform report data to match PDF component expectations
    // This endpoint needs to be updated to work with the new ReportData structure
    const pdfData = {
      totalDeals: 0,
      totalValue: '0',
      completedDeals: 0,
      pendingDeals: 0,
      terminatedDeals: 0,
      successRate: '0',
      avgDealSize: '0',
      topDeals: [],
      industries: [] as [string, number][],
      period: '2024',
    };

    // Generate PDF buffer
    const pdfBuffer = await renderToBuffer(React.createElement(A4Report, { data: pdfData }) as any);

    // Return PDF as response
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="GBM_MA_Report.pdf"',
      },
    });
  } catch (error) {
    console.error('PDF export error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}