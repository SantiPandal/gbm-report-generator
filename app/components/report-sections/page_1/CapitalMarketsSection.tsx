import { SectionFrame } from '../SectionFrame';
import { layout } from '@/lib/design/tokens';
import { DebtIssuancesCard } from '../../charts/DebtIssuancesCard';
import { EquityIssuancesCard } from '../../charts/EquityIssuancesCard';
import { useReportData } from '@/app/data-map/ReportDataContext';

const asPercentValue = (value: number | null | undefined) => (value ?? 0);

const parseBreakdown = (
  entries: { Category: string; Value: number | null }[],
  predicate: (category: string) => boolean,
) =>
  entries
    .filter((entry) => predicate(entry.Category))
    .map((entry) => ({
      label: entry.Category,
      value: asPercentValue(entry.Value),
    }));

const parseCurrencyValue = (value: string) => {
  const numeric = Number(value.replace(/[^0-9.]/g, ''));
  return Number.isFinite(numeric) ? numeric : 0;
};

export const CapitalMarketsSection = () => {
  const sectionPadding = layout.sectionPaddingPx;
  const reportData = useReportData();
  const debtSummary = reportData['0_3_A'];
  const equitySummary = reportData['0_3_B'];

  const rateBreakdown = parseBreakdown(
    debtSummary.Data,
    (category) => {
      const lower = category.toLowerCase();
      return lower.includes('rate') || lower.includes('tasa');
    },
  );

  const ratingBreakdown = parseBreakdown(
    debtSummary.Data,
    (category) => {
      const lower = category.toLowerCase();
      return lower.includes('rating') || lower.includes('calificacion') || lower.includes('calificación');
    },
  );

  const [demandSegment = '', rateSegment = '', ...restSegments] = debtSummary.Featured_Issuance_Details.split(';').map((segment) => segment.trim());
  const termSegment = restSegments.length ? restSegments.join(' ') : '';

  const ipoRow = equitySummary.Data.find((row) => row.Category.toLowerCase().includes('ipo'));
  const followOnRow = equitySummary.Data.find((row) => row.Category.toLowerCase().includes('follow-on'));

  const ipoAmount = ipoRow ? parseCurrencyValue(ipoRow.Value) : 0;
  const followOnAmount = followOnRow ? parseCurrencyValue(followOnRow.Value) : 0;

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
            totalVolumeLabel={debtSummary.Total_Volume_YTD_2025}
            highlightedEmission={{
              name: debtSummary.Featured_Issuance_Name,
              demand: demandSegment.replace(/^Demand:\s*/i, ''),
              rate: rateSegment.replace(/^Rate:\s*/i, ''),
              term: termSegment,
            }}
            rateBreakdown={rateBreakdown}
            ratingBreakdown={ratingBreakdown}
          />
        </div>

        {/* Right Card - Full height and width */}
        <div className="flex-1">
          <EquityIssuancesCard
            totalVolumeLabel={equitySummary.Total_Volume_YTD_2025}
            highlightedEmission={{
              name: equitySummary.Featured_Issuance_Name,
              amountLabel: equitySummary.Featured_Issuance_Amount,
            }}
            ipoVolume={ipoAmount}
            followOnVolume={followOnAmount}
          />
        </div>
      </div>
    </SectionFrame>
  );
};
