'use client';

import { BlurImage } from '@/components/BlurImage';
import { useLikedPosts } from '@/hooks/useLikedPosts';
import { useLikedVaultObjects } from '@/hooks/useLikedVaultObjects';
import { useLikedVaults } from '@/hooks/useLikedVaults';
import { FileType } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import { Loading } from '@workspace/ui/globals/Loading';
import { motion } from 'framer-motion';
import { ChevronRight, Heart, Image as ImageIcon, LayoutGrid, MessageSquare, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function LikedView() {
  const { postLikes, loading: loadingPosts } = useLikedPosts({ take: 4 });
  const { vaultObjectLikes, loading: loadingPictures } = useLikedVaultObjects({ take: 4 });
  const { vaultLikes, loading: loadingVaults } = useLikedVaults({ take: 4 });

  const isLoading = loadingPosts || loadingPictures || loadingVaults;
  const hasNotAnyLikes = !postLikes.length && !vaultObjectLikes.length && !vaultLikes.length;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loading />
        <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground animate-pulse">Syncing your favorites</p>
      </div>
    );
  }

  if (hasNotAnyLikes && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-8 text-center space-y-6">
        <div className="h-24 w-24 rounded-full bg-secondary/20 flex items-center justify-center border border-dashed border-border/50">
          <Heart className="h-10 w-10 text-muted-foreground/30" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black italic uppercase tracking-tight italic">Your collection is empty</h2>
          <p className="text-sm text-muted-foreground uppercase tracking-widest font-medium max-w-[300px] mx-auto">
            Start liking some content to build your personal library of favorites.
          </p>
        </div>
        <Link href="/posts">
          <Button className="rounded-full bg-primary text-white font-black uppercase text-[10px] tracking-widest h-11 px-8 shadow-lg shadow-primary/20">
            Explore Content
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-8 md:gap-12 p-4 md:p-8 pt-4 md:pt-0 max-w-7xl mx-auto w-full pb-20">
      {/* Hero Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-500/20 shrink-0">
            <Heart className="h-5 w-5 md:h-6 md:w-6 text-red-500 fill-red-500" />
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl md:text-3xl font-black tracking-tight uppercase italic truncate">My Favorites</h1>
            <p className="text-muted-foreground text-[10px] md:text-sm font-medium uppercase tracking-[0.15em] md:tracking-[0.2em] truncate">
              Your personal treasure trove
            </p>
          </div>
        </div>
      </div>

      {/* Grid Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12">
        {/* Left: Liked Pictures (Masonry-like teaser) */}
        <div className="lg:col-span-7 space-y-4 md:space-y-6">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="h-7 w-7 md:h-8 md:w-8 rounded-lg md:rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shrink-0">
                <ImageIcon className="h-3.5 w-3.5 md:h-4 md:w-4 text-blue-500" />
              </div>
              <h2 className="text-lg md:text-xl font-black uppercase italic tracking-tight">Saved Captures</h2>
            </div>
            {vaultObjectLikes.length > 0 && (
              <Link href="/liked/pictures">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 md:h-9 px-3 md:px-4 gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-secondary/40 rounded-full shrink-0"
                >
                  <span className="hidden sm:inline">All Pictures</span>
                  <span className="sm:hidden">All</span> ({vaultObjectLikes.length}) <ChevronRight className="h-3 w-3" />
                </Button>
              </Link>
            )}
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
            {vaultObjectLikes.slice(0, 4).map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative aspect-video xs:aspect-[3/4] overflow-hidden rounded-[1.5rem] md:rounded-[2rem] border border-white/5 bg-secondary/10"
              >
                {item.fileType === FileType.Video ? (
                  <video
                    src={item.preview as string}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    muted
                    autoPlay={false}
                    controls
                    playsInline
                  />
                ) : (
                  <BlurImage
                    src={item.preview as string}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt="Liked capture teaser"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex items-end pointer-events-none">
                  <div className="h-7 w-7 md:h-8 md:w-8 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center">
                    <Sparkles className="h-3 md:h-3.5 w-3 md:w-3.5 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Liked Posts & Vaults */}
        <div className="lg:col-span-5 space-y-10 md:space-y-12">
          {/* Posts Section */}
          <section className="space-y-4 md:space-y-6">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="h-7 w-7 md:h-8 md:w-8 rounded-lg md:rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 shrink-0">
                  <MessageSquare className="h-3.5 w-3.5 md:h-4 md:w-4 text-purple-500" />
                </div>
                <h2 className="text-lg md:text-xl font-black uppercase italic tracking-tight">Saved Posts</h2>
              </div>
              <Link href="/liked/posts">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 md:h-9 px-3 md:px-4 gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-secondary/40 rounded-full shrink-0"
                >
                  View All <ChevronRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>

            <div className="space-y-3 md:space-y-4">
              {postLikes.slice(0, 3).map((item, i) => (
                <motion.div key={item.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                  <Card className="p-3 md:p-4 border-none bg-secondary/15 hover:bg-secondary/25 transition-all rounded-[1.25rem] md:rounded-[1.5rem] flex gap-3 md:gap-4 items-center group cursor-pointer shadow-none">
                    <Link href={`/posts/${item.id}`} className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl overflow-hidden shrink-0 border border-white/5 bg-muted">
                      {item.fileType === FileType.Video ? (
                        <video
                          src={item.preview as string}
                          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                          autoPlay
                          muted
                          loop
                          playsInline
                        />
                      ) : (
                        <BlurImage
                          src={item.preview as string}
                          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                          alt="Teaser post highlight"
                        />
                      )}
                    </Link>
                    <div className="flex-1 space-y-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 italic truncate">
                          Explore Post
                        </span>
                        <div className="flex items-center gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity">
                          <Heart className="h-3 w-3 fill-red-500 text-red-500" />
                        </div>
                      </div>
                      <div className="h-2 w-24 bg-foreground/5 rounded-full animate-pulse group-hover:bg-primary/20 transition-colors" />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Vaults Section */}
          <section className="space-y-4 md:space-y-6">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="h-7 w-7 md:h-8 md:w-8 rounded-lg md:rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 shrink-0">
                  <LayoutGrid className="h-3.5 w-3.5 md:h-4 md:w-4 text-amber-500" />
                </div>
                <h2 className="text-lg md:text-xl font-black uppercase italic tracking-tight">Collections</h2>
              </div>
              <Link href="/liked/vaults">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 md:h-9 px-3 md:px-4 gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-secondary/40 rounded-full shrink-0"
                >
                  Library <ChevronRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>

            <div className="space-y-3 md:space-y-4">
              {vaultLikes.slice(0, 2).map((item, i) => (
                <motion.div key={item.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                  <Card className="p-0 border-none bg-secondary/15 hover:bg-secondary/25 transition-all rounded-[1.5rem] md:rounded-[2rem] overflow-hidden group cursor-pointer shadow-none relative">
                    <Link href={`/vaults/${item.id}`} className="h-20 md:h-24 w-full relative">
                      <BlurImage
                        src={item.preview as string}
                        className="h-full w-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                        alt="Teaser collection banner"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent pointer-events-none" />
                      <div className="absolute inset-0 p-4 md:p-5 flex flex-col justify-center min-w-0 pointer-events-none">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="h-4 w-4 rounded-full bg-white/10 shrink-0" />
                          <span className="text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground group-hover:text-white transition-colors truncate">
                            Premium Collection
                          </span>
                        </div>
                        <div className="h-3 w-32 bg-foreground/10 rounded-full group-hover:bg-primary/30 transition-colors" />
                      </div>
                    </Link>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
