import { Metadata } from 'next';
import { VaultsView } from './components/VaultsView';

export const metadata: Metadata = {
  title: 'Vaults Management',
  description: 'Manage your exclusive content collections'
};

export default function VaultsPage() {
  return <VaultsView />;
}
