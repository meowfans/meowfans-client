'use client';

import { BlurImage } from '@/components/BlurImage';
import { useCreators } from '@/hooks/useCreators';
import { usePosts } from '@/hooks/usePosts';
import { useVaultObjects } from '@/hooks/useVaultObjects';
import { SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import { Loading } from '@workspace/ui/globals/Loading';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ChevronRight,
  Flame,
  Heart,
  Image as ImageIcon,
  LayoutGrid,
  MessageSquare,
  Sparkles,
  TrendingUp,
  Users
} from 'lucide-react';
import Link from 'next/link';

export function TrendingView() {
  const { creators, loading: loadingCreators } = useCreators({
    take: 6,
    sortBy: SortBy.AssetCount,
    orderBy: SortOrder.Desc
  });

  const { posts, loading: loadingPosts } = usePosts({
    take: 4,
    sortBy: SortBy.PostCreatedAt, // Using CreatedAt as a proxy for now, generally trending involves recent + engagement
    orderBy: SortOrder.Desc
  });

  const { vaultObjects, loading: loadingPictures } = useVaultObjects({
    take: 4,
    sortBy: SortBy.VaultObjectLikeCount,
    orderBy: SortOrder.Desc
  });

  const isLoading = loadingCreators && loadingPosts && loadingPictures;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loading />
        <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground animate-pulse">Analyzing Trends</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-12 p-4 md:p-8 pt-0 max-w-7xl mx-auto w-full pb-20">
      {/* Hero Section */}
      <div className="relative group overflow-hidden rounded-[3rem] bg-secondary/10 border border-border/50 p-8 md:p-12">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
          <Flame className="h-40 w-40 text-primary rotate-12" />
        </div>
        <div className="relative z-10 space-y-4 max-w-xl">
          <Badge className="bg-primary/10 text-primary border-none text-[10px] px-4 py-1.5 rounded-full ring-1 ring-primary/20">
            Updated 5m ago
          </Badge>
          <h1 className="text-4xl md:text-6xl leading-none">
            Wha&apos;s <span className="text-primary italic">Hot</span> Today
          </h1>
          <p className="text-muted-foreground font-medium text-sm md:text-base leading-relaxed">
            The most engaged creators, viral posts, and exclusive captures trending across the MeowFans universe right now.
          </p>
        </div>
      </div>

      {/* Featured Creators Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
              <Users className="h-4 w-4 text-orange-500" />
            </div>
            <h2 className="text-xl">Rising Stars</h2>
          </div>
          <Link href="/trending/creators">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-[10px] font-black uppercase tracking-widest hover:bg-secondary/40 rounded-full"
            >
              Full Rankings <ArrowRight className="h-3 w-3" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {creators.map((creator, i) => (
            <motion.div
              key={creator.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/${creator.username}`}>
                <Card className="p-4 border-none bg-secondary/15 hover:bg-secondary/30 transition-all rounded-[2rem] text-center space-y-3 group cursor-pointer shadow-none hover:shadow-xl hover:shadow-primary/5">
                  <div className="relative mx-auto w-20 h-20">
                    <Avatar className="h-full w-full border-2 border-background ring-2 ring-primary/5 group-hover:ring-primary/40 transition-all">
                      <AvatarImage src={creator.avatarUrl} className="object-cover" />
                      <AvatarFallback className="bg-primary/10 font-black text-xl">
                        {creator.username.slice(0, 1).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-primary flex items-center justify-center text-[10px] font-black text-white border-2 border-background">
                      {i + 1}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-black truncate">@{creator.username}</p>
                    <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">Top 0.1%</p>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Grid Layout for Posts and Pictures */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Photos */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                <ImageIcon className="h-4 w-4 text-blue-500" />
              </div>
              <h2 className="text-xl">Viral Captures</h2>
            </div>
            <Link href="/trending/pictures">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-[10px] font-black uppercase tracking-widest hover:bg-secondary/40 rounded-full"
              >
                View Gallery <ChevronRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {vaultObjects.map((pic, i) => (
              <motion.div
                key={pic.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative aspect-square overflow-hidden rounded-[2rem] border border-border/50 bg-secondary/10"
              >
                <BlurImage
                  src={pic.rawUrl}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt="Trending capture"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex items-end justify-between">
                  <div className="flex items-center gap-1.5 text-white font-black text-xs">
                    <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500" />
                    {842}
                  </div>
                  <div className="h-8 w-8 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center">
                    <Sparkles className="h-3.5 w-3.5 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Posts */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                <MessageSquare className="h-4 w-4 text-purple-500" />
              </div>
              <h2 className="text-xl">Top Discussions</h2>
            </div>
            <Link href="/trending/posts">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-[10px] font-black uppercase tracking-widest hover:bg-secondary/40 rounded-full"
              >
                Feed <ChevronRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {posts.map((post, i) => (
              <motion.div key={post.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="p-4 border-none bg-secondary/15 hover:bg-secondary/25 transition-all rounded-[1.5rem] flex gap-4 items-start group cursor-pointer">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-border/50">
                    <BlurImage
                      src={post.preview}
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                      alt="Trending post preview"
                    />
                  </div>
                  <div className="flex-1 space-y-1 min-w-0">
                    <p className="text-sm font-bold truncate leading-tight group-hover:text-primary transition-colors">
                      {post.caption || 'No caption provided'}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                        @{post.creatorUsername}
                      </span>
                      <span className="h-0.5 w-0.5 rounded-full bg-muted-foreground/40" />
                      <div className="flex items-center gap-0.5">
                        <TrendingUp className="h-2.5 w-2.5 text-green-500" />
                        <span className="text-[9px] font-black text-green-500/80 uppercase">Hot</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card className="p-6 border-none bg-primary/5 rounded-[2rem] border border-primary/10 flex flex-col items-center gap-4 text-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <LayoutGrid className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm">Discover More Vaults</h3>
              <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Explore 2,400+ hidden collections</p>
            </div>
            <Link href="/trending/vaults" className="w-full">
              <Button className="w-full rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-widest h-10 shadow-lg shadow-primary/20">
                Enter Vaults
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
