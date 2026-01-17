'use client';

import { useSinglePost } from '@/hooks/usePosts';
import { Carousel } from '@workspace/ui/globals/Carousel';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { useParams } from 'next/navigation';
import { SinglePostInsight } from './SinglePostInsight';

export const SinglePost = () => {
  const { postId } = useParams<{ postId: string }>();
  const { post } = useSinglePost({ postId });

  if (!post) {
    return (
      <PageManager>
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <h2 className="text-xl font-semibold">Post not found</h2>
          <p className="text-muted-foreground">This post may have been deleted or is currently unavailable.</p>
        </div>
      </PageManager>
    );
  }

  return (
    <PageManager>
      <div className="mx-auto max-w-6xl px-3 md:px-6 py-6 font-sans">
        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr] items-start">
          <Carousel
            items={post.postAssets}
            getKey={(item) => item.asset.id}
            getUrl={(item) => item.asset.rawUrl}
            getFileType={(item) => item.asset.fileType}
          />
          <SinglePostInsight post={post} />
        </div>
      </div>
    </PageManager>
  );
};
