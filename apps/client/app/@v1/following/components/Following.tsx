'use client';

import { UnFollowModal } from '@/components/modals/UnFollowModal';
import { useFollowings } from '@/hooks/useFollow';
import { ExtendedCard } from '@workspace/ui/globals/ExtendedCard';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { SAvatar } from '@workspace/ui/globals/SAvatar';
import { TriggerModal } from '@workspace/ui/modals/TriggerModal';
import { BlocksIcon } from 'lucide-react';
import { useState } from 'react';

export const Following = () => {
  const [unfollowModal, setUnfollowModal] = useState<boolean>(false);
  const { followings, hasMore, loading, loadMore } = useFollowings();
  const [selectedCreatorId, setSelectedCreatorId] = useState<string>('');

  return (
    <PageManager className="pb-10">
      <h2 className="text-2xl font-semibold mb-6 text-center text-white/90 tracking-tight">Following Creators</h2>

      <InfiniteScrollManager hasMore={hasMore} dataLength={followings.length} loading={loading} onLoadMore={loadMore}>
        <section className="mx-auto max-w-6xl px-3 py-5 sm:px-4 sm:py-6 space-y-4 pb-24 md:pb-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {followings.map((following) => (
              <ExtendedCard key={following.id} title="" className="py-0 gap-0" contentClassName="p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <SAvatar className="size-10" url={following.avatarUrl} />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{following.username}</p>
                    </div>
                  </div>
                  <div className="shrink-0">
                    <TriggerModal
                      applyTooltip={{ title: 'Unfollow creator' }}
                      onChangeModalState={() => {
                        setSelectedCreatorId(following.id);
                        setUnfollowModal(true);
                      }}
                      modalText="Unfollow"
                      modalIcon={{ icon: BlocksIcon }}
                      className="w-32 bg-red-600! hover:bg-red-700! text-white font-semibold transition-all duration-300 rounded-full"
                    />
                  </div>
                </div>
              </ExtendedCard>
            ))}
          </div>
        </section>
      </InfiniteScrollManager>

      <UnFollowModal isOpen={unfollowModal} creatorId={selectedCreatorId} setOpen={setUnfollowModal} />
    </PageManager>
  );
};
