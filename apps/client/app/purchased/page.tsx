import { ROUTE_METADATA } from '@/lib/metadata-config';
import { Metadata } from 'next';
import { Purchased } from './components/Purchased';

export const metadata: Metadata = {
  ...ROUTE_METADATA.purchased
};

export default function PurchasedPage() {
  return <Purchased />;
}
