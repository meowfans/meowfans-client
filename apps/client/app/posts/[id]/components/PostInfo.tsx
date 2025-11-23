'use client';

import { ExoAdProvider } from '@/components/ExoAdProvider';
import { LikeButton } from '@/components/LikeButton';
import { usePostsStore } from '@/hooks/store/posts.store';
import { Card, CardContent, CardFooter, CardHeader } from '@workspace/ui/components/card';
import { Separator } from '@workspace/ui/components/separator';
import { SAvatar } from '@workspace/ui/globals/SAvatar';
import { cn } from '@workspace/ui/lib/utils';
import { Heart, MessageCircle } from 'lucide-react';
import moment from 'moment';
import Link from 'next/link';

export const PostInfoSection = () => {
  const { post } = usePostsStore();

  return (
    <Card
      className={cn(
        'overflow-hidden h-full mb-60 rounded-2xl border border-border bg-card text-card-foreground shadow-sm md:max-w-[calc(100vw-270px)] w-full'
      )}
    >
      <CardHeader className="flex flex-row items-center gap-3 pt-4">
        <Link href={`/creators/${post.creatorProfile?.user?.username}`}>
          <SAvatar className="h-12 w-12" url={post.creatorProfile?.user?.avatarUrl} />
        </Link>

        <div className="flex flex-col">
          <Link href={`/creators/${post.creatorProfile?.user?.username}`}>
            <p className="font-semibold text-lg">{post.creatorProfile?.user?.username}</p>
          </Link>
          <p className="text-sm text-muted-foreground">{moment(post.createdAt).fromNow()}</p>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-base text-muted-foreground whitespace-pre-line">{post.caption}</p>
        <ExoAdProvider zoneId="5769740" />
      </CardContent>

      <Separator />

      <CardFooter className="flex flex-row justify-between items-center py-3 text-sm">
        <div className="flex gap-4 text-muted-foreground">
          <span className="flex items-center gap-1">
            <Heart className={cn('w-4 h-4', post.isLiked && 'fill-red-500 text-red-500')} /> {post.likeCount}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" /> {post.commentCount}
          </span>
          {/* <span className="flex items-center gap-1">
            <Bookmark className="w-4 h-4" /> {post.saveCount}
          </span>
          <span className="flex items-center gap-1">
            <Share2 className="w-4 h-4" /> {post.shareCount}
          </span> */}
        </div>

        <LikeButton isLiked={post.isLiked} disabled />
      </CardFooter>

      <Separator />

      <CardContent className="text-xs text-muted-foreground space-y-1">
        <p>Created: {moment(post.createdAt).format('LT L')}</p>
        <p>Updated: {moment(post.updatedAt).format('LT L')}</p>
      </CardContent>
    </Card>
  );
};
