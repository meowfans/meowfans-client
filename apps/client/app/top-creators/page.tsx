import { ROUTE_METADATA } from '@/lib/metadata-config';
import { Metadata } from 'next';
import { TopCreatorsView } from './components/TopCreatorsView';

export const metadata: Metadata = {
  ...ROUTE_METADATA.topCreators
};

export default function TopCreatorsPage() {
  return <TopCreatorsView />;
}
