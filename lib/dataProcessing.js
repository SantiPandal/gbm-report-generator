// Client-side data processing utilities
import Papa from 'papaparse';

/**
 * Transform CSV data into actionable M&A insights
 * @param {Array} csvData - Parsed CSV data array
 * @returns {Object} Processed insights object
 */
export function transformCSVToInsights(csvData) {
  const deals = csvData.slice(0, 10); // Take first 10 deals
  
  const totalValue = deals
    .filter(deal => deal['Announced Total Value (mil.)'])
    .reduce((acc, deal) => acc + parseFloat(deal['Announced Total Value (mil.)'] || 0), 0);
  
  const completedDeals = deals.filter(deal => deal['Deal Status'] === 'Completed').length;
  const terminatedDeals = deals.filter(deal => deal['Deal Status'] === 'Terminated').length;
  
  // Sector analysis
  const sectorCounts = deals.reduce((acc, deal) => {
    const sector = deal['Target Industry Sector'] || 'Unknown';
    acc[sector] = (acc[sector] || 0) + 1;
    return acc;
  }, {});
  
  // Top sectors
  const topSectors = Object.entries(sectorCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3);
  
  // Average deal size
  const validDeals = deals.filter(deal => deal['Announced Total Value (mil.)']);
  const avgDealSize = validDeals.length > 0 
    ? totalValue / validDeals.length 
    : 0;
  
  return {
    totalDeals: deals.length,
    totalValue: `$${totalValue.toLocaleString()}M`,
    completedDeals,
    terminatedDeals,
    successRate: ((completedDeals / deals.length) * 100).toFixed(1),
    avgDealSize: `$${avgDealSize.toFixed(1)}M`,
    topSectors: topSectors.map(([sector, count]) => ({ sector, count })),
    deals: deals.slice(0, 5) // Top 5 for display
  };
}

/**
 * Convert Excel file to CSV format (client-side)
 * Requires xlsx library: npm install xlsx
 * @param {File} excelFile - Excel file object
 * @returns {Promise<string>} CSV string
 */
export async function convertExcelToCSV(excelFile) {
  // This requires the xlsx library to be installed
  // npm install xlsx
  
  try {
    const XLSX = await import('xlsx');
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          
          // Get first worksheet
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          
          // Convert to CSV
          const csvString = XLSX.utils.sheet_to_csv(worksheet);
          resolve(csvString);
        } catch (error) {
          reject(new Error(`Excel parsing failed: ${error.message}`));
        }
      };
      
      reader.onerror = () => reject(new Error('File reading failed'));
      reader.readAsArrayBuffer(excelFile);
    });
  } catch (error) {
    throw new Error('xlsx library not installed. Run: npm install xlsx');
  }
}