import { TagsEntity } from '@workspace/gql/generated/graphql';
import { Updater } from '@workspace/ui/lib/types';
import { create } from 'zustand';

type TagsStore = {
  tags: TagsEntity[];
  setTags: (tags: Updater<TagsEntity[]>) => void;
};

export const useTagsStore = create<TagsStore>()((set) => ({
  tags: [],
  setTags: (tags: Updater<TagsEntity[]>) => set((state) => ({ tags: typeof tags === 'function' ? tags(state.tags) : tags }))
}));
