import { ROUTE_METADATA } from '@/lib/metadata-config';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { Settings } from './components/Settings';

export const metadata: Metadata = {
  ...ROUTE_METADATA.settings
};

export default function SettingsPage() {
  return (
    <Suspense>
      <Settings />
    </Suspense>
  );
}
