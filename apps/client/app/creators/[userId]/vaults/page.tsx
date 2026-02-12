import { getPublicCreatorVaults } from '@/app/server/getPublicCreatorVaults';
import { SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { Metadata } from 'next';
import { VaultsView } from './components/VaultsView';

interface VaultsPageProps {
  params: Promise<{ userId: string }>;
}

export async function generateMetadata({ params }: VaultsPageProps): Promise<Metadata> {
  const { userId } = await params;
  return {
    title: `Vaults by @${userId}`,
    description: `View all vaults from ${userId} on MeowFans.`
  };
}

export default async function Page({ params }: VaultsPageProps) {
  const { userId } = await params;
  const vaults = await getPublicCreatorVaults({
    relatedUserId: userId,
    take: 30,
    sortBy: SortBy.VaultCreatedAt,
    orderBy: SortOrder.Desc
  });

  return <VaultsView userId={userId} initialVaults={vaults} />;
}
