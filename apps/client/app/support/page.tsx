import { ROUTE_METADATA } from '@/lib/metadata-config';
import { Metadata } from 'next';
import { Support } from './components/Support';

export const metadata: Metadata = {
  ...ROUTE_METADATA.support
};

export default function SupportPage() {
  return <Support />;
}
