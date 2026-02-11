import { PostCommentsEntity } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type PostCommentsUpdater = PostCommentsEntity[] | ((prev: PostCommentsEntity[]) => PostCommentsEntity[]);

type CommentsStore = {
  commentOnPost: string | null;
  setCommentOnPost: (commentOnPost: string | null) => void;
  postComments: PostCommentsEntity[];
  setPostComments: (updater: PostCommentsUpdater) => void;
};

export const useCommentsStore = create<CommentsStore>()((set) => ({
  postComments: [],
  commentOnPost: null,
  setCommentOnPost: (commentOnPost) => set({ commentOnPost }),
  setPostComments: (updater) =>
    set((state) => ({
      postComments:
        typeof updater === 'function' ? (updater as (prev: PostCommentsEntity[]) => PostCommentsEntity[])(state.postComments) : updater
    }))
}));
