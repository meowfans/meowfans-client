'use client';

import { GetPublicCreatorProfileOutput } from '@workspace/gql/generated/graphql';
import { createContext, useContext, useState } from 'react';

export const CreatorContext = createContext<
  [GetPublicCreatorProfileOutput, React.Dispatch<React.SetStateAction<GetPublicCreatorProfileOutput>>]
>([{} as GetPublicCreatorProfileOutput, () => null]);

interface Props {
  children: React.ReactNode;
  creator: GetPublicCreatorProfileOutput;
}

export function CreatorContextWrapper({ children, creator }: Props) {
  const [creatorInfo, setCreatorInfo] = useState<GetPublicCreatorProfileOutput>(creator);

  return <CreatorContext.Provider value={[creatorInfo, setCreatorInfo]}>{children}</CreatorContext.Provider>;
}

export const useCreator = () => {
  const [creator, setCreator] = useContext(CreatorContext);
  return { creator, setCreator };
};
