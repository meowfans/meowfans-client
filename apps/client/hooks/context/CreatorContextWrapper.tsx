'use client';

import { CreatorProfilesEntity } from '@workspace/gql/generated/graphql';
import { createContext, useContext, useState } from 'react';

export const CreatorContext = createContext<[CreatorProfilesEntity, React.Dispatch<React.SetStateAction<CreatorProfilesEntity>>]>([
  {} as CreatorProfilesEntity,
  () => null
]);

interface Props {
  children: React.ReactNode;
  creator: CreatorProfilesEntity;
}

export function CreatorContextWrapper({ children, creator }: Props) {
  const [creatorInfo, setCreatorInfo] = useState<CreatorProfilesEntity>(creator);

  return <CreatorContext.Provider value={[creatorInfo, setCreatorInfo]}>{children}</CreatorContext.Provider>;
}

export const useCreator = () => {
  const [creator, setCreator] = useContext(CreatorContext);
  return { creator, setCreator };
};
