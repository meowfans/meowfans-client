import { GetPostsInfoOutput, PostAssetsEntity, PostsEntity, PostStatAnalyticsOutput } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type PostsStore = {
  post: PostsEntity;
  posts: PostsEntity[];
  openPostCreateModal: boolean;
  postInfo: GetPostsInfoOutput;
  postAssets: PostAssetsEntity[];
  postsInfo: GetPostsInfoOutput[];
  setPost: (post: PostsEntity) => void;
  setPosts: (posts: PostsEntity[]) => void;
  postsAnalytics: PostStatAnalyticsOutput[];
  setPostInfo: (post: GetPostsInfoOutput) => void;
  setOpenPostCreateModal: (open: boolean) => void;
  setPostAssets: (postAssets: PostAssetsEntity[]) => void;
  setPostsInfo: (postsInfo: GetPostsInfoOutput[]) => void;
  setPostsAnalytics: (postsAnalytics: PostStatAnalyticsOutput[]) => void;
};

export const usePostsStore = create<PostsStore>()(
  persist(
    (set) => ({
      posts: [],
      postsInfo: [],
      postAssets: [],
      post: {} as PostsEntity,
      openPostCreateModal: false,
      postInfo: {} as GetPostsInfoOutput,
      postsAnalytics: [],

      setPost: (post) => set({ post }),
      setPosts: (posts) => set({ posts }),
      setPostInfo: (postInfo) => set({ postInfo }),
      setPostsInfo: (postsInfo) => set({ postsInfo }),
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
