import { VaultObjectsView } from './components/VaultObjectsView';

interface VaultIdPageProps {
  params: Promise<{ id: string }>;
}

export default async function VaultIdPage({ params }: VaultIdPageProps) {
  const { id } = await params;
  return <VaultObjectsView id={id} />;
}
