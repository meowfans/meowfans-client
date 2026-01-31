import { PostCommentsEntity } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type CommentsStore = {
  commentOnPost: string | null;
  setCommentOnPost: (commentOnPost: string | null) => void;
  postComments: PostCommentsEntity[];
  setPostComments: (postComments: PostCommentsEntity[]) => void;
};

export const useCommentsStore = create<CommentsStore>()((set) => ({
  postComments: [],
  commentOnPost: null,
  setCommentOnPost: (commentOnPost) => set({ commentOnPost }),
  setPostComments: (postComments: PostCommentsEntity[]) => set({ postComments })
}));
