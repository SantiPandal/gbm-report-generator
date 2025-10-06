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
    <div className="bg-white rounded-md p-2.5 border border-[#e2e8f0] h-full flex flex-col overflow-hidden">
      {/* Compact Header with integrated author info */}
      <div className="border-b border-[#e2e8f0] pb-1.5 mb-2 flex-shrink-0">
        <div className="flex items-start gap-2">
          {/* Avatar - Image */}
          <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 -mt-1 overflow-hidden">
            <img 
              src="https://ox3e409kn3.ufs.sh/f/Ol97b1DLJcZql52Xob12TxCnoQZRIBG9Y0iAyFmtErPk5Uep" 
              alt={authorName}
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          {/* Title and Author Info Combined */}
          <div className="flex-1 min-w-0">
            <h2 className="text-xs font-bold text-[#2d3748] leading-tight">
              {title}
            </h2>
            <p className="text-[9px] text-[#718096] leading-tight mt-0.5">
              <span className="font-semibold text-[#4a5568]">{authorName}</span>
              <span className="mx-1">·</span>
              <span className="uppercase tracking-wide">{authorTitle}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Maximized Content Area */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col relative">
          {/* Smaller Opening Quote Mark */}
          <div className="absolute left-0 -top-1">
            <span className="text-3xl font-serif text-[#cbd5e0] opacity-30 leading-none select-none">&ldquo;</span>
          </div>

          {/* Quote Content - Maximized Space */}
          <div className="pl-4 pr-2 flex-1 flex flex-col">
            <blockquote className="flex-1">
              {/* LARGER TEXT SIZE FOR BETTER READABILITY */}
              <p className="text-[11px] text-[#4a5568] leading-[1.4] italic">
                {content}
              </p>
            </blockquote>

            {/* Minimal Footer */}
            <div className="flex justify-end items-center mt-2">
              <span className="text-xl font-serif text-[#cbd5e0] opacity-30 leading-none select-none mr-1">&rdquo;</span>
              <span className="text-[7px] text-[#718096] font-medium uppercase tracking-wider">
                Editor&rsquo;s Note
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};