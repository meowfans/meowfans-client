import { getPublicCreatorPosts } from '@/app/server/getPublicCreatorPosts';
import { getPublicCreatorProfile } from '@/app/server/getPublicCreatorProfile';
import { getPublicCreatorVaults } from '@/app/server/getPublicCreatorVaults';
import { ROUTE_METADATA } from '@/lib/metadata-config';
import { GetPublicCreatorProfileOutput, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { Metadata } from 'next';
import { SingleCreatorProfile } from './components/SingleCreatorProfile';

interface SingleCreatorProfilePageProps {
  params: Promise<{ userId: string }>;
}

export async function generateMetadata({ params }: SingleCreatorProfilePageProps): Promise<Metadata> {
  const { userId } = await params;
  try {
    const profile = (await getPublicCreatorProfile(userId)) as GetPublicCreatorProfileOutput;

    if (!profile) return { title: ROUTE_METADATA.creators.title };

    return {
      title: `${profile.fullName} (@${profile.username})`,
      description: profile.bio || `View ${profile.fullName}'s exclusive content and posts on MeowFans.`,
      openGraph: {
        images: [{ url: `/creators/${userId}/opengraph-image`, width: 1024, height: 1024, type: 'image/jpg' }]
      }
    };
  } catch {
    return { title: ROUTE_METADATA.creators.title };
  }
}

export const dynamic = 'force-dynamic';

export default async function SingleCreatorProfilePage({ params }: SingleCreatorProfilePageProps) {
  const { userId } = await params;
  const profile = (await getPublicCreatorProfile(userId)) as GetPublicCreatorProfileOutput;

  const [initialPosts, initialVaults] = await Promise.all([
    getPublicCreatorPosts({
      relatedUserId: profile?.creatorId,
      sortBy: SortBy.PostCreatedAt,
      orderBy: SortOrder.Desc,
      take: 20
    }),
    getPublicCreatorVaults({
      relatedUserId: profile?.creatorId,
      take: 20,
      sortBy: SortBy.VaultCreatedAt,
      orderBy: SortOrder.Desc
    })
  ]);

  return <SingleCreatorProfile profile={profile} initialPosts={initialPosts} initialVaults={initialVaults} />;
}
