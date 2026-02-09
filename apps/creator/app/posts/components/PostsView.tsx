'use client';

import { useBulkDeletePosts, useDeletePost, usePosts, useUpdatePost } from '@/hooks/usePosts';
import { PaginationInput, PostsEntity, PostTypes, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { Card, CardContent } from '@workspace/ui/components/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { Loading } from '@workspace/ui/globals/Loading';
import { BarChart3 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { PostsFilters } from './PostsFilters';
import { PostsHeader } from './PostsHeader';
import { PostsStats } from './PostsStats';
import { PostsTable } from './PostsTable';

export function PostsView() {
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const params: PaginationInput = {
    sortBy: SortBy.PostCreatedAt,
    orderBy: SortOrder.Desc,
    take: 20,
    skip: 0
  };

  const { posts, loading, hasMore, handleLoadMore } = usePosts(params);
  const { handleDeletePost, loading: deleting } = useDeletePost();
  const { handleBulkDeletePosts, loading: bulkDeleting } = useBulkDeletePosts();
  const { handleUpdatePost, loading: updating } = useUpdatePost();

  const handleToggleSelect = (postId: string) => {
    setSelectedPosts((prev) => (prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]));
  };

  const handleSelectAll = (filtered: PostsEntity[]) => {
    if (selectedPosts.length === filtered.length) {
      setSelectedPosts([]);
    } else {
      setSelectedPosts(filtered.map((p) => p.id));
    }
  };

  const handleDelete = async (postId: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      await handleDeletePost({ postId });
      setSelectedPosts((prev) => prev.filter((id) => id !== postId));
    }
  };

  const handleBulkDelete = async () => {
    if (selectedPosts.length === 0) {
      toast.error('No posts selected');
      return;
    }
    if (confirm(`Are you sure you want to delete ${selectedPosts.length} post(s)?`)) {
      await handleBulkDeletePosts({ postIds: selectedPosts });
      setSelectedPosts([]);
    }
  };

  const handleShare = (post: PostsEntity) => {
    const url = `${window.location.origin}/posts/${post.id}`;
    navigator.clipboard.writeText(url);
    toast.success('Link copied to clipboard!');
  };

  const handleToggleType = async (post: PostsEntity, newType: PostTypes) => {
    await handleUpdatePost({
      postId: post.id,
      types: [newType]
    });
  };

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.caption?.toLowerCase().includes(searchQuery.toLowerCase()) ?? true;
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'public' && post.types.includes(PostTypes.Public)) ||
      (activeTab === 'exclusive' && post.types.includes(PostTypes.Exclusive)) ||
      (activeTab === 'private' && post.types.includes(PostTypes.Private));
    return matchesSearch && matchesTab;
  });

  // Calculate stats
  const totalPosts = posts.length;
  const totalLikes = posts.reduce((sum, p) => sum + p.likeCount, 0);
  const totalComments = posts.reduce((sum, p) => sum + p.commentCount, 0);
  const totalEarnings = posts.reduce((sum, p) => sum + p.totalEarning, 0);

  return (
    <div className="container max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      <PostsHeader selectedCount={selectedPosts.length} onBulkDelete={handleBulkDelete} isBulkDeleting={bulkDeleting} />

      <PostsStats totalPosts={totalPosts} totalLikes={totalLikes} totalComments={totalComments} totalEarnings={totalEarnings} />

      <Card>
        <PostsFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCount={selectedPosts.length}
          totalFiltered={filteredPosts.length}
          onSelectAll={() => handleSelectAll(filteredPosts)}
        />
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all" className="text-xs sm:text-sm">
                All
              </TabsTrigger>
              <TabsTrigger value="public" className="text-xs sm:text-sm">
                Public
              </TabsTrigger>
              <TabsTrigger value="exclusive" className="text-xs sm:text-sm">
                Exclusive
              </TabsTrigger>
              <TabsTrigger value="private" className="text-xs sm:text-sm">
                Private
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-4 sm:mt-6">
              {loading && posts.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px] gap-4">
                  <Loading />
                  <p className="text-sm text-muted-foreground">Loading posts...</p>
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px] gap-4 border-2 border-dashed rounded-lg">
                  <BarChart3 className="h-12 w-12 text-muted-foreground" />
                  <div className="text-center space-y-1">
                    <p className="text-sm font-medium">No posts found</p>
                    <p className="text-xs text-muted-foreground">Create your first post to get started</p>
                  </div>
                </div>
              ) : (
                <PostsTable
                  posts={filteredPosts}
                  loading={loading}
                  hasMore={hasMore}
                  onLoadMore={handleLoadMore}
                  selectedPosts={selectedPosts}
                  onToggleSelect={handleToggleSelect}
                  onDelete={handleDelete}
                  onShare={handleShare}
                  onToggleType={handleToggleType}
                  deleting={deleting}
                  updating={updating}
                />
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
