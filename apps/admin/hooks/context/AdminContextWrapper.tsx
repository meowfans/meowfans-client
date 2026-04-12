'use client';

import { CreatorProfilesEntity } from '@workspace/gql/generated/graphql';
import { createContext, useContext, useState } from 'react';

export const AdminContext = createContext<[CreatorProfilesEntity, React.Dispatch<React.SetStateAction<CreatorProfilesEntity>>]>([
  {} as CreatorProfilesEntity,
  () => null
]);

interface Props {
  children: React.ReactNode;
  creator: CreatorProfilesEntity;
}

export function AdminContextWrapper({ children, creator }: Props) {
  const [creatorInfo, setCreatorInfo] = useState<CreatorProfilesEntity>(creator);
  return <AdminContext.Provider value={[creatorInfo, setCreatorInfo]}>{children}</AdminContext.Provider>;
}

export const useAdmin = () => {
  const [admin, setAdmin] = useContext(AdminContext);
  return { admin, setAdmin };
};
