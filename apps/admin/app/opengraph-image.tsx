import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'MeowFans - Premium Content Ecosystem';
export const size = {
  width: 1200,
  height: 630
};

export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#050505',
        fontFamily: 'sans-serif',
        backgroundImage:
          'radial-gradient(circle at 25px 25px, #202025 2%, transparent 0%), radial-gradient(circle at 75px 75px, #202025 2%, transparent 0%)',
        backgroundSize: '100px 100px'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 40,
          transform: 'scale(1.5)'
        }}
      >
        <svg width="128" height="128" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          <path
            d="M20 70 V 35 L 50 65 L 80 35 V 70"
            stroke="url(#g)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path d="M20 35 L 20 20 L 40 35" stroke="url(#g)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M80 35 L 80 20 L 60 35" stroke="url(#g)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <g>
            <path
              d="M82 66 L 96 71 V 83 C 96 91 82 98 82 98 C 82 98 68 91 68 83 V 71 L 82 66 Z"
              fill="#050505"
              stroke="#050505"
              strokeWidth="6"
            />
            <path d="M82 66 L 96 71 V 83 C 96 91 82 98 82 98 C 82 98 68 91 68 83 V 71 L 82 66 Z" fill="url(#g)" />
            <path d="M82 72 L 87 88 H 85 L 83.5 83 H 80.5 L 79 88 H 77 L 82 72 Z M 82 76 L 80.8 80.5 H 83.2 L 82 76 Z" fill="white" />
          </g>
        </svg>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 900,
            background: 'linear-gradient(to right, #fff, #a1a1aa)',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: 20,
            letterSpacing: '-0.05em'
          }}
        >
          MEOWFANS
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 600,
            color: '#8181a5',
            letterSpacing: '0.2em',
            textTransform: 'uppercase'
          }}
        >
          Premium Content Ecosystem
        </div>
      </div>
    </div>,
    {
      ...size
    }
  );
}
