import type { Metadata } from 'next';
import { VaultsStudio } from './components/VaultsStudio';

export const metadata: Metadata = {
  title: 'Vaults Studio',
  description: 'Manage your exclusive content vaults'
};

export default function VaultsStudioPage() {
  return <VaultsStudio />;
}
