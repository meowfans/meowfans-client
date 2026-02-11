'use client';

import { getSinglePost } from '@/app/server/getSinglePost';
import { usePostsStore } from '@/hooks/store/posts.store';
import { GetPostInput, GetPublicSinglePostOutput } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useEffect, useState } from 'react';

export const useServerSinglePost = (input: GetPostInput, initialPost: GetPublicSinglePostOutput | null) => {
  const { errorHandler } = useErrorHandler();
  const { post, setPost } = usePostsStore();
  const [loading, setLoading] = useState<boolean>(!initialPost);

  const loadPost = async () => {
    setLoading(true);
    try {
      const data = await getSinglePost(input);
      if (data) {
        setPost(data as GetPublicSinglePostOutput);
      }
    } catch (error) {
      errorHandler({ error, msg: 'Error loading post! Try again later.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialPost) {
      setPost(initialPost);
    }
  }, [initialPost, setPost]);

  return {
    post,
    loading,
    loadPost
  };
};
