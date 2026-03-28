# Setup Guide — GlobalTime Sync

## Google Sheets Data Collection

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Name it **GlobalTime Sync - Data Collection**
3. Add headers in Row 1: `Timestamp | Cities | Working Hours | Best Slots | User Agent | Language`
4. Go to **Extensions > Apps Script**
5. Delete the default code and paste the contents of `google-apps-script.js`
6. Click **Deploy > New Deployment**
7. Select **Web app**, set "Who has access" to **Anyone**, click **Deploy**
8. Copy the Web App URL
9. Open `app.js` and replace `GOOGLE_SHEETS_WEBHOOK_URL` with the copied URL

## Adsterra Ad Integration

1. Sign up at [Adsterra Publishers](https://publishers.adsterra.com)
2. Add your deployed site URL as a new website
3. Wait for approval (typically < 24 hours)
4. Create ad units:
   - **Banner** ad unit (728x90) — copy the script, replace `ADSTERRA_BANNER_KEY` in `index.html`
   - **Social Bar** or **Native Banner** — copy the script, replace the `ADSTERRA_NATIVE_AD` section in `index.html`
5. Update keys in `ads-config.js`

## Google AdSense (Future)

1. Apply for AdSense at [google.com/adsense](https://www.google.com/adsense)
2. Once approved, paste the ad unit code into the `ADSENSE_FOOTER_AD` slot in `index.html`
3. Set `adsense.enabled = true` in `ads-config.js`
