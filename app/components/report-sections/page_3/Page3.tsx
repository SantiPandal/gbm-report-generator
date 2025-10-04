import { DebtSummarySection } from './DebtSummarySection';
import { RatePerspectiveSection } from './RatePerspectiveSection';
import { DebtIssuance2025Section } from './DebtIssuance2025Section';

export const Page3 = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <DebtSummarySection />
      <RatePerspectiveSection />
      <DebtIssuance2025Section />
    </div>
  );
};
