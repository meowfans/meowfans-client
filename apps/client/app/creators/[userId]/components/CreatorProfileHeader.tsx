'use client';

import { InteractionButton } from '@/components/InteractionButton';
import { useCreateChannel } from '@/hooks/client/useChannels';
import { useFollowingMutations } from '@/hooks/client/useFollow';
import { GetPublicCreatorProfileOutput } from '@workspace/gql/generated/graphql';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Check } from 'lucide-react';

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
    { value: profile.totalPost, label: 'Posts' },
    { value: profile.followersCount, label: 'Followers' },
    { value: profile.vaultCount, label: 'Vaults' }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pt-8 pb-4">
      {/* Top Section: Avatar & Stats */}
      <div className="flex items-center gap-8 md:gap-16 mb-6">
        <div className="shrink-0">
          <Avatar className="h-20 w-20 md:h-40 md:w-40 border-2 border-background ring-2 ring-primary/10 shadow-2xl">
            <AvatarImage src={profile.avatarUrl} alt={profile.username} className="object-cover" />
            <AvatarFallback className="bg-primary/10 text-2xl font-bold text-primary">
              {profile.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4 md:mb-6">
            <h1 className="text-xl md:text-2xl font-light tracking-tight">{profile.username}</h1>

            <div className="flex items-center gap-2">
              <InteractionButton
                variant={profile.isFollowing ? 'secondary' : 'default'}
                size="sm"
                className="h-8 md:h-9 rounded-lg font-bold px-6 text-xs md:text-sm min-w-[100px]"
                onClick={handleFollow}
                isLoading={followLoading}
                actionName="follow"
              >
                {profile.isFollowing ? 'Following' : 'Follow'}
              </InteractionButton>

              {!profile.isImported && (
                <Button
                  variant="secondary"
                  size="sm"
                  className="h-8 md:h-9 rounded-lg font-bold px-6 text-xs md:text-sm"
                  onClick={() => createChannel(profile.creatorId)}
                  disabled={creatingChannel}
                >
                  Message
                </Button>
              )}
            </div>
          </div>

          {/* Desktop Stats */}
          <div className="hidden md:flex items-center gap-10">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-1.5">
                <span className="font-bold text-lg">{stat.value}</span>
                <span className="text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="space-y-1 mb-8">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm md:text-base">{profile.fullName}</span>
          {profile.isImported && (
            <Badge variant="secondary" className="bg-primary/10 text-primary border-none text-[10px] h-5 rounded-full px-2">
              <Check className="h-3 w-3 mr-0.5" /> Verified
            </Badge>
          )}
        </div>
        {profile.bio && <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap max-w-xl">{profile.bio}</p>}
      </div>

      {/* Mobile Stats Row */}
      <div className="md:hidden flex items-center justify-around py-4 border-y border-white/5">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center">
            <span className="font-bold text-base">{stat.value}</span>
            <span className="text-muted-foreground text-[10px] uppercase tracking-widest">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
