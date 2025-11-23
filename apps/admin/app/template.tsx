'use client';

import { AppHeader } from '@/components/AppHeader';
import { authenticatedPaths } from '@/lib/constants';
import { useParams, usePathname } from 'next/navigation';

interface Props {
  children: React.ReactNode;
}

export default function RootTemplate({ children }: Props) {
  const pathname = usePathname();
  const { channelId, username } = useParams();

  if (
    ![...authenticatedPaths, `/channels/${channelId}`, `/vaults/${username}`, `/assets/${username}`, `/profiles/${username}`].includes(
      pathname
    )
  )
    return <div>{children}</div>;

  return (
    <div>
      <AppHeader />
      {children}
    </div>
  );
}
