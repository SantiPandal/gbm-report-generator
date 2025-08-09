import React from 'react';

interface SlideBaseProps {
  children: React.ReactNode;
  slideNumber?: number;
  className?: string;
}

export default function SlideBase({ children, slideNumber, className = '' }: SlideBaseProps) {
  return (
    <div className={`relative w-full h-full bg-gradient-to-br from-slate-50 to-blue-50 p-10 overflow-hidden ${className}`}>
      {/* Main Content */}
      <div className="relative h-full flex flex-col">
        {children}
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-4 left-10 right-10 flex justify-between items-center">
        <div className="text-xs text-gray-400">M&A Intelligence Report</div>
        {slideNumber && (
          <div className="text-2xl font-light text-gray-300">{slideNumber}</div>
        )}
      </div>
    </div>
  );
}