import { PostCommentsEntity, PostsEntity } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type CommentsStore = {
  commentOnPost: PostsEntity | null;
  setCommentOnPost: (commentOnPost: PostsEntity | null) => void;
  postComments: PostCommentsEntity[];
  setPostComments: (postComments: PostCommentsEntity[]) => void;
};

export const useCommentsStore = create<CommentsStore>()((set) => ({
  postComments: [],
  commentOnPost: null,
  setCommentOnPost: (commentOnPost) => set({ commentOnPost }),
  setPostComments: (postComments: PostCommentsEntity[]) => set({ postComments })
}));
