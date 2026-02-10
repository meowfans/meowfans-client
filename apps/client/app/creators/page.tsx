import { ROUTE_METADATA } from '@/lib/metadata-config';
import { Metadata } from 'next';
import { Creators } from './components/Creators';

export const metadata: Metadata = {
  ...ROUTE_METADATA.creators
};

export default function CreatorsPage() {
  return <Creators />;
}
