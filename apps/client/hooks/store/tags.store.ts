import { TagsEntity } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type TagsStore = {
  tags: TagsEntity[];
  setTags: (tags: TagsEntity[]) => void;
};

export const useTagsStore = create<TagsStore>()((set) => ({
  tags: [],
  setTags: (tags: TagsEntity[]) => set({ tags })
}));
