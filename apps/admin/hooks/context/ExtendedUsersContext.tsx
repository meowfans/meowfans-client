import { UsersEntity } from '@workspace/gql/generated/graphql';
import { createContext, ReactNode, useContext, useState } from 'react';

interface CreatorVaultsContextProps {
  creatorVaults: UsersEntity[];
  setCreatorVaults: React.Dispatch<React.SetStateAction<UsersEntity[]>>;
}

const ExtendedUsersContext = createContext<CreatorVaultsContextProps | undefined>(undefined);

export const ExtendedUsersContextWrapper = ({ children }: { children: ReactNode }) => {
  const [creatorVaults, setCreatorVaults] = useState<UsersEntity[]>([]);

  return <ExtendedUsersContext.Provider value={{ creatorVaults, setCreatorVaults }}>{children}</ExtendedUsersContext.Provider>;
};

export const useExtendedUsersContextVaults = () => {
  const context = useContext(ExtendedUsersContext);
  if (!context) throw new Error('useCreatorVaults must be used within CreatorVaultsProvider');
  return context;
};
