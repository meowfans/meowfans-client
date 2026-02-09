import React from 'react';
import { writeFile } from 'fs/promises';
import { ImageResponse } from 'next/og';
import { join } from 'path';
import { Logo } from '@workspace/ui/globals/Logo';

async function generateIcon(width: number, height: number, name: string, subPath: string) {
  const res = new ImageResponse(
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
    <Logo width={width} height={height} />
    </div>,
    { width, height }
  );

  const buffer = Buffer.from(await res.arrayBuffer());
  const outPath = join(process.cwd(), 'public', subPath, name);

  await writeFile(outPath, buffer);
  console.log(`✔ Generated ${name}`);
}

async function run() {
  await generateIcon(1080, 1920, 'mobile.png', 'screenshots');
  await generateIcon(1920, 1080, 'desktop.png', 'screenshots');
  await generateIcon(180, 180, 'apple-icon-180.png', 'icons');
  await generateIcon(192, 192, 'icon-192.png', 'icons');
  await generateIcon(512, 512, 'icon-512.png', 'icons');

}

run();
