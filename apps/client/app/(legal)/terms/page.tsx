'use client';
import dynamic from 'next/dynamic';

const Terms = dynamic(() => import('@/app/(legal)/components/Terms'), { ssr: false });

export default function TermsPage() {
  return <Terms />;
}
