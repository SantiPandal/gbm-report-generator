'use client';

import { DebtSummarySection } from './DebtSummarySection';
import { RatePerspectiveSection } from './RatePerspectiveSection';
import { DebtIssuance2025Section } from './DebtIssuance2025Section';
import { useReportData } from '@/app/data-map/ReportDataContext';

const MAX_ISSUANCES_FIRST_PAGE = 6;

export const Page3 = () => {
  const reportData = useReportData();
  const dataset = reportData['2_1'];
  const issuances = dataset.Data ?? [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <DebtSummarySection />
      <RatePerspectiveSection />
      {issuances.length > 0 && (
        <DebtIssuance2025Section issuances={issuances.slice(0, MAX_ISSUANCES_FIRST_PAGE)} />
      )}
    </div>
  );
};
