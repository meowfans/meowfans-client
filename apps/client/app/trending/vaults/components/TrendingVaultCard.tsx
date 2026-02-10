'use client';

import { BlurImage } from '@/components/BlurImage';
import { GetPublicVaultsOutput } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { Card, CardContent } from '@workspace/ui/components/card';
import { motion } from 'framer-motion';
import { Heart, Lock, ShoppingCart, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface TrendingVaultCardProps {
  vault: GetPublicVaultsOutput;
  index: number;
}

export function TrendingVaultCard({ vault, index }: TrendingVaultCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(index * 0.1, 0.5) }}>
      <Link href={`/vaults/${vault.id}`}>
        <Card className="group relative overflow-hidden border-none bg-secondary/10 hover:bg-secondary/20 transition-all duration-500 rounded-[2rem] md:rounded-[3rem] shadow-none hover:shadow-2xl hover:shadow-primary/5 cursor-pointer">
          {/* Hero Preview */}
          <div className="relative aspect-[16/10] overflow-hidden bg-muted">
            <BlurImage
              src={vault.preview as string}
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
              <h3 className="text-xl md:text-2xl leading-tight group-hover:text-primary transition-colors line-clamp-2">
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
  );
}
