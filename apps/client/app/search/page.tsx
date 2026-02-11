import { ROUTE_METADATA } from '@/lib/metadata-config';
import { Metadata } from 'next';
import { Search } from './components/Search';

export const metadata: Metadata = {
  ...ROUTE_METADATA.search,
  title: 'Search - MeowFans',
  description: 'Search for fans, creators, and exclusive vaults on MeowFans.'
};

export default function SearchPage() {
  return <Search />;
}
