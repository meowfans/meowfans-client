'use client';

import { useCreators } from '@/hooks/useCreators';
import { SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Loading } from '@workspace/ui/globals/Loading';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Crown, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';

export function TrendingCreatorsView() {
  const { creators, loadMore, hasMore, loading } = useCreators({
    take: 40,
    sortBy: SortBy.VaultCount,
    orderBy: SortOrder.Desc
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loading />
        <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground animate-pulse">Ranking Creators</p>
      </div>
    );
  }

  if(!creators.length && !loading){
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground animate-pulse">No Trending Creators Found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-6 md:gap-8 p-3 md:p-8 pt-4 md:pt-0 max-w-6xl mx-auto w-full pb-20">
      {/* Header */}
      <div className="flex flex-col gap-4 px-1">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 flex-shrink-0">
            <Crown className="h-5 w-5 md:h-6 md:w-6 text-amber-500" />
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl md:text-3xl font-black tracking-tighter uppercase italic truncate">Creator Rankings</h1>
            <p className="text-muted-foreground text-[10px] md:text-sm font-medium uppercase tracking-[0.2em] truncate">
              Engagement and fan growth
            </p>
          </div>
        </div>
      </div>

      <InfiniteScrollManager dataLength={creators.length} loading={loading} hasMore={hasMore} useWindowScroll onLoadMore={loadMore}>
        <div className="grid grid-cols-1 gap-4">
          <AnimatePresence mode="popLayout">
            {creators.map((creator, index) => (
              <motion.div
                key={creator.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: Math.min(index * 0.05, 0.5) }}
              >
                <Link href={`/creators/${creator.username}`}>
                  <Card className="group relative p-3 md:p-6 border-none bg-secondary/15 hover:bg-secondary/25 transition-all duration-300 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-between cursor-pointer overflow-hidden shadow-none hover:shadow-xl hover:shadow-primary/5">
                    {/* Background glow for top 3 */}
                    {index < 3 && (
                      <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-primary/5 blur-[80px] md:blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    )}

                    <div className="flex items-center gap-3 md:gap-6 relative z-10 min-w-0">
                      <div className="flex items-center justify-center w-6 md:w-10 text-base md:text-2xl font-black italic text-muted-foreground/30 group-hover:text-primary transition-colors flex-shrink-0">
                        #{index + 1}
                      </div>

                      <div className="relative flex-shrink-0">
                        <Avatar className="h-12 w-12 md:h-20 md:w-20 border-2 border-background ring-4 ring-primary/5 group-hover:ring-primary/20 transition-all">
                          <AvatarImage src={creator.avatarUrl} className="object-cover" />
                          <AvatarFallback className="bg-primary/10 font-bold text-base md:text-lg">
                            {creator.username.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        {index === 0 && (
                          <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-amber-500 p-1 md:p-1.5 rounded-full border-2 border-background shadow-lg">
                            <Crown className="h-2 w-2 md:h-3 md:w-3 text-white" />
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-0.5 md:gap-1 min-w-0">
                        <div className="flex items-center gap-1.5 md:gap-2">
                          <span className="font-black text-sm md:text-xl tracking-tight truncate">@{creator.username}</span>
                          <CheckCircle2 className="h-3 w-3 md:h-4 md:w-4 text-blue-500 fill-blue-500/10 flex-shrink-0" />
                        </div>
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="flex items-center gap-1 md:gap-1.5">
                            <Users className="h-2.5 w-2.5 md:h-3 md:w-3 text-muted-foreground" />
                            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                              {Math.floor(Math.random() * 500) + 100}k
                            </span>
                          </div>
                          <div className="h-1 w-1 rounded-full bg-border" />
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-2.5 w-2.5 md:h-3 md:w-3 text-green-500" />
                            <span className="text-[8px] md:text-[10px] font-black text-green-500 uppercase tracking-widest">
                              +{Math.floor(Math.random() * 15) + 1}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 md:gap-4 relative z-10 flex-shrink-0">
                      <div className="hidden sm:flex flex-col items-end gap-0.5 md:gap-1 px-4 md:px-8 border-x border-border/40">
                        <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">
                          Value
                        </span>
                        <span className="font-black text-xs md:text-lg text-primary italic uppercase whitespace-nowrap">
                          ${Math.floor(Math.random() * 50) + 10}/mo
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 md:h-12 md:w-12 rounded-full bg-secondary/40 group-hover:bg-primary group-hover:text-white transition-all shadow-none flex-shrink-0"
                      >
                        <ArrowUpRight className="h-4 w-4 md:h-6 md:w-6" />
                      </Button>
                    </div>
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
