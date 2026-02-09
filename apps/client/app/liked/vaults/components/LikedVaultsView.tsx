'use client';

import { BlurImage } from '@/components/BlurImage';
import { useLikedVaults } from '@/hooks/useLikedVaults';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent } from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Loading } from '@workspace/ui/globals/Loading';
import { AnimatePresence, motion } from 'framer-motion';
import { Filter, Heart, Search, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export function LikedVaultsView() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { vaultLikes, loadMore, hasMore, loading } = useLikedVaults({ take: 30 });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loading />
        <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground animate-pulse">Accessing Vaults</p>
      </div>
    );
  }

  if (!vaultLikes.length && !loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground animate-pulse">No Liked Vaults</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-8 p-4 md:p-12 pt-0 max-w-7xl mx-auto w-full pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8  pb-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-red-500/10 px-4 py-1.5 rounded-full border border-red-500/20">
            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500">Private Collection</span>
          </div>
          <h1 className="text-5xl md:text-7xl  leading-none">
            Liked <span className="text-muted-foreground/30 italic">Vaults</span>
          </h1>
          <p className="text-muted-foreground max-w-lg font-medium leading-relaxed">
            Quick access to content collections you&apos;ve marked for future enjoyment.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group w-full md:w-[280px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              placeholder="Search collection..."
              className="pl-9 h-12 rounded-2xl border-border/50 bg-secondary/15 focus-visible:ring-primary/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl border-border/50 bg-secondary/15 hover:bg-secondary/40">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <InfiniteScrollManager dataLength={vaultLikes.length} loading={loading} hasMore={hasMore} onLoadMore={loadMore}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {vaultLikes.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.1, 0.5) }}
              >
                <Link href={`/vaults/${item.id}`}>
                  <Card className="group relative overflow-hidden border-none bg-secondary/10 hover:bg-secondary/20 transition-all duration-500 rounded-[3rem] shadow-none hover:shadow-2xl hover:shadow-primary/5 cursor-pointer">
                    {/* Hero Preview */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                      <BlurImage
                        src={item.preview as string}
                        alt={item.id as string}
                        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />

                      {/* Interactive Badges */}
                      <div className="absolute top-6 left-6 flex flex-col gap-2">
                        <Badge className="bg-red-500 text-white font-black px-4 h-9 rounded-2xl gap-2 border-none shadow-xl shadow-red-500/20">
                          <Heart className="h-3.5 w-3.5 fill-white" />
                          SAVED
                        </Badge>
                      </div>

                      {/* Item Count floating */}
                      <div className="absolute bottom-6 right-6">
                        <div className="bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl flex items-center gap-2">
                          {/* <span className="text-white font-black text-lg leading-none">{item.objectCount}</span> */}
                          <span className="text-[10px] uppercase font-bold text-white/60 tracking-widest">Items</span>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-8 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {/* <SAvatar url={item.vault.creatorAvatarUrl} size="sm" />
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 italic">
                            @{item.vault.creatorUsername}
                          </span> */}
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-red-500 hover:bg-red-500/10">
                          <Heart className="h-4 w-4 fill-red-500" />
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-2xl  leading-tight group-hover:text-primary transition-colors">
                          {/* {item.vault.description || 'The Private Collection'} */}
                        </h3>
                      </div>

                      <div className="pt-4 flex items-center justify-between border-t border-border/40">
                        <div className="flex items-center gap-1.5">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                          <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Library Asset</span>
                        </div>
                        <div className="flex items-center gap-2 text-primary">
                          <ShoppingCart className="h-3.5 w-3.5" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Owned</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {loading && (
          <div className="py-20 flex justify-center">
            <Loading />
          </div>
        )}
      </InfiniteScrollManager>
    </div>
  );
}
