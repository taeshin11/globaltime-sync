# GlobalTime Sync — Free Time Zone Converter & Meeting Scheduler

A free, responsive web dashboard that lets remote teams compare multiple time zones at a glance and find the best overlapping meeting window.

**Live:** [https://globaltime-sync.vercel.app](https://globaltime-sync.vercel.app)

## Features

- Search and add any city/timezone from the IANA database
- Live clocks with seconds, date, and UTC offset
- Visual 24-hour timeline bars per city
- Adjustable working hours per city
- Meeting overlap finder with copy-to-clipboard
- Fully responsive (mobile-first)
- Zero dependencies — vanilla HTML, CSS, JS
- SEO optimized with structured data

## Tech Stack

- Vanilla HTML + CSS + JS
- `Intl.DateTimeFormat` and `Intl.supportedValuesOf('timeZone')` APIs
- Google Sheets via Apps Script for data collection
- Adsterra ads (primary), Google AdSense (future)
- Deployed on Vercel / Netlify free tier

## Setup

```bash
# Clone and start local server
git clone <repo-url>
cd globaltime-sync
bash init.sh
```

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for Google Sheets and Adsterra configuration.
