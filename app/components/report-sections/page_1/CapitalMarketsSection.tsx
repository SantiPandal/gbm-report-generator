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
            totalVolume="Ps.$86,860 MM"
            highlightedEmission={{
              name: "Naturgy (NM 25 & NM 25-2)",
              demand: "3.4x",
              rate: "Tasa: Variable TIIE + 63 bps (3 años) & Fijo 9.98% (7 años)",
              term: ""
            }}
            fixedPercent={60}
            variablePercent={40}
            aaaPercent={15}
            aaAPercent={85}
          />
        </div>

        {/* Right Card - Full height and width */}
        <div className="flex-1">
          <EquityIssuancesCard
            totalVolume="Ps.$13,148 MM"
            highlightedEmission={{
              name: "Fibra Next",
              amount: "Ps.$6,000 MM"
            }}
            ipoVolume={8000}
            followOnVolume={5148}
          />
        </div>
      </div>
    </SectionFrame>
  );
};