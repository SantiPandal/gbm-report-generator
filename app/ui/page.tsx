'use client';

import { useState, useEffect } from 'react';
import TitleSlide from './slides/TitleSlide';
import ExecutiveSummarySlide from './slides/ExecutiveSummarySlide';
import TopDealsSlide from './slides/TopDealsSlide';
import IndustryBreakdownSlide from './slides/IndustryBreakdownSlide';

// Mock data for development
const mockData = {
  totalDeals: 15,
  totalValue: "2,450",
  completedDeals: 8,
  pendingDeals: 5,
  terminatedDeals: 2,
  successRate: "53.3",
  avgDealSize: "163.3",
  topDeals: [
    {
      'Target Name': 'Tech Solutions Mexico SA',
      'Acquirer Name': 'Global Tech Corp',
      'Announced Total Value (mil.)': '450',
      'Deal Status': 'Completed',
      'Target Industry Sector': 'Technology'
    },
    {
      'Target Name': 'Banco Regional Norte',
      'Acquirer Name': 'International Banking Group',
      'Announced Total Value (mil.)': '380',
      'Deal Status': 'Pending',
      'Target Industry Sector': 'Financial Services'
    },
    {
      'Target Name': 'Energia Verde Mexico',
      'Acquirer Name': 'Clean Energy Partners',
      'Announced Total Value (mil.)': '320',
      'Deal Status': 'Completed',
      'Target Industry Sector': 'Energy'
    },
    {
      'Target Name': 'Retail Solutions SA',
      'Acquirer Name': 'Consumer Goods International',
      'Announced Total Value (mil.)': '275',
      'Deal Status': 'Completed',
      'Target Industry Sector': 'Consumer & Retail'
    },
    {
      'Target Name': 'Healthcare Plus Mexico',
      'Acquirer Name': 'Global Health Partners',
      'Announced Total Value (mil.)': '240',
      'Deal Status': 'Pending',
      'Target Industry Sector': 'Healthcare'
    }
  ],
  industries: [
    ['Technology', 4] as [string, number],
    ['Financial Services', 3] as [string, number],
    ['Energy', 3] as [string, number],
    ['Consumer & Retail', 2] as [string, number]
  ],
  deals: [] // Will use topDeals for now
};

export default function UIPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    <TitleSlide key="title" data={mockData} />,
    <ExecutiveSummarySlide key="summary" data={mockData} />,
    <TopDealsSlide key="topdeals" data={mockData} />,
    <IndustryBreakdownSlide key="industry" data={mockData} />
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && currentSlide < slides.length - 1) {
        setCurrentSlide(currentSlide + 1);
      } else if (e.key === 'ArrowLeft' && currentSlide > 0) {
        setCurrentSlide(currentSlide - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, slides.length]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navigation */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">M&A Report UI Design</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              Slide {currentSlide + 1} of {slides.length}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                disabled={currentSlide === 0}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
                disabled={currentSlide === slides.length - 1}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Viewer */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-6xl">
          {/* Slide Container with 16:9 aspect ratio */}
          <div className="relative bg-white rounded-lg shadow-2xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
            {slides[currentSlide]}
          </div>
          
          {/* Slide Thumbnails */}
          <div className="mt-8 flex justify-center gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-10 h-10 rounded-full font-medium text-sm transition-all transform ${
                  index === currentSlide 
                    ? 'bg-blue-600 text-white shadow-lg scale-110' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:shadow-md'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-white border-t border-gray-200 px-4 py-3">
        <p className="text-center text-sm text-gray-600">
          Use arrow keys or buttons to navigate between slides
        </p>
      </div>
    </div>
  );
}