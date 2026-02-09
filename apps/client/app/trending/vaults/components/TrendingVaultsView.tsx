'use client';

import { BlurImage } from '@/components/BlurImage';
import { useVaults } from '@/hooks/useVaults';
import { SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent } from '@workspace/ui/components/card';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Loading } from '@workspace/ui/globals/Loading';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Box, Heart, Lock, ShoppingCart, TrendingUp, Trophy } from 'lucide-react';
import Link from 'next/link';

export function TrendingVaultsView() {
  const { vaults, loadMore, hasMore, loading } = useVaults({
    take: 30,
    sortBy: SortBy.VaultViewCount,
    orderBy: SortOrder.Desc
  });

  if (loading ) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loading />
        <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground animate-pulse">Unlocking Collections</p>
      </div>
    );
  }

  if(!vaults.length && !loading){
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground animate-pulse">No Trending Vaults Found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-8 p-3 md:p-12 pt-6 md:pt-0 max-w-7xl mx-auto w-full pb-20">
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border/40 pb-8 md:pb-12 px-1">
        <div className="space-y-3 md:space-y-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-3 md:px-4 py-1 md:py-1.5 rounded-full border border-primary/20">
            <Trophy className="h-3 w-3 md:h-4 md:w-4 text-primary" />
            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-primary">Global Leaderboard</span>
          </div>
          <h1 className="text-3xl md:text-7xl  leading-none truncate">
            Trending <span className="text-muted-foreground/30 italic">Vaults</span>
          </h1>
          <p className="text-muted-foreground max-w-lg font-medium leading-relaxed text-xs md:text-base">
            Exclusive collections curating the highest engagement from our creators.
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
          <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-muted-foreground/40">
            <Box className="h-3 w-3 md:h-4 md:w-4" /> 2,492 Total Collections
          </div>
          <Button
            asChild
            className="w-full md:w-auto rounded-full bg-foreground text-background font-black text-[10px] md:text-xs uppercase tracking-widest px-6 md:px-8 group h-9 md:h-11"
          >
            <Link href={'/vaults'}>
              Explore All <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>

      <InfiniteScrollManager dataLength={vaults.length} loading={loading} hasMore={hasMore} useWindowScroll onLoadMore={loadMore}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-1">
          <AnimatePresence mode="popLayout">
            {vaults.map((vault, index) => (
              <motion.div
                key={vault.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.1, 0.5) }}
              >
                <Link href={`/vaults/${vault.id}`}>
                  <Card className="group relative overflow-hidden border-none bg-secondary/10 hover:bg-secondary/20 transition-all duration-500 rounded-[2rem] md:rounded-[3rem] shadow-none hover:shadow-2xl hover:shadow-primary/5 cursor-pointer">
                    {/* Hero Preview */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                      <BlurImage
                        src={vault.preview}
                        alt={vault.description || 'Vault teaser'}
                        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />

                      {/* Interactive Badges */}
                      <div className="absolute top-4 left-4 md:top-6 md:left-6 flex flex-col gap-2">
                        {vault.unlockPrice && (
                          <Badge className="bg-background/80 backdrop-blur-xl border-white/10 text-foreground font-black px-3 md:px-4 h-8 md:h-9 rounded-xl md:rounded-2xl gap-2 shadow-xl text-[10px] md:text-xs">
                            <Lock className="h-3 w-3 md:h-3.5 md:w-3.5 text-primary" />${vault.unlockPrice}
                          </Badge>
                        )}
                        <Badge className="bg-primary hover:bg-primary text-white font-black px-3 md:px-4 h-8 md:h-9 rounded-xl md:rounded-2xl gap-2 border-none shadow-xl shadow-primary/20 text-[10px] md:text-xs">
                          <TrendingUp className="h-3 w-3 md:h-3.5 md:w-3.5" />
                          HOT
                        </Badge>
                      </div>

                      {/* Item Count floating */}
                      <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6">
                        <div className="bg-black/40 backdrop-blur-md border border-white/10 px-3 md:px-4 py-1.5 md:py-2 rounded-xl md:rounded-2xl flex items-center gap-2">
                          <span className="text-white font-black text-base md:text-lg leading-none">{vault.objectCount}</span>
                          <span className="text-[8px] md:text-[10px] uppercase font-bold text-white/60 tracking-widest">Items</span>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-5 md:p-8 space-y-3 md:space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">{/* Profile placeholder if needed */}</div>
                        <div className="flex items-center gap-1.5">
                          <Heart
                            className={`h-3.5 w-3.5 md:h-4 md:w-4 ${vault.isLiked ? 'fill-red-500 text-red-500' : 'text-muted-foreground/30'}`}
                          />
                          <span className="text-[9px] md:text-[10px] font-black tabular-nums">{2400 + ((index * 42) % 1000)}</span>
                        </div>
                      </div>

                      <div className="space-y-1 md:space-y-2">
                        <h3 className="text-xl md:text-2xl  leading-tight group-hover:text-primary transition-colors line-clamp-2">
                          {vault.description || 'The Ultimate Exclusive Collection'}
                        </h3>
                      </div>

                      <div className="pt-3 md:pt-4 flex items-center justify-between border-t border-border/40">
                        <div className="flex items-center gap-1.5">
                          <div className="h-1 w-1 md:h-1.5 md:w-1.5 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">
                            Updated Recently
                          </span>
                        </div>
                        {vault.isPurchased && (
                          <div className="flex items-center gap-2 text-primary">
                            <ShoppingCart className="h-3 w-3 md:h-3.5 md:w-3.5" />
                            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest">Owned</span>
                          </div>
                        )}
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
