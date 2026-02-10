'use client';

import { ReportModal } from '@/components/ReportModal';
import { useContentBlur } from '@/hooks/useContentBlur';
import { useLikeMutations } from '@/hooks/useLikeMutations';
import { usePosts } from '@/hooks/usePosts';
import { EntityType, PostTypes, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { useMemo, useState } from 'react';
import { PostsHeader } from './PostsHeader';
import { PostsList } from './PostsList';

export function Posts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [postTypes, setPostTypes] = useState<PostTypes[]>(Object.values(PostTypes));
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const { isBlurEnabled } = useContentBlur();
  const { likePost } = useLikeMutations();
  const [reportPostId, setReportPostId] = useState<string | null>(null);

  const { posts, handleLoadMore, hasMore, loading, handleRefresh } = usePosts({
    sortBy: SortBy.PostCreatedAt,
    orderBy: SortOrder.Desc,
    take: 20,
    postTypes
  });

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
    <div className="flex h-full flex-1 flex-col overflow-hidden bg-background">
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
        onLoadMore={handleLoadMore}
        onRefresh={handleRefresh}
        isBlurEnabled={isBlurEnabled}
        viewMode={viewMode}
        expandedPostId={expandedPostId}
        onToggleComments={toggleComments}
        onLike={handleLike}
        onReport={setReportPostId}
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
