import { PostCommentsEntity } from '@workspace/gql/generated/graphql';
import { Updater } from '@workspace/ui/lib/types';
import { create } from 'zustand';

type CommentsStore = {
  commentOnPost: string | null;
  setCommentOnPost: (updater: Updater<string | null>) => void;
  postComments: PostCommentsEntity[];
  setPostComments: (updater: Updater<PostCommentsEntity[]>) => void;
};

export const useCommentsStore = create<CommentsStore>()((set) => ({
  postComments: [],
  commentOnPost: null,
  setCommentOnPost: (updater) =>
    set((state) => ({ commentOnPost: typeof updater === 'function' ? updater(state.commentOnPost) : updater })),
  setPostComments: (updater) =>
    set((state) => ({
      postComments:
        typeof updater === 'function' ? (updater as (prev: PostCommentsEntity[]) => PostCommentsEntity[])(state.postComments) : updater
    }))
}));
