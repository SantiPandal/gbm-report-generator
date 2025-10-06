'use client';

import { useMemo, type ReactElement } from 'react';
import { DebtIssuance2025Section } from './DebtIssuance2025Section';
import { useReportData } from '@/app/data-map/ReportDataContext';

const MAX_ISSUANCES_FIRST_PAGE = 6;
const MAX_ISSUANCES_CONTINUATION_PAGE = 25;

export const Page3Continuation = () => {
  const reportData = useReportData();
  const dataset = reportData['2_1'];

  const continuationPages = useMemo<ReactElement | ReactElement[] | null>(() => {
    const issuances = dataset.Data ?? [];
    const remaining = issuances.slice(MAX_ISSUANCES_FIRST_PAGE);

    if (remaining.length === 0) {
      return null;
    }

    const pages: ReactElement[] = [];

    for (let start = 0; start < remaining.length; start += MAX_ISSUANCES_CONTINUATION_PAGE) {
      const chunk = remaining.slice(start, start + MAX_ISSUANCES_CONTINUATION_PAGE);
      const pageIndex = Math.floor(start / MAX_ISSUANCES_CONTINUATION_PAGE) + 1;

      pages.push(
        <div
          key={`page3-continuation-${pageIndex}`}
          style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
        >
          <DebtIssuance2025Section
            issuances={chunk}
            title={`${dataset.Section_Title} (Continuación)`}
            fullHeight
          />
        </div>
      );
    }

    return pages.length === 1 ? pages[0] : pages;
  }, [dataset.Data, dataset.Section_Title]);

  return continuationPages;
};
