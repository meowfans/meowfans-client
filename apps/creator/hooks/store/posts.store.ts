import { GetPostsInfoOutput, PostAssetsEntity, PostsEntity } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type PostsStore = {
  posts: PostsEntity[];
  openPostCreateModal: boolean;
  postAssets: PostAssetsEntity[];
  postsInfo: GetPostsInfoOutput[];
  setPosts: (posts: PostsEntity[]) => void;
  setOpenPostCreateModal: (open: boolean) => void;
  setPostAssets: (postAssets: PostAssetsEntity[]) => void;
  setPostsInfo: (postsInfo: GetPostsInfoOutput[]) => void;
};

export const usePostsStore = create<PostsStore>()((set) => ({
  posts: [],
  postsInfo: [],
  postAssets: [],
  openPostCreateModal: false,
  setPosts: (posts: PostsEntity[]) => set({ posts }),
  setPostAssets: (postAssets: PostAssetsEntity[]) => set({ postAssets }),
  setPostsInfo: (postsInfo: GetPostsInfoOutput[]) => set({ postsInfo }),
  setOpenPostCreateModal: (openPostCreateModal: boolean) => set({ openPostCreateModal })
}));
