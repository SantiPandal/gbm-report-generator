'use client';

import React from 'react';
import { colors } from '@/lib/design/tokens';

type SectionHeaderProps = {
  title: string;
  period?: string;
  borderColor?: string;
  className?: string;
  containerClassName?: string;
  titleClassName?: string;
  periodClassName?: string;
};

export function SectionHeader({
  title,
  period,
  borderColor = colors.primaryBlue,
  className = '',
  containerClassName = '',
  titleClassName = '',
  periodClassName = '',
}: SectionHeaderProps) {
  return (
    <div
      className={`flex items-center justify-between pb-2 mb-3 border-b-2 ${className} ${containerClassName}`}
      style={{ borderColor: borderColor }}
    >
      <h2 className={`text-lg font-bold ${titleClassName}`} style={{ color: colors.darkGray }}>
        {title}
      </h2>
      {period ? (
        <span className={`text-xs italic ${periodClassName}`} style={{ color: colors.mediumGray }}>
          {period}
        </span>
      ) : null}
    </div>
  );
}


