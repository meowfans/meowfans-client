'use client';

import dynamic from 'next/dynamic';

const CreatorTerms = dynamic(() => import('@/app/@v1/(legal)/components/CreatorTerms'), { ssr: false });

export default function CreatorsTermsPage() {
  return <CreatorTerms />;
}
