'use client';

import { BlurImage } from '@/components/BlurImage';
import { useLikedVaultObjects } from '@/hooks/useLikedVaultObjects';
import { FileType } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Loading } from '@workspace/ui/globals/Loading';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, Expand, Filter, Heart, Image as ImageIcon, Search } from 'lucide-react';
import { useState } from 'react';

export function LikedPicturesView() {
  const { vaultObjectLikes, loadMore, hasMore, loading } = useLikedVaultObjects({ take: 30 });
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = vaultObjectLikes.filter((item) => item.id.toLowerCase().includes(searchTerm.toLowerCase()));

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loading />
        <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground animate-pulse">Loading Your Gallery</p>
      </div>
    );
  }

  if (!vaultObjectLikes.length && !loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground animate-pulse">No Liked Pictures</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-6 md:gap-8 p-4 md:p-8 pt-4 md:pt-0 max-w-7xl mx-auto w-full pb-20">
      {/* Header with Search */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="h-12 w-12 md:h-14 md:w-14 rounded-2xl md:rounded-[1.5rem] bg-red-500/10 flex items-center justify-center border border-red-500/20 shrink-0">
            <Heart className="h-5 w-5 md:h-6 md:w-6 text-red-500 fill-red-500" />
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight uppercase italic bg-gradient-to-br from-foreground to-foreground/50 bg-clip-text text-transparent truncate">
              Saved Photos
            </h1>
            <p className="text-muted-foreground text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mt-0.5 md:mt-1 flex items-center gap-2">
              <ImageIcon className="h-3 w-3" />
              <span className="truncate">{vaultObjectLikes.length} High Quality Captures</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3 w-full lg:w-auto">
          <div className="relative group flex-1 lg:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 md:h-4 md:w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              placeholder="Search captures..."
              className="pl-9 h-10 md:h-11 rounded-xl md:rounded-2xl border-border/50 bg-secondary/15 focus-visible:ring-primary/20 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 md:h-11 md:w-11 rounded-xl md:rounded-2xl border-border/50 bg-secondary/15 hover:bg-secondary/40 shrink-0"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <InfiniteScrollManager dataLength={vaultObjectLikes.length} loading={loading} hasMore={hasMore} onLoadMore={loadMore}>
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-6 px-0.5">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
                className="break-inside-avoid mb-4 md:mb-6"
              >
                <Card className="group relative overflow-hidden border-none bg-secondary/15 hover:bg-secondary/25 transition-all duration-300 shadow-none hover:shadow-2xl hover:shadow-primary/5 rounded-[1.5rem] md:rounded-[2rem] cursor-zoom-in">
                  <div className="relative flex flex-col">
                    {item.fileType === FileType.Video ? (
                      <video
                        src={item.preview as string}
                        className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    ) : (
                      <BlurImage
                        src={item.preview as string}
                        alt="Liked capture"
                        className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                      />
                    )}

                    {/* Hover UI Overlay - optimized for mobile responsiveness */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-between p-4 md:p-6">
                      {/* Top Action */}
                      <div className="flex justify-end translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <Button
                          size="icon"
                          className="h-8 w-8 md:h-9 md:w-9 rounded-full bg-red-500 text-white shadow-lg shadow-red-500/20 border-none scale-90 group-hover:scale-100 transition-transform"
                        >
                          <Heart className="h-4 w-4 fill-white" />
                        </Button>
                      </div>

                      {/* Bottom Info Area */}
                      <div className="flex flex-col gap-3 md:gap-4 translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 md:gap-3 min-w-0">
                            <div className="h-7 w-7 md:h-8 md:w-8 rounded-full border border-white/20 overflow-hidden bg-white/10 flex-shrink-0">
                              <div className="w-full h-full flex items-center justify-center text-[8px] md:text-[10px] font-black text-white">
                                MF
                              </div>
                            </div>
                            <span className="text-[9px] md:text-[10px] font-black uppercase text-white/90 tracking-widest truncate">
                              Premium Asset
                            </span>
                          </div>
                          <div className="flex gap-1.5 md:gap-2 shrink-0">
                            <Button
                              size="icon"
                              className="h-8 w-8 md:h-9 md:w-9 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 text-white"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              className="h-8 w-8 md:h-9 md:w-9 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 text-white"
                            >
                              <Expand className="h-3.5 w-3.5 md:h-4 md:w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {loading && (
          <div className="flex items-center justify-center p-20">
            <Loading />
          </div>
        )}
      </InfiniteScrollManager>
    </div>
  );
}
