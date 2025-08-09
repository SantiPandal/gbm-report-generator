import SlideBase from '../components/SlideBase';

interface IndustryBreakdownSlideProps {
  data: {
    industries: [string, number][];
  };
}

export default function IndustryBreakdownSlide({ data }: IndustryBreakdownSlideProps) {
  return (
    <SlideBase slideNumber={4}>
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Industry Breakdown</h2>
        
        {/* Industry Cards Grid */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {data.industries.map(([industry, count], index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-8 text-center shadow-sm">
              <div className="text-4xl font-bold text-gray-900 mb-3">{count}</div>
              <div className="text-base text-gray-600">{industry}</div>
            </div>
          ))}
        </div>

        {/* Sector Analysis */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sector Analysis</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-gray-500 mr-2">•</span>
              <span className="text-gray-700">
                Most active sector: {data.industries[0]?.[0]} ({data.industries[0]?.[1]} deals)
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-500 mr-2">•</span>
              <span className="text-gray-700">
                Diversified deal flow across {data.industries.length}+ sectors
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-500 mr-2">•</span>
              <span className="text-gray-700">
                Strong activity in traditional industries and emerging sectors
              </span>
            </li>
          </ul>
        </div>
      </div>
    </SlideBase>
  );
}