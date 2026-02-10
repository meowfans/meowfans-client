import { ROUTE_METADATA } from '@/lib/metadata-config';
import { Metadata } from 'next';
import { LegalIndexView } from './components/LegalIndexView';

export const metadata: Metadata = {
  ...ROUTE_METADATA.legal
};

export default function LegalPage() {
  return <LegalIndexView />;
}
