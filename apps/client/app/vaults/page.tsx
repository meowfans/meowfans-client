import { getVaults } from '@/app/server/getVaults';
import { ROUTE_METADATA } from '@/lib/metadata-config';
import { CreatorType, DataFetchType, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { Metadata } from 'next';
import { Vaults } from './components/Vaults';

export const metadata: Metadata = {
  ...ROUTE_METADATA.vaults
};

export const dynamic = 'force-dynamic';

export default async function VaultsPage() {
  const initialVaults = await getVaults({
    take: 30,
    skip: 0,
    dataFetchType: DataFetchType.InfiniteScroll,
    sortBy: SortBy.VaultViewCount,
    orderBy: SortOrder.Desc,
    creatorType: [CreatorType.ImportedOnlyFansUser, CreatorType.ImportedPornStar]
  });
  return <Vaults initialVaults={initialVaults} />;
}
