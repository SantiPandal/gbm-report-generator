import { Document } from '@react-pdf/renderer';
import { TitleSlide } from './TitleSlide';
import { ProcessedData } from '@/types';

export const PDFDocument = ({ data }: { data: ProcessedData }) => (
  <Document>
    <TitleSlide title="M&A Report" />
  </Document>
);