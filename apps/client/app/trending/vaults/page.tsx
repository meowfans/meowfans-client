import { getVaults } from '@/app/server/getVaults';
import { SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { TrendingVaults } from './components/TrendingVaults';

export const metadata = {
  title: 'Trending Vaults'
};

export const dynamic = 'force-dynamic';

export default async function TrendingVaultsPage() {
  const vaults = await getVaults({ take: 30, sortBy: SortBy.VaultViewCount, orderBy: SortOrder.Desc });
  return <TrendingVaults initialVaults={vaults} />;
}
