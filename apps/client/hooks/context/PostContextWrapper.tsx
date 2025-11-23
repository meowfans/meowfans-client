'use client';

import { usePostsStore } from '@/hooks/store/posts.store';
import { PostsEntity } from '@workspace/gql/generated/graphql';
import { useEffect } from 'react';

interface Props {
  post: PostsEntity;
  children: React.ReactNode;
}

export default function PostContextWrapper({ post, children }: Props) {
  const { setPost } = usePostsStore();

  useEffect(() => {
    if (post) setPost(post);
  }, []);

  return <>{children}</>;
}
