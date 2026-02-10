import { BlurImage } from '@/components/BlurImage';
import { BlurVideo } from '@/components/BlurVideo';
import { FileType, GetLikedPostsOutput } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import { motion } from 'framer-motion';
import { ChevronRight, Heart, MessageSquare } from 'lucide-react';
import Link from 'next/link';

interface LikedPostsSectionProps {
  postLikes: GetLikedPostsOutput[];
}

export const LikedPostsSection = ({ postLikes }: LikedPostsSectionProps) => {
  return (
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
              <Link
                href={`/posts/${item.id}`}
                className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl overflow-hidden shrink-0 border border-white/5 bg-muted"
              >
                {item.fileType === FileType.Video ? (
                  <BlurVideo
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
  );
};
