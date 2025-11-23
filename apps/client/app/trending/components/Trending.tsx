'use client';

import { PageManager } from '@workspace/ui/globals/PageManager';
import dynamic from 'next/dynamic';

const NewCreators = dynamic(() => import('./NewCreators'));
const MostLikedVaultObjects = dynamic(() => import('./MostLikedVaultObjects'));
const MostLikedVaults = dynamic(() => import('./MostLikedVaults'));

export const Trending = () => {
  return (
    <PageManager className="pb-10 w-full md:w-[calc(100vw-260px)]">
      <NewCreators />
      <MostLikedVaults />
      <MostLikedVaultObjects />
    </PageManager>
  );
};
