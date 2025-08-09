#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const TMP_DIR = path.join(__dirname, '..', 'tmp', 'screenshots');
const MAX_AGE_MINUTES = 10; // Delete screenshots older than 10 minutes

function cleanupOldScreenshots() {
  if (!fs.existsSync(TMP_DIR)) {
    return;
  }

  const now = Date.now();
  const maxAge = MAX_AGE_MINUTES * 60 * 1000;

  try {
    const files = fs.readdirSync(TMP_DIR);
    
    files.forEach(file => {
      if (file.match(/\.(png|jpg|jpeg|gif|webp)$/i)) {
        const filePath = path.join(TMP_DIR, file);
        const stats = fs.statSync(filePath);
        const age = now - stats.mtimeMs;
        
        if (age > maxAge) {
          fs.unlinkSync(filePath);
          console.log(`Deleted old screenshot: ${file}`);
        }
      }
    });
  } catch (error) {
    console.error('Error cleaning up screenshots:', error);
  }
}

// Run cleanup
cleanupOldScreenshots();

// Export for use in other scripts
module.exports = { cleanupOldScreenshots };