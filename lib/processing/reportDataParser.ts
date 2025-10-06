import path from 'node:path';
import * as XLSX from 'xlsx';
import type { WorkBook } from 'xlsx';
import type { ReportData } from '@/app/data-map/types';

type SectionConfig = {
  scalars: string[];
  dataFields?: string[];
  numericScalars?: string[];
  dataNumericFields?: string[];
  headerAliases?: Record<string, string>;
  dateFields?: string[];
  dataDateFields?: string[];
};

const SECTION_CONFIG: Record<string, SectionConfig> = {
  '0_1': {
    scalars: [
      'Market_Overview_Title',
      'Highlight_1',
      'Highlight_2',
      'Article_Title',
      'Article_Author',
      'Author_Professional_Title',
      'Author_Photo',
      'Article_Content',
    ],
    headerAliases: {
      Author_Professiol_Title: 'Author_Professional_Title',
    },
  },
  '0_2_A': {
    scalars: ['Table_Title', 'Summary_Paragraph', 'Chart_Title', 'Chart_Footnote'],
    dataFields: ['Month', 'Number_of_Transactions'],
    dataNumericFields: ['Number_of_Transactions'],
  },
  '0_2_B': {
    scalars: ['Summary_Paragraph', 'Chart_Title'],
    dataFields: ['Industry', 'Percentage'],
    dataNumericFields: ['Percentage'],
  },
  '0_3_A': {
    scalars: [
      'Section_Title',
      'Total_Volume_YTD_2025',
      'Featured_Issuance_Name',
      'Featured_Issuance_Details',
      'Footnote',
    ],
    dataFields: ['Category', 'Value'],
    dataNumericFields: ['Value'],
    headerAliases: {
      Featured_Issuance_me: 'Featured_Issuance_Name',
    },
  },
  '0_3_B': {
    scalars: [
      'Section_Title',
      'Total_Volume_YTD_2025',
      'Featured_Issuance_Name',
      'Featured_Issuance_Amount',
      'Footnote',
    ],
    dataFields: ['Category', 'Value'],
    headerAliases: {
      Featured_Issuance_me: 'Featured_Issuance_Name',
    },
  },
  '1_0_A': {
    scalars: ['Table_Title'],
    dataFields: ['Year', 'Number_of_Transactions', 'Accumulated_Transaction_Value_USD_MM'],
    dataNumericFields: ['Number_of_Transactions', 'Accumulated_Transaction_Value_USD_MM'],
    headerAliases: {
      Año: 'Year',
      Anio: 'Year',
      'Número de transacciones': 'Number_of_Transactions',
      'Numero de transacciones': 'Number_of_Transactions',
      'No. de transacciones': 'Number_of_Transactions',
      'Valor acumulado (USD MM)': 'Accumulated_Transaction_Value_USD_MM',
      'Valor acumulado (US$ MM)': 'Accumulated_Transaction_Value_USD_MM',
      'Valor acumulado USD (MM)': 'Accumulated_Transaction_Value_USD_MM',
      'Valor acumulado US$ (MM)': 'Accumulated_Transaction_Value_USD_MM',
      'Valor acumulado (mm USD)': 'Accumulated_Transaction_Value_USD_MM',
      'Valor acumulado (MM USD)': 'Accumulated_Transaction_Value_USD_MM',
    },
  },
  '1_0_B': {
    scalars: ['Table_Title'],
    dataFields: ['Industry', 'Percentage'],
    dataNumericFields: ['Percentage'],
    headerAliases: {
      Industria: 'Industry',
      Sector: 'Industry',
      'Porcentaje (%)': 'Percentage',
      'Porcentaje': 'Percentage',
    },
  },
  '1_1': {
    scalars: ['Table_Title', 'Footnote'],
    dataFields: ['Target', 'Industry', 'Buyer', 'Seller', 'Date', 'Amount_USD_MM', 'Percentage_Acquired'],
    dataNumericFields: ['Amount_USD_MM', 'Percentage_Acquired'],
    dataDateFields: ['Date'],
    headerAliases: {
      Objetivo: 'Target',
      'Empresa objetivo': 'Target',
      Industria: 'Industry',
      Sector: 'Industry',
      Comprador: 'Buyer',
      Adquirente: 'Buyer',
      Vendedor: 'Seller',
      'Parte vendedora': 'Seller',
      Fecha: 'Date',
      'Monto (US$ MM)': 'Amount_USD_MM',
      'Monto (USD MM)': 'Amount_USD_MM',
      'Valor (US$ MM)': 'Amount_USD_MM',
      'Valor (USD MM)': 'Amount_USD_MM',
      '% Adquirido': 'Percentage_Acquired',
      'Porcentaje adquirido': 'Percentage_Acquired',
      'Porcentaje adquirido (%)': 'Percentage_Acquired',
      'Nota al pie': 'Footnote',
      Nota: 'Footnote',
    },
  },
  '2_0_A': {
    scalars: ['Section_Title', 'Chart_Title'],
    dataFields: ['Year', 'Fixed_Rate_Percentage', 'Variable_Rate_Percentage', 'Total_Amount_MXN_MM'],
    dataNumericFields: ['Fixed_Rate_Percentage', 'Variable_Rate_Percentage', 'Total_Amount_MXN_MM'],
  },
  '2_0_B': {
    scalars: ['Section_Title', 'Chart_Title'],
    dataFields: ['Year', 'AAA_Percentage', 'AA_Percentage', 'A_Percentage', 'Total_Amount_MXN_MM'],
    dataNumericFields: ['AAA_Percentage', 'AA_Percentage', 'A_Percentage', 'Total_Amount_MXN_MM'],
  },
  '2_0_C': {
    scalars: ['Section_Title', 'Chart_Title'],
    dataFields: ['Term', 'Latest', '_6M_Projection', '_12M_Projection'],
    dataNumericFields: ['Latest', '_6M_Projection', '_12M_Projection'],
    headerAliases: {
      '6M_Projection': '_6M_Projection',
      '12M_Projection': '_12M_Projection',
    },
  },
  '2_0_D': {
    scalars: ['Section_Title', 'Chart_Title'],
    dataFields: ['Term', 'Latest', '_6M_Projection', '_12M_Projection'],
    dataNumericFields: ['Latest', '_6M_Projection', '_12M_Projection'],
    headerAliases: {
      '6M_Projection': '_6M_Projection',
      '12M_Projection': '_12M_Projection',
    },
  },
  '2_1': {
    scalars: ['Section_Title'],
    dataFields: [
      'Issuer',
      'Issue_Date',
      'Maturity_Date',
      'Term_Years',
      'Amount_MXN_MM',
      'Rating_Fitch_SP_Moodys_HR',
      'Rate_Reference',
      'IPT',
      'Spread_bps',
    ],
    dataNumericFields: ['Term_Years', 'Amount_MXN_MM', 'Spread_bps'],
    dataDateFields: ['Issue_Date', 'Maturity_Date'],
  },
  '3_0_A': {
    scalars: ['Section_Title', 'Chart_Title'],
    dataFields: ['Year', 'Number_of_Transactions', 'Accumulated_Value_MXN_MM'],
    dataNumericFields: ['Number_of_Transactions', 'Accumulated_Value_MXN_MM'],
  },
  '3_0_B': {
    scalars: ['Section_Title', 'Chart_Title'],
    dataFields: ['Issuer_Type', 'Percentage'],
    dataNumericFields: ['Percentage'],
  },
  '3_0_C': {
    scalars: ['Section_Title', 'Chart_Title'],
    dataFields: ['Year', 'Number_of_Transactions', 'Accumulated_Value_MXN_MM'],
    dataNumericFields: ['Number_of_Transactions', 'Accumulated_Value_MXN_MM'],
  },
  '3_0_D': {
    scalars: ['Section_Title', 'Chart_Title'],
    dataFields: ['Year', 'Number_of_Transactions', 'Accumulated_Value_MXN_MM'],
    dataNumericFields: ['Number_of_Transactions', 'Accumulated_Value_MXN_MM'],
  },
  '3_1': {
    scalars: ['Section_Title'],
    dataFields: [
      'Instrument_Type',
      'Ticker',
      'Series',
      'Placement_Type',
      'Payment_Date',
      'Shares_Issued_MM',
      'Placement_Price_MXN',
      'Amount_Placed_MXN_MM',
    ],
    dataNumericFields: ['Shares_Issued_MM', 'Placement_Price_MXN', 'Amount_Placed_MXN_MM'],
    dataDateFields: ['Payment_Date'],
  },
  '4_0': {
    scalars: ['Section_Title', 'Legal_Notice_Content'],
  },
};

const REQUIRED_SECTIONS = new Set(Object.keys(SECTION_CONFIG));

const normalizeString = (value: unknown) => {
  if (value === undefined || value === null) return '';
  if (typeof value === 'string') return value.trim();
  return String(value).trim();
};

const toNumber = (value: unknown): number | null => {
  if (value === undefined || value === null) return null;
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : null;
  }
  const raw = normalizeString(value);
  if (!raw) return null;
  const normalized = raw
    .replace(/\u00a0/g, '')
    .replace(/[,]/g, '')
    .replace(/[^0-9+\-.]/g, '');
  if (!normalized) return null;
  const numeric = Number(normalized);
  return Number.isFinite(numeric) ? numeric : null;
};

const toDateString = (value: unknown): string | undefined => {
  if (value === undefined || value === null) return undefined;
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  const raw = normalizeString(value);
  if (!raw) return undefined;
  if (/^\d{4}-\d{2}-\d{2}/.test(raw)) {
    return raw.split(' ')[0];
  }
  if (!Number.isNaN(Number(raw))) {
    const serial = Number(raw);
    const date = new Date(Math.round((serial - 25569) * 86400000));
    if (!Number.isNaN(date.getTime())) {
      return date.toISOString().slice(0, 10);
    }
  }
  const date = new Date(raw);
  if (!Number.isNaN(date.getTime())) {
    return date.toISOString().slice(0, 10);
  }
  return raw;
};

const normalizeHeader = (header: unknown, aliases: Record<string, string> = {}) => {
  const key = normalizeString(header);
  if (!key) return key;
  const canonical = aliases[key] ?? key;
  return canonical;
};

const isEmptyRow = (row: unknown[]) =>
  row.every((cell) => cell === undefined || cell === null || normalizeString(cell) === '');

const extractReportData = (workbook: WorkBook, sourceDescription: string): ReportData => {
  const sheetName = workbook.SheetNames[0];
  if (!sheetName) {
    throw new Error('The provided workbook has no sheets.');
  }
  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json<unknown[]>(sheet, {
    header: 1,
    raw: true,
    blankrows: false,
  });

  const report: Partial<ReportData> = {};
  let currentHeaders: string[] | null = null;
  let currentSectionId: string | null = null;

  for (const row of rows) {
    if (!row || row.length === 0 || isEmptyRow(row)) {
      continue;
    }

    const firstCell = normalizeString(row[0]);
    if (firstCell === 'Section_ID') {
      currentHeaders = row.map((cell) => normalizeString(cell));
      currentSectionId = null;
      continue;
    }

    if (!currentHeaders) {
      throw new Error('Encountered a data row before a header row. Ensure Section_ID headers precede data.');
    }

    if (firstCell) {
      currentSectionId = firstCell;
    }

    if (!currentSectionId) {
      throw new Error('Unable to determine Section_ID for row.');
    }

    const config = SECTION_CONFIG[currentSectionId];
    if (!config) {
      throw new Error(`Unsupported Section_ID "${currentSectionId}" in workbook.`);
    }

    // Prepare section container if this is the first time we see it.
    if (!report[currentSectionId as keyof ReportData]) {
      const base: Record<string, unknown> = {};
      if (config.dataFields) {
        base.Data = [];
      }
      report[currentSectionId as keyof ReportData] = base as any;
    }

    const section = report[currentSectionId as keyof ReportData] as unknown as Record<string, unknown>;

    const rowObject: Record<string, unknown> = {};
    currentHeaders.forEach((header, index) => {
      if (!header) return;
      const canonical = normalizeHeader(header, config.headerAliases);
      if (!canonical || canonical === 'Section_ID') return;
      const value = row[index];
      if (value === undefined || value === null || normalizeString(value) === '') return;
      rowObject[canonical] = value;
    });

    // Assign scalar fields (single-value fields for the section)
    for (const scalarField of config.scalars) {
      if (Object.prototype.hasOwnProperty.call(rowObject, scalarField)) {
        const raw = rowObject[scalarField];
        if (config.numericScalars?.includes(scalarField)) {
          section[scalarField] = toNumber(raw);
        } else if (config.dateFields?.includes(scalarField)) {
          section[scalarField] = toDateString(raw);
        } else {
          section[scalarField] = raw;
        }
      }
    }

    // Handle list data if configured
    if (config.dataFields) {
      const item: Record<string, unknown> = {};
      let hasValue = false;
      for (const field of config.dataFields) {
        let value: unknown;
        if (Object.prototype.hasOwnProperty.call(rowObject, field)) {
          const raw = rowObject[field];
          if (config.dataNumericFields?.includes(field)) {
            value = toNumber(raw);
          } else if (config.dataDateFields?.includes(field)) {
            value = toDateString(raw);
          } else {
            value = raw;
          }
        } else {
          value = null;
        }

        item[field] = value;

        if (
          value !== null &&
          value !== undefined &&
          !(typeof value === 'string' && normalizeString(value) === '')
        ) {
          hasValue = true;
        }
      }

      if (hasValue) {
        const dataArray = section.Data as Record<string, unknown>[];
        dataArray.push(item);
      }
    }
  }

  for (const required of REQUIRED_SECTIONS) {
    if (!report[required as keyof ReportData]) {
      throw new Error(`Missing data for section ${required} in workbook ${sourceDescription}`);
    }
  }

  return report as ReportData;
};

export const parseReportDataFromWorkBook = (workbook: WorkBook, description = 'workbook'): ReportData => {
  return extractReportData(workbook, description);
};

export const parseReportDataFromBuffer = (buffer: ArrayBuffer | Buffer, description = 'buffer'): ReportData => {
  const workbook = XLSX.read(buffer, { type: 'buffer', cellDates: true });
  return extractReportData(workbook, description);
};

export const parseReportDataFromXlsx = (filePath: string): ReportData => {
  const resolvedPath = path.resolve(filePath);
  const workbook = XLSX.readFile(resolvedPath, { cellDates: true });
  return extractReportData(workbook, resolvedPath);
};
