'use client';

import { CreatorFollowsEntity } from '@workspace/gql/generated/graphql';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Loading } from '@workspace/ui/globals/Loading';
import { AnimatePresence, motion } from 'framer-motion';
import { Users2 } from 'lucide-react';
import { FollowerItem } from './FollowerItem';

interface FollowersListProps {
  followers: CreatorFollowsEntity[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

export function FollowersList({ followers, loading, hasMore, onLoadMore }: FollowersListProps) {
  return (
    <div className="w-full overflow-x-hidden">
      <InfiniteScrollManager
        dataLength={followers.length}
        loading={loading}
        hasMore={hasMore}
        onLoadMore={onLoadMore}
        useWindowScroll={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-8">
          <AnimatePresence mode="popLayout">
            {followers.map((follower, index) => (
              <motion.div
                key={follower.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: index * 0.02 }}
              >
                <FollowerItem follower={follower} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {loading && (
          <div className="flex justify-center p-8">
            <Loading />
          </div>
        )}

        {!loading && followers.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="bg-muted p-6 rounded-full">
              <Users2 className="h-10 w-10 text-muted-foreground opacity-50" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-black uppercase italic tracking-tight">No followers yet</h3>
              <p className="text-sm text-muted-foreground font-medium">Your fan base will appear here once they follow you.</p>
            </div>
          </div>
        )}
      </InfiniteScrollManager>
    </div>
  );
}
