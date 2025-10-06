import fs from 'node:fs';
import path from 'node:path';
import { parseReportDataFromXlsx } from '../lib/processing/reportDataParser';

const [inputArg, outputArg] = process.argv.slice(2);
const inputPath = inputArg ?? 'test_cleaned.xlsx';
const absoluteInput = path.resolve(process.cwd(), inputPath);

const reportData = parseReportDataFromXlsx(absoluteInput);

if (outputArg) {
  const absoluteOutput = path.resolve(process.cwd(), outputArg);
  fs.writeFileSync(absoluteOutput, JSON.stringify(reportData, null, 2));
  console.log(`Report data written to ${absoluteOutput}`);
} else {
  console.log(JSON.stringify(reportData, null, 2));
}
