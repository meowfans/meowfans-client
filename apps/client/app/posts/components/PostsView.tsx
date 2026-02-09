'use client';

import { PostComments } from '@/app/posts/[id]/components/PostComments';
import { BlurImage } from '@/components/BlurImage';
import { useContentBlur } from '@/hooks/useContentBlur';
import { useLikeMutations } from '@/hooks/useLikeMutations';
import { usePosts } from '@/hooks/usePosts';
import { PostTypes, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent } from '@workspace/ui/components/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@workspace/ui/components/dropdown-menu';
import { Input } from '@workspace/ui/components/input';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Loading } from '@workspace/ui/globals/Loading';
import { SAvatar } from '@workspace/ui/globals/SAvatar';
import { formatDistanceToNow } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertTriangle,
  Filter,
  Flag,
  Heart,
  LayoutGrid,
  List,
  Lock,
  MessageSquare,
  MoreVertical,
  Search,
  ShoppingCart,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

export function PostsView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [postTypes, setPostTypes] = useState<PostTypes[]>(Object.values(PostTypes));
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const { isBlurEnabled } = useContentBlur();
  const { likePost } = useLikeMutations();

  const { posts, handleLoadMore, hasMore, loading, handleRefresh } = usePosts({
    sortBy: SortBy.PostCreatedAt,
    orderBy: SortOrder.Desc,
    take: 20,
    postTypes
  });

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => post.caption.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [posts, searchTerm]);

  const toggleComments = (e: React.MouseEvent, postId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedPostId(expandedPostId === postId ? null : postId);
  };

  const handleLike = async (e: React.MouseEvent, postId: string) => {
    e.preventDefault();
    e.stopPropagation();
    await likePost(postId);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loading />
        <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground animate-pulse">Scanning Social Pulse</p>
      </div>
    );
  }

  if (!posts.length && !loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground animate-pulse">No Trending Posts Found</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden bg-background">
      {/* Dynamic Header */}
      <div className="flex-none px-4 py-4 md:px-10 md:py-8 lg:px-12 bg-gradient-to-b from-secondary/10 to-transparent border-b border-white/5">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between max-w-[1600px] mx-auto">
          {/* Title and View Controls */}
          <div className="flex flex-col gap-2 min-w-0">
            <div className="flex items-center justify-between gap-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent italic uppercase">
                Discover
              </h1>

              <div className="flex items-center gap-2 lg:hidden">
                <div className="flex items-center bg-secondary/20 p-1 rounded-full border border-white/5">
                  <Button
                    variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                    size="icon-sm"
                    className="rounded-full h-8 w-8"
                    onClick={() => setViewMode('grid')}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                    size="icon-sm"
                    className="rounded-full h-8 w-8"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon-sm"
                      className={`rounded-full h-8 w-8 border-white/10 hover:bg-secondary/40 transition-all ${
                        postTypes.length < Object.values(PostTypes).length ? 'border-primary/50 bg-primary/5 text-primary' : ''
                      }`}
                    >
                      <Filter className="h-3.5 w-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-56 rounded-2xl bg-background/80 backdrop-blur-xl border-white/10 p-2 shadow-2xl"
                  >
                    <div className="px-3 py-2">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 mb-3">Filter by Type</p>
                      <div className="space-y-1">
                        {[
                          { label: 'Public Drops', value: PostTypes.Public, icon: Sparkles },
                          { label: 'Exclusive Content', value: PostTypes.Exclusive, icon: Lock }
                        ].map((type) => (
                          <DropdownMenuItem
                            key={type.value}
                            onSelect={(e) => {
                              e.preventDefault();
                              const isSelected = postTypes.includes(type.value);
                              if (isSelected && postTypes.length > 1) {
                                setPostTypes(postTypes.filter((t) => t !== type.value));
                              } else if (!isSelected) {
                                setPostTypes([...postTypes, type.value]);
                              }
                            }}
                            className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
                              postTypes.includes(type.value) ? 'bg-primary/10 text-primary' : 'hover:bg-white/5'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <type.icon
                                className={`h-4 w-4 ${postTypes.includes(type.value) ? 'text-primary' : 'text-muted-foreground'}`}
                              />
                              <span className="text-xs font-bold">{type.label}</span>
                            </div>
                            {postTypes.includes(type.value) && (
                              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="h-1.5 w-1.5 rounded-full bg-primary" />
                            )}
                          </DropdownMenuItem>
                        ))}
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <p className="text-[10px] md:text-xs font-black text-muted-foreground/40 uppercase tracking-[0.2em] italic hidden sm:block">
              Latest drops from creators
            </p>
          </div>

          {/* Search and Tabs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 lg:gap-6 flex-1 lg:max-w-2xl">
            <div className="relative group flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Search drops..."
                className="pl-12 h-11 bg-secondary/20 border-white/5 focus-visible:ring-2 focus-visible:ring-primary/20 rounded-2xl text-sm transition-all shadow-inner"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar sm:pb-0">
              <div className="flex items-center bg-secondary/10 p-1 rounded-full border border-white/5">
                {[
                  { id: 'all', label: 'All', types: [PostTypes.Public, PostTypes.Exclusive] },
                  { id: 'public', label: 'Public', types: [PostTypes.Public] },
                  { id: 'exclusive', label: 'Excl', types: [PostTypes.Exclusive] }
                ].map((tab) => {
                  const isActive = tab.id === 'all' ? postTypes.length === 2 : postTypes.length === 1 && postTypes.includes(tab.types[0]);

                  return (
                    <Button
                      key={tab.id}
                      variant={isActive ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() => setPostTypes(tab.types)}
                      className={`rounded-full px-4 font-black uppercase text-[10px] tracking-widest h-8 whitespace-nowrap transition-all ${
                        isActive ? 'shadow-sm' : 'text-muted-foreground/60'
                      }`}
                    >
                      {tab.label}
                    </Button>
                  );
                })}
              </div>

              {/* Desktop View Controls */}
              <div className="hidden lg:flex items-center gap-2 ml-2 pl-4 border-l border-white/10">
                <div className="flex items-center bg-secondary/20 p-1 rounded-full border border-white/5">
                  <Button
                    variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                    size="icon-sm"
                    className="rounded-full h-8 w-8"
                    onClick={() => setViewMode('grid')}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                    size="icon-sm"
                    className="rounded-full h-8 w-8"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon-sm"
                      className={`rounded-full h-9 w-9 border-white/10 hover:bg-secondary/40 transition-all ${
                        postTypes.length < Object.values(PostTypes).length ? 'border-primary/50 bg-primary/5 text-primary' : ''
                      }`}
                    >
                      <Filter className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-56 rounded-2xl bg-background/80 backdrop-blur-xl border-white/10 p-2 shadow-2xl"
                  >
                    <div className="px-3 py-2">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 mb-3">Filter by Type</p>
                      <div className="space-y-1">
                        {[
                          { label: 'Public Drops', value: PostTypes.Public, icon: Sparkles },
                          { label: 'Exclusive Content', value: PostTypes.Exclusive, icon: Lock }
                        ].map((type) => (
                          <DropdownMenuItem
                            key={type.value}
                            onSelect={(e) => {
                              e.preventDefault();
                              const isSelected = postTypes.includes(type.value);
                              if (isSelected && postTypes.length > 1) {
                                setPostTypes(postTypes.filter((t) => t !== type.value));
                              } else if (!isSelected) {
                                setPostTypes([...postTypes, type.value]);
                              }
                            }}
                            className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
                              postTypes.includes(type.value) ? 'bg-primary/10 text-primary' : 'hover:bg-white/5'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <type.icon
                                className={`h-4 w-4 ${postTypes.includes(type.value) ? 'text-primary' : 'text-muted-foreground'}`}
                              />
                              <span className="text-xs font-bold">{type.label}</span>
                            </div>
                            {postTypes.includes(type.value) && (
                              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="h-1.5 w-1.5 rounded-full bg-primary" />
                            )}
                          </DropdownMenuItem>
                        ))}
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-h-0 overflow-y-scroll px-4 md:px-8 custom-scrollbar pt-2">
        <InfiniteScrollManager dataLength={posts.length} loading={loading} hasMore={hasMore} useWindowScroll onLoadMore={handleLoadMore}>
          {filteredPosts.length === 0 && !loading ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-32 text-center"
            >
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-secondary/30 backdrop-blur-md border border-white/5">
                <Sparkles className="h-12 w-12 text-muted-foreground/30" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">No posts found</h2>
              <p className="mt-2 text-muted-foreground max-w-sm mx-auto text-sm leading-relaxed">
                Try adjusting your search or filters to discover new content.
              </p>
              <Button onClick={handleRefresh} variant="link" className="mt-4 text-primary font-bold">
                Refresh feed
              </Button>
            </motion.div>
          ) : (
            <div
              className={`grid gap-6 pb-24 ${
                viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1 max-w-2xl mx-auto'
              }`}
            >
              <AnimatePresence mode="popLayout">
                {filteredPosts.map((post, idx) => (
                  <motion.div
                    key={post.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(idx * 0.05, 0.5), duration: 0.4 }}
                  >
                    <Link href={`/posts/${post.id}`}>
                      <Card className="group relative overflow-hidden border-none bg-secondary/15 hover:bg-secondary/25 transition-all duration-300 shadow-none hover:shadow-2xl hover:shadow-primary/5 rounded-[2rem]">
                        {/* Preview Section */}
                        <div className="relative aspect-[4/5] overflow-hidden bg-muted/20">
                          <BlurImage
                            src={post.preview}
                            alt={post.caption}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                          />

                          {/* Top Badges */}
                          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                            {post.unlockPrice && (
                              <Badge className="bg-background/60 backdrop-blur-md border-white/10 text-foreground gap-1.5 h-8 px-3 rounded-full font-black">
                                <Lock className="h-3 w-3 text-primary" />${post.unlockPrice}
                              </Badge>
                            )}
                            {post.isPurchased && (
                              <Badge className="bg-primary/90 text-primary-foreground gap-1.5 h-8 px-3 rounded-full font-black shadow-lg shadow-primary/20">
                                <ShoppingCart className="h-3 w-3" />
                                UNLOCKED
                              </Badge>
                            )}
                          </div>

                          {/* Object Count */}
                          {post.objectCount > 0 && (
                            <div className="absolute bottom-4 right-4">
                              <Badge className="bg-black/40 backdrop-blur-sm text-white/90 border-none px-3 font-bold h-7 rounded-full text-[10px]">
                                {post.objectCount} {post.objectCount === 1 ? 'Media' : 'Medias'}
                              </Badge>
                            </div>
                          )}

                          {/* Hover Overlay */}
                          {!isBlurEnabled && (
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                              <div className="flex items-center gap-2 text-white/90 font-bold text-xs uppercase tracking-tighter">
                                <Heart className="h-4 w-4" />
                                <span>View Details</span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Content Section */}
                        <CardContent className="p-4 md:p-6 pb-2">
                          <div className="flex flex-col gap-2 md:gap-3">
                            <p className="line-clamp-2 text-xs md:text-base font-bold text-foreground/90 leading-relaxed group-hover:text-primary transition-colors">
                              {post.caption || <span className="italic opacity-30">No caption provided...</span>}
                            </p>

                            <div className="flex items-center justify-between border-t border-white/5 pt-4">
                              <div className="flex items-center gap-2 min-w-0">
                                <SAvatar url={post.creatorAvatarUrl} />
                                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 truncate">
                                  {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 shrink-0">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className={`h-9 w-9 rounded-full transition-all ${expandedPostId === post.id ? 'bg-primary/20 text-primary' : 'hover:bg-secondary/40 text-muted-foreground/60'}`}
                                  onClick={(e) => toggleComments(e, post.id)}
                                >
                                  <MessageSquare className={`h-4 w-4 ${expandedPostId === post.id ? 'fill-primary text-primary' : ''}`} />
                                </Button>

                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className={`h-9 w-9 rounded-full transition-all ${post.isLiked ? 'bg-red-500/10 text-red-500' : 'hover:bg-secondary/40 text-muted-foreground/60'}`}
                                  onClick={(e) => handleLike(e, post.id)}
                                >
                                  <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                                </Button>

                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-9 w-9 rounded-full hover:bg-secondary/40"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                      }}
                                    >
                                      <MoreVertical className="h-4 w-4 text-muted-foreground/60" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent
                                    align="end"
                                    className="w-40 rounded-xl bg-background/80 backdrop-blur-xl border-white/10"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                    }}
                                  >
                                    <DropdownMenuItem className="gap-2 cursor-pointer focus:bg-destructive/10 focus:text-destructive">
                                      <Flag className="h-4 w-4" />
                                      <span>Flag</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="gap-2 cursor-pointer focus:bg-destructive/10 focus:text-destructive">
                                      <AlertTriangle className="h-4 w-4" />
                                      <span>Report</span>
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          </div>
                        </CardContent>

                        {/* Expandable Comments Section */}
                        <AnimatePresence>
                          {expandedPostId === post.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                              className="overflow-hidden border-t border-white/5 bg-black/20"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                            >
                              <div className="p-4 md:p-6 pt-2">
                                <PostComments postId={post.id} />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {loading && (
            <div className="py-20 flex flex-col items-center gap-4">
              <Loading />
              <p className="text-xs font-bold text-muted-foreground/30 uppercase tracking-[0.3em]">Curating your feed</p>
            </div>
          )}
        </InfiniteScrollManager>
      </div>
    </div>
  );
}
