#!/bin/bash

# Create tmp/screenshots directory if it doesn't exist
mkdir -p tmp/screenshots

# Generate timestamp-based filename
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
FILENAME="screenshot_${TIMESTAMP}.png"
FILEPATH="tmp/screenshots/${FILENAME}"

# Take screenshot based on arguments
if [ "$1" == "-W" ]; then
    # Window screenshot
    screencapture -W -x "$FILEPATH"
else
    # Full screen screenshot
    screencapture -x "$FILEPATH"
fi

# Run cleanup script to remove old screenshots
node scripts/screenshot-cleanup.js > /dev/null 2>&1

# Output the filepath for reference
echo "Screenshot saved to: $FILEPATH"