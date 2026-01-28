import { PostAssetsEntity, PostsEntity } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type PostUpdater = PostsEntity | ((prev: PostsEntity) => PostsEntity);

type PostsStore = {
  post: PostsEntity;
  posts: PostsEntity[];
  postsLoading: boolean;
  postAssets: PostAssetsEntity[];
  setPosts: (posts: PostsEntity[]) => void;
  setPostsLoading: (postsLoading: boolean) => void;
  setPostAssets: (postAssets: PostAssetsEntity[]) => void;
  setPost: (updater: PostUpdater) => void;
};

export const usePostsStore = create<PostsStore>()((set, get) => ({
  posts: [],
  postAssets: [],
  postsLoading: false,
  post: {} as PostsEntity,
  setPosts: (posts) => set({ posts }),
  setPostAssets: (postAssets) => set({ postAssets }),
  setPostsLoading: (postsLoading) => set({ postsLoading }),
  setPost: (updater) => {
    set((state) => ({
      post: typeof updater === 'function' ? (updater as (prev: PostsEntity) => PostsEntity)(state.post) : updater
    }));
  }
}));
