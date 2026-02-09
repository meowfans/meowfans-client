import { Logo } from '@workspace/ui/globals/Logo';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'MeowFans Admin - Administrative Control Panel';
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
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: 20,
            letterSpacing: '-0.05em'
          }}
        >
          <span style={{ color: '#fff' }}>MEOWFANS</span>
          <span
            style={{
              background: 'linear-gradient(to right, #ef4444, #b91c1c)',
              backgroundClip: 'text',
              color: 'transparent',
              fontStyle: 'italic'
            }}
          >
            ADMIN
          </span>
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
          Administrative Control Panel
        </div>
      </div>
    </div>,
    {
      ...size
    }
  );
}
