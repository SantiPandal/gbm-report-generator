'use client';

import { useState } from 'react';
import { Download, Eye, Grid3X3, FileText } from 'lucide-react';

interface ReportViewerProps {
  sections: React.ReactNode[];
  title?: string;
}

export const ReportViewer = ({ 
  sections, 
  title = "M&A Report" 
}: ReportViewerProps) => {
  const [viewMode, setViewMode] = useState<'report' | 'sections'>('report');
  const [currentPage, setCurrentPage] = useState(0);
  
  // Split sections into pages (3 sections per A4 page)
  const sectionsPerPage = 3;
  const pages = [];
  for (let i = 0; i < sections.length; i += sectionsPerPage) {
    pages.push(sections.slice(i, i + sectionsPerPage));
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
            <span className="text-sm text-gray-500">
              {sections.length} secciones • {pages.length} páginas
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('report')}
                className={`px-3 py-1.5 text-sm rounded flex items-center space-x-1 ${
                  viewMode === 'report' 
                    ? 'bg-blue-100 text-blue-700 font-medium' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Reporte</span>
              </button>
              <button
                onClick={() => setViewMode('sections')}
                className={`px-3 py-1.5 text-sm rounded flex items-center space-x-1 ${
                  viewMode === 'sections' 
                    ? 'bg-blue-100 text-blue-700 font-medium' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
                <span>Secciones</span>
              </button>
            </div>
            
            <div className="h-6 w-px bg-gray-300" />
            
            {/* Actions */}
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
              <Eye className="w-4 h-4" />
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Exportar PDF</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {viewMode === 'report' ? (
          /* A4 Report View - Continuous Pages */
          <div className="space-y-8">
            {pages.map((pageSections, pageIndex) => (
              <div 
                key={pageIndex}
                className="bg-white shadow-lg mx-auto"
                style={{
                  width: '210mm',
                  minHeight: '297mm',
                  padding: '20mm',
                }}
              >
                {/* Page Header */}
                <div className="text-center mb-6 pb-4 border-b border-gray-200">
                  <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    {title}
                  </h2>
                  <div className="text-xs text-gray-400 mt-1">
                    Página {pageIndex + 1} de {pages.length}
                  </div>
                </div>
                
                {/* Page Sections */}
                <div className="space-y-6">
                  {pageSections.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                      {section}
                    </div>
                  ))}
                </div>
                
                {/* Page Footer */}
                <div className="mt-8 pt-4 border-t border-gray-200 text-center">
                  <div className="text-xs text-gray-400">
                    Confidencial y Propietario • GBM Investment Banking
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Individual Sections View - Development Mode */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section, index) => (
              <div key={index} className="relative">
                <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded z-10">
                  {index + 1}
                </div>
                {section}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Page Navigation for Report View */}
      {viewMode === 'report' && pages.length > 1 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
          <div className="bg-white shadow-lg rounded-full px-4 py-2 flex items-center space-x-4">
            <button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-full disabled:opacity-50"
            >
              ←
            </button>
            <span className="text-sm text-gray-700 min-w-[80px] text-center">
              {currentPage + 1} / {pages.length}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(pages.length - 1, currentPage + 1))}
              disabled={currentPage === pages.length - 1}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-full disabled:opacity-50"
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};