import { CapitalSummaryChartsSection } from './CapitalSummaryChartsSection';
import { CapitalIssuance2025Section } from './CapitalIssuance2025Section';

export const Page4 = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <CapitalSummaryChartsSection />
      <CapitalIssuance2025Section />
    </div>
  );
};
