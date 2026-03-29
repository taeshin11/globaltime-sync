import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default function handler() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F7F4F0',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div style={{ width: '100%', height: '8px', backgroundColor: '#6C9A8B', position: 'absolute', top: 0 }} />
        <div style={{ fontSize: '72px', fontWeight: 'bold', color: '#2D3436', marginBottom: '16px' }}>
          GlobalTime Sync
        </div>
        <div style={{ fontSize: '28px', color: '#636E72', marginBottom: '12px' }}>
          Free Time Zone Converter & Meeting Scheduler
        </div>
        <div style={{ fontSize: '22px', color: '#B2BEC3', marginBottom: '48px' }}>
          Compare time zones instantly. Find the best meeting time for your global team.
        </div>
        <div style={{ display: 'flex', width: '800px', height: '40px', borderRadius: '6px', overflow: 'hidden' }}>
          <div style={{ width: '133px', height: '40px', backgroundColor: '#E8E4E0' }} />
          <div style={{ width: '200px', height: '40px', backgroundColor: 'rgba(108,154,139,0.25)' }} />
          <div style={{ width: '67px', height: '40px', backgroundColor: '#6C9A8B', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '16px', fontFamily: 'monospace' }}>
            NOW
          </div>
          <div style={{ width: '267px', height: '40px', backgroundColor: 'rgba(108,154,139,0.25)' }} />
          <div style={{ width: '133px', height: '40px', backgroundColor: '#E8E4E0' }} />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
