import path from 'node:path';
import { mkdir } from 'node:fs/promises';
import puppeteer from 'puppeteer';

const DEFAULT_URL = 'http://localhost:3000/preview';
const DEFAULT_OUTPUT = 'tmp/gbm-report.pdf';
const DEFAULT_SELECTOR = '[data-report-ready="true"]';

const resolveOutputPath = (relativeOrAbsolutePath) => {
  if (!relativeOrAbsolutePath) {
    return path.join(process.cwd(), DEFAULT_OUTPUT);
  }

  return path.isAbsolute(relativeOrAbsolutePath)
    ? relativeOrAbsolutePath
    : path.join(process.cwd(), relativeOrAbsolutePath);
};

const parseArgs = () => {
  return {
    url: process.env.REPORT_PREVIEW_URL || DEFAULT_URL,
    outputPath: resolveOutputPath(process.env.REPORT_PDF_PATH || DEFAULT_OUTPUT),
    waitForSelector: process.env.REPORT_READY_SELECTOR || DEFAULT_SELECTOR,
    emulateMedia: process.env.REPORT_EMULATE_MEDIA || 'print',
    timeoutMs: Number(process.env.REPORT_WAIT_TIMEOUT ?? 30000),
    extraWaitMs: Number(process.env.REPORT_EXTRA_WAIT ?? 800),
    chromiumExecutable: process.env.CHROMIUM_EXECUTABLE,
    chromiumArgs: process.env.CHROMIUM_ARGS,
  };
};

const launchBrowser = async ({ chromiumExecutable, chromiumArgs }) => {
  const launchOptions = {
    headless: 'new',
  };

  if (chromiumExecutable) {
    launchOptions.executablePath = chromiumExecutable;
  }

  if (chromiumArgs) {
    launchOptions.args = chromiumArgs.split(' ');
  }

  return puppeteer.launch(launchOptions);
};

const waitForFonts = async (page) => {
  const hasFontLoadingApi = await page.evaluate(() => typeof document.fonts !== 'undefined');
  if (!hasFontLoadingApi) {
    return;
  }

  await page.evaluate(() => document.fonts.ready.then(() => undefined));
};

const main = async () => {
  const {
    url,
    outputPath,
    waitForSelector,
    emulateMedia,
    timeoutMs,
    extraWaitMs,
    chromiumExecutable,
    chromiumArgs,
  } = parseArgs();

  console.log(`[print-report] Launching Chromium...`);
  const browser = await launchBrowser({ chromiumExecutable, chromiumArgs });

  try {
    const page = await browser.newPage();
    page.setDefaultTimeout(timeoutMs);

    console.log(`[print-report] Navigating to ${url}`);
    await page.goto(url, { waitUntil: 'networkidle0' });

    if (waitForSelector) {
      console.log(`[print-report] Waiting for selector ${waitForSelector}`);
      await page.waitForSelector(waitForSelector, { timeout: timeoutMs });
    }

    await waitForFonts(page);
    if (extraWaitMs > 0) {
      await page.waitForTimeout(extraWaitMs);
    }

    if (emulateMedia) {
      console.log(`[print-report] Emulating ${emulateMedia} media`);
      await page.emulateMediaType(emulateMedia);
    }

    const targetDirectory = path.dirname(outputPath);
    await mkdir(targetDirectory, { recursive: true });

    console.log(`[print-report] Saving PDF to ${outputPath}`);
    await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0mm',
        right: '0mm',
        bottom: '0mm',
        left: '0mm',
      },
      preferCSSPageSize: true,
    });

    console.log('[print-report] Done');
  } finally {
    await browser.close();
  }
};

main().catch((error) => {
  console.error('[print-report] Failed to generate PDF');
  console.error(error);
  process.exitCode = 1;
});
