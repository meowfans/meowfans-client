import type { Metadata } from 'next';
import { VaultsStudioView } from './components/VaultsStudioView';

export const metadata: Metadata = {
  title: 'Vaults Studio',
  description: 'Manage your exclusive content vaults'
};

export default function VaultsStudioPage() {
  return <VaultsStudioView />;
}
