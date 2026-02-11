import { ROUTE_METADATA } from '@/lib/metadata-config';
import { SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { Metadata } from 'next';
import { getCreators } from '../server/getCreators';
import { getPosts } from '../server/getPosts';
import { getVaultObjects } from '../server/getVaultObjects';
import { Trending } from './components/Trending';

export const metadata: Metadata = {
  ...ROUTE_METADATA.trending
};

export const dynamic = 'force-dynamic';

export default async function TrendingPage() {
  const creators = await getCreators({ take: 6, sortBy: SortBy.AssetCount, orderBy: SortOrder.Desc });
  const posts = await getPosts({ take: 4, sortBy: SortBy.PostCreatedAt, orderBy: SortOrder.Desc });
  const vaultObjects = await getVaultObjects({ take: 4, sortBy: SortBy.VaultObjectLikeCount, orderBy: SortOrder.Desc });

  return <Trending initialCreators={creators} initialPosts={posts} initialVaultObjects={vaultObjects} />;
}
