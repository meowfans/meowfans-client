import { ROUTE_METADATA } from '@/lib/metadata-config';
import { Metadata } from 'next';
import { getHistory } from '../server/getHistory';
import { History } from './components/History';

export const metadata: Metadata = {
  ...ROUTE_METADATA.history
};

export default async function HistoryPage() {
  const initialHistory = await getHistory({ take: 30 });

  return <History initialHistory={initialHistory} />;
}
