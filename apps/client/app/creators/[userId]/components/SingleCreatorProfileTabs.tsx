'use client';

import { BlurImage } from '@/components/BlurImage';
import { PageHandler } from '@/components/PageHandler';
import { APP_PATHS } from '@/lib/constants/feature-paths';
import { GetPublicCreatorProfileOutput, GetPublicPostsOutput, GetPublicVaultsOutput } from '@workspace/gql/generated/graphql';
import { motion } from 'framer-motion';
import { Grid3x3, Lock } from 'lucide-react';
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
    { id: 'vaults', label: 'VAULTS', icon: Lock }
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
      <PageHandler
        isEmpty={currentTab === 'posts' ? !initialPosts.length : currentTab === 'vaults' ? !initialVaults.length : true}
        isLoading={false}
        path={currentTab === 'posts' ? APP_PATHS.POSTS : APP_PATHS.VAULTS}
      >
        <div className="w-full">
          {currentTab === 'posts' && (
            <motion.div
              key="posts"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-3 gap-[1px] md:gap-1"
            >
              {initialPosts.map((post) => (
                <Link href={`/posts/${post.id}`} key={post.id} className="relative aspect-square w-full overflow-hidden bg-white/5">
                  <BlurImage src={post.preview ?? ''} alt={post.caption ?? ''} className="h-full w-full object-cover" />
                  {post.objectCount > 1 && (
                    <div className="absolute top-2 right-2 md:top-3 md:right-3">
                      <svg className="h-4 w-4 text-white opacity-80" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 7a2 2 0 012 2v10a2 2 0 01-2 2H9a2 2 0 01-2-2V9a2 2 0 012-2h10zM9 5a4 4 0 00-4 4v10a4 4 0 004 4h10a4 4 0 004-4V9a4 4 0 00-4-4H9z" />
                      </svg>
                    </div>
                  )}
                  {!post.isPurchased && (
                    <div className="absolute top-2 left-2">
                      <Lock className="h-3 w-3 text-white/60" />
                    </div>
                  )}
                </Link>
              ))}
              {initialPosts.length > 0 && (
                <div className="col-span-3 flex justify-center py-8">
                  <Link href={`/creators/${profile.creatorId}/posts`}>
                    <button className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-white transition-colors border border-white/10 px-6 py-2 rounded-full">
                      View All Posts
                    </button>
                  </Link>
                </div>
              )}
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
                <Link href={`/vaults/${vault.id}`} key={vault.id} className="relative aspect-square w-full overflow-hidden bg-white/5">
                  <BlurImage src={vault.preview ?? ''} alt={vault.description ?? ''} className="h-full w-full object-cover" />
                  {!vault.isPurchased && (
                    <div className="absolute top-2 left-2">
                      <Lock className="h-3 w-3 text-white/60" />
                    </div>
                  )}
                </Link>
              ))}
              {initialVaults.length > 0 && (
                <div className="col-span-3 flex justify-center py-8">
                  <Link href={`/creators/${profile.creatorId}/vaults`}>
                    <button className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-white transition-colors border border-white/10 px-6 py-2 rounded-full">
                      View All Vaults
                    </button>
                  </Link>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </PageHandler>
    </div>
  );
};
