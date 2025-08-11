import { ResumenMexicoSection } from "./ResumenMexicoSection";
import { TransaccionesMexicoSection } from "./TransaccionesMexicoSection";

export const Page2 = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <ResumenMexicoSection />
      <TransaccionesMexicoSection />
    </div>
  )
}