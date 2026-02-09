import { Logo } from '@workspace/ui/globals/Logo';
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
        <Logo width={128} height={128} />
      </div>
    </div>,
    {...size}
  );
}
