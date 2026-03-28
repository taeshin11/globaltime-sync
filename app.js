// ============================================
// GlobalTime Sync — Main Application Logic
// ============================================

(function () {
  'use strict';

  // --- Constants ---
  const MAX_CITIES = 10;
  const DEFAULT_WORK_START = '09:00';
  const DEFAULT_WORK_END = '18:00';
  const GOOGLE_SHEETS_WEBHOOK_URL = 'GOOGLE_SHEETS_WEBHOOK_URL'; // Replace with your Apps Script URL

  // --- State ---
  let cities = [];
  let allTimezones = [];
  let clockInterval = null;
  let highlightedIndex = -1;

  // --- DOM References ---
  const citySearchInput = document.getElementById('city-search');
  const cityDropdown = document.getElementById('city-dropdown');
  const addCityBtn = document.getElementById('add-city-btn');
  const cityListEl = document.getElementById('city-list');
  const findMeetingBtn = document.getElementById('find-meeting-btn');
  const meetingResultsEl = document.getElementById('meeting-results');

  // --- Initialize ---
  function init() {
    loadTimezones();
    bindEvents();
    startClock();
    initVisitorCounter();
  }

  // --- Timezone Data ---
  function loadTimezones() {
    try {
      const tzList = Intl.supportedValuesOf('timeZone');
      allTimezones = tzList.map(tz => ({
        iana: tz,
        label: formatTzLabel(tz),
        offset: getUtcOffset(tz)
      }));
    } catch (e) {
      // Fallback: top 100 timezones
      allTimezones = getFallbackTimezones().map(tz => ({
        iana: tz,
        label: formatTzLabel(tz),
        offset: getUtcOffset(tz)
      }));
    }
  }

  // --- Region to country code mapping for flags ---
  const REGION_FLAGS = {
    'US': '\u{1F1FA}\u{1F1F8}', 'GB': '\u{1F1EC}\u{1F1E7}', 'CA': '\u{1F1E8}\u{1F1E6}',
    'AU': '\u{1F1E6}\u{1F1FA}', 'NZ': '\u{1F1F3}\u{1F1FF}', 'JP': '\u{1F1EF}\u{1F1F5}',
    'CN': '\u{1F1E8}\u{1F1F3}', 'HK': '\u{1F1ED}\u{1F1F0}', 'SG': '\u{1F1F8}\u{1F1EC}',
    'KR': '\u{1F1F0}\u{1F1F7}', 'IN': '\u{1F1EE}\u{1F1F3}', 'AE': '\u{1F1E6}\u{1F1EA}',
    'TH': '\u{1F1F9}\u{1F1ED}', 'ID': '\u{1F1EE}\u{1F1E9}', 'TW': '\u{1F1F9}\u{1F1FC}',
    'PH': '\u{1F1F5}\u{1F1ED}', 'PK': '\u{1F1F5}\u{1F1F0}', 'BD': '\u{1F1E7}\u{1F1E9}',
    'SA': '\u{1F1F8}\u{1F1E6}', 'IR': '\u{1F1EE}\u{1F1F7}', 'MY': '\u{1F1F2}\u{1F1FE}',
    'FR': '\u{1F1EB}\u{1F1F7}', 'DE': '\u{1F1E9}\u{1F1EA}', 'ES': '\u{1F1EA}\u{1F1F8}',
    'IT': '\u{1F1EE}\u{1F1F9}', 'NL': '\u{1F1F3}\u{1F1F1}', 'BE': '\u{1F1E7}\u{1F1EA}',
    'CH': '\u{1F1E8}\u{1F1ED}', 'SE': '\u{1F1F8}\u{1F1EA}', 'RU': '\u{1F1F7}\u{1F1FA}',
    'TR': '\u{1F1F9}\u{1F1F7}', 'PL': '\u{1F1F5}\u{1F1F1}', 'AT': '\u{1F1E6}\u{1F1F9}',
    'GR': '\u{1F1EC}\u{1F1F7}', 'PT': '\u{1F1F5}\u{1F1F9}', 'IE': '\u{1F1EE}\u{1F1EA}',
    'FI': '\u{1F1EB}\u{1F1EE}', 'BR': '\u{1F1E7}\u{1F1F7}', 'AR': '\u{1F1E6}\u{1F1F7}',
    'MX': '\u{1F1F2}\u{1F1FD}', 'CO': '\u{1F1E8}\u{1F1F4}', 'EG': '\u{1F1EA}\u{1F1EC}',
    'NG': '\u{1F1F3}\u{1F1EC}', 'ZA': '\u{1F1FF}\u{1F1E6}', 'KE': '\u{1F1F0}\u{1F1EA}',
    'MA': '\u{1F1F2}\u{1F1E6}', 'GH': '\u{1F1EC}\u{1F1ED}', 'FJ': '\u{1F1EB}\u{1F1EF}'
  };

  const IANA_TO_COUNTRY = {
    'America/New_York': 'US', 'America/Chicago': 'US', 'America/Denver': 'US',
    'America/Los_Angeles': 'US', 'America/Anchorage': 'US', 'America/Phoenix': 'US',
    'America/Detroit': 'US', 'America/Indiana': 'US', 'America/Boise': 'US',
    'America/Toronto': 'CA', 'America/Vancouver': 'CA', 'America/Edmonton': 'CA',
    'America/Winnipeg': 'CA', 'America/Halifax': 'CA', 'America/St_Johns': 'CA',
    'America/Sao_Paulo': 'BR', 'America/Argentina/Buenos_Aires': 'AR',
    'America/Mexico_City': 'MX', 'America/Bogota': 'CO',
    'Europe/London': 'GB', 'Europe/Paris': 'FR', 'Europe/Berlin': 'DE',
    'Europe/Madrid': 'ES', 'Europe/Rome': 'IT', 'Europe/Amsterdam': 'NL',
    'Europe/Brussels': 'BE', 'Europe/Zurich': 'CH', 'Europe/Stockholm': 'SE',
    'Europe/Moscow': 'RU', 'Europe/Istanbul': 'TR', 'Europe/Warsaw': 'PL',
    'Europe/Vienna': 'AT', 'Europe/Athens': 'GR', 'Europe/Lisbon': 'PT',
    'Europe/Dublin': 'IE', 'Europe/Helsinki': 'FI',
    'Asia/Tokyo': 'JP', 'Asia/Shanghai': 'CN', 'Asia/Hong_Kong': 'HK',
    'Asia/Singapore': 'SG', 'Asia/Seoul': 'KR', 'Asia/Kolkata': 'IN',
    'Asia/Dubai': 'AE', 'Asia/Bangkok': 'TH', 'Asia/Jakarta': 'ID',
    'Asia/Taipei': 'TW', 'Asia/Manila': 'PH', 'Asia/Karachi': 'PK',
    'Asia/Dhaka': 'BD', 'Asia/Riyadh': 'SA', 'Asia/Tehran': 'IR',
    'Asia/Kuala_Lumpur': 'MY',
    'Australia/Sydney': 'AU', 'Australia/Melbourne': 'AU', 'Australia/Brisbane': 'AU',
    'Australia/Perth': 'AU', 'Australia/Adelaide': 'AU',
    'Pacific/Auckland': 'NZ', 'Pacific/Fiji': 'FJ', 'Pacific/Honolulu': 'US',
    'Africa/Cairo': 'EG', 'Africa/Lagos': 'NG', 'Africa/Johannesburg': 'ZA',
    'Africa/Nairobi': 'KE', 'Africa/Casablanca': 'MA', 'Africa/Accra': 'GH'
  };

  function getCountryCode(iana) {
    if (IANA_TO_COUNTRY[iana]) return IANA_TO_COUNTRY[iana];
    // Try to guess from region
    const region = iana.split('/')[0];
    if (region === 'US' || iana.includes('America/Indiana') || iana.includes('America/Kentucky')
        || iana.includes('America/North_Dakota') || iana.includes('Pacific/Honolulu')) return 'US';
    return '';
  }

  function getFlag(iana) {
    const cc = getCountryCode(iana);
    return REGION_FLAGS[cc] || '\u{1F310}';
  }

  function formatTzLabel(iana) {
    const parts = iana.split('/');
    const city = (parts[parts.length - 1] || '').replace(/_/g, ' ');
    const cc = getCountryCode(iana);
    const countryName = cc || parts[0] || '';
    return city + (countryName ? ', ' + countryName : '');
  }

  function getUtcOffset(tz) {
    try {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        timeZoneName: 'shortOffset'
      });
      const parts = formatter.formatToParts(now);
      const tzPart = parts.find(p => p.type === 'timeZoneName');
      return tzPart ? tzPart.value : '';
    } catch (e) {
      return '';
    }
  }

  function getUtcOffsetMinutes(tz) {
    const now = new Date();
    const utcStr = now.toLocaleString('en-US', { timeZone: 'UTC' });
    const tzStr = now.toLocaleString('en-US', { timeZone: tz });
    const utcDate = new Date(utcStr);
    const tzDate = new Date(tzStr);
    return (tzDate - utcDate) / 60000;
  }

  // --- City Search & Dropdown ---
  function bindEvents() {
    citySearchInput.addEventListener('input', onSearchInput);
    citySearchInput.addEventListener('focus', onSearchInput);
    citySearchInput.addEventListener('keydown', onSearchKeydown);
    document.addEventListener('click', onDocumentClick);
    addCityBtn.addEventListener('click', onAddCity);
    findMeetingBtn.addEventListener('click', onFindMeeting);
  }

  function onSearchInput() {
    const query = citySearchInput.value.trim().toLowerCase();
    if (query.length < 1) {
      hideDropdown();
      return;
    }

    const matches = allTimezones
      .filter(tz =>
        tz.label.toLowerCase().includes(query) ||
        tz.iana.toLowerCase().includes(query)
      )
      .slice(0, 20);

    renderDropdown(matches);
  }

  function renderDropdown(items) {
    if (items.length === 0) {
      hideDropdown();
      return;
    }

    highlightedIndex = -1;
    cityDropdown.innerHTML = items.map((item, i) =>
      `<li role="option" data-iana="${item.iana}" data-index="${i}">
        ${getFlag(item.iana)} ${item.label} <span class="tz-offset">${item.offset}</span>
      </li>`
    ).join('');

    cityDropdown.classList.add('active');

    cityDropdown.querySelectorAll('li').forEach(li => {
      li.addEventListener('click', () => selectTimezone(li.dataset.iana));
    });
  }

  function hideDropdown() {
    cityDropdown.classList.remove('active');
    cityDropdown.innerHTML = '';
    highlightedIndex = -1;
  }

  function onSearchKeydown(e) {
    const items = cityDropdown.querySelectorAll('li');
    if (!items.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      highlightedIndex = Math.min(highlightedIndex + 1, items.length - 1);
      updateHighlight(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      highlightedIndex = Math.max(highlightedIndex - 1, 0);
      updateHighlight(items);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && items[highlightedIndex]) {
        selectTimezone(items[highlightedIndex].dataset.iana);
      }
    } else if (e.key === 'Escape') {
      hideDropdown();
    }
  }

  function updateHighlight(items) {
    items.forEach((li, i) => {
      li.classList.toggle('highlighted', i === highlightedIndex);
    });
    if (items[highlightedIndex]) {
      items[highlightedIndex].scrollIntoView({ block: 'nearest' });
    }
  }

  function onDocumentClick(e) {
    if (!e.target.closest('.search-wrapper')) {
      hideDropdown();
    }
  }

  function selectTimezone(iana) {
    citySearchInput.value = formatTzLabel(iana);
    citySearchInput.dataset.selectedIana = iana;
    hideDropdown();
  }

  // --- Inline Error Messages ---
  function showSearchError(msg) {
    let errEl = document.querySelector('.search-error');
    if (!errEl) {
      errEl = document.createElement('div');
      errEl.className = 'search-error';
      errEl.setAttribute('role', 'alert');
      citySearchInput.parentElement.parentElement.appendChild(errEl);
    }
    errEl.textContent = msg;
    setTimeout(() => { errEl.textContent = ''; }, 3000);
  }

  // --- Add / Remove City ---
  function onAddCity() {
    const iana = citySearchInput.dataset.selectedIana;
    if (!iana) return;

    if (cities.length >= MAX_CITIES) {
      showSearchError('Maximum of ' + MAX_CITIES + ' cities allowed.');
      return;
    }

    if (cities.some(c => c.iana === iana)) {
      showSearchError('This city is already added.');
      return;
    }

    cities.push({
      iana: iana,
      label: formatTzLabel(iana),
      workStart: DEFAULT_WORK_START,
      workEnd: DEFAULT_WORK_END
    });

    citySearchInput.value = '';
    citySearchInput.dataset.selectedIana = '';
    renderCities();
    updateMeetingBtnState();
  }

  function removeCity(iana) {
    cities = cities.filter(c => c.iana !== iana);
    renderCities();
    updateMeetingBtnState();
    meetingResultsEl.innerHTML = '';
  }

  function updateMeetingBtnState() {
    findMeetingBtn.disabled = cities.length < 2;
  }

  // --- Compute cross-city overlap hours (in UTC) ---
  function computeOverlapUTCHours() {
    if (cities.length < 2) return [];
    const cityUTCSlots = cities.map(city => {
      const offsetMin = getUtcOffsetMinutes(city.iana);
      const startH = parseInt(city.workStart.split(':')[0]);
      const endH = parseInt(city.workEnd.split(':')[0]);
      const localHours = [];
      if (startH <= endH) {
        for (let h = startH; h < endH; h++) localHours.push(h);
      } else {
        for (let h = startH; h < 24; h++) localHours.push(h);
        for (let h = 0; h < endH; h++) localHours.push(h);
      }
      return localHours.map(h => (((h * 60 - offsetMin) / 60) % 24 + 24) % 24).map(s => Math.round(s) % 24);
    });
    let common = cityUTCSlots[0];
    for (let i = 1; i < cityUTCSlots.length; i++) {
      common = common.filter(h => cityUTCSlots[i].includes(h));
    }
    return common;
  }

  // --- Render Cities ---
  function renderCities() {
    const overlapUTCHours = computeOverlapUTCHours();
    cityListEl.innerHTML = cities.map((city, index) => {
      const now = new Date();
      return `
        <div class="city-row" data-iana="${city.iana}" data-index="${index}">
          <div class="city-row-header">
            <div class="city-info">
              <div class="city-name">${getFlag(city.iana)} ${city.label}</div>
              <div class="city-meta">${city.iana} &middot; ${getUtcOffset(city.iana)}</div>
            </div>
            <div class="city-clock">
              <div class="clock-time" data-clock="${city.iana}">${formatTime(now, city.iana)}</div>
              <div class="clock-date" data-date="${city.iana}">${formatDate(now, city.iana)}</div>
              <div class="clock-offset">${getUtcOffset(city.iana)}</div>
            </div>
            <button class="btn btn-danger" onclick="window.__removeCity('${city.iana}')" aria-label="Remove ${city.label}">✕</button>
          </div>
          <div class="working-hours-controls">
            <label>Work hours:</label>
            <input type="time" value="${city.workStart}" data-field="workStart" data-city-index="${index}" aria-label="Work start time for ${city.label}">
            <span>to</span>
            <input type="time" value="${city.workEnd}" data-field="workEnd" data-city-index="${index}" aria-label="Work end time for ${city.label}">
          </div>
          <div class="timeline-container">
            <div class="timeline-bar" data-timeline="${city.iana}">
              ${renderTimelineBar(city, overlapUTCHours)}
            </div>
            <div class="timeline-labels">
              ${Array.from({ length: 24 }, (_, h) => `<span>${String(h).padStart(2, '0')}</span>`).join('')}
            </div>
          </div>
        </div>`;
    }).join('');

    // Bind working hours change events
    cityListEl.querySelectorAll('.working-hours-controls input[type="time"]').forEach(input => {
      input.addEventListener('change', onWorkingHoursChange);
    });
  }

  function onWorkingHoursChange(e) {
    const index = parseInt(e.target.dataset.cityIndex);
    const field = e.target.dataset.field;
    if (cities[index]) {
      cities[index][field] = e.target.value;
      renderCities();
    }
  }

  // Expose removeCity globally for inline onclick
  window.__removeCity = removeCity;

  // --- Timeline Bar ---
  function renderTimelineBar(city, overlapUTCHours) {
    const now = new Date();
    const currentHour = parseInt(new Intl.DateTimeFormat('en-US', {
      timeZone: city.iana,
      hour: 'numeric',
      hour12: false
    }).format(now));

    const workStartH = parseInt(city.workStart.split(':')[0]);
    const workEndH = parseInt(city.workEnd.split(':')[0]);

    // Convert UTC overlap hours to local hours for this city
    const offsetMin = getUtcOffsetMinutes(city.iana);
    const overlapLocalHours = (overlapUTCHours || []).map(
      utcH => Math.round(((utcH * 60 + offsetMin) / 60 + 24) % 24) % 24
    );

    return Array.from({ length: 24 }, (_, h) => {
      const classes = ['timeline-hour'];

      // Night hours (22:00 - 06:00)
      if (h >= 22 || h < 6) {
        classes.push('night');
      } else {
        classes.push('day');
      }

      // Working hours
      if (workStartH <= workEndH) {
        if (h >= workStartH && h < workEndH) {
          classes.push('working');
        }
      } else {
        if (h >= workStartH || h < workEndH) {
          classes.push('working');
        }
      }

      // Cross-city overlap highlight
      if (overlapLocalHours.includes(h)) {
        classes.push('overlap');
      }

      // Current hour
      if (h === currentHour) {
        classes.push('current');
      }

      return `<div class="${classes.join(' ')}" data-hour="${h}">${h}</div>`;
    }).join('');
  }

  // --- Live Clock ---
  function startClock() {
    updateClocks();
    clockInterval = setInterval(updateClocks, 1000);
  }

  function updateClocks() {
    const now = new Date();
    cities.forEach(city => {
      const clockEl = document.querySelector(`[data-clock="${city.iana}"]`);
      const dateEl = document.querySelector(`[data-date="${city.iana}"]`);
      if (clockEl) clockEl.textContent = formatTime(now, city.iana);
      if (dateEl) dateEl.textContent = formatDate(now, city.iana);
    });

    // Update timeline current hour markers every minute
    const seconds = now.getSeconds();
    if (seconds === 0) {
      const overlapUTCHours = computeOverlapUTCHours();
      cities.forEach(city => {
        const timelineEl = document.querySelector(`[data-timeline="${city.iana}"]`);
        if (timelineEl) {
          timelineEl.innerHTML = renderTimelineBar(city, overlapUTCHours);
        }
      });
    }
  }

  function formatTime(date, tz) {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: tz,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(date);
  }

  function formatDate(date, tz) {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  }

  // --- Meeting Overlap Finder ---
  function onFindMeeting() {
    if (cities.length < 2) return;

    const overlaps = findOverlappingHours();
    renderMeetingResults(overlaps);
    postToGoogleSheets(overlaps);
  }

  function findOverlappingHours() {
    // Convert each city's working hours to UTC hour slots
    const cityUTCSlots = cities.map(city => {
      const offsetMin = getUtcOffsetMinutes(city.iana);
      const startH = parseInt(city.workStart.split(':')[0]);
      const endH = parseInt(city.workEnd.split(':')[0]);
      const localHours = [];

      if (startH <= endH) {
        for (let h = startH; h < endH; h++) localHours.push(h);
      } else {
        for (let h = startH; h < 24; h++) localHours.push(h);
        for (let h = 0; h < endH; h++) localHours.push(h);
      }

      // Convert local hours to UTC: utcHour = localHour - offset
      return localHours.map(h => (((h * 60 - offsetMin) / 60) % 24 + 24) % 24).map(s => Math.round(s) % 24);
    });

    // Find common UTC hours
    let commonHours = cityUTCSlots[0];
    for (let i = 1; i < cityUTCSlots.length; i++) {
      commonHours = commonHours.filter(h => cityUTCSlots[i].includes(h));
    }

    commonHours.sort((a, b) => a - b);

    // Group into contiguous windows
    const windows = [];
    let currentWindow = [];
    for (let i = 0; i < commonHours.length; i++) {
      if (currentWindow.length === 0 || commonHours[i] === currentWindow[currentWindow.length - 1] + 1) {
        currentWindow.push(commonHours[i]);
      } else {
        windows.push([...currentWindow]);
        currentWindow = [commonHours[i]];
      }
    }
    if (currentWindow.length > 0) {
      windows.push(currentWindow);
    }

    // Convert windows back to local times for each city
    return windows.map(win => {
      const utcStart = win[0];
      const utcEnd = (win[win.length - 1] + 1) % 24;
      const duration = win.length;

      const localTimes = cities.map(city => {
        const offsetMin = getUtcOffsetMinutes(city.iana);
        const localStart = ((utcStart * 60 + offsetMin) / 60 + 24) % 24;
        const localEnd = ((utcEnd * 60 + offsetMin) / 60 + 24) % 24;
        return {
          city: city.label,
          iana: city.iana,
          start: formatHour(Math.round(localStart)),
          end: formatHour(Math.round(localEnd))
        };
      });

      return { utcStart, utcEnd, duration, localTimes };
    }).sort((a, b) => b.duration - a.duration);
  }

  function formatHour(h) {
    return String(h % 24).padStart(2, '0') + ':00';
  }

  function renderMeetingResults(windows) {
    if (windows.length === 0) {
      meetingResultsEl.innerHTML = `
        <div class="no-overlap-msg">
          No overlapping working hours found across all selected cities.
          Try adjusting working hours or reducing the number of cities.
        </div>`;
      return;
    }

    meetingResultsEl.innerHTML = windows.map((win, i) => {
      const quality = win.duration >= 4 ? 'perfect' : win.duration >= 2 ? 'limited' : 'none';
      const qualityLabel = win.duration >= 4 ? 'Perfect overlap' : win.duration >= 2 ? 'Limited window' : 'Tight window';

      const cityTimesHtml = win.localTimes.map(lt =>
        `<li><strong>${lt.city}:</strong> ${lt.start} – ${lt.end}</li>`
      ).join('');

      const copyText = win.localTimes.map(lt => `${lt.city}: ${lt.start} \u2013 ${lt.end}`).join('\n');

      return `
        <div class="meeting-result-card">
          <span class="result-quality ${quality}">${qualityLabel} (${win.duration}h)</span>
          <div class="result-time-range">UTC ${formatHour(win.utcStart)} – ${formatHour(win.utcEnd)}</div>
          <ul class="result-city-times">${cityTimesHtml}</ul>
          <div class="result-actions">
            <button class="btn btn-sm btn-copy" data-copy="${copyText.replace(/"/g, '&quot;')}" aria-live="polite">Copy to clipboard</button>
          </div>
        </div>`;
    }).join('');
  }

  // Copy button event delegation
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('[data-copy]');
    if (!btn) return;
    navigator.clipboard.writeText(btn.dataset.copy).then(() => {
      btn.textContent = 'Copied!';
      setTimeout(() => { btn.textContent = 'Copy to clipboard'; }, 2000);
    }).catch(() => {
      btn.textContent = 'Failed';
      setTimeout(() => { btn.textContent = 'Copy to clipboard'; }, 2000);
    });
  });

  // --- Google Sheets POST ---
  async function postToGoogleSheets(overlaps) {
    if (GOOGLE_SHEETS_WEBHOOK_URL === 'GOOGLE_SHEETS_WEBHOOK_URL') return;
    try {
      await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cities: cities.map(c => c.iana),
          workingHours: cities.map(c => ({ iana: c.iana, start: c.workStart, end: c.workEnd })),
          bestSlots: overlaps.slice(0, 3),
          userAgent: navigator.userAgent,
          language: navigator.language
        }),
        mode: 'no-cors'
      });
    } catch (err) {
      console.error('Sheet POST failed:', err);
    }
  }

  // --- Visitor Counter ---
  function initVisitorCounter() {
    const counterEl = document.getElementById('visitor-counter');
    let total = parseInt(localStorage.getItem('gts_visitor_total') || '0');
    let todayCount = 0;
    const todayKey = new Date().toISOString().slice(0, 10);
    const storedDay = localStorage.getItem('gts_visitor_day');

    if (storedDay === todayKey) {
      todayCount = parseInt(localStorage.getItem('gts_visitor_today') || '0');
    }

    total++;
    todayCount++;
    localStorage.setItem('gts_visitor_total', total);
    localStorage.setItem('gts_visitor_today', todayCount);
    localStorage.setItem('gts_visitor_day', todayKey);

    counterEl.textContent = `\u{1F465} Today: ${todayCount.toLocaleString()} \u00B7 Total: ${total.toLocaleString()}`;

    // Try serverless counter if available
    fetchServerCounter(counterEl);
  }

  async function fetchServerCounter(counterEl) {
    try {
      const res = await fetch('/api/visitor');
      if (res.ok) {
        const data = await res.json();
        if (data.today != null && data.total != null) {
          counterEl.textContent = `\u{1F465} Today: ${data.today.toLocaleString()} \u00B7 Total: ${data.total.toLocaleString()}`;
        }
      }
    } catch (e) {
      // Silently fall back to localStorage counter
    }
  }

  // --- Fallback Timezones ---
  function getFallbackTimezones() {
    return [
      'America/New_York','America/Chicago','America/Denver','America/Los_Angeles',
      'America/Anchorage','America/Sao_Paulo','America/Argentina/Buenos_Aires',
      'America/Mexico_City','America/Bogota','America/Toronto',
      'Europe/London','Europe/Paris','Europe/Berlin','Europe/Madrid','Europe/Rome',
      'Europe/Amsterdam','Europe/Brussels','Europe/Zurich','Europe/Stockholm',
      'Europe/Moscow','Europe/Istanbul','Europe/Warsaw','Europe/Vienna',
      'Europe/Athens','Europe/Lisbon','Europe/Dublin','Europe/Helsinki',
      'Asia/Tokyo','Asia/Shanghai','Asia/Hong_Kong','Asia/Singapore',
      'Asia/Seoul','Asia/Kolkata','Asia/Dubai','Asia/Bangkok',
      'Asia/Jakarta','Asia/Taipei','Asia/Manila','Asia/Karachi',
      'Asia/Dhaka','Asia/Riyadh','Asia/Tehran','Asia/Kuala_Lumpur',
      'Australia/Sydney','Australia/Melbourne','Australia/Brisbane',
      'Australia/Perth','Australia/Adelaide',
      'Pacific/Auckland','Pacific/Fiji','Pacific/Honolulu',
      'Africa/Cairo','Africa/Lagos','Africa/Johannesburg','Africa/Nairobi',
      'Africa/Casablanca','Africa/Accra'
    ];
  }

  // --- Start ---
  document.addEventListener('DOMContentLoaded', init);
})();
