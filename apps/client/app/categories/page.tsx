import { ROUTE_METADATA } from '@/lib/metadata-config';
import { Metadata } from 'next';
import { Categories } from './components/Categories';

export const metadata: Metadata = {
  ...ROUTE_METADATA.categories
};

export default function CategoriesPage() {
  return <Categories />;
}
