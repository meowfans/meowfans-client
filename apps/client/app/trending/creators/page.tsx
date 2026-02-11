import { getCreators } from '@/app/server/getCreators';
import { SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { Metadata } from 'next';
import { TrendingCreators } from './components/TrendingCreators';

export const metadata: Metadata = {
  title: 'Trending Creators'
};

export const dynamic = 'force-dynamic';

export default async function TrendingCreatorsPage() {
  const creators = await getCreators({ take: 40, sortBy: SortBy.VaultCount, orderBy: SortOrder.Desc });
  return <TrendingCreators initialCreators={creators} />;
}
