import { ROUTE_METADATA } from '@/lib/metadata-config';
import { Metadata } from 'next';
import { Profile } from './components/Profile';

export const metadata: Metadata = {
  ...ROUTE_METADATA.profile
};

export default function ProfilePage() {
  return <Profile />;
}
