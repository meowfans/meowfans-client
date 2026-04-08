import { GetPublicPostsOutput, GetPublicSinglePostOutput, PostAssetsEntity } from '@workspace/gql/generated/graphql';
import { Updater } from '@workspace/ui/lib/types';
import { create } from 'zustand';

type PostsStore = {
  post: GetPublicSinglePostOutput;
  posts: GetPublicPostsOutput[];
  postsLoading: boolean;
  postAssets: PostAssetsEntity[];
  creatorPosts: GetPublicPostsOutput[];
  setCreatorPosts: (updater: Updater<GetPublicPostsOutput[]>) => void;
  setPosts: (updater: Updater<GetPublicPostsOutput[]>) => void;
  setPostsLoading: (postsLoading: boolean) => void;
  setPostAssets: (postAssets: PostAssetsEntity[]) => void;
  setPost: (updater: Updater<GetPublicSinglePostOutput>) => void;
};

export const usePostsStore = create<PostsStore>()((set, get) => ({
  posts: [],
  postAssets: [],
  postsLoading: false,
  post: {} as GetPublicSinglePostOutput,
  creatorPosts: [],
  setCreatorPosts: (updater) =>
    set((state) => ({
      creatorPosts:
        typeof updater === 'function' ? (updater as (prev: GetPublicPostsOutput[]) => GetPublicPostsOutput[])(state.creatorPosts) : updater
    })),
  setPosts: (updater) =>
    set((state) => ({
      posts: typeof updater === 'function' ? (updater as (prev: GetPublicPostsOutput[]) => GetPublicPostsOutput[])(state.posts) : updater
    })),
  setPostAssets: (postAssets) => set({ postAssets }),
  setPostsLoading: (postsLoading) => set({ postsLoading }),
  setPost: (updater) => {
    set((state) => ({
      post:
        typeof updater === 'function' ? (updater as (prev: GetPublicSinglePostOutput) => GetPublicSinglePostOutput)(state.post) : updater
    }));
  }
}));
