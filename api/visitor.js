// Serverless visitor counter (Vercel/Netlify compatible)
// Uses a simple in-memory + file-based approach for free tier

let visitorData = { total: 0, today: 0, date: '' };

export default async function handler(req, res) {
  const today = new Date().toISOString().slice(0, 10);

  if (visitorData.date !== today) {
    visitorData.today = 0;
    visitorData.date = today;
  }

  visitorData.total++;
  visitorData.today++;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');
  res.status(200).json({
    today: visitorData.today,
    total: visitorData.total
  });
}
