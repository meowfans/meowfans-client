'use client';

import dynamic from 'next/dynamic';

const PrivacyPolicy = dynamic(() => import('@/app/(legal)/components/Privacy'), { ssr: false });
export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
