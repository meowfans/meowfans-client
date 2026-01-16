import { GetPostsInfoOutput, PostAssetsEntity, PostsEntity } from '@workspace/gql/generated/graphql';
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
  setPostInfo: (post: GetPostsInfoOutput) => void;
  setOpenPostCreateModal: (open: boolean) => void;
  setPostAssets: (postAssets: PostAssetsEntity[]) => void;
  setPostsInfo: (postsInfo: GetPostsInfoOutput[]) => void;
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

      setPost: (post) => set({ post }),
      setPosts: (posts) => set({ posts }),
      setPostInfo: (postInfo) => set({ postInfo }),
      setPostAssets: (postAssets) => set({ postAssets }),
      setPostsInfo: (postsInfo) => set({ postsInfo }),
      setOpenPostCreateModal: (open) => set({ openPostCreateModal: open })
    }),
    {
      name: 'posts-store',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
