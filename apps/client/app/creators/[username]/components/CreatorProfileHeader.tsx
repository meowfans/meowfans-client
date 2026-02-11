'use client';

import { InteractionButton } from '@/components/InteractionButton';
import { useCreateChannel } from '@/hooks/client/useChannels';
import { useFollowingMutations } from '@/hooks/client/useFollow';
import { GetPublicCreatorProfileOutput } from '@workspace/gql/generated/graphql';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent } from '@workspace/ui/components/card';
import { IconLabel } from '@workspace/ui/components/icon-label';
import { MEOW_FANS_BANNER } from '@workspace/ui/lib/constants';
import { Check, Grid3x3, Image as ImageIcon, Lock, MessageCircle, UserPlus, Users } from 'lucide-react';
import Image from 'next/image';

interface CreatorProfileHeaderProps {
  profile: GetPublicCreatorProfileOutput;
}

export function CreatorProfileHeader({ profile }: CreatorProfileHeaderProps) {
  const { followCreator, unfollowCreator, loading: followLoading } = useFollowingMutations();
  const { createChannel, loading: creatingChannel } = useCreateChannel();

  const handleFollow = async () => {
    if (!profile) return;
    if (profile.isFollowing) {
      await unfollowCreator(profile.creatorId);
    } else {
      await followCreator(profile.creatorId);
    }
  };

  const stats = [
    { icon: Users, value: profile.followersCount, label: 'Followers' },
    { icon: Grid3x3, value: profile.totalPost, label: 'Posts' },
    { icon: ImageIcon, value: profile.assetCount, label: 'Assets' },
    { icon: Lock, value: profile.vaultCount, label: 'Vaults' }
  ];

  return (
    <div className="w-full">
      <div className="relative h-48 w-full overflow-hidden rounded-t-xl bg-gradient-to-br from-primary/20 via-primary/10 to-background md:h-64">
        {profile.bannerUrl ? (
          <Image
            width={300}
            height={400}
            src={profile.bannerUrl ?? MEOW_FANS_BANNER}
            alt={profile.username}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
            <Users className="h-24 w-24 text-primary/20" />
          </div>
        )}
      </div>

      <div className="relative -mt-16 px-6 pb-6">
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col items-center gap-4 md:flex-row md:items-end">
            <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
              <AvatarImage src={profile.avatarUrl} alt={profile.username} className="object-cover" />
              <AvatarFallback className="bg-primary/10 text-4xl font-bold text-primary">
                {profile.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-1 text-center md:text-left">
              <div className="flex items-center justify-center gap-2 md:justify-start">
                <h1 className="text-3xl font-bold tracking-tight">{profile.fullName}</h1>
                {profile.isImported && (
                  <Badge variant="secondary" className="gap-1">
                    <Check className="h-3 w-3" /> Verified
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground">@{profile.username}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!profile.isImported && (
              <Button
                variant="outline"
                size="default"
                className="rounded-full font-medium"
                onClick={() => profile && !profile.isImported && createChannel(profile.creatorId)}
                disabled={creatingChannel}
              >
                <IconLabel icon={MessageCircle} label="Message" />
              </Button>
            )}

            <InteractionButton
              variant={profile.isFollowing ? 'outline' : 'default'}
              size="default"
              className="rounded-full font-medium min-w-[120px]"
              onClick={handleFollow}
              isLoading={followLoading}
              actionName="follow this creator"
              loadingText={profile.isFollowing ? 'Un-following...' : 'Following...'}
            >
              {profile.isFollowing ? <IconLabel icon={Check} label="Following" /> : <IconLabel icon={UserPlus} label="Follow" />}
            </InteractionButton>
          </div>
        </div>

        {profile.bio && (
          <div className="mt-4 text-center md:text-left">
            <p className="text-sm text-muted-foreground">{profile.bio}</p>
          </div>
        )}

        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-none bg-secondary/20 shadow-none">
              <CardContent className="flex flex-col items-center p-4 text-center">
                <IconLabel icon={stat.icon} label="" iconClassName="h-5 w-5 text-primary" />
                <p className="mt-2 text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
