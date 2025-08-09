import SlideBase from '../components/SlideBase';

interface ExecutiveSummarySlideProps {
  data: {
    totalDeals: number;
    totalValue: string;
    successRate: string;
    completedDeals: number;
    pendingDeals: number;
    terminatedDeals: number;
  };
}

export default function ExecutiveSummarySlide({ data }: ExecutiveSummarySlideProps) {
  return (
    <SlideBase slideNumber={2}>
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Executive Summary</h2>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-10">
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-gray-900 mb-2">{data.totalDeals}</div>
            <div className="text-sm text-gray-600">Total Deals</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-gray-900 mb-2">${data.totalValue}M</div>
            <div className="text-sm text-gray-600">Total Value</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-gray-900 mb-2">{data.successRate}%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-gray-900 mb-2">{data.completedDeals}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Market Insights</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-gray-500 mr-2">•</span>
              <span className="text-gray-700">{data.completedDeals} deals successfully completed out of {data.totalDeals} announced</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-500 mr-2">•</span>
              <span className="text-gray-700">{data.pendingDeals} transactions currently pending closure</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-500 mr-2">•</span>
              <span className="text-gray-700">{data.terminatedDeals} deals terminated during the period</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-500 mr-2">•</span>
              <span className="text-gray-700">Average deal size: ${(parseFloat(data.totalValue.replace(/,/g, '')) / data.totalDeals).toFixed(1)}M</span>
            </li>
          </ul>
        </div>
      </div>
    </SlideBase>
  );
}