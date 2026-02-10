import { ROUTE_METADATA } from '@/lib/metadata-config';
import { Metadata } from 'next';
import { UpgradeView } from './components/UpgradeView';

export const metadata: Metadata = {
  ...ROUTE_METADATA.upgrade
};

export default function UpgradePage() {
  return <UpgradeView />;
}
