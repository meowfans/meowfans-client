import { ROUTE_METADATA } from '@/lib/metadata-config';
import { Metadata } from 'next';
import { Following } from './components/Following';

export const metadata: Metadata = {
  ...ROUTE_METADATA.following
};

export default function FollowingPage() {
  return <Following />;
}
