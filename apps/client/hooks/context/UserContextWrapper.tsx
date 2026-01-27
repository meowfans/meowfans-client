'use client';

import { FanProfilesEntity } from '@workspace/gql/generated/graphql';
import { createContext, useContext, useState } from 'react';

export const UserContext = createContext<[FanProfilesEntity | null, React.Dispatch<React.SetStateAction<FanProfilesEntity | null>>]>([
  {} as FanProfilesEntity | null,
  () => null
]);

interface Props {
  children: React.ReactNode;
  fan: FanProfilesEntity | null;
}

export function UserContextWrapper({ children, fan }: Props) {
  const [userInfo, setUserInfo] = useState<FanProfilesEntity | null>(fan);

  return <UserContext.Provider value={[userInfo, setUserInfo]}>{children}</UserContext.Provider>;
}

export const useFan = () => {
  const [fan, setFan] = useContext(UserContext);

  return { fan, setFan };
};
