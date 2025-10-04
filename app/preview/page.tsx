'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, Maximize2 } from 'lucide-react';
import { Page1 } from '../components/report-sections/page_1/Page1';
import { Page2 } from '../components/report-sections/page_2/Page2';
import { Page3 } from '../components/report-sections/page_3/Page3';
import { Page4 } from '../components/report-sections/page_4/Page4';

export default function PreviewPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [scale, setScale] = useState(0.75); // Optimized for MacBook Air M2 13" (1470 × 956)
  
  // Create array of pages. Use full-page aggregators where available
  const page2Result = Page2();
  const page2Pages = Array.isArray(page2Result) ? page2Result : [page2Result];

  const pages = [
    <Page1 key="page1" />,
    ...page2Pages,
    <Page3 key="page3" />,
    <Page4 key="page4" />,
  ];

  const currentContent = pages[currentPage];
  
  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % pages.length);
  };
  
  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + pages.length) % pages.length);
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-900">Vista Previa A4</h1>
            <span className="text-sm text-gray-500">
              Página {currentPage + 1} de {pages.length}
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Zoom controls - MacBook Air optimized */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setScale(0.5)}
                className={`px-2 py-1 text-sm rounded ${scale === 0.5 ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                50%
              </button>
              <button
                onClick={() => setScale(0.75)}
                className={`px-2 py-1 text-sm rounded ${scale === 0.75 ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                75%
              </button>
              <button
                onClick={() => setScale(0.9)}
                className={`px-2 py-1 text-sm rounded ${scale === 0.9 ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                90%
              </button>
              <button
                onClick={() => setScale(1)}
                className={`px-2 py-1 text-sm rounded ${scale === 1 ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                100%
              </button>
            </div>
            
            <div className="h-6 w-px bg-gray-300" />
            
            {/* Actions */}
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
              <Maximize2 className="w-4 h-4" />
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Exportar Página</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Main content - A4 Page - Optimized for MacBook Air */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-auto" style={{ minHeight: 'calc(100vh - 140px)' }}>
        <div className="relative">
          {/* A4 Page container with shadow - Fixed scaling */}
          <div 
            className="bg-white shadow-lg border border-gray-300"
            style={{
              width: '210mm',
              height: '297mm',
              transform: `scale(${scale})`,
              transformOrigin: 'center',
              maxWidth: '794px',
              maxHeight: '1123px'
            }}
          >
            {/* Actual A4 content at full size */}
            <div 
              className="w-full h-full"
              style={{
                width: '210mm',
                height: '297mm',
                padding: '15mm',
                display: 'flex',
                flexDirection: 'column',
                boxSizing: 'border-box'
              }}
            >
              {/* Page Header */}
              <div className="text-center mb-6 pb-4 border-b border-gray-200">
                <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Reporte de Fusiones y Adquisiciones - México
                </h2>
                <div className="text-xs text-gray-400 mt-1">
                  Página {currentPage + 1} de {pages.length}
                </div>
              </div>
              
              {/* Page content - Supports full-page components and legacy section arrays */}
              <div className="flex-1 flex flex-col justify-between" style={{ minHeight: 'calc(297mm - 30mm - 120px)' }}>
                {Array.isArray(currentContent) ? (
                  currentContent.map((section: React.ReactElement, sectionIndex: number) => (
                    <div 
                      key={sectionIndex}
                      className="flex-1"
                      style={{ 
                        minHeight: '280px',
                        maxHeight: '280px',
                        marginBottom: sectionIndex < currentContent.length - 1 ? '8px' : '0'
                      }}
                    >
                      {section}
                    </div>
                  ))
                ) : (
                  currentContent
                )}
              </div>
              
              {/* Page Footer */}
              <div className="mt-6 pt-4 border-t border-gray-200 text-center">
                <div className="text-xs text-gray-400">
                  Confidencial y Propietario • GBM Investment Banking
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation buttons */}
          {pages.length > 1 && (
            <>
              <button
                onClick={prevPage}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
                disabled={currentPage === 0}
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={nextPage}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
                disabled={currentPage === pages.length - 1}
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </>
          )}
        </div>
      </div>
      
      {/* Footer with page navigation */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex space-x-2 justify-center">
          {pages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`
                px-3 py-1.5 text-sm rounded-lg transition-colors
                ${index === currentPage 
                  ? 'bg-blue-100 text-blue-700 font-medium' 
                  : 'text-gray-600 hover:bg-gray-100'
                }
              `}
            >
              Página {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
