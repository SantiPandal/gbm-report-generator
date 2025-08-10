import { CapitalMarketsSection } from "./CapitalMarketsSection";
import { MAPerspectiveSection } from "./MAPerspectiveSection";
import { PanoramaHeaderSection } from "./PanoramaHeaderSection";

export const Page1 = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <PanoramaHeaderSection />
      <MAPerspectiveSection />
      <CapitalMarketsSection />
    </div>
  )
}