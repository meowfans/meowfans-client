import { PostAssetsEntity, PostsEntity, PostStatAnalyticsOutput } from '@workspace/gql/generated/graphql';
import { Updater } from '@workspace/ui/lib/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type PostsStore = {
  post: PostsEntity;
  posts: PostsEntity[];
  openPostCreateModal: boolean;
  postAssets: PostAssetsEntity[];
  setPost: (updater: Updater<PostsEntity>) => void;
  setPosts: (updater: Updater<PostsEntity[]>) => void;
  postsAnalytics: PostStatAnalyticsOutput[];
  setOpenPostCreateModal: (updater: Updater<boolean>) => void;
  setPostAssets: (updater: Updater<PostAssetsEntity[]>) => void;
  setPostsAnalytics: (updater: Updater<PostStatAnalyticsOutput[]>) => void;
};

export const usePostsStore = create<PostsStore>()(
  persist(
    (set) => ({
      posts: [],
      postAssets: [],
      post: {} as PostsEntity,
      openPostCreateModal: false,
      postsAnalytics: [],

      setPost: (updater) => set((state) => ({ post: typeof updater === 'function' ? updater(state.post) : updater })),
      setPosts: (updater) => set((state) => ({ posts: typeof updater === 'function' ? updater(state.posts) : updater })),
      setPostAssets: (updater) => set((state) => ({ postAssets: typeof updater === 'function' ? updater(state.postAssets) : updater })),
      setOpenPostCreateModal: (updater) => set((state) => ({ openPostCreateModal: typeof updater === 'function' ? updater(state.openPostCreateModal) : updater })),
      setPostsAnalytics: (updater) => set((state) => ({ postsAnalytics: typeof updater === 'function' ? updater(state.postsAnalytics) : updater }))
    }),
    {
      name: 'posts-store',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
