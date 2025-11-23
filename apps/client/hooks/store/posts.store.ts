import { PostAssetsEntity, PostsEntity } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type PostsStore = {
  post: PostsEntity;
  posts: PostsEntity[];
  postsLoading: boolean;
  postAssets: PostAssetsEntity[];
  setPosts: (posts: PostsEntity[]) => void;
  setPostsLoading: (postsLoading: boolean) => void;
  setPostAssets: (postAssets: PostAssetsEntity[]) => void;
  setPost: (post: PostsEntity | ((prev?: PostsEntity) => PostsEntity | undefined)) => void;
};

export const usePostsStore = create<PostsStore>()((set, get) => ({
  posts: [],
  postAssets: [],
  postsLoading: false,
  post: {} as PostsEntity,
  setPosts: (posts) => set({ posts }),
  setPostAssets: (postAssets) => set({ postAssets }),
  setPostsLoading: (postsLoading) => set({ postsLoading }),
  setPost: (postUpdater) => {
    if (typeof postUpdater === 'function') set((state) => ({ post: postUpdater(state.post) }));
    else set({ post: postUpdater });
  }
}));
