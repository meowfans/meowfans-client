import { getPublicVaultsByTags } from '@/app/server/getPublicVaultsByTags';
import { SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { Metadata } from 'next';
import { CategoryVaults } from './components/CategoryVaults';

interface CategoryPageProps {
  params: Promise<{ label: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { label } = await params;
  const decodedLabel = decodeURIComponent(label);
  return {
    title: `${decodedLabel} - Meowfans`,
    description: `Discover top vaults related to ${decodedLabel} on Meowfans.`
  };
}

export const dynamic = 'force-dynamic';

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { label } = await params;
  const decodedLabel = decodeURIComponent(label);

  const initialVaults = await getPublicVaultsByTags({
    searchTerm: decodedLabel,
    take: 30,
    skip: 0,
    sortBy: SortBy.VaultViewCount,
    orderBy: SortOrder.Desc
  });

  return <CategoryVaults label={decodedLabel} initialVaults={initialVaults} />;
}
