'use client';

import dynamic from 'next/dynamic';

const Compliance = dynamic(() => import('@/app/(legal)/components/Compliance'), { ssr: false });
export default function Compliance2257Page() {
  return <Compliance />;
}
