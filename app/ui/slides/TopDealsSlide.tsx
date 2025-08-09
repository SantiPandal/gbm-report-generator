import SlideBase from '../components/SlideBase';

interface Deal {
  'Target Name': string;
  'Acquirer Name': string;
  'Announced Total Value (mil.)': string;
  'Deal Status': string;
  'Target Industry Sector': string;
}

interface TopDealsSlideProps {
  data: {
    topDeals: Deal[];
  };
}

export default function TopDealsSlide({ data }: TopDealsSlideProps) {
  return (
    <SlideBase slideNumber={3}>
      <div className="h-full flex flex-col">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Top Transactions by Value</h2>
        
        {/* Table */}
        <div className="flex-1 overflow-hidden">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full flex flex-col">
            {/* Table Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-700">
                <div className="col-span-3">Target Company</div>
                <div className="col-span-3">Acquirer</div>
                <div className="col-span-2">Value ($M)</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Sector</div>
              </div>
            </div>
            
            {/* Table Body */}
            <div className="flex-1 divide-y divide-gray-200">
              {data.topDeals.map((deal, index) => (
                <div key={index} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="grid grid-cols-12 gap-4 text-sm">
                    <div className="col-span-3 text-gray-900 font-medium truncate">
                      {deal['Target Name']}
                    </div>
                    <div className="col-span-3 text-gray-700 truncate">
                      {deal['Acquirer Name']}
                    </div>
                    <div className="col-span-2 text-gray-900 font-semibold">
                      ${deal['Announced Total Value (mil.)']}
                    </div>
                    <div className="col-span-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        deal['Deal Status'] === 'Completed' 
                          ? 'bg-green-100 text-green-800'
                          : deal['Deal Status'] === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {deal['Deal Status']}
                      </span>
                    </div>
                    <div className="col-span-2 text-gray-600 text-xs truncate">
                      {deal['Target Industry Sector']}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SlideBase>
  );
}