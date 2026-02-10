import { ROUTE_METADATA } from '@/lib/metadata-config';
import { Metadata } from 'next';
import { Trending } from './components/Trending';

export const metadata: Metadata = {
  ...ROUTE_METADATA.trending
};

export default function TrendingPage() {
  return <Trending />;
}
