import { TagsEntity } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type TagsUpdater = TagsEntity[] | ((prev: TagsEntity[]) => TagsEntity[]);

type TagsStore = {
  tags: TagsEntity[];
  setTags: (tags: TagsUpdater) => void;
};

export const useTagsStore = create<TagsStore>()((set) => ({
  tags: [],
  setTags: (tags: TagsUpdater) => set((state) => ({ tags: typeof tags === 'function' ? tags(state.tags) : tags }))
}));
