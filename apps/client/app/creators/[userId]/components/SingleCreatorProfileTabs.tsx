'use client';

import { BlurImage } from '@/components/BlurImage';
import { GetPublicCreatorProfileOutput, GetPublicPostsOutput, GetPublicVaultsOutput } from '@workspace/gql/generated/graphql';
import { AnimatePresence, motion } from 'framer-motion';
import { Grid3x3, ImageIcon, Lock } from 'lucide-react';
import Link from 'next/link';
import { TabProps } from './SingleCreatorProfile';

interface SingleCreatorProfileTabsProps {
  profile: GetPublicCreatorProfileOutput;
  onTabChange: (tab: TabProps) => void;
  currentTab: TabProps;
  initialPosts: GetPublicPostsOutput[];
  initialVaults: GetPublicVaultsOutput[];
}

export const SingleCreatorProfileTabs = ({
  profile,
  onTabChange,
  currentTab,
  initialPosts,
  initialVaults
}: SingleCreatorProfileTabsProps) => {
  const tabs = [
    { id: 'posts', label: 'POSTS', icon: Grid3x3 },
    { id: 'vaults', label: 'VAULTS', icon: Lock },
    { id: 'pictures', label: 'PICS', icon: ImageIcon }
  ];

  return (
    <div className="flex-1 w-full bg-transparent max-w-4xl mx-auto">
      {/* Instagram-style Tab Navigation */}
      <div className="flex justify-center border-t border-white/5 bg-black">
        <div className="flex items-center gap-12 md:gap-16">
          {tabs.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id as TabProps)}
                className={`relative py-3 md:py-4 flex items-center gap-2 transition-all duration-200 ${
                  isActive ? 'text-white border-t-2 border-white -mt-[2px]' : 'text-muted-foreground hover:text-white'
                }`}
              >
                <tab.icon className={`h-4 w-4 md:h-3 md:w-3 ${isActive ? 'fill-current' : ''}`} />
                <span className="hidden md:block text-[10px] font-bold tracking-[0.15em]">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="w-full">
        <AnimatePresence mode="wait">
          {currentTab === 'posts' && (
            <motion.div
              key="posts"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-3 gap-[1px] md:gap-1"
            >
              {initialPosts.map((post) => (
                <Link
                  href={`/creators/${profile.creatorId}/posts`}
                  key={post.id}
                  className="relative aspect-square w-full overflow-hidden bg-white/5"
                >
                  <BlurImage src={post.preview ?? ''} alt={post.caption ?? ''} className="h-full w-full object-cover" />
                  {post.objectCount > 1 && (
                    <div className="absolute top-2 right-2 md:top-3 md:right-3">
                      <svg className="h-4 w-4 text-white opacity-80" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 7a2 2 0 012 2v10a2 2 0 01-2 2H9a2 2 0 01-2-2V9a2 2 0 012-2h10zM9 5a4 4 0 00-4 4v10a4 4 0 004 4h10a4 4 0 004-4V9a4 4 0 00-4-4H9z" />
                      </svg>
                    </div>
                  )}
                  {post.unlockPrice && post.unlockPrice > 0 && !post.isPurchased && (
                    <div className="absolute top-2 left-2">
                      <Lock className="h-3 w-3 text-white/60" />
                    </div>
                  )}
                </Link>
              ))}
            </motion.div>
          )}

          {currentTab === 'vaults' && (
            <motion.div
              key="vaults"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-3 gap-[1px] md:gap-1"
            >
              {initialVaults.map((vault) => (
                <Link
                  href={`/creators/${profile.creatorId}/vaults`}
                  key={vault.id}
                  className="relative aspect-square w-full overflow-hidden bg-white/5"
                >
                  <BlurImage src={vault.preview ?? ''} alt={vault.description ?? ''} className="h-full w-full object-cover" />
                  {vault.unlockPrice && vault.unlockPrice > 0 && !vault.isPurchased && (
                    <div className="absolute top-2 left-2">
                      <Lock className="h-3 w-3 text-white/60" />
                    </div>
                  )}
                </Link>
              ))}
            </motion.div>
          )}

          {currentTab === 'pictures' && (
            <motion.div
              key="pictures"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex min-h-[300px] flex-col items-center justify-center p-8"
            >
              <div className="h-20 w-20 mb-4 flex items-center justify-center rounded-full border border-white/10">
                <ImageIcon className="h-10 w-10 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm">No photos yet</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
