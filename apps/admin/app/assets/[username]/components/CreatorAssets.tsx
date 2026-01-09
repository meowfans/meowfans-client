'use client';

import { useAssets } from '@/hooks/useAssets';
import { useMutation } from '@apollo/client/react';
import { GET_CREATORS_BY_ADMIN_QUERY } from '@workspace/gql/api';
import { UPDATE_CREATOR_PROFILE_BY_ADMIN_MUTATION } from '@workspace/gql/api/creatorAPI';
import { AssetType, ExtendedUpdateCreatorProfileInput } from '@workspace/gql/generated/graphql';
import { Separator } from '@workspace/ui/components/separator';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { AssetsHeader } from './Header';
import { SlideShow } from './SlideShow';
import { AssetsThread } from './Thread';

interface Props {
  username: string;
}

export const CreatorAssets: React.FC<Props> = ({ username }) => {
  const searchParams = useSearchParams();
  const [slideShow, setSlideShow] = useState<boolean>(false);
  const [slideUrls, setSlideUrls] = useState<string[]>([]);
  const [assetType, setAssetType] = useState<AssetType>(AssetType.Private);
  const { assets, onLoadMore, hasMore, loading } = useAssets({ username, assetType });

  const [updateCreatorProfile] = useMutation(UPDATE_CREATOR_PROFILE_BY_ADMIN_MUTATION, {
    refetchQueries() {
      return [{ query: GET_CREATORS_BY_ADMIN_QUERY, variables: { input: { take: 100, pageNumber: Number(searchParams.get('p') || 1) } } }];
    }
  });

  const handleFetchSlideUrls = () => {
    setSlideUrls(assets.map(({ asset }) => asset.rawUrl) ?? []);
  };

  const handleUpdateCreatorProfile = async (input: ExtendedUpdateCreatorProfileInput) => {
    try {
      if (!username) return;
      await updateCreatorProfile({ variables: { input } });
      toast.success('Updated creator profile');
    } catch {
      toast.error('Something wrong happened'!);
    }
  };

  useEffect(() => {
    handleFetchSlideUrls();
  }, []); //eslint-disable-line

  return (
    <PageManager>
      <AssetsHeader onSlideShowOff={() => setSlideShow(false)} assetType={assetType} setAssetType={setAssetType} onRefresh={() => null} />
      <Separator />
      {slideShow ? (
        <div className="w-full flex md:flex-row flex-col md:w-[calc(100vw-var(--sidebar-width))] h-full">
          <SlideShow slideUrls={slideUrls} onLoadMore={onLoadMore} />
        </div>
      ) : (
        <AssetsThread
          hasMore={hasMore}
          loading={loading}
          assets={assets}
          onLoadMore={onLoadMore}
          onSlideShow={() => {
            handleFetchSlideUrls();
            setSlideShow((prev) => !prev);
          }}
          onUpdateCreatorProfile={(input) => handleUpdateCreatorProfile(input)}
        />
      )}
    </PageManager>
  );
};
