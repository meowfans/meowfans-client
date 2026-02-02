'use client';

import { AuthAwareButton } from '@/components/AuthAwareButton';
import { useCreator } from '@/hooks/context/CreatorContextWrapper';
import { UserContext } from '@/hooks/context/UserContextWrapper';
import { useFollowingMutations } from '@/hooks/useFollow';
import { Card, CardContent } from '@workspace/ui/components/card';
import { SAvatar } from '@workspace/ui/globals/SAvatar';
import { formatText } from '@workspace/ui/lib/helpers';
import { TriggerModal } from '@workspace/ui/modals/TriggerModal';
import { BlocksIcon } from 'lucide-react';
import Image from 'next/image';
import { useContext, useState } from 'react';

export const CreatorProfileHeader = () => {
  const { creator, setCreator } = useCreator();
  const [fan] = useContext(UserContext);
  const [unfollowModal, setUnfollowModal] = useState(false);
  const { followCreator } = useFollowingMutations();

  const handleFollowCreator = async () => {
    await followCreator(creator.creatorId);
    setCreator((prev) => (prev ? { ...prev, isFollowing: true } : prev));
  };

  if (!creator) return null;

  return (
    <Card className="overflow-hidden">
      <div className="relative h-36 sm:h-52 w-full bg-muted">
        {creator.bannerUrl ? (
          <Image
            src={creator.bannerUrl}
            alt="Profile banner"
            className="h-full w-full object-cover"
            loading="lazy"
            width={1200}
            height={400}
            unoptimized
          />
        ) : (
          <div className="h-full w-full bg-linear-to-br from-primary/10 via-muted to-primary/5" />
        )}
      </div>

      <CardContent className="relative px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="-mt-6 flex items-end gap-4">
            <SAvatar className="size-24 border bg-background shadow-md" url={creator.avatarUrl} />

            <div className="pb-1">
              <p className="text-lg font-semibold leading-tight">{creator.fullName}</p>

              <p className="text-xs text-muted-foreground">@{creator.username}</p>

              {creator.bio && <p className="mt-1 max-w-md text-sm leading-snug text-muted-foreground">{creator.bio}</p>}

              <div className="mt-3">
                {creator.isFollowing && fan ? (
                  <TriggerModal
                    applyTooltip={{ title: 'Unfollow creator' }}
                    onChangeModalState={() => setUnfollowModal(true)}
                    modalText="Unfollow"
                    modalIcon={{ icon: BlocksIcon }}
                    className="rounded-full px-6 py-2 text-sm bg-linear-to-r from-red-600 to-rose-500 text-white font-semibold shadow-md"
                  />
                ) : (
                  <AuthAwareButton
                    onClick={handleFollowCreator}
                    title="Follow"
                    variant="secondary"
                    className="rounded-full px-6 py-2 text-sm bg-linear-to-r from-pink-500 via-fuchsia-500 to-yellow-400 hover:opacity-90 text-white font-semibold shadow-md transition-transform hover:scale-[1.03]"
                  >
                    Follow
                  </AuthAwareButton>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 rounded-xl border bg-background/80 px-5 py-3 text-center backdrop-blur-sm">
            <StatItem value={creator.totalPost} label="Post" />
            <StatItem value={creator.followersCount} label="Follower" />
            <StatItem value={creator.assetCount ?? 0} label="Asset" />
            <StatItem value={creator.vaultCount ?? 0} label="Vault" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const StatItem = ({ value, label }: { value: number; label: string }) => (
  <div className="space-y-0.5">
    <p className="text-base font-semibold">{value}</p>
    <p className="text-xs text-muted-foreground">{formatText(value, label)}</p>
  </div>
);
