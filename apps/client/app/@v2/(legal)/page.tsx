'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LegalV2Page() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/terms');
  }, [router]);

  return null;
}
