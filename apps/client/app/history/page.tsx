import { ROUTE_METADATA } from '@/lib/metadata-config';
import { Metadata } from 'next';
import { HistoryView } from './components/HistoryView';

export const metadata: Metadata = {
  ...ROUTE_METADATA.history
};

export default function HistoryPage() {
  return <HistoryView />;
}
