'use client';

import React from 'react';
import { layout } from '@/lib/design/tokens';

type SectionFrameProps = {
  height?: number;
  padding?: number;
  debug?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function SectionFrame({
  height,
  padding = layout.sectionPaddingPx,
  debug = false,
  className = '',
  children,
}: SectionFrameProps) {
  // Use flexible height by default, fixed height only when explicitly provided
  const heightStyle = height
    ? { height, padding, margin: 0, boxSizing: 'border-box' as const }
    : { padding, margin: 0, boxSizing: 'border-box' as const };
  const heightClass = height ? '' : 'flex-1 min-h-[280px]';
  
  return (
    <div
      className={`w-full bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden ${heightClass} ${debug ? 'outline outline-1 outline-red-500' : ''} ${className}`}
      style={heightStyle}
    >
      {children}
    </div>
  );
}


