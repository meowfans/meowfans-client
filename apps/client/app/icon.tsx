import { Logo } from '@workspace/ui/globals/Logo';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 192,
  height: 192
};
export const contentType = 'image/png';
export const alt = 'MeowFans_fan';

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
      <Logo width={192} height={192} />
    </div>,
    { ...size }
  );
}
