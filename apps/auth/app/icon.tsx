import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 192,
  height: 192
};
export const contentType = 'image/png';
export const alt = 'MeowFans Auth';

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent'
      }}
    >
      <svg width="192" height="192" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#63f168ff" />
            <stop offset="100%" stopColor="#46ef54ff" />
          </linearGradient>
        </defs>
        <path
          d="M20 70 V 35 L 50 65 L 80 35 V 70"
          stroke="url(#g)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path d="M20 35 L 20 20 L 40 35" stroke="url(#g)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M80 35 L 80 20 L 60 35" stroke="url(#g)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <g>
          <path d="M82 66 L 96 71 V 83 C 96 91 82 98 82 98 C 82 98 68 91 68 83 V 71 L 82 66 Z" fill="#000" stroke="#000" strokeWidth="6" />
          <path d="M82 67.5 L 94 72 V 82.5 C 94 89 82 95 82 95 C 82 95 70 89 70 82.5 V 72 L 82 67.5 Z" fill="url(#g)" />
          <path
            d="M82 68.5 L 92.5 72.5 V 82 C 92.5 87.5 82 93 82 93 C 82 93 71.5 87.5 71.5 82 V 72.5 L 82 68.5 Z"
            fill="none"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="1.5"
          />
          <path d="M82 74 L88 90 H85.5 L84.2 86 H79.8 L78.5 90 H76 L82 74 Z M82 78 L80.9 82.5 H83.1 L82 78 Z" fill="#fff" />
        </g>
      </svg>
    </div>,
    {
      ...size
    }
  );
}
