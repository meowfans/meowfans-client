'use client';

import { PageHandler } from '@/components/PageHandler';
import { APP_PATHS } from '@/lib/constants/feature-paths';
import { GetPublicPostsOutput } from '@workspace/gql/generated/graphql';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Loading } from '@workspace/ui/globals/Loading';
import { AnimatePresence } from 'framer-motion';
import { PostCard } from './PostCard';

interface PostsListProps {
  posts: GetPublicPostsOutput[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onRefresh: () => void;
  isBlurEnabled: boolean;
  viewMode: 'grid' | 'list';
  expandedPostId: string | null;
  onToggleComments: (postId: string) => void;
  onLike: (postId: string) => void;
  onReport: (postId: string) => void;
}

export const PostsList = ({
  posts,
  loading,
  hasMore,
  onLoadMore,
  onRefresh,
  isBlurEnabled,
  viewMode,
  expandedPostId,
  onToggleComments,
  onLike,
  onReport
}: PostsListProps) => {
  return (
    <div className="flex-1 min-h-0 overflow-y-scroll px-4 md:px-8 custom-scrollbar pt-2">
      <PageHandler isLoading={loading} isEmpty={!posts.length} path={APP_PATHS.POSTS}>
        <InfiniteScrollManager dataLength={posts.length} loading={loading} hasMore={hasMore} useWindowScroll onLoadMore={onLoadMore}>
          <div
            className={`grid gap-6 pb-24 ${
              viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1 max-w-2xl mx-auto'
            }`}
          >
            <AnimatePresence mode="popLayout">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  isBlurEnabled={isBlurEnabled}
                  isExpanded={expandedPostId === post.id}
                  onToggleComments={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onToggleComments(post.id);
                  }}
                  onLike={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onLike(post.id);
                  }}
                  onReport={onReport}
                  viewMode={viewMode}
                />
              ))}
            </AnimatePresence>
          </div>

          {loading && (
            <div className="py-20 flex flex-col items-center gap-4">
              <Loading />
              <p className="text-xs font-bold text-muted-foreground/30 uppercase tracking-[0.3em]">Curating your feed</p>
            </div>
          )}
        </InfiniteScrollManager>
      </PageHandler>
    </div>
  );
};
