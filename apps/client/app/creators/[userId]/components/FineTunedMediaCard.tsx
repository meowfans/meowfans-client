'use client';

import { BlurImage } from '@/components/BlurImage';
import { Badge } from '@workspace/ui/components/badge';
import { Card } from '@workspace/ui/components/card';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';
import { Heart, Image as ImageIcon, Lock, Play, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

interface FineTunedMediaCardProps {
  href: string;
  preview: string;
  title?: string;
  caption?: string;
  price?: number;
  isPurchased?: boolean;
  isLiked?: boolean;
  itemCount?: number;
  createdAt?: string;
  type?: 'post' | 'vault';
}

export function FineTunedMediaCard({
  href,
  preview,
  title,
  caption,
  price,
  isPurchased,
  isLiked,
  itemCount,
  createdAt,
  type = 'post'
}: FineTunedMediaCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
      <Link href={href} className="block group">
        <Card className="relative overflow-hidden border-white/5 bg-secondary/10 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:border-primary/30 hover:shadow-primary/10">
          <div className="relative aspect-[4/5] overflow-hidden">
            <BlurImage
              src={preview}
              alt={caption || title || 'Preview'}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

            {/* Top Badges */}
            <div className="absolute left-3 top-3 flex flex-wrap gap-2">
              {price && (
                <Badge className="bg-background/60 backdrop-blur-md text-foreground border-white/10 gap-1.5 py-1 px-3">
                  <Lock className="h-3.5 w-3.5 text-primary" />
                  <span className="font-bold">${price}</span>
                </Badge>
              )}
              {isPurchased && (
                <Badge className="bg-primary/80 backdrop-blur-md text-primary-foreground border-none gap-1.5 py-1 px-3">
                  <ShoppingCart className="h-3.5 w-3.5" />
                  Purchased
                </Badge>
              )}
            </div>

            {/* Bottom Info */}
            <div className="absolute inset-x-0 bottom-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              {type === 'vault' && title && <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{title}</h3>}
              {caption && <p className="text-sm text-white/80 line-clamp-2 mb-3 leading-snug">{caption}</p>}

              <div className="flex items-center justify-between border-t border-white/10 pt-3">
                <div className="flex items-center gap-3">
                  {itemCount !== undefined && (
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-white/70 bg-white/5 px-2 py-1 rounded-md">
                      <ImageIcon className="h-3 w-3" />
                      {itemCount} {itemCount === 1 ? 'item' : 'items'}
                    </div>
                  )}
                  {createdAt && (
                    <span className="text-[10px] uppercase tracking-wider text-white/40 font-bold">
                      {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
                    </span>
                  )}
                </div>
                {isLiked && <Heart className="h-5 w-5 fill-red-500 text-red-500 drop-shadow-lg" />}
              </div>
            </div>

            {/* Play/View Icon on Hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="h-14 w-14 rounded-full bg-primary/20 backdrop-blur-md border border-primary/50 flex items-center justify-center scale-90 group-hover:scale-105 transition-transform">
                <Play className="h-6 w-6 text-white fill-white ml-1" />
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
