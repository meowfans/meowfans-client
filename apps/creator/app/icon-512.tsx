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
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#fbbf24" />
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

        {/* Creator Subscript with 'C' */}
        <g>
          {/* Star/Badge shape for Creator */}
          <path
            d="M82 66 L 94 73 L 91 86 L 73 86 L 70 73 L 82 66 Z"
            fill="#000"
            stroke="#000"
            strokeWidth="6"
            transform="rotate(18 82 82)"
          />
          <path d="M82 66 L 94 73 L 91 86 L 73 86 L 70 73 L 82 66 Z" fill="url(#g)" transform="rotate(18 82 82)" />
          {/* 'C' Letter */}
          <path
            d="M86 76 C 86 76 84 74 81 74 C 77 74 76 77.5 76 81.5 C 76 85.5 77 89 81 89 C 84 89 86 87 86 87"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </svg>
    </div>,
    {
      ...size
    }
  );
}
