import { Metadata } from 'next';
import { SingleProfileView } from './components/SingleProfileView';

export const metadata: Metadata = {
  title: 'Profile Details | Admin',
  description: 'View and manage profile information'
};

export default async function SingleProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  return <SingleProfileView username={username} />;
}
