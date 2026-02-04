import React from 'react';
import { writeFile } from 'fs/promises';
import { ImageResponse } from 'next/og';
import { join } from 'path';

async function generateIcon(size: number, name: string) {
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
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#8b5cf6" />
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
      </svg>
    </div>,
    { width: size, height: size }
  );

  const buffer = Buffer.from(await res.arrayBuffer());
  const outPath = join(process.cwd(), 'public/icons', name);

  await writeFile(outPath, buffer);
  console.log(`✔ Generated ${name}`);
}

async function run() {
  await generateIcon(192, 'icon-192.png');
  await generateIcon(512, 'icon-512.png');
  await generateIcon(180, 'apple-icon-180.png');
}

run();
