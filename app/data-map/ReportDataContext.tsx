'use client';

import { createContext, useContext } from 'react';
import { ReportData } from './types';
import { mockReportData } from './mockReportData';

const ReportDataContext = createContext<ReportData>(mockReportData);

interface ReportDataProviderProps {
  value?: ReportData;
  children: React.ReactNode;
}

export const ReportDataProvider = ({ value = mockReportData, children }: ReportDataProviderProps) => (
  <ReportDataContext.Provider value={value}>
    {children}
  </ReportDataContext.Provider>
);

export const useReportData = () => useContext(ReportDataContext);
