'use client';

import { SectionFrame } from '../SectionFrame';
import { SectionHeader } from '../SectionHeader';
import { colors } from '@/lib/design/tokens';
import { useReportData } from '@/app/data-map/ReportDataContext';

export const LegalNoticeSection = () => {
  const reportData = useReportData();
  const legalNotice = reportData['4_0'];

  return (
    <SectionFrame height={560} padding={20}>
      <SectionHeader
        title={legalNotice.Section_Title}
        borderColor={colors.primaryBlue}
        period=""
      />
      <div className="mt-4 text-[9px] leading-relaxed text-[#4a5568] overflow-y-auto pr-2" style={{ maxHeight: '460px' }}>
        {legalNotice.Legal_Notice_Content.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-3">
            {paragraph.trim()}
          </p>
        ))}
      </div>
    </SectionFrame>
  );
};
