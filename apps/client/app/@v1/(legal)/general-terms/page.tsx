'use client';

import dynamic from 'next/dynamic';

const GeneralTerms = dynamic(() => import('@/app/@v1/(legal)/components/GeneralTerms'), { ssr: false });
export default function GeneralTermsPage() {
  return <GeneralTerms />;
}
