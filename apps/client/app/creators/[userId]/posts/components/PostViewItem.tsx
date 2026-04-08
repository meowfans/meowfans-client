import { BlurImage } from '@/components/BlurImage';
import { GetPublicPostsOutput } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { Heart, Lock } from 'lucide-react';
import Link from 'next/link';

interface PostViewItemProps {
  post: GetPublicPostsOutput;
}

export const PostViewItem: React.FC<PostViewItemProps> = ({ post }) => {
  return (
    <Link href={`/posts/${post.id}`} className="relative aspect-square w-full overflow-hidden bg-muted/20">
      <BlurImage
        src={post.preview}
        alt={post.caption}
        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        loading="lazy"
      />

      <div className="hidden md:flex absolute left-2 top-2 flex-wrap gap-1 pointer-events-none">
        {post.unlockPrice && post.unlockPrice > 0 && !post.isPurchased && (
          <Badge className="bg-black/60 backdrop-blur-md border-none text-white h-6 px-2 rounded-sm font-bold text-[10px]">
            <Lock className="h-3 w-3 text-primary mr-1" />${post.unlockPrice}
          </Badge>
        )}
      </div>

      {post.unlockPrice && post.unlockPrice > 0 && !post.isPurchased && (
        <div className="md:hidden absolute top-2 left-2 pointer-events-none">
          <div className="bg-black/40 backdrop-blur-sm p-1 rounded-sm">
            <Lock className="h-3 w-3 text-primary" />
          </div>
        </div>
      )}

      {post.objectCount > 1 && (
        <div className="absolute top-2 right-2 md:top-3 md:right-3 pointer-events-none">
          <div className="bg-black/40 backdrop-blur-sm p-1 rounded-sm">
            <svg className="h-3 w-3 md:h-4 md:w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19V7a2 2 0 012-2h10a2 2 0 012 2v12l-5-3-5 3z" />
            </svg>
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
        <div className="flex items-center gap-1 text-white font-bold text-xs md:text-sm">
          <Heart className="h-4 w-4 fill-white" />
          <span>View</span>
        </div>
      </div>
    </Link>
  );
};
