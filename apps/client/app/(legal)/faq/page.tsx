'use client';

import dynamic from 'next/dynamic';

const Faq = dynamic(() => import('@/app/(legal)/components/Faq'), { ssr: false });
export default function FaqPage() {
  return <Faq />;
}
