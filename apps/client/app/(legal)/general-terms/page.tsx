'use client';

import dynamic from 'next/dynamic';

const GeneralTerms = dynamic(() => import('@/app/(legal)/components/GeneralTerms'), { ssr: false });
export default function GeneralTermsPage() {
  return <GeneralTerms />;
}
