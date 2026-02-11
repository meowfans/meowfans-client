import { getFanAssets } from '@/app/server/getFanAssets';
import { ROUTE_METADATA } from '@/lib/metadata-config';
import { Metadata } from 'next';
import { Purchased } from './components/Purchased';

export const metadata: Metadata = {
  ...ROUTE_METADATA.purchased
};

export const dynamic = 'force-dynamic';

export default async function PurchasedPage() {
  const initialData = await getFanAssets({ take: 30 });
  return <Purchased initialData={initialData} />;
}
