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
  height = layout.sectionHeightPx,
  padding = layout.sectionPaddingPx,
  debug = false,
  className = '',
  children,
}: SectionFrameProps) {
  return (
    <div
      className={`w-full bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden ${debug ? 'outline outline-1 outline-red-500' : ''} ${className}`}
      style={{ height, padding, margin: 0, boxSizing: 'border-box' }}
    >
      {children}
    </div>
  );
}


