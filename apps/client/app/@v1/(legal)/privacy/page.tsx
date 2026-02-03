'use client';

import dynamic from 'next/dynamic';

const PrivacyPolicy = dynamic(() => import('@/app/@v1/(legal)/components/Privacy'), { ssr: false });
export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
