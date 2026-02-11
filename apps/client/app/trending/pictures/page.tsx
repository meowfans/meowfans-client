import { getVaultObjects } from '@/app/server/getVaultObjects';
import { SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { TrendingPictures } from './components/TrendingPictures';

export const metadata = {
  title: 'Trending Pictures'
};

export const dynamic = 'force-dynamic';

export default async function TrendingPicturesPage() {
  const vaultObjects = await getVaultObjects({ take: 30, sortBy: SortBy.VaultObjectLikeCount, orderBy: SortOrder.Desc });
  return <TrendingPictures initialVaultObjects={vaultObjects} />;
}
