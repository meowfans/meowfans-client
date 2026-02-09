import { VaultDetailView } from './components/VaultDetailView';

interface VaultDetailPageProps {
  params: Promise<{ id: string }>;
}

export const metadata = {
  title: 'Vault Details'
};

export default async function VaultDetailPage({ params }: VaultDetailPageProps) {
  const { id } = await params;
  return <VaultDetailView vaultId={id} />;
}
