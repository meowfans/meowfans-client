import { ROUTE_METADATA } from '@/lib/metadata-config';
import { Metadata } from 'next';
import { Shorts } from './components/Shorts';

export const metadata: Metadata = {
  ...ROUTE_METADATA.shorts
};

export default function ShortsPage() {
  return <Shorts />;
}
