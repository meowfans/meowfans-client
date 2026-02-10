import { ROUTE_METADATA } from '@/lib/metadata-config';
import { Metadata } from 'next';
import { Vaults } from './components/Vaults';

export const metadata: Metadata = {
  ...ROUTE_METADATA.vaults
};

export default function VaultsPage() {
  return <Vaults />;
}
