import { BlurImage } from '@/components/BlurImage';
import { GetLikedVaultsOutput } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import { motion } from 'framer-motion';
import { ChevronRight, LayoutGrid } from 'lucide-react';
import Link from 'next/link';

interface LikedVaultsSectionProps {
  vaultLikes: GetLikedVaultsOutput[];
}

export const LikedVaultsSection = ({ vaultLikes }: LikedVaultsSectionProps) => {
  return (
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
  );
};
