import { PostAssetsEntity, PostsEntity, PostStatAnalyticsOutput } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type PostsStore = {
  post: PostsEntity;
  posts: PostsEntity[];
  openPostCreateModal: boolean;
  postAssets: PostAssetsEntity[];
  setPost: (post: PostsEntity) => void;
  setPosts: (posts: PostsEntity[]) => void;
  postsAnalytics: PostStatAnalyticsOutput[];
  setOpenPostCreateModal: (open: boolean) => void;
  setPostAssets: (postAssets: PostAssetsEntity[]) => void;
  setPostsAnalytics: (postsAnalytics: PostStatAnalyticsOutput[]) => void;
};

export const usePostsStore = create<PostsStore>()(
  persist(
    (set) => ({
      posts: [],
      postAssets: [],
      post: {} as PostsEntity,
      openPostCreateModal: false,
      postsAnalytics: [],

      setPost: (post) => set({ post }),
      setPosts: (posts) => set({ posts }),
      setPostAssets: (postAssets) => set({ postAssets }),
      setOpenPostCreateModal: (open) => set({ openPostCreateModal: open }),
      setPostsAnalytics: (postsAnalytics) => set({ postsAnalytics })
    }),
    {
      name: 'posts-store',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
