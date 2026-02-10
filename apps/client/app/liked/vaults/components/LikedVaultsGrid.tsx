import { BlurImage } from '@/components/BlurImage';
import { GetLikedVaultsOutput } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent } from '@workspace/ui/components/card';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Loading } from '@workspace/ui/globals/Loading';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

interface LikedVaultsGridProps {
  items: GetLikedVaultsOutput[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

export const LikedVaultsGrid = ({ items, loading, hasMore, onLoadMore }: LikedVaultsGridProps) => {
  return (
    <InfiniteScrollManager dataLength={items.length} loading={loading} hasMore={hasMore} onLoadMore={onLoadMore}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.1, 0.5) }}
            >
              <Link href={`/vaults/${item.id}`}>
                <Card className="group relative overflow-hidden border-none bg-secondary/10 hover:bg-secondary/20 transition-all duration-500 rounded-[3rem] shadow-none hover:shadow-2xl hover:shadow-primary/5 cursor-pointer">
                  <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                    <BlurImage
                      src={item.preview as string}
                      alt={item.id as string}
                      className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                      <Badge className="bg-red-500 text-white font-black px-4 h-9 rounded-2xl gap-2 border-none shadow-xl shadow-red-500/20">
                        <Heart className="h-3.5 w-3.5 fill-white" />
                        SAVED
                      </Badge>
                    </div>
                    <div className="absolute bottom-6 right-6">
                      <div className="bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl flex items-center gap-2">
                        <span className="text-[10px] uppercase font-bold text-white/60 tracking-widest">Items</span>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-8 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">{/* Avatar/Username placeholders */}</div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-red-500 hover:bg-red-500/10">
                        <Heart className="h-4 w-4 fill-red-500" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl leading-tight group-hover:text-primary transition-colors">{/* Title placeholder */}</h3>
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
  );
};
