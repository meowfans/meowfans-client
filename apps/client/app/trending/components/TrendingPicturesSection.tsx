'use client';

import { BlurImage } from '@/components/BlurImage';
import { GetPublicVaultObjectsOutput } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { motion } from 'framer-motion';
import { ChevronRight, Heart, Image as ImageIcon, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface TrendingPicturesSectionProps {
  vaultObjects: GetPublicVaultObjectsOutput[];
}

export function TrendingPicturesSection({ vaultObjects }: TrendingPicturesSectionProps) {
  return (
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
            className="group relative aspect-square overflow-hidden rounded-[2rem] border border-border/50 bg-secondary/10 pointer-events-none"
          >
            <BlurImage
              src={pic.rawUrl as string}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt="Trending capture"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent pointer-events-none to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex items-end justify-between">
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
  );
}
