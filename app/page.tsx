'use client';

import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import type { ReportData } from '@/app/data-map/types';
import { useRouter } from 'next/navigation';
import { REPORT_DATA_STORAGE_KEY } from '@/app/data-map/storage';

// Simple confetti effect
const createConfetti = () => {
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
  const confettiCount = 50;
  
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.top = '-10px';
    confetti.style.zIndex = '9999';
    confetti.style.borderRadius = '50%';
    confetti.style.pointerEvents = 'none';
    
    document.body.appendChild(confetti);
    
    const animation = confetti.animate([
      { 
        transform: 'translateY(0px) rotate(0deg)', 
        opacity: 1 
      },
      { 
        transform: `translateY(${window.innerHeight + 100}px) rotate(720deg)`, 
        opacity: 0 
      }
    ], {
      duration: 3000 + Math.random() * 2000,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });
    
    animation.onfinish = () => {
      confetti.remove();
    };
  }
};

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const router = useRouter();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const uploadedFile = acceptedFiles[0];
    if (
      uploadedFile &&
      (
        uploadedFile.name.toLowerCase().endsWith('.xlsx') ||
        uploadedFile.name.toLowerCase().endsWith('.xls') ||
        uploadedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        uploadedFile.type === 'application/vnd.ms-excel'
      )
    ) {
      setFile(uploadedFile);
      setError(null);
      setReportData(null);
    } else {
      setError('Please upload an XLSX file');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls']
    },
    multiple: false
  });

  const generateReport = async () => {
    if (!file) return;
    
    setIsGenerating(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('xlsxFile', file);

      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate report');
      }

      const { reportData } = (await response.json()) as { reportData: ReportData };
      setReportData(reportData);

      // 🎉 Confetti celebration!
      createConfetti();

      try {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem(REPORT_DATA_STORAGE_KEY, JSON.stringify(reportData));
        }
      } catch (storageError) {
        console.error('Failed to persist report data in sessionStorage', storageError);
      }

      // Smooth transition delay - let the celebration sink in
      setTimeout(() => {
        router.push('/preview?source=upload');
      }, 1000);
    } catch (err) {
      setError((err as Error)?.message || 'Failed to generate report. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* GBM Logo - Top Left */}
      <div className="absolute top-4 left-4">
        <img 
          src="/Logo_de_GBM.svg" 
          alt="GBM Logo" 
          className="h-8 w-auto"
        />
      </div>
      
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-8 h-8 bg-black rounded-lg mx-auto mb-4 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            M&A Report Generator
          </h1>
          <p className="text-gray-600 text-sm mb-4">
            Transform your M&A data into professional A4 reports
          </p>
          <div className="flex gap-4 justify-center">
            <a 
              href="/preview" 
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Ver Vista Previa →
            </a>
          </div>
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div
            {...getRootProps()}
            className={`
              relative p-8 text-center cursor-pointer transition-all duration-200
              ${isDragActive 
                ? 'bg-blue-50 border-blue-200' 
                : 'hover:bg-gray-50'
              }
            `}
          >
            <input {...getInputProps()} />
            
            {/* Upload Icon */}
            <div className="mb-4">
              <div className={`
                w-12 h-12 mx-auto rounded-full flex items-center justify-center transition-colors
                ${isDragActive ? 'bg-blue-100' : 'bg-gray-100'}
              `}>
                <svg 
                  className={`w-6 h-6 ${isDragActive ? 'text-blue-600' : 'text-gray-500'}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
            </div>
            
            {/* Upload Text */}
            {isDragActive ? (
              <div>
                <p className="text-blue-600 font-medium mb-1">Drop your file here</p>
                <p className="text-sm text-blue-500">We&rsquo;ll process it right away</p>
              </div>
            ) : (
              <div>
                <p className="text-gray-900 font-medium mb-1">
                  Choose an XLSX file or drag it here
                </p>
                <p className="text-sm text-gray-500 mb-2">Excel files up to 10MB</p>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Browse files
                </button>
              </div>
            )}
          </div>

          {/* File Selected */}
          {file && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-500">{Math.round(file.size / 1024)} KB</p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                    setError(null);
                    setReportData(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="px-6 py-4 bg-red-50 border-t border-red-200">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Generate Button */}
        {file && !error && (
          <div className="mt-6">
            <button
              onClick={generateReport}
              disabled={isGenerating}
              className={`
                w-full py-3 px-4 rounded-xl font-medium transition-all duration-200
                ${isGenerating
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-black text-white hover:bg-gray-800 shadow-sm hover:shadow'
                }
              `}
            >
              {isGenerating ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing workbook...
                </div>
              ) : (
                'Parse Workbook'
              )}
            </button>
          </div>
        )}

        {reportData && (
          <div className="mt-6 bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-gray-800">Workbook Parsed Successfully</h2>
              <span className="text-xs text-gray-500">{Object.keys(reportData).length} sections</span>
            </div>
            <div className="max-h-64 overflow-auto bg-gray-50 border border-gray-200 rounded-md p-3 text-[11px] leading-relaxed text-gray-700 whitespace-pre-wrap">
              {JSON.stringify(reportData, null, 2)}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Tus datos se procesan de forma segura y no se almacenan en nuestros servidores
          </p>
        </div>
      </div>
    </div>
  );
}
