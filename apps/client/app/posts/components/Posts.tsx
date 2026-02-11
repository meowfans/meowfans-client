'use client';

import { ReportModal } from '@/components/ReportModal';
import { useContentBlur } from '@/hooks/client/useContentBlur';
import { useLikeMutations } from '@/hooks/client/useLikeMutations';
import { useServerPosts } from '@/hooks/server/useServerPosts';
import { EntityType, GetPublicPostsOutput, PostTypes, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { useMemo, useState } from 'react';
import { PostsHeader } from './PostsHeader';
import { PostsList } from './PostsList';

interface PostsProps {
  initialPosts: GetPublicPostsOutput[];
}

export function Posts({ initialPosts }: PostsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [postTypes, setPostTypes] = useState<PostTypes[]>(Object.values(PostTypes));
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const { isBlurEnabled } = useContentBlur();
  const { likePost } = useLikeMutations();
  const [reportPostId, setReportPostId] = useState<string | null>(null);

  const { posts, loadMore, hasMore, loading } = useServerPosts(
    {
      sortBy: SortBy.PostCreatedAt,
      orderBy: SortOrder.Desc,
      take: 20,
      postTypes
    },
    initialPosts
  );

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => post.caption.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [posts, searchTerm]);

  const toggleComments = (postId: string) => {
    setExpandedPostId(expandedPostId === postId ? null : postId);
  };

  const handleLike = async (postId: string) => {
    await likePost(postId);
  };

  return (
    <div className="bg-background">
      <PostsHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        postTypes={postTypes}
        onPostTypesChange={setPostTypes}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <PostsList
        posts={filteredPosts}
        loading={loading}
        hasMore={hasMore}
        onLoadMore={loadMore}
        onRefresh={() => window.location.reload()}
        isBlurEnabled={isBlurEnabled}
        viewMode={viewMode}
        expandedPostId={expandedPostId}
        onToggleComments={toggleComments}
        onLike={handleLike}
        onReport={setReportPostId}
        initialPosts={initialPosts}
      />

      <ReportModal
        isOpen={!!reportPostId}
        onClose={() => setReportPostId(null)}
        entityId={reportPostId || ''}
        entityType={EntityType.Post}
      />
    </div>
  );
}
