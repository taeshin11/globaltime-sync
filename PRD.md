# PRD: GlobalTime Sync — Time Zone Converter & Meeting Scheduler

## 0. How to Use This Document (Harness Instructions for Claude Code)

> **This PRD is the single source of truth.** Claude Code must read this file at the start of every session and follow the structure below. No human intervention should be needed between milestones.

### Harness Workflow

1. **Planner Phase** — Read this PRD in full. Do NOT start coding until you understand every section.
2. **Initializer Phase** — On the very first session, create these files:
   - `feature_list.json` — ordered list of features with status (`pending`, `in-progress`, `done`)
   - `claude-progress.txt` — human-readable log of what was completed and what's next
   - `init.sh` — script to install dependencies and start the dev server
3. **Session Start Routine (every session):**
   - Read `claude-progress.txt`
   - Read `feature_list.json`
   - Run existing tests / verify the dev server starts
   - Pick the next `pending` feature, set it to `in-progress`
   - Implement → test → commit → update progress → next feature
4. **Builder / Reviewer Split** — After implementing each feature, self-review the code against the acceptance criteria listed below before marking it `done`.
5. **Git Discipline** — Commit after every completed feature. Push at every major milestone (marked with 🚀 below).

---

## 1. Project Overview

| Field | Value |
|---|---|
| Service Name | GlobalTime Sync |
| Short Title | Time Zone Converter |
| Goal | A free, responsive web dashboard that lets remote teams compare multiple time zones at a glance and find the best overlapping meeting window. |
| Core Tech | Vanilla HTML + CSS + JS (no framework). Uses the built-in `Intl.DateTimeFormat` and `Intl.supportedValuesOf('timeZone')` APIs — zero paid dependencies. |
| Monetization | Adsterra ads (primary), Google AdSense (secondary/future). |
| Data Collection | Google Sheets via Apps Script webhook — completely free. |
| Hosting | Deployed on **Vercel** or **Netlify** free tier (hide GitHub username from end users). |

---

## 2. Non-Negotiable Requirements

These rules apply to EVERY decision Claude Code makes:

| # | Rule |
|---|---|
| R1 | **Zero cost.** No paid APIs, no paid hosting, no paid databases. Everything must run on free tiers. |
| R2 | **SEO-optimized.** Semantic HTML, meta tags, Open Graph, structured data (`WebApplication` schema), descriptive `<title>`, clean URLs. |
| R3 | **Fully responsive.** Mobile-first design. Must look great on 320px–2560px screens. |
| R4 | **Soft, muted background palette.** No harsh whites or saturated neons. Think warm ivory / soft slate / gentle pastels. |
| R5 | **Visitor counter.** Show "Today: X · Total: Y" visitors in a subtle, non-intrusive location (e.g., footer or small badge). Use a free counting service or a lightweight JSON-bin approach. |
| R6 | **Git push at every milestone.** Create the GitHub repo using `gh` CLI. Push at each 🚀 milestone. |
| R7 | **Automate everything possible via CLI.** If a problem can be solved with a shell command, do NOT write a manual guide — run the command. |
| R8 | **No exposed GitHub URL to end users.** Deploy to Vercel or Netlify so users access a clean `*.vercel.app` or `*.netlify.app` domain. Perform the actual deployment via CLI (`vercel --prod` or `netlify deploy --prod`), not just a guide. |
| R9 | **Google Sheets webhook integration.** Wire up an Apps Script Web App endpoint. When a user clicks the "Calculate / Find Meeting Time" button, POST the selected cities + proposed time to the Sheet automatically. Do NOT just document how — implement the fetch call in the code. |
| R10 | **Ad-ready from day one.** Integrate **Adsterra** ad units first (banner + native). Reserve clearly marked ad slots in the layout. When the Adsterra dashboard provides a key/script, drop it into the designated `<!-- AD SLOT -->` placeholder. Also prepare a secondary slot for Google AdSense for future use. |
| R11 | **Adsterra integration detail.** Place Adsterra ad script in these locations: (a) top banner 728×90 (desktop) / 320×50 (mobile), (b) sidebar or inline native ad between content sections. Use the placeholder `ADSTERRA_AD_KEY` in the code. Once the ad unit is created in the Adsterra dashboard, replace `ADSTERRA_AD_KEY` with the real key. |

---

## 3. Information Architecture & Pages

The site is a **single-page application (SPA)** with logical sections:

```
index.html
├── Header (logo, tagline, top ad banner)
├── Hero Section (headline + brief description for SEO)
├── Time Zone Dashboard (core feature)
│   ├── City Selector (searchable dropdown)
│   ├── Horizontal Bar Timeline (24h, live-updating)
│   ├── "Add City" button
│   └── Overlap Finder / Meeting Scheduler
│       ├── Working hours highlight (09:00–18:00 default, adjustable)
│       ├── "Find Best Meeting Time" button (→ triggers Google Sheets POST)
│       └── Result display
├── Inline Ad Slot (Adsterra native ad)
├── FAQ / How-to Section (SEO content)
├── Footer
│   ├── Visitor counter ("Today: X · Total: Y")
│   ├── Copyright
│   └── Secondary ad slot
└── Structured Data (JSON-LD in <head>)
```

---

## 4. Feature List & Milestones

Complete features in this exact order. Each milestone marked 🚀 requires `git add . && git commit && git push`.

### Milestone 1: Project Scaffolding 🚀
| ID | Feature | Acceptance Criteria |
|----|---------|-------------------|
| F01 | Create GitHub repo via `gh repo create globaltime-sync --public --clone` | Repo exists on GitHub |
| F02 | Create `index.html`, `style.css`, `app.js`, `README.md` | Files exist with boilerplate |
| F03 | Create `feature_list.json`, `claude-progress.txt`, `init.sh` | Harness files in place |
| F04 | Add SEO meta tags, Open Graph, JSON-LD structured data | Valid structured data |
| F05 | Set soft background color palette as CSS variables | `--bg-primary: #F5F0EB` (warm ivory), `--bg-secondary: #E8E4DF`, `--accent: #6B8F71` (sage green), `--text: #2C3E50` (soft navy) — or similar muted, warm tones |

### Milestone 2: Core Time Zone Dashboard 🚀
| ID | Feature | Acceptance Criteria |
|----|---------|-------------------|
| F06 | Searchable city/timezone dropdown using `Intl.supportedValuesOf('timeZone')` | User can search and select any IANA timezone |
| F07 | Add City button — adds a timezone row | Up to 10 cities can be added; duplicates prevented |
| F08 | Remove City button per row | Click X removes the row |
| F09 | Horizontal 24h bar per city showing current time | Bar updates every minute; current hour highlighted |
| F10 | Live clock display per city (HH:MM:SS, date, UTC offset) | Ticks every second |
| F11 | Responsive layout — stacks vertically on mobile, horizontal bars on desktop | Looks good at 320px and 1440px |

### Milestone 3: Meeting Overlap Finder 🚀
| ID | Feature | Acceptance Criteria |
|----|---------|-------------------|
| F12 | Working-hours overlay on each bar (default 09:00–18:00) | Green-shaded region on the bar |
| F13 | Adjustable working hours per city (start/end sliders or inputs) | User can change from default |
| F14 | "Find Best Meeting Time" algorithm | Finds overlapping working hours across all selected cities; shows result or "No overlap" |
| F15 | Display recommended meeting windows sorted by overlap duration | Clear, readable output |

### Milestone 4: Google Sheets Data Collection 🚀
| ID | Feature | Acceptance Criteria |
|----|---------|-------------------|
| F16 | Create Google Apps Script Web App that accepts POST with JSON body and appends to a Sheet | Script deployed; URL works with `curl` test |
| F17 | On "Find Best Meeting Time" click, POST `{ cities, workingHours, bestSlots, timestamp }` to the Apps Script URL | Network tab shows successful POST; data appears in Sheet |
| F18 | Silently collect — no user-facing indication that data is stored | UX is seamless; no pop-ups about data collection |

**Google Apps Script code to create (deploy as Web App, "Anyone" access):**
```javascript
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
```
> **Claude Code:** Embed this script content in `google-apps-script.js` for reference. In `app.js`, implement the `fetch()` POST call pointing to a placeholder URL `GOOGLE_SHEETS_WEBHOOK_URL`. The user will replace this with their deployed Apps Script URL.

### Milestone 5: Ads Integration 🚀
| ID | Feature | Acceptance Criteria |
|----|---------|-------------------|
| F19 | Add Adsterra top banner ad slot (728×90 desktop / 320×50 mobile) | `<!-- ADSTERRA_BANNER_AD -->` placeholder with surrounding responsive container |
| F20 | Add Adsterra inline/native ad slot between Dashboard and FAQ | `<!-- ADSTERRA_NATIVE_AD -->` placeholder |
| F21 | Add footer ad slot (secondary, for future Google AdSense) | `<!-- ADSENSE_FOOTER_AD -->` placeholder |
| F22 | Create `ads-config.js` with clear instructions: replace `ADSTERRA_AD_KEY` with real key from Adsterra dashboard | File exists with placeholder and comments |
| F23 | Ad containers are responsive and don't break layout when empty | No layout shift when ads are absent |

**Adsterra Integration Pattern:**
```html
<!-- Top Banner Ad (replace ADSTERRA_BANNER_KEY with your key from Adsterra dashboard) -->
<div class="ad-container ad-banner" id="adsterra-banner">
  <script type="text/javascript">
    // Adsterra banner ad script will go here
    // After creating ad unit in Adsterra dashboard:
    // 1. Go to https://www.adsterra.com → Publishers → Ad Units
    // 2. Create a "Banner" unit (728x90)
    // 3. Copy the provided script and paste here
    // atOptions = { 'key': 'ADSTERRA_BANNER_KEY', 'format': 'iframe', 'height': 90, 'width': 728 };
  </script>
</div>

<!-- Native/Social Bar Ad -->
<div class="ad-container ad-native" id="adsterra-native">
  <!-- Adsterra Social Bar or Native Banner script here -->
  <!-- Create a "Social Bar" unit in Adsterra for best engagement -->
</div>
```

### Milestone 6: Visitor Counter 🚀
| ID | Feature | Acceptance Criteria |
|----|---------|-------------------|
| F24 | Integrate free visitor counter (use CountAPI, a free JSON-bin, or a simple Netlify/Vercel serverless function) | Counter increments on page load |
| F25 | Display "Today: X · Total: Y" in footer, subtle styling | Small font, muted color, doesn't distract from main content |
| F26 | If CountAPI is unavailable, implement fallback using `localStorage` for display + serverless function for persistence | Works even if external service is down |

**Recommended approach — Vercel/Netlify serverless (free):**
Create `/api/visitor.js`:
```javascript
// Simple KV-based counter using Vercel KV, or JSON file on serverless
export default async function handler(req, res) {
  // Implementation depends on platform
  // Option A: Use free JSONbin.io
  // Option B: Use Vercel KV free tier
  // Option C: Use a simple counter API like countapi.xyz (if still available)
  // Return { today: number, total: number }
}
```

### Milestone 7: SEO & Performance Polish 🚀
| ID | Feature | Acceptance Criteria |
|----|---------|-------------------|
| F27 | Lighthouse score ≥ 90 for Performance, SEO, Accessibility, Best Practices | Run `npx lighthouse` via CLI and verify |
| F28 | Add `sitemap.xml` and `robots.txt` | Files exist at root |
| F29 | Add FAQ section with 5+ common questions (structured as `FAQPage` schema) | JSON-LD validates |
| F30 | Add `<link rel="canonical">` and `lang` attribute | Present in `<head>` |
| F31 | Minify CSS and JS for production | Minified files in `/dist` or inline |

### Milestone 8: Deployment 🚀
| ID | Feature | Acceptance Criteria |
|----|---------|-------------------|
| F32 | Deploy to **Vercel** via CLI (`npx vercel --prod`) OR **Netlify** via CLI (`npx netlify deploy --prod`) | Live URL accessible |
| F33 | Verify all features work on deployed URL | Manual smoke test checklist |
| F34 | Update `README.md` with deployed URL (the Vercel/Netlify URL, NOT the GitHub URL) | README has live link |
| F35 | Final `git push` with all production-ready code | Clean commit history |

---

## 5. Tech Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Frontend | Vanilla HTML + CSS + JS | Zero build cost, fast, SEO-friendly |
| Timezone Data | `Intl.DateTimeFormat`, `Intl.supportedValuesOf('timeZone')` | Built into every modern browser, no API calls |
| Data Collection | Google Sheets + Apps Script | 100% free, no database needed |
| Hosting | Vercel or Netlify (free tier) | Auto-SSL, CDN, custom-ish domain, hides GitHub username |
| Visitor Counter | CountAPI / JSONbin.io / Serverless function | Free tier sufficient |
| Ads | Adsterra (primary), Google AdSense (future) | Adsterra has lower entry barrier and faster approval |
| Version Control | GitHub + `gh` CLI | Automated repo management |

---

## 6. Design System

### Color Palette (Soft & Muted)
```css
:root {
  /* Backgrounds */
  --bg-primary: #F7F4F0;       /* warm off-white */
  --bg-secondary: #EDE9E3;     /* soft beige */
  --bg-card: #FFFFFF;           /* clean white for cards */
  --bg-accent: #F0EBE3;        /* warm highlight */

  /* Text */
  --text-primary: #2D3436;     /* soft charcoal */
  --text-secondary: #636E72;   /* muted gray */
  --text-muted: #B2BEC3;       /* light gray */

  /* Accents */
  --accent-primary: #6C9A8B;   /* sage green */
  --accent-secondary: #D4A373; /* warm terracotta */
  --accent-info: #74B9FF;      /* soft blue */
  --accent-warning: #FDCB6E;   /* gentle yellow */
  --accent-danger: #E17055;    /* muted coral */

  /* Working hours overlay */
  --overlap-good: rgba(108, 154, 139, 0.25);  /* translucent sage */
  --overlap-great: rgba(108, 154, 139, 0.45); /* stronger sage */

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.06);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.08);
}
```

### Typography
- **Display / Headings:** `'DM Serif Display'` from Google Fonts (elegant, free)
- **Body:** `'Plus Jakarta Sans'` from Google Fonts (modern, readable, free)
- **Mono (times):** `'JetBrains Mono'` from Google Fonts (clean monospace for clocks)

### Responsive Breakpoints
```css
/* Mobile first */
/* sm: 640px */
/* md: 768px */
/* lg: 1024px */
/* xl: 1280px */
```

---

## 7. UI Component Details

### 7.1 City Selector
- Searchable input with dropdown
- Shows city name + country flag emoji + UTC offset
- Autocomplete from `Intl.supportedValuesOf('timeZone')`
- Parse IANA names into human-readable: `America/New_York` → `New York, US`

### 7.2 Horizontal Timeline Bar
- Each city gets a horizontal 24-hour bar
- Hours 0–23 displayed left to right
- Current hour: highlighted pill/marker that moves in real-time
- Working hours: shaded overlay (default 09:00–18:00)
- Night hours (22:00–06:00): slightly darker background
- Overlap region across all cities: highlighted in accent color

### 7.3 Meeting Result Card
- Shows best overlapping time windows
- Displays in each city's local time
- Copy-to-clipboard button for sharing
- Visual quality indicator (e.g., "Perfect overlap" / "Limited window" / "No overlap")

### 7.4 Visitor Counter (Footer)
- Small, muted text: `👥 Today: 42 · Total: 1,337`
- Right-aligned in footer or bottom-left corner
- Does not compete with main content

### 7.5 Ad Containers
- `.ad-container` class with `max-width`, centered, subtle border or background
- `min-height` set to prevent layout shift
- Gracefully collapses when no ad is loaded
- Never overlaps with functional UI

---

## 8. Google Sheets Webhook Setup (Step-by-Step for Claude Code)

Claude Code must create a file `google-apps-script.js` with the full Apps Script code and a `SETUP_GUIDE.md` with these steps:

1. Go to [Google Sheets](https://sheets.google.com) → Create new spreadsheet
2. Name it `GlobalTime Sync - Data Collection`
3. Add headers in Row 1: `Timestamp | Cities | Working Hours | Best Slots | User Agent | Language`
4. Go to Extensions → Apps Script
5. Paste the code from `google-apps-script.js`
6. Deploy → New Deployment → Web App → "Anyone" access → Deploy
7. Copy the Web App URL
8. Replace `GOOGLE_SHEETS_WEBHOOK_URL` in `app.js` with the URL

**In `app.js`, implement this function:**
```javascript
async function postToGoogleSheets(data) {
  const WEBHOOK_URL = 'GOOGLE_SHEETS_WEBHOOK_URL'; // Replace with your Apps Script URL
  try {
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cities: data.cities,
        workingHours: data.workingHours,
        bestSlots: data.bestSlots,
        userAgent: navigator.userAgent,
        language: navigator.language
      }),
      mode: 'no-cors' // Required for Apps Script
    });
  } catch (err) {
    console.error('Sheet POST failed:', err);
    // Silent fail — don't disrupt UX
  }
}
```

---

## 9. Adsterra Monetization Setup

### Why Adsterra First (Not Google AdSense)
- No minimum traffic requirement for approval
- Faster approval process (usually within 24 hours)
- Multiple ad formats: Banner, Social Bar, Native, Popunder
- Pays via PayPal, Bitcoin, Wire (low $5 minimum payout)

### Ad Placement Strategy
| Slot | Format | Location | Size |
|------|--------|----------|------|
| Top Banner | Display Banner | Above hero section | 728×90 (desktop) / 320×50 (mobile) |
| Inline Native | Native Banner | Between dashboard and FAQ | Responsive |
| Social Bar | Social Bar | Fixed bottom overlay | Auto |
| Footer | Reserved (AdSense) | Footer area | 728×90 |

### Integration Steps
1. Sign up at [Adsterra Publishers](https://publishers.adsterra.com)
2. Add your deployed site URL as a new website
3. Wait for approval (typically < 24 hours)
4. Create ad units in the dashboard:
   - Create a **Banner** ad unit → Copy the script → Replace `ADSTERRA_BANNER_KEY` in `index.html`
   - Create a **Social Bar** ad unit → Copy the script → Replace `ADSTERRA_NATIVE_AD` section in `index.html`
5. The code already has responsive ad containers — just paste the Adsterra scripts into the marked slots

### Code Placeholder Pattern
```javascript
// ads-config.js
const ADS_CONFIG = {
  adsterra: {
    enabled: true,
    bannerKey: 'ADSTERRA_BANNER_KEY',    // Replace after dashboard setup
    nativeKey: 'ADSTERRA_NATIVE_KEY',    // Replace after dashboard setup
    socialBarKey: 'ADSTERRA_SOCIAL_KEY'  // Replace after dashboard setup
  },
  adsense: {
    enabled: false, // Enable after AdSense approval
    publisherId: 'ca-pub-XXXXXXXXXXXXXXXX'
  }
};
```

---

## 10. Deployment Checklist (CLI-Automated)

Claude Code must run these commands — do NOT just document them:

```bash
# 1. Create GitHub repo
gh repo create globaltime-sync --public --clone
cd globaltime-sync

# 2. After all features are complete, deploy:

# Option A: Vercel
npm i -g vercel
vercel --prod --yes

# Option B: Netlify
npm i -g netlify-cli
netlify init
netlify deploy --prod --dir=.

# 3. Get the deployed URL and update README
```

---

## 11. SEO Optimization Checklist

- [ ] `<title>` = "GlobalTime Sync — Free Time Zone Converter & Meeting Scheduler"
- [ ] `<meta name="description">` = "Compare time zones across cities instantly. Find the best meeting time for your global team. Free, no sign-up required."
- [ ] Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`)
- [ ] Twitter Card meta tags
- [ ] `<html lang="en">`
- [ ] `<link rel="canonical" href="DEPLOYED_URL">`
- [ ] JSON-LD `WebApplication` schema
- [ ] JSON-LD `FAQPage` schema
- [ ] `sitemap.xml` with the deployed URL
- [ ] `robots.txt` allowing all crawlers
- [ ] Semantic HTML (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<nav>`)
- [ ] All images have `alt` text
- [ ] `<h1>` used once, proper heading hierarchy

---

## 12. File Structure

```
globaltime-sync/
├── index.html              # Main SPA page
├── style.css               # All styles (mobile-first)
├── app.js                  # Core application logic
├── ads-config.js           # Ad configuration & placeholders
├── google-apps-script.js   # Apps Script code (for user to deploy)
├── sitemap.xml             # SEO sitemap
├── robots.txt              # SEO robots
├── favicon.ico             # Favicon
├── og-image.png            # Open Graph share image (create via HTML/CSS screenshot or simple SVG)
├── SETUP_GUIDE.md          # Google Sheets & Adsterra setup instructions
├── README.md               # Project readme with live deployed URL
├── feature_list.json       # Harness: feature tracking
├── claude-progress.txt     # Harness: session progress log
├── init.sh                 # Harness: dev server startup
├── api/                    # Serverless functions (if using Vercel/Netlify)
│   └── visitor.js          # Visitor counter endpoint
└── .gitignore
```

---

## 13. Testing Criteria

Before each `git push`, verify:

1. **Functionality:** Add 3+ cities, see live clocks, find meeting overlap
2. **Responsive:** Test at 320px, 768px, 1024px, 1440px widths
3. **Performance:** Page loads in < 2 seconds on throttled 3G
4. **SEO:** Run `npx lighthouse --only-categories=seo` → score ≥ 90
5. **Accessibility:** Run `npx lighthouse --only-categories=accessibility` → score ≥ 90
6. **Ads:** Ad containers render without breaking layout (even when empty)
7. **Data Collection:** "Find Best Meeting Time" triggers POST (check browser Network tab)
8. **Visitor Counter:** Number increments on page load, displays in footer
9. **Cross-browser:** Works in Chrome, Firefox, Safari (latest)

---

## 14. Session End Routine

At the end of every session, Claude Code must:

1. Update `claude-progress.txt` with:
   - Features completed this session
   - Any blockers encountered
   - What to start next session
2. Update `feature_list.json` — mark completed features as `done`
3. Commit with descriptive message: `feat: [F##] description`
4. Push if a milestone was reached
5. Log the current state of the dev server (running? URL?)

---

## 15. Emergency Fallbacks

| Problem | Solution |
|---------|----------|
| `Intl.supportedValuesOf` not available | Hardcode top 100 timezones as fallback array |
| CountAPI is down | Use `localStorage` counter with note that total is approximate |
| Google Sheets webhook fails | Silent fail, log to console, don't block UX |
| Adsterra script slow to load | Lazy-load ads after main content renders; use `async` attribute |
| Vercel/Netlify CLI fails | Try the other platform; both are supported |
| `gh` CLI not authenticated | Run `gh auth login` and follow prompts |

---

*Last updated: 2025-03-28*
*Version: 1.0.0*
*Status: Ready for Implementation*
