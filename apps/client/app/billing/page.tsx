import { ROUTE_METADATA } from '@/lib/metadata-config';
import { Metadata } from 'next';
import { Billing } from './components/Billing';

export const metadata: Metadata = {
  ...ROUTE_METADATA.billing
};

export default function BillingPage() {
  return <Billing />;
}
