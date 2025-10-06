'use client';

import { useEffect, useState, type DetailedHTMLProps, type HTMLAttributes, type ReactElement } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Removed custom page element declaration - using div with page-container class instead
import Page0 from '../components/report-sections/page_0/Page0';
import { Page1 } from '../components/report-sections/page_1/Page1';
import { Page2 } from '../components/report-sections/page_2/Page2';
import { Page3 } from '../components/report-sections/page_3/Page3';
import { Page3Continuation } from '../components/report-sections/page_3/Page3Continuation';
import { Page4 } from '../components/report-sections/page_4/Page4';
import { Page5 } from '../components/report-sections/page_5/Page5';
import { ReportDataProvider } from '../data-map/ReportDataContext';
import type { ReportData } from '../data-map/types';
import { mockReportData } from '../data-map/mockReportData';
import { REPORT_DATA_STORAGE_KEY } from '../data-map/storage';

export default function PreviewPage() {
  const [reportData, setReportData] = useState<ReportData>(mockReportData);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      const stored = sessionStorage.getItem(REPORT_DATA_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as ReportData;
        setReportData(parsed);
      }
    } catch (error) {
      console.error('Failed to load report data from sessionStorage', error);
    }
  }, []);

  return (
    <ReportDataProvider value={reportData}>
      <PreviewContent />
    </ReportDataProvider>
  );
}

const PreviewContent = () => {
  const scale = 0.75;
  // Create array of pages. Use full-page aggregators where available
  const page2Result = Page2();
  const page2Pages = Array.isArray(page2Result) ? page2Result : [page2Result];
  const page3ContinuationResult = Page3Continuation();
  const page3ContinuationPages = page3ContinuationResult
    ? Array.isArray(page3ContinuationResult)
      ? page3ContinuationResult
      : [page3ContinuationResult]
    : [];

  const pages = [
    <Page0 key="page0" />,
    <Page1 key="page1" />,
    ...page2Pages,
    <Page3 key="page3" />,
    ...page3ContinuationPages,
    <Page4 key="page4" />,
    <Page5 key="page5" />,
  ];

  const totalPages = pages.length;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="px-6 pt-6 print-hide">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Regresar</span>
        </Link>
      </div>

      {/* Main content - scrollable A4 stack */}
      <div className="flex-1 overflow-auto p-6 print-main" style={{ minHeight: 'calc(100vh - 120px)' }}>
        <div
          className="mx-auto flex w-full max-w-5xl flex-col items-center space-y-10 print-stack"
          data-report-ready="true"
        >
          {pages.map((pageContent, pageIndex) => {
            const sections = Array.isArray(pageContent)
              ? pageContent
              : ([pageContent] as ReactElement[]);

            // Page0 gets special treatment - no padding and no footer
            if (pageIndex === 0) {
              return (
                <div key={`preview-page-${pageIndex}`} className="w-full flex justify-center">
                  <div
                    className="page-container print-page bg-white shadow-lg border border-gray-300"
                    style={{
                      width: '210mm',
                      minHeight: '297mm',
                      transform: `scale(${scale})`,
                      transformOrigin: 'top center',
                      maxWidth: '794px',
                      margin: '0 auto',
                      display: 'block',
                    }}
                  >
                    <div
                      className="w-full h-full"
                      style={{
                        width: '210mm',
                        minHeight: '297mm',
                        display: 'flex',
                        flexDirection: 'column',
                        boxSizing: 'border-box',
                      }}
                    >
                      {sections[0]}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div key={`preview-page-${pageIndex}`} className="w-full flex justify-center">
                <div
                  className="page-container print-page bg-white shadow-lg border border-gray-300"
                  style={{
                    width: '210mm',
                    minHeight: '297mm',
                    transform: `scale(${scale})`,
                    transformOrigin: 'top center',
                    maxWidth: '794px',
                    margin: '0 auto',
                    display: 'block',
                  }}
                >
                  <div
                    className="w-full h-full"
                    style={{
                      width: '210mm',
                      minHeight: '297mm',
                      padding: '15mm',
                      display: 'flex',
                      flexDirection: 'column',
                      boxSizing: 'border-box',
                    }}
                  >
                    <div className="flex-1 flex flex-col gap-2">
                      {sections.length > 1 ? (
                        sections.map((section, sectionIndex) => (
                          <div
                            key={`preview-page-${pageIndex}-section-${sectionIndex}`}
                            className="flex-1"
                            style={{
                              minHeight: '280px',
                              maxHeight: '280px',
                              marginBottom: sectionIndex < sections.length - 1 ? '8px' : '0',
                            }}
                          >
                            {section}
                          </div>
                        ))
                      ) : (
                        sections[0]
                      )}
                    </div>

                    <div className="mt-2 pt-2 border-t border-gray-200 flex items-center justify-between text-xs text-gray-400">
                      <div>Confidencial y Propietario • GBM Investment Banking</div>
                      <div className="text-[10px] text-gray-400">Página {pageIndex} de {totalPages}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        .page-container {
          display: block;
        }
        .print-hide {
          display: block;
        }
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
          }
          body {
            background: #ffffff !important;
          }
          .print-hide {
            display: none !important;
          }
          .print-stack {
            width: 210mm !important;
            max-width: 210mm !important;
            gap: 0 !important;
            align-items: stretch !important;
            margin: 0 auto !important;
            padding: 0 !important;
          }
          .print-main {
            padding: 0 !important;
          }
          .print-stack > div {
            margin: 0 !important;
            width: 210mm !important;
            display: block !important;
          }
          .print-stack > :not([hidden]) ~ :not([hidden]) {
            margin-top: 0 !important;
          }
          .page-container {
            box-shadow: none !important;
            border: none !important;
            transform: none !important;
            page-break-after: always;
          }
          .page-container:last-of-type {
            page-break-after: auto;
          }
        }
      `}</style>
    </div>
  );
};
