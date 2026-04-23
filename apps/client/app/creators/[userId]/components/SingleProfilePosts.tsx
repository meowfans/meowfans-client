import { BlurImage } from '@/components/BlurImage';
import { GetPublicCreatorProfileOutput, GetPublicPostsOutput } from '@workspace/gql/generated/graphql';
import { TabsContent } from '@workspace/ui/components/tabs';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import Link from 'next/link';

interface SingleProfilePostsProps {
  profile: GetPublicCreatorProfileOutput;
  initialPosts: GetPublicPostsOutput[];
}

export const SingleProfilePosts = ({ profile, initialPosts }: SingleProfilePostsProps) => {
  return (
    <TabsContent value="posts" className="space-y-4">
      <motion.div
        key="posts"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="grid grid-cols-3 gap-1px md:gap-1"
      >
        {initialPosts.map((post) => (
          <Link href={`/posts/${post.id}`} key={post.id} className="relative aspect-square w-full overflow-hidden bg-white/5">
            <BlurImage src={post.preview ?? ''} alt={post.caption ?? ''} className="h-full w-full object-cover" />
            {post.objectCount > 1 && (
              <div className="absolute top-2 right-2 md:top-3 md:right-3">
                <svg className="h-4 w-4 text-white opacity-80" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 7a2 2 0 012 2v10a2 2 0 01-2 2H9a2 2 0 01-2-2V9a2 2 0 012-2h10zM9 5a4 4 0 00-4 4v10a4 4 0 004 4h10a4 4 0 004-4V9a4 4 0 00-4-4H9z" />
                </svg>
              </div>
            )}
            {!post.isPurchased && (
              <div className="absolute top-2 left-2">
                <Lock className="h-3 w-3 text-white/60" />
              </div>
            )}
          </Link>
        ))}
        {initialPosts.length > 0 && (
          <div className="col-span-3 flex justify-center py-8">
            <Link href={`/creators/${profile.username}/posts`}>
              <button className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-white transition-colors border border-white/10 px-6 py-2 rounded-full">
                View All Posts
              </button>
            </Link>
          </div>
        )}
      </motion.div>
    </TabsContent>
  );
};
