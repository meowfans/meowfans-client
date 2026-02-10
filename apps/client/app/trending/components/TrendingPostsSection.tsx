'use client';

import { BlurImage } from '@/components/BlurImage';
import { GetPublicPostsOutput } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import { motion } from 'framer-motion';
import { ChevronRight, LayoutGrid, MessageSquare, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface TrendingPostsSectionProps {
  posts: GetPublicPostsOutput[];
}

export function TrendingPostsSection({ posts }: TrendingPostsSectionProps) {
  return (
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
                  src={post.preview as string}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                  alt="Trending post preview"
                />
              </div>
              <div className="flex-1 space-y-1 min-w-0">
                <p className="text-sm font-bold truncate leading-tight group-hover:text-primary transition-colors">
                  {post.caption || 'No caption provided'}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">@{post.creatorUsername}</span>
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
  );
}
