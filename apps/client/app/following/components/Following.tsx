'use client';

import { UnFollowModal } from '@/components/modals/UnFollowModal';
import { NextImage } from '@/components/NextImage';
import { useFollows } from '@/hooks/useFollow';
import { Button } from '@workspace/ui/components/button';
import { ScrollArea } from '@workspace/ui/components/scroll-area';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { TriggerModal } from '@workspace/ui/modals/TriggerModal';
import { motion } from 'framer-motion';
import { BlocksIcon, EyeIcon, FolderIcon, ImagesIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export const Following = () => {
  const { getFollowing } = useFollows();
  const [unfollowModal, setUnfollowModal] = useState<boolean>(false);
  const { followings, hasMore, loading, onLoadMore } = getFollowing();
  const [selectedCreatorId, setSelectedCreatorId] = useState<string>('');

  return (
    <PageManager className="pb-10">
      <h2 className="text-2xl font-semibold mb-6 text-center text-white/90 tracking-tight">Following Creators</h2>

      <InfiniteScrollManager hasMore={hasMore} dataLength={followings.length} loading={loading} onLoadMore={onLoadMore}>
        <ScrollArea className="w-full p-2">
          <div className="grid gap-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 w-full mt-4">
            {followings.map((following, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="relative group rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:scale-[1.015] transition-all duration-500 ease-out bg-gradient-to-br from-purple-500/10 to-pink-600/10 border border-white/10 backdrop-blur-md"
              >
                <NextImage className="h-56 w-full rounded-t-2xl" imageUrl={following.creatorProfile.user.avatarUrl} />
                {/* <div className="absolute inset-0 bg-black/30 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 flex items-end justify-end p-3"> */}

                <div className="absolute inset-0 bg-black/40 opacity-100 sm:group-hover:opacity-100 sm:opacity-0 transition-all duration-500 flex items-center justify-center">
                  <div className="flex flex-col gap-3">
                    <Link href={`/creators/${following.creatorProfile.user.username}`}>
                      <Button variant="secondary" size="sm" className="w-32 bg-white/80 hover:bg-white text-black font-semibold">
                        <EyeIcon className="mr-1 size-4" /> View
                      </Button>
                    </Link>

                    <TriggerModal
                      applyTooltip={{ title: 'Unfollow creator' }}
                      onChangeModalState={() => {
                        setSelectedCreatorId(following.creatorId);
                        setUnfollowModal(true);
                      }}
                      modalText="Unfollow"
                      modalIcon={{ icon: BlocksIcon }}
                      className="w-32 !bg-red-600 hover:!bg-red-700 text-white font-semibold transition-all duration-300 rounded-full"
                    />
                  </div>
                </div>

                <div className="p-4 flex flex-col justify-between h-[190px]">
                  <div>
                    <h3 className="font-semibold text-lg text-white/90 truncate">
                      {following.creatorProfile.user.username || 'Unknown Creator'}
                    </h3>
                    <p className="text-xs text-white/70 mt-1 line-clamp-3">{following.creatorProfile.bio || 'No bio available.'}</p>
                  </div>

                  <div className="mt-3 flex justify-between items-center text-sm text-white/80">
                    <div className="flex items-center gap-2">
                      <ImagesIcon className="size-4 text-pink-400" />
                      <span>{following.creatorProfile.assetCount || 0} Assets</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FolderIcon className="size-4 text-purple-400" />
                      <span>{following.creatorProfile.vaultCount || 0} Vaults</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            <Link href={'/creators'}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="aspect-[2/3] rounded-2xl bg-gradient-to-br from-pink-600/20 to-purple-700/20 backdrop-blur-md border border-white/10 flex flex-col items-center justify-center text-white text-lg font-semibold shadow-md hover:shadow-xl transition-all duration-300"
              >
                <span className="bg-black/40 px-5 py-3 rounded-full backdrop-blur-sm text-white/90 text-sm font-semibold">
                  Discover More Creators
                </span>
              </motion.div>
            </Link>
          </div>
        </ScrollArea>
      </InfiniteScrollManager>

      <UnFollowModal isOpen={unfollowModal} creatorId={selectedCreatorId} setOpen={setUnfollowModal} />
    </PageManager>
  );
};
