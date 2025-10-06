'use client';

import { useMemo, type ReactElement } from 'react';
import { ResumenMexicoSection } from './ResumenMexicoSection';
import { TransaccionesMexicoSection } from './TransaccionesMexicoSection';
import { useReportData } from '@/app/data-map/ReportDataContext';
import type { Section1_1_Row } from '@/app/data-map/types';

const MAX_TRANSACTIONS_FIRST_PAGE = 12;
const MAX_TRANSACTIONS_CONTINUATION_PAGE = 30;

export const Page2 = () => {
  const reportData = useReportData();
  const dataset = reportData['1_1'];
  const transactions = dataset.Data;

  const pages = useMemo(() => {
    if (transactions.length <= MAX_TRANSACTIONS_FIRST_PAGE) {
      return [
        <div key="page2-single" className="flex flex-col gap-2.5 h-full">
          <div className="flex-1">
            <ResumenMexicoSection />
          </div>
          <div className="flex-1">
            <TransaccionesMexicoSection transactions={transactions} title={dataset.Table_Title} />
          </div>
        </div>,
      ];
    }

    const result: ReactElement[] = [];

    result.push(
      <div key="page2-main" className="flex flex-col gap-2.5 h-full">
        <div className="flex-1">
          <ResumenMexicoSection />
        </div>
        <div className="flex-1">
          <TransaccionesMexicoSection
            transactions={transactions.slice(0, MAX_TRANSACTIONS_FIRST_PAGE)}
            title={dataset.Table_Title}
          />
        </div>
      </div>,
    );

    let remaining: Section1_1_Row[] = transactions.slice(MAX_TRANSACTIONS_FIRST_PAGE);
    let index = 1;

    while (remaining.length > 0) {
      const pageTransactions = remaining.slice(0, MAX_TRANSACTIONS_CONTINUATION_PAGE);
      result.push(
        <TransaccionesMexicoSection
          key={`page2-continuation-${index}`}
          transactions={pageTransactions}
          title={`${dataset.Table_Title} (Continuación)`}
          fullHeight
        />
      );
      remaining = remaining.slice(MAX_TRANSACTIONS_CONTINUATION_PAGE);
      index += 1;
    }

    return result;
  }, [dataset.Table_Title, transactions]);

  return pages.length === 1 ? pages[0] : pages;
};
