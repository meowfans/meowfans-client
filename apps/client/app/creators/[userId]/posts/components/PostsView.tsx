'use client';

import { BlurImage } from '@/components/BlurImage';
import { PageHandler } from '@/components/PageHandler';
import { ReportModal } from '@/components/ReportModal';
import { useContentBlur } from '@/hooks/client/useContentBlur';
import { useServerPublicCreatorPosts } from '@/hooks/server/useServerPublicCreatorPosts';
import { APP_PATHS } from '@/lib/constants/feature-paths';
import { EntityType, GetPublicPostsOutput, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Heart, Lock } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface PostsViewProps {
  userId: string;
  initialPosts: GetPublicPostsOutput[];
}

export function PostsView({ userId, initialPosts }: PostsViewProps) {
  const { isBlurEnabled } = useContentBlur();
  const [reportPostId, setReportPostId] = useState<string | null>(null);

  const {
    creatorPosts: posts,
    loadMore,
    hasMore,
    loading
  } = useServerPublicCreatorPosts(
    {
      sortBy: SortBy.PostCreatedAt,
      relatedUserId: userId,
      orderBy: SortOrder.Desc,
      take: 20
    },
    initialPosts
  );

  return (
    <div className="flex flex-1 flex-col">
      <PageHandler isLoading={loading && !initialPosts.length} isEmpty={!posts.length} path={APP_PATHS.POSTS}>
        <InfiniteScrollManager dataLength={posts.length} loading={loading} hasMore={hasMore} useWindowScroll onLoadMore={loadMore}>
          <div className="grid grid-cols-3 gap-[1px] md:gap-1">
            {posts.map((post) => (
              <Link href={`/posts/${post.id}`} key={post.id} className="relative aspect-square w-full overflow-hidden bg-muted/20">
                <BlurImage
                  src={post.preview}
                  alt={post.caption}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />

                {/* Desktop Badges (Hidden on mobile) */}
                <div className="hidden md:flex absolute left-2 top-2 flex-wrap gap-1 pointer-events-none">
                  {post.unlockPrice && post.unlockPrice > 0 && !post.isPurchased && (
                    <Badge className="bg-black/60 backdrop-blur-md border-none text-white h-6 px-2 rounded-sm font-bold text-[10px]">
                      <Lock className="h-3 w-3 text-primary mr-1" />${post.unlockPrice}
                    </Badge>
                  )}
                </div>

                {/* Mobile Lock Icon (Minimal) */}
                {post.unlockPrice && post.unlockPrice > 0 && !post.isPurchased && (
                  <div className="md:hidden absolute top-2 left-2 pointer-events-none">
                    <div className="bg-black/40 backdrop-blur-sm p-1 rounded-sm">
                      <Lock className="h-3 w-3 text-primary" />
                    </div>
                  </div>
                )}

                {/* Media Type Icon (Tucked in corner like IG) */}
                {post.objectCount > 1 && (
                  <div className="absolute top-2 right-2 md:top-3 md:right-3 pointer-events-none">
                    <div className="bg-black/40 backdrop-blur-sm p-1 rounded-sm">
                      <svg className="h-3 w-3 md:h-4 md:w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 19V7a2 2 0 012-2h10a2 2 0 012 2v12l-5-3-5 3z"
                        />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Hover States */}
                <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <div className="flex items-center gap-1 text-white font-bold text-xs md:text-sm">
                    <Heart className="h-4 w-4 fill-white" />
                    <span>View</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {!hasMore && (
            <p className="text-center text-muted-foreground py-10 font-black uppercase tracking-widest text-xs">
              You&apos;ve reached the end of the collection
            </p>
          )}
        </InfiniteScrollManager>
      </PageHandler>

      <ReportModal
        isOpen={!!reportPostId}
        onClose={() => setReportPostId(null)}
        entityId={reportPostId || ''}
        entityType={EntityType.Post}
      />
    </div>
  );
}
