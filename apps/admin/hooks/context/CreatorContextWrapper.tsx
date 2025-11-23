'use client';

import { GetCreatorProfileQuery } from '@workspace/gql/generated/graphql';
import { createContext, useState } from 'react';

export const CreatorContext = createContext<[GetCreatorProfileQuery, React.Dispatch<React.SetStateAction<GetCreatorProfileQuery>>]>([
  {} as GetCreatorProfileQuery,
  () => null
]);

interface Props {
  children: React.ReactNode;
  creator: GetCreatorProfileQuery;
}

export function CreatorContextWrapper({ children, creator }: Props) {
  const [creatorInfo, setCreatorInfo] = useState<GetCreatorProfileQuery>(creator);
  return <CreatorContext.Provider value={[creatorInfo, setCreatorInfo]}>{children}</CreatorContext.Provider>;
}
