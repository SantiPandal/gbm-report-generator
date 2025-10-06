import { NextResponse } from 'next/server';
import { parseReportDataFromBuffer } from '@/lib/processing/reportDataParser';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = (formData.get('xlsxFile') || formData.get('file')) as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No XLSX file provided.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const reportData = parseReportDataFromBuffer(buffer, file.name ?? 'uploaded workbook');

    return NextResponse.json({ reportData });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json({ error: 'Failed to parse XLSX file' }, { status: 500 });
  }
}
