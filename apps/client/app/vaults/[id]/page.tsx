import { getSingleVault } from '@/app/server/getSingleVault';
import { SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { SingleVault } from './components/SingleVault';

interface VaultDetailPageProps {
  params: Promise<{ id: string }>;
}

export const metadata = {
  title: 'Vault Details'
};

export const dynamic = 'force-dynamic';

export default async function VaultDetailPage({ params }: VaultDetailPageProps) {
  const { id } = await params;
  const vault = await getSingleVault({ relatedEntityId: id, take: 30, sortBy: SortBy.VaultObjectSuffix, orderBy: SortOrder.Asc });
  return <SingleVault initialVault={vault} />;
}
