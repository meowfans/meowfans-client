import { getPublicCreatorProfile } from '@/app/server/getPublicCreatorProfile';
import { CreatorContextWrapper } from '@/hooks/context/CreatorContextWrapper';
import { GetPublicCreatorProfileOutput } from '@workspace/gql/generated/graphql';
import { notFound } from 'next/navigation';

interface CreatorLayoutProps {
  children: React.ReactNode;
  params: Promise<{ userId: string }>;
}

export default async function CreatorLayout({ children, params }: CreatorLayoutProps) {
  const { userId } = await params;
  const profile = (await getPublicCreatorProfile(userId)) as GetPublicCreatorProfileOutput;

  if (!profile) {
    notFound();
  }

  return <CreatorContextWrapper creator={profile}>{children}</CreatorContextWrapper>;
}
