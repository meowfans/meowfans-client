import { CreatorAssetsEntity, ExtendedUpdateCreatorProfileInput } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { ScrollArea } from '@workspace/ui/components/scroll-area';
import { ApplyButtonTooltip } from '@workspace/ui/globals/ApplyTooltip';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { SAvatar } from '@workspace/ui/globals/SAvatar';
import { handleFullScreen } from '@workspace/ui/lib';
import { cn } from '@workspace/ui/lib/utils';
import { Aperture, FileSliders, Fullscreen, GalleryThumbnails } from 'lucide-react';
import Image from 'next/image';

interface Props {
  hasMore: boolean;
  loading: boolean;
  assets: CreatorAssetsEntity[];
  onLoadMore: () => unknown;
  onSlideShow: () => unknown;
  onUpdateCreatorProfile: (input: ExtendedUpdateCreatorProfileInput) => unknown;
}

export const AssetsThread: React.FC<Props> = ({ assets, onLoadMore, onSlideShow, onUpdateCreatorProfile, hasMore, loading }) => {
  const fullScreenUrls = assets?.map((creatorAsset) => creatorAsset.asset.rawUrl) || [];

  return (
    <div className="flex flex-row justify-between gap-1 m-1 ">
      <ScrollArea className={cn('h-[calc(100vh-136px)]', 'w-full')}>
        <InfiniteScrollManager dataLength={assets.length} hasMore={hasMore} loading={loading} onLoadMore={onLoadMore}>
          <div className={cn('grid gap-4 grid-cols-2', 'md:grid-cols-5')}>
            {assets?.map((creatorAsset, idx) => (
              <div key={creatorAsset.id} className="relative flex">
                <div className="flex flex-col justify-between">
                  <Button className="absolute top-0 left-0 bg-transparent" size={'icon'} onClick={onSlideShow}>
                    <FileSliders />
                  </Button>
                  <Button
                    className="absolute top-0 right-0 cursor-pointer bg-transparent border-dashed"
                    size={'icon'}
                    onClick={() => handleFullScreen(creatorAsset.asset.rawUrl, idx, fullScreenUrls)}
                  >
                    <Fullscreen />
                  </Button>
                </div>
                <SAvatar url={creatorAsset.creatorProfile.user.avatarUrl} fallback="creator" className="absolute bottom-0 left-0" />
                <ApplyButtonTooltip
                  className="absolute bottom-0 right-0"
                  tootTipTitle="Set as profile"
                  buttonProps={{ icon: Aperture }}
                  onClick={() =>
                    onUpdateCreatorProfile({
                      avatarUrl: creatorAsset.asset.rawUrl,
                      creatorId: creatorAsset.creatorProfile.user.id
                    })
                  }
                />
                <ApplyButtonTooltip
                  className="absolute bottom-10 right-0"
                  tootTipTitle="Set as banner"
                  buttonProps={{ icon: GalleryThumbnails }}
                  onClick={() =>
                    onUpdateCreatorProfile({
                      bannerUrl: creatorAsset.asset.rawUrl,
                      creatorId: creatorAsset.creatorProfile.user.id
                    })
                  }
                />
                <Image
                  unoptimized
                  src={creatorAsset.asset.rawUrl}
                  className={cn('cursor-pointer rounded-lg object-cover object-center h-70 w-70')}
                  alt="gallery-image"
                  width={300}
                  height={400}
                  loading="lazy"
                />
                <Badge className="absolute bottom-0 left-10">{creatorAsset.creatorProfile.user.username}</Badge>
              </div>
            ))}
          </div>
        </InfiniteScrollManager>
      </ScrollArea>
    </div>
  );
};
