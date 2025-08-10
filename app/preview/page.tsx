'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, Maximize2 } from 'lucide-react';
import { Page1 } from '../components/report-sections/page_1/Page1';

export default function PreviewPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [scale, setScale] = useState(0.75); // Optimized for MacBook Air M2 13" (1470 × 956)
  
  // Create array of pages. Use full-page aggregators where available
  const pages = [
    // Page 1 - Aggregated component
    <Page1 key="page1" />,
    // Page 2 - Legacy content (kept as sections, without TitleSection)
    [
      <div key="section2" className="w-full h-full bg-white border border-gray-200 rounded-lg flex flex-col" style={{ height: '280px', padding: '12px', margin: '0', boxSizing: 'border-box' }}>
        <div className="border-b border-[#2c5282] pb-2 mb-3 flex-shrink-0">
          <h3 className="text-lg font-bold text-[#2c5282]">Resumen de Fusiones y Adquisiciones en México</h3>
        </div>
        <div className="flex-1 flex flex-col justify-between py-1">
          <div className="flex-1 flex flex-col justify-center">
            <p className="text-sm text-gray-600 mb-4">Esta sección contendrá el análisis detallado del mercado mexicano de fusiones y adquisiciones, incluyendo tendencias, sectores destacados y comparaciones año tras año.</p>
            <div className="bg-[#f7fafc] rounded-lg p-4 border-l-4 border-[#4a90e2]">
              <div className="text-xs font-semibold text-[#4a5568] uppercase tracking-wider mb-3">Datos Clave - México</div>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-[#2c5282] mb-1">85</div>
                  <div className="text-[10px] text-[#718096] uppercase tracking-wide">Transacciones</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-[#2c5282] mb-1">USD 9.2B</div>
                  <div className="text-[10px] text-[#718096] uppercase tracking-wide">Valor Total</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-[#2c5282] mb-1">72%</div>
                  <div className="text-[10px] text-[#718096] uppercase tracking-wide">Completadas</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-[#2c5282] mb-1">108M</div>
                  <div className="text-[10px] text-[#718096] uppercase tracking-wide">Promedio</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>,
      <div key="section3" className="w-full h-full bg-white border border-gray-200 rounded-lg flex flex-col" style={{ height: '280px', padding: '12px', margin: '0', boxSizing: 'border-box' }}>
        <div className="border-b border-[#2c5282] pb-2 mb-3 flex-shrink-0">
          <h3 className="text-lg font-bold text-[#2c5282]">Transacciones por Empresas Mexicanas en el Extranjero</h3>
        </div>
        <div className="flex-1 flex flex-col justify-between py-2">
          <div className="flex-1 flex flex-col justify-center">
            <p className="text-sm text-gray-600 mb-6">Esta sección mostrará las inversiones mexicanas en el exterior, enfocándose en los mercados objetivo principales y los sectores de mayor actividad.</p>
            <div className="bg-[#f7fafc] rounded-lg p-5 border-l-4 border-[#a7c7e7]">
              <div className="text-xs font-semibold text-[#4a5568] uppercase tracking-wider mb-4">Mercados Objetivo - Internacional</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-[#2c5282] mb-1">42</div>
                  <div className="text-xs text-[#718096] uppercase tracking-wide">Transacciones</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-[#2c5282] mb-1">USD 6.0B</div>
                  <div className="text-xs text-[#718096] uppercase tracking-wide">Valor Total</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-[#2c5282] mb-1">EE.UU.</div>
                  <div className="text-xs text-[#718096] uppercase tracking-wide">Principal</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-[#2c5282] mb-1">143M</div>
                  <div className="text-xs text-[#718096] uppercase tracking-wide">Promedio</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ],
    
    // Page 3 - Previous Page 2
    [
      <div key="section4" className="w-full h-full bg-white border border-gray-200 rounded-lg flex flex-col" style={{ height: '280px', padding: '12px', margin: '0', boxSizing: 'border-box' }}>
        <div className="border-b border-[#2c5282] pb-2 mb-3 flex-shrink-0">
          <h3 className="text-lg font-bold text-[#2c5282]">Análisis por Industria</h3>
        </div>
        <div className="flex-1 flex flex-col justify-between py-2">
          <div className="flex-1 flex flex-col justify-center">
            <p className="text-sm text-gray-600 mb-6">Desglose sectorial detallado de las transacciones, mostrando los sectores más activos y las tendencias por industria.</p>
            <div className="bg-[#f7fafc] rounded-lg p-5 border-l-4 border-[#4a90e2]">
              <div className="text-xs font-semibold text-[#4a5568] uppercase tracking-wider mb-4">Sectores Principales</div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-[#4a5568]">Tecnología</span>
                  <span className="text-sm font-bold text-[#2c5282]">28%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-[#4a5568]">Energía</span>
                  <span className="text-sm font-bold text-[#2c5282]">22%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-[#4a5568]">Telecomunicaciones</span>
                  <span className="text-sm font-bold text-[#2c5282]">15%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>,
      <div key="section5" className="w-full h-full bg-white border border-gray-200 rounded-lg flex flex-col" style={{ height: '280px', padding: '12px', margin: '0', boxSizing: 'border-box' }}>
        <div className="border-b border-[#2c5282] pb-2 mb-3 flex-shrink-0">
          <h3 className="text-lg font-bold text-[#2c5282]">Transacciones en México - Diciembre</h3>
        </div>
        <div className="flex-1 flex flex-col justify-between py-2">
          <div className="flex-1 flex flex-col justify-center">
            <p className="text-sm text-gray-600 mb-6">Resumen de la actividad mensual en el mercado doméstico mexicano durante diciembre, destacando las transacciones más importantes.</p>
            <div className="bg-[#f7fafc] rounded-lg p-5 border-l-4 border-[#4a90e2]">
              <div className="text-xs font-semibold text-[#4a5568] uppercase tracking-wider mb-4">Actividad Diciembre</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-[#2c5282] mb-1">12</div>
                  <div className="text-xs text-[#718096] uppercase tracking-wide">Transacciones</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-[#2c5282] mb-1">USD 1.8B</div>
                  <div className="text-xs text-[#718096] uppercase tracking-wide">Valor</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>,
      <div key="section6" className="w-full h-full bg-white border border-gray-200 rounded-lg flex flex-col" style={{ height: '280px', padding: '12px', margin: '0', boxSizing: 'border-box' }}>
        <div className="border-b border-[#2c5282] pb-2 mb-3 flex-shrink-0">
          <h3 className="text-lg font-bold text-[#2c5282]">Transacciones Mexicanas en el Extranjero - Diciembre</h3>
        </div>
        <div className="flex-1 flex flex-col justify-between py-2">
          <div className="flex-1 flex flex-col justify-center">
            <p className="text-sm text-gray-600 mb-6">Análisis de la actividad mensual internacional de empresas mexicanas durante diciembre, con foco en mercados objetivo.</p>
            <div className="bg-[#f7fafc] rounded-lg p-5 border-l-4 border-[#a7c7e7]">
              <div className="text-xs font-semibold text-[#4a5568] uppercase tracking-wider mb-4">Internacional Diciembre</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-[#2c5282] mb-1">7</div>
                  <div className="text-xs text-[#718096] uppercase tracking-wide">Operaciones</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-[#2c5282] mb-1">USD 920M</div>
                  <div className="text-xs text-[#718096] uppercase tracking-wide">Valor</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ],
    
    // Page 4 - Previous Page 3
    [
      <div key="section7" className="w-full h-full bg-white border border-gray-200 rounded-lg flex flex-col" style={{ height: '280px', padding: '12px', margin: '0', boxSizing: 'border-box' }}>
        <h3 className="text-lg font-bold text-[#2c5282] mb-4">Suscríbete</h3>
        <p className="text-sm text-gray-600">Información de suscripción y contacto...</p>
      </div>,
      <div key="section8" className="w-full h-full bg-white border border-gray-200 rounded-lg flex flex-col" style={{ height: '280px', padding: '12px', margin: '0', boxSizing: 'border-box' }}>
        <h3 className="text-lg font-bold text-[#2c5282] mb-4">Nuestro Equipo</h3>
        <p className="text-sm text-gray-600">Presentación del equipo de análisis...</p>
      </div>,
      <div key="section9" className="w-full h-full bg-white border border-gray-200 rounded-lg flex flex-col" style={{ height: '280px', padding: '12px', margin: '0', boxSizing: 'border-box' }}>
        <h3 className="text-lg font-bold text-[#2c5282] mb-4">Track Record</h3>
        <p className="text-sm text-gray-600">Historial de éxitos y credenciales...</p>
      </div>
    ]
  ];

  const currentContent = pages[currentPage] as any;
  
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
                  currentContent.map((section: any, sectionIndex: number) => (
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