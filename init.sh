#!/bin/bash
# GlobalTime Sync — Development Server Startup

echo "Starting GlobalTime Sync dev server..."

# Check if npx is available for a simple HTTP server
if command -v npx &> /dev/null; then
  echo "Starting server at http://localhost:3000"
  npx serve -l 3000 .
elif command -v python3 &> /dev/null; then
  echo "Starting server at http://localhost:3000"
  python3 -m http.server 3000
elif command -v python &> /dev/null; then
  echo "Starting server at http://localhost:3000"
  python -m http.server 3000
else
  echo "No suitable HTTP server found. Install Node.js or Python."
  echo "Or open index.html directly in your browser."
  exit 1
fi
