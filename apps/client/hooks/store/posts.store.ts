import { GetPublicPostsOutput, GetPublicSinglePostOutput, PostAssetsEntity } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type PostUpdater = GetPublicSinglePostOutput | ((prev: GetPublicSinglePostOutput) => GetPublicSinglePostOutput);

type PostsStore = {
  post: GetPublicSinglePostOutput;
  posts: GetPublicPostsOutput[];
  postsLoading: boolean;
  postAssets: PostAssetsEntity[];
  setPosts: (posts: GetPublicPostsOutput[]) => void;
  setPostsLoading: (postsLoading: boolean) => void;
  setPostAssets: (postAssets: PostAssetsEntity[]) => void;
  setPost: (updater: PostUpdater) => void;
};

export const usePostsStore = create<PostsStore>()((set, get) => ({
  posts: [],
  postAssets: [],
  postsLoading: false,
  post: {} as GetPublicSinglePostOutput,
  setPosts: (posts) => set({ posts }),
  setPostAssets: (postAssets) => set({ postAssets }),
  setPostsLoading: (postsLoading) => set({ postsLoading }),
  setPost: (updater) => {
    set((state) => ({
      post:
        typeof updater === 'function' ? (updater as (prev: GetPublicSinglePostOutput) => GetPublicSinglePostOutput)(state.post) : updater
    }));
  }
}));
