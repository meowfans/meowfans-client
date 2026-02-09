import type { Metadata } from 'next';
import { FollowersView } from './components/FollowersView';

export const metadata: Metadata = {
  title: 'Followers',
  description: 'Manage your followers'
};

export default function FollowersPage() {
  return <FollowersView />;
}
