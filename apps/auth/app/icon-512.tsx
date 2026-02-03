import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 512,
  height: 512
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
      <svg width="512" height="512" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#d946ef" />
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

        {/* Auth Shield Subscript with 'A' */}
        <g>
          <path
            d="M82 66 L 96 71 V 83 C 96 91 82 98 82 98 C 82 98 68 91 68 83 V 71 L 82 66 Z"
            fill="#09090b"
            stroke="#09090b"
            strokeWidth="6"
          />
          <path d="M82 66 L 96 71 V 83 C 96 91 82 98 82 98 C 82 98 68 91 68 83 V 71 L 82 66 Z" fill="url(#g)" />
          <path d="M82 72 L 87 88 H 85 L 83.5 83 H 80.5 L 79 88 H 77 L 82 72 Z M 82 76 L 80.8 80.5 H 83.2 L 82 76 Z" fill="white" />
        </g>
      </svg>
    </div>,
    {
      ...size
    }
  );
}
