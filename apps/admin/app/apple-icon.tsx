import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 180,
  height: 180
};
export const contentType = 'image/png';

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
      <svg width="180" height="180" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <rect width="100" height="100" rx="20" fill="#09090b" />

        <g filter="url(#glow)">
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
        </g>

        {/* Admin Subscript with 'A' and Crown/Octagon */}
        <g>
          {/* Octagon shape for Admin/Power */}
          <path d="M82 66 L 94 71 V 86 L 82 96 L 70 86 V 71 L 82 66 Z" fill="#09090b" stroke="#09090b" strokeWidth="6" />
          <path d="M82 66 L 94 71 V 86 L 82 96 L 70 86 V 71 L 82 66 Z" fill="url(#g)" />
          {/* 'A' Letter (Stylized) */}
          <path d="M82 74 L 88 88 H 85.5 L 82 80 L 78.5 88 H 76 L 82 74 Z M 82 79 L 80.5 83 H 83.5 L 82 79 Z" fill="white" />
        </g>
      </svg>
    </div>,
    {
      ...size
    }
  );
}
