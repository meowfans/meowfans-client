import { ROUTE_METADATA } from '@/lib/metadata-config';
import { SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { Metadata } from 'next';
import { getVaultObjects } from '../server/getVaultObjects';
import { Pictures } from './components/Pictures';

export const metadata: Metadata = {
  ...ROUTE_METADATA.pictures
};

export const dynamic = 'force-dynamic';

export default async function PicturesPage() {
  const pictures = await getVaultObjects({ take: 30, sortBy: SortBy.VaultObjectLikeCount, orderBy: SortOrder.Desc });
  return <Pictures initialPictures={pictures} />;
}
