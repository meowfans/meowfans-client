'use client';

import dynamic from 'next/dynamic';

const Compliance = dynamic(() => import('@/app/@v1/(legal)/components/Compliance'), { ssr: false });
export default function Compliance2257Page() {
  return <Compliance />;
}
