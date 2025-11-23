import { PostCommentsEntity } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type CommentsStore = {
  postComments: PostCommentsEntity[];
  setPostComments: (postComments: PostCommentsEntity[]) => void;
};

export const useCommentsStore = create<CommentsStore>()((set) => ({
  postComments: [],
  setPostComments: (postComments: PostCommentsEntity[]) => set({ postComments })
}));
