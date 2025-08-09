'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, Maximize2 } from 'lucide-react';
import { TitleSlide } from '../components/ui-slides/TitleSlide';
import { IndustryBreakdownSlide } from '../components/ui-slides/IndustryBreakdownSlide';
import { MonthlyActivitySlide } from '../components/ui-slides/MonthlyActivitySlide';
import { YearlyComparisonSlide } from '../components/ui-slides/YearlyComparisonSlide';
import { TopDealsSlide } from '../components/ui-slides/TopDealsSlide';
import { sampleData } from '@/lib/sampleData';

export default function PreviewPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scale, setScale] = useState(0.75); // Scale to fit screen nicely
  
  // 16:9 aspect ratio dimensions
  const slideWidth = 1280;
  const slideHeight = 720;
  
  const slides = [
    { 
      id: 'title', 
      name: 'Title Slide',
      component: <TitleSlide data={sampleData.summaryStats} period="January - December 2024" />
    },
    {
      id: 'industry',
      name: 'Industry Breakdown',
      component: <IndustryBreakdownSlide data={sampleData.industryData} period="January - December 2024" />
    },
    {
      id: 'monthly',
      name: 'Monthly Activity',
      component: <MonthlyActivitySlide data={sampleData.monthlyData} year={2024} />
    },
    {
      id: 'yearly',
      name: 'Year-over-Year Comparison',
      component: <YearlyComparisonSlide data={sampleData.yearlyComparison} />
    },
    {
      id: 'topdeals',
      name: 'Top Transactions',
      component: <TopDealsSlide deals={sampleData.topDeals} period="January - December 2024" />
    },
  ];
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-900">Slide Preview</h1>
            <span className="text-sm text-gray-500">
              {slides[currentSlide].name} ({currentSlide + 1} of {slides.length})
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Zoom controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setScale(0.5)}
                className={`px-2 py-1 text-sm rounded ${scale === 0.5 ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                50%
              </button>
              <button
                onClick={() => setScale(0.75)}
                className={`px-2 py-1 text-sm rounded ${scale === 0.75 ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                75%
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
              <span>Export PDF</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
        <div className="relative">
          {/* Slide container with shadow */}
          <div 
            className="bg-white rounded-lg shadow-2xl overflow-hidden"
            style={{
              width: slideWidth * scale,
              height: slideHeight * scale,
              transform: `scale(${scale})`,
              transformOrigin: 'center',
            }}
          >
            <div style={{ width: slideWidth, height: slideHeight }}>
              {slides[currentSlide].component}
            </div>
          </div>
          
          {/* Navigation buttons */}
          {slides.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
                disabled={currentSlide === 0}
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
                disabled={currentSlide === slides.length - 1}
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </>
          )}
        </div>
      </div>
      
      {/* Footer with slide thumbnails */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex space-x-2 justify-center">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(index)}
              className={`
                px-3 py-1.5 text-sm rounded-lg transition-colors
                ${index === currentSlide 
                  ? 'bg-blue-100 text-blue-700 font-medium' 
                  : 'text-gray-600 hover:bg-gray-100'
                }
              `}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}