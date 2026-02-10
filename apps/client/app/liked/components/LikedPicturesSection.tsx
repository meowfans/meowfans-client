import { BlurImage } from '@/components/BlurImage';
import { BlurVideo } from '@/components/BlurVideo';
import { FileType, GetLikedVaultObjectsOutput } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { motion } from 'framer-motion';
import { ChevronRight, ImageIcon, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface LikedPicturesSectionProps {
  vaultObjectLikes: GetLikedVaultObjectsOutput[];
}

export const LikedPicturesSection = ({ vaultObjectLikes }: LikedPicturesSectionProps) => {
  return (
    <div className="lg:col-span-7 space-y-4 md:space-y-6">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="h-7 w-7 md:h-8 md:w-8 rounded-lg md:rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shrink-0">
            <ImageIcon className="h-3.5 w-3.5 md:h-4 md:w-4 text-blue-500" />
          </div>
          <h2 className="text-lg md:text-xl font-black uppercase italic tracking-tight">Saved Captures</h2>
        </div>
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
              <BlurVideo
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
  );
};
