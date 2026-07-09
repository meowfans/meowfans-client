import { ROUTE_METADATA } from '@/lib/metadata-config';
import { Metadata } from 'next';
import { Upgrade } from './components/Upgrade';

export const metadata: Metadata = {
  ...ROUTE_METADATA.upgrade
};

export default function UpgradePage() {
  return <Upgrade />;
}
