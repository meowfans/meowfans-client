'use client';

import { Separator } from '@workspace/ui/components/separator';
import { AssetType } from '@workspace/gql/generated/graphql';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { useState } from 'react';
import { AssetsHeader } from './AssetsHeader';
import { AssetsThread } from './AssetsThread';

export const Assets = () => {
  const [assetType, setAssetType] = useState<AssetType>(AssetType.Private);

  return (
    <PageManager>
      <AssetsHeader assetType={assetType} setAssetType={setAssetType} />
      <Separator />
      <AssetsThread onUpload={() => null} onDelete={() => null} assetType={assetType} />
    </PageManager>
  );
};
