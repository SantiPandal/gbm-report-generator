'use client';

import { ReportViewer } from '../components/ReportViewer';
import { TitleSection } from '../components/report-sections/01_TitleSection';
import { sampleData } from '@/lib/sampleData';

export default function ReportPage() {
  // Create array of sections
  const sections = [
    <TitleSection 
      key="title"
      data={sampleData.summaryStats} 
      period="Enero - Diciembre 2024" 
    />,
    
    // Temporary placeholders for other sections - will be implemented
    <div key="section2" className="w-full bg-white border border-gray-200 rounded-lg p-6 mb-4" style={{ minHeight: '350px' }}>
      <h3 className="text-lg font-bold text-[#2c5282] mb-4">Resumen de Fusiones y Adquisiciones en México</h3>
      <p className="text-sm text-gray-600">Esta sección contendrá el análisis detallado del mercado mexicano...</p>
    </div>,
    
    <div key="section3" className="w-full bg-white border border-gray-200 rounded-lg p-6 mb-4" style={{ minHeight: '350px' }}>
      <h3 className="text-lg font-bold text-[#2c5282] mb-4">Transacciones por Empresas Mexicanas en el Extranjero</h3>
      <p className="text-sm text-gray-600">Esta sección mostrará las inversiones mexicanas en el exterior...</p>
    </div>,
    
    <div key="section4" className="w-full bg-white border border-gray-200 rounded-lg p-6 mb-4" style={{ minHeight: '350px' }}>
      <h3 className="text-lg font-bold text-[#2c5282] mb-4">Análisis por Industria</h3>
      <p className="text-sm text-gray-600">Desglose sectorial de las transacciones...</p>
    </div>,
    
    <div key="section5" className="w-full bg-white border border-gray-200 rounded-lg p-6 mb-4" style={{ minHeight: '350px' }}>
      <h3 className="text-lg font-bold text-[#2c5282] mb-4">Transacciones en México - Diciembre</h3>
      <p className="text-sm text-gray-600">Actividad mensual del mercado doméstico...</p>
    </div>,
    
    <div key="section6" className="w-full bg-white border border-gray-200 rounded-lg p-6 mb-4" style={{ minHeight: '350px' }}>
      <h3 className="text-lg font-bold text-[#2c5282] mb-4">Transacciones Mexicanas en el Extranjero - Diciembre</h3>
      <p className="text-sm text-gray-600">Actividad mensual internacional...</p>
    </div>,
    
    <div key="section7" className="w-full bg-white border border-gray-200 rounded-lg p-6 mb-4" style={{ minHeight: '350px' }}>
      <h3 className="text-lg font-bold text-[#2c5282] mb-4">Suscríbete</h3>
      <p className="text-sm text-gray-600">Información de suscripción y contacto...</p>
    </div>,
    
    <div key="section8" className="w-full bg-white border border-gray-200 rounded-lg p-6 mb-4" style={{ minHeight: '350px' }}>
      <h3 className="text-lg font-bold text-[#2c5282] mb-4">Nuestro Equipo</h3>
      <p className="text-sm text-gray-600">Presentación del equipo de análisis...</p>
    </div>,
    
    <div key="section9" className="w-full bg-white border border-gray-200 rounded-lg p-6 mb-4" style={{ minHeight: '350px' }}>
      <h3 className="text-lg font-bold text-[#2c5282] mb-4">Track Record</h3>
      <p className="text-sm text-gray-600">Historial de éxitos y credenciales...</p>
    </div>,
    
    <div key="section10" className="w-full bg-white border border-gray-200 rounded-lg p-6 mb-4" style={{ minHeight: '350px' }}>
      <h3 className="text-lg font-bold text-[#2c5282] mb-4">Contacto</h3>
      <p className="text-sm text-gray-600">Información de contacto y próximos pasos...</p>
    </div>,
  ];

  return (
    <ReportViewer 
      sections={sections}
      title="Reporte de Fusiones y Adquisiciones - México"
    />
  );
}