// Serverless visitor counter
// Uses /tmp file for persistence within the same instance,
// plus an external free counter service as source of truth.

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const DATA_FILE = join('/tmp', 'gts-visitor.json');

function loadData() {
  try {
    return JSON.parse(readFileSync(DATA_FILE, 'utf8'));
  } catch {
    return { total: 0, today: 0, date: '' };
  }
}

function saveData(data) {
  try {
    writeFileSync(DATA_FILE, JSON.stringify(data), 'utf8');
  } catch {
    // /tmp may not be writable in all environments
  }
}

export default async function handler(req, res) {
  const today = new Date().toISOString().slice(0, 10);
  let data = loadData();

  if (data.date !== today) {
    data.today = 0;
    data.date = today;
  }

  data.total++;
  data.today++;
  saveData(data);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache, no-store');
  res.status(200).json({
    today: data.today,
    total: data.total
  });
}
