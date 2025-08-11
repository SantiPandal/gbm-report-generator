'use client';

interface EditorQuoteChartProps {
  title: string;
  authorName: string;
  authorTitle: string;
  authorInitials: string;
  content: React.ReactNode;
}

export const EditorQuoteChart = ({
  title,
  authorName,
  authorTitle,
  authorInitials,
  content
}: EditorQuoteChartProps) => {
  return (
    <div className="bg-white rounded-md p-3 border border-[#e2e8f0] h-full flex flex-col overflow-hidden">
      {/* Article Header - Compact */}
      <div className="border-b border-[#e2e8f0] pb-2 mb-3 h-[60px] flex-shrink-0 overflow-hidden">
        <h2 className="text-sm font-bold text-[#2d3748] mb-1 truncate leading-tight">
          {title}
        </h2>
        <div className="flex items-center gap-2 h-[32px]">
          <div className="w-8 h-8 bg-gradient-to-br from-[#2c5282] to-[#4a90e2] rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-[10px] font-bold">{authorInitials}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-[#2d3748] truncate leading-tight">
              {authorName}
            </p>
            <p className="text-[8px] text-[#718096] uppercase tracking-wide truncate leading-tight">
              {authorTitle}
            </p>
          </div>
        </div>
      </div>
      
      {/* Magazine-Style Editor Quote */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col relative py-2">
          {/* Large Opening Quote Mark */}
          <div className="absolute left-0 top-2">
            <span className="text-5xl font-serif text-[#cbd5e0] opacity-40 leading-none select-none">&ldquo;</span>
          </div>
          
          {/* Quote Content */}
          <div className="pl-6 pr-4 flex-1 flex flex-col justify-center">
            <blockquote className="relative">
              {/* EDITOR'S QUOTE - VISUAL SPACE OPTIMIZED */}
              <p className="text-xs text-[#4a5568] leading-[1.4] font-light italic mb-3">
                {content}
              </p>
              
              {/* Closing Quote Mark & Attribution */}
              <div className="flex justify-end items-end">
                <div className="text-right">
                  <span className="text-2xl font-serif text-[#cbd5e0] opacity-40 leading-none select-none">&rdquo;</span>
                  <div className="text-[8px] text-[#718096] font-medium mt-1">
                    <div className="border-t border-[#e2e8f0] pt-1">
                      Editor&rsquo;s Note
                    </div>
                  </div>
                </div>
              </div>
            </blockquote>
          </div>
          
          {/* Subtle character indicator */}
          <div className="absolute bottom-0 right-0 text-[6px] text-[#cbd5e0] font-mono opacity-50">
            280
          </div>
        </div>
      </div>
    </div>
  );
};