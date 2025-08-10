import { SectionFrame } from '../SectionFrame';
import { colors, layout } from '@/lib/design/tokens';
import { DebtIssuancesCard } from '../../charts/DebtIssuancesCard';
import { EquityIssuancesCard } from '../../charts/EquityIssuancesCard';

interface CapitalMarketsSectionProps {
  period?: string;
}

export const CapitalMarketsSection = ({ period = "2025" }: CapitalMarketsSectionProps) => {
  const sectionPadding = layout.sectionPaddingPx;
  
  return (
    <SectionFrame className="!border-transparent">
      {/* Main Content - Full bleed with negative margins */}
      <div 
        className="flex-1 flex gap-2"
        style={{ margin: `-${sectionPadding}px` }}
      >
        {/* Left Card - Full height and width */}
        <div className="flex-1">
          <DebtIssuancesCard 
            totalVolume="MXN 285,400 MM"
            volumeChange="+15.3%"
            corporatePercent={65}
            governmentPercent={35}
            localOperations={187}
            internationalOperations={42}
          />
        </div>

        {/* Right Card - Full height and width */}
        <div className="flex-1">
          <EquityIssuancesCard 
            totalVolume="MXN 45,200 MM"
            volumeChange="+230%"
            highlightIPO="Fibra Next"
            highlightAmount="MXN 8,000 MM"
            newIPOs={3}
            followOns={12}
            fibras={5}
          />
        </div>
      </div>
    </SectionFrame>
  );
};