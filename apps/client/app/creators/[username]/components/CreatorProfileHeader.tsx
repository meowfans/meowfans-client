'use client';

import { AuthAwareButton } from '@/components/AuthAwareButton';
import { ExoAdProvider, ExoAdZoneTypes } from '@/components/ExoAdProvider';
import { UnFollowModal } from '@/components/modals/UnFollowModal';
import { NextImage } from '@/components/NextImage';
import { useCreator } from '@/hooks/context/CreatorContextWrapper';
import { UserContext } from '@/hooks/context/UserContextWrapper';
import { useFollowings } from '@/hooks/useFollow';
import { SAvatar } from '@workspace/ui/globals/SAvatar';
import { TriggerModal } from '@workspace/ui/modals/TriggerModal';
import { motion } from 'framer-motion';
import { BlocksIcon, EyeIcon, FolderIcon, ImageIcon } from 'lucide-react';
import { useContext, useState } from 'react';

export const CreatorProfileHeader = () => {
  const { creator, setCreator } = useCreator();
  const [fan] = useContext(UserContext);
  const [unfollowModal, setUnfollowModal] = useState(false);
  const { followCreator } = useFollowings();

  const handleFollowCreator = async () => {
    await followCreator(creator.creatorId);
    setCreator((prev) => (prev ? { ...prev, isFollowing: true } : prev));
  };

  const handleUnFollowCreator = () => {
    setCreator((prev) => (prev ? { ...prev, isFollowing: false } : prev));
  };

  if (!creator?.user) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative w-full overflow-hidden rounded-3xl border border-zinc-100 dark:border-zinc-800 bg-linear-to-b from-zinc-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 shadow-xl"
    >
      <div className="relative h-48 sm:h-60 md:h-72 w-full overflow-hidden">
        <NextImage
          imageUrl={creator.user.bannerUrl}
          className="absolute inset-0 h-full w-full object-cover scale-105 transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent" />
      </div>

      <div className="relative px-6 sm:px-10 -mt-16 flex flex-col sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col sm:flex-row sm:items-end gap-5 sm:gap-7">
          <motion.div whileHover={{ scale: 1.05 }} className="relative">
            <SAvatar
              url={creator?.user.avatarUrl}
              className="h-32 w-32 rounded-full border-[5px] border-white dark:border-zinc-900 shadow-lg object-cover"
            />
            <div className="absolute inset-0 rounded-full bg-linear-to-r from-pink-400 to-yellow-400 opacity-25 blur-2xl -z-10" />
          </motion.div>

          <div className="flex flex-col">
            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">@{creator.user.username}</h1>
            <ExoAdProvider zoneId="5770664" zoneType={ExoAdZoneTypes.MobileBanner} />
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mt-2 max-w-xl leading-relaxed">
              {creator.bio || '✨ Capturing stories that live forever. Sharing creativity and passion with the world.'}
            </p>

            <div className="flex flex-wrap mt-5 gap-3">
              {creator.isFollowing && fan ? (
                <TriggerModal
                  applyTooltip={{ title: 'Unfollow creator' }}
                  onChangeModalState={() => setUnfollowModal(true)}
                  modalText="Unfollow"
                  modalIcon={{ icon: BlocksIcon }}
                  className="rounded-full px-6 py-2 text-sm bg-linear-to-r from-red-600 to-rose-500 hover:opacity-90 text-white font-semibold shadow-md"
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
            <ExoAdProvider zoneId="5771438" zoneType={ExoAdZoneTypes.MobileBanner} />
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="mt-10 px-6 sm:px-10 pb-8"
      >
        <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6">
          <Stat icon={FolderIcon} label="Vaults" value={creator.vaultCount || 0} />
          <Stat icon={ImageIcon} label="Assets" value={creator.assetCount || 0} />
          <Stat icon={EyeIcon} label="Views" value={creator.viewCount || 0} />
          <Stat icon={ImageIcon} label="Posts" value={creator.totalPost || 0} />
          <ExoAdProvider zoneId="5770578" classIdName="eas6a97888e10" zoneType={ExoAdZoneTypes.Default} />
        </div>
      </motion.div>

      <UnFollowModal isOpen={unfollowModal} creatorId={creator.creatorId} setOpen={setUnfollowModal} onUnFollowed={handleUnFollowCreator} />
    </motion.section>
  );
};

const Stat = ({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: number | string }) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -3 }}
    transition={{ type: 'spring', stiffness: 250, damping: 15 }}
    className="flex flex-col items-center justify-center rounded-2xl bg-white/60 dark:bg-zinc-800/70 backdrop-blur-lg py-4 px-3 border border-zinc-200/40 dark:border-zinc-700/60 shadow-sm hover:shadow-lg hover:bg-white/80 dark:hover:bg-zinc-800/90 transition-all duration-200"
  >
    <Icon className="h-5 w-5 text-pink-500 mb-1.5" />
    <p className="text-lg font-semibold text-zinc-900 dark:text-white">{value ?? 0}</p>
    <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
  </motion.div>
);
