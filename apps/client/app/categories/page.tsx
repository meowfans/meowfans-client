import { ROUTE_METADATA } from '@/lib/metadata-config';
import { Metadata } from 'next';
import { getTags } from '../server/getTags';
import { Categories } from './components/Categories';

export const metadata: Metadata = {
  ...ROUTE_METADATA.categories
};

export const dynamic = 'force-dynamic';

export default async function CategoriesPage() {
  const categories = await getTags({ take: 100 });
  return <Categories initialTags={categories} />;
}
