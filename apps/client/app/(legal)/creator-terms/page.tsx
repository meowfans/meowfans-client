'use client';

import dynamic from 'next/dynamic';

const CreatorTerms = dynamic(() => import('@/app/(legal)/components/CreatorTerms'), { ssr: false });

export default function CreatorsTermsPage() {
  return <CreatorTerms />;
}
