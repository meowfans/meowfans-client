import { PostAssetsEntity, PostsEntity } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type PostsStore = {
  postAssets: PostAssetsEntity[];
  setPostAssets: (postAssets: PostAssetsEntity[]) => void;
  openPostCreateModal: boolean;
  setOpenPostCreateModal: (open: boolean) => void;
  posts: PostsEntity[];
  setPosts: (posts: PostsEntity[]) => void;
};

export const usePostsStore = create<PostsStore>()((set) => ({
  postAssets: [],
  setPostAssets: (postAssets: PostAssetsEntity[]) => set({ postAssets }),
  openPostCreateModal: false,
  setOpenPostCreateModal: (openPostCreateModal: boolean) => set({ openPostCreateModal }),
  posts: [],
  setPosts: (posts: PostsEntity[]) => set({ posts })
}));
