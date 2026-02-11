import { getShorts } from '@/app/server/getShorts';
import { ROUTE_METADATA } from '@/lib/metadata-config';
import { Metadata } from 'next';
import { Shorts } from './components/Shorts';

export const metadata: Metadata = {
  ...ROUTE_METADATA.shorts
};

export const dynamic = 'force-dynamic';

export default async function ShortsPage() {
  const shorts = await getShorts({ take: 10 });
  return <Shorts initialShorts={shorts} />;
}
