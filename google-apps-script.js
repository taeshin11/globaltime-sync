// Google Apps Script — Deploy as Web App with "Anyone" access
// Paste this code into Extensions > Apps Script in your Google Sheet.
//
// Sheet setup:
//   Row 1 headers: Timestamp | Cities | Working Hours | Best Slots | User Agent | Language
//
// Deploy steps:
//   1. Click Deploy > New Deployment
//   2. Select "Web app"
//   3. Set "Who has access" to "Anyone"
//   4. Click Deploy and copy the URL
//   5. Replace GOOGLE_SHEETS_WEBHOOK_URL in app.js with the URL

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(),
    JSON.stringify(data.cities),
    JSON.stringify(data.workingHours),
    JSON.stringify(data.bestSlots),
    data.userAgent || '',
    data.language || ''
  ]);
  return ContentService.createTextOutput(
    JSON.stringify({ status: 'ok' })
  ).setMimeType(ContentService.MimeType.JSON);
}
