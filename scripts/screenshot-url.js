#!/usr/bin/env node

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function takeScreenshot(url, outputPath) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Set viewport size for consistent screenshots
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1
    });
    
    // Navigate to the URL
    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    
    // Wait a bit more for any dynamic content to load
    await page.waitForTimeout(2000);
    
    // Take screenshot
    await page.screenshot({
      path: outputPath,
      fullPage: true,
      type: 'png'
    });
    
    console.log(`Screenshot saved to: ${outputPath}`);
    
    // Return page content for analysis
    const content = await page.content();
    return content;
    
  } catch (error) {
    console.error('Error taking screenshot:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

// Main execution
async function main() {
  const url = process.argv[2] || 'http://localhost:3000/ui';
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const outputDir = path.join(__dirname, '..', 'tmp', 'screenshots');
  
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const outputPath = path.join(outputDir, `ui-screenshot-${timestamp}.png`);
  
  try {
    const content = await takeScreenshot(url, outputPath);
    console.log('Screenshot completed successfully');
    return outputPath;
  } catch (error) {
    console.error('Failed to take screenshot:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { takeScreenshot };