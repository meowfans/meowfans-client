'use client';

import dynamic from 'next/dynamic';

const FanTerms = dynamic(() => import('@/app/(legal)/components/FanTerms'), { ssr: false });
export default function FansTermsPage() {
  return <FanTerms />;
}
