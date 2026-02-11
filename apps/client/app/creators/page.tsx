import { ROUTE_METADATA } from '@/lib/metadata-config';
import { CreatorType, DataFetchType, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { Metadata } from 'next';
import { getCreators } from '../server/getCreators';
import { Creators } from './components/Creators';

export const metadata: Metadata = {
  ...ROUTE_METADATA.creators
};

export const dynamic = 'force-dynamic';

export default async function CreatorsPage() {
  const creators = await getCreators({
    sortBy: SortBy.UserCreatedAt,
    orderBy: SortOrder.Desc,
    creatorType: Object.values(CreatorType),
    dataFetchType: DataFetchType.InfiniteScroll
  });
  return <Creators initialCreators={creators} />;
}
