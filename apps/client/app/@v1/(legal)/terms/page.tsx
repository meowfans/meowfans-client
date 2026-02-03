'use client';
import dynamic from 'next/dynamic';

const Terms = dynamic(() => import('@/app/@v1/(legal)/components/Terms'), { ssr: false });

export default function TermsPage() {
  return <Terms />;
}
