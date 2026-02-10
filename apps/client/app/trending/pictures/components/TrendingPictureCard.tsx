'use client';

import { BlurImage } from '@/components/BlurImage';
import { GetPublicVaultObjectsOutput } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import { motion } from 'framer-motion';
import { Download, Expand, Heart, Image as ImageIcon } from 'lucide-react';

interface TrendingPictureCardProps {
  item: GetPublicVaultObjectsOutput;
  index: number;
}

export function TrendingPictureCard({ item, index }: TrendingPictureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: Math.min(index * 0.05, 0.5) }}
      className="break-inside-avoid"
    >
      <Card className="group relative overflow-hidden border-none bg-secondary/20 shadow-none rounded-[2rem] transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 cursor-zoom-in">
        <div className="relative">
          <BlurImage
            src={item.rawUrl as string}
            alt="Trending capture"
            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110 ease-out"
          />

          {/* Hover UI Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
            {/* Top Badges */}
            <div className="absolute left-4 top-4 transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <div className="flex items-center gap-2">
                <Badge className="bg-primary hover:bg-primary text-white border-none font-black text-[9px] uppercase tracking-tighter px-2.5 h-6 rounded-lg">
                  VIRAL #{index + 1}
                </Badge>
                {item.unlockPrice && !item.isPurchased && (
                  <Badge className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-black text-[9px] uppercase px-2.5 h-6 rounded-lg">
                    ${item.unlockPrice}
                  </Badge>
                )}
              </div>
            </div>

            {/* Bottom Info Area */}
            <div className="absolute bottom-5 left-5 right-5 flex flex-col gap-4 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-white">
                    <Heart className={`h-4 w-4 ${item.isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{1250 + ((index * 17) % 500)}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/60">
                    <ImageIcon className="h-4 w-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">HQ</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    className="h-9 w-9 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 text-white"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    className="h-9 w-9 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 text-white"
                  >
                    <Expand className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/40 italic">Global Discovery Feed</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
