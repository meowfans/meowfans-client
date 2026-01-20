'use client';

import { CreatorNextImage } from '@/components/CreatorNextImage';
import { useUtilsStore } from '@/hooks/store/utils.store';
import { VaultsEntity } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { ExtendedBadge } from '@workspace/ui/globals/ExtendedBadge';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useSuccessHandler } from '@workspace/ui/hooks/useSuccessHandler';
import { formatText } from '@workspace/ui/lib/helpers';
import { Modal } from '@workspace/ui/modals/Modal';
import { Copy, CopyCheck, Share2 } from 'lucide-react';
import { useState } from 'react';

interface VaultsShareCardProps {
  vault: VaultsEntity;
  shareUrl: string;
  onShare?: () => void;
}

export const VaultsShareCard = ({ vault, shareUrl, onShare }: VaultsShareCardProps) => {
  const { shareModal, setShareModal } = useUtilsStore();
  const [copied, setCopied] = useState<boolean>(false);
  const { successHandler } = useSuccessHandler();
  const { errorHandler } = useErrorHandler();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      successHandler({ isEnabledConfetti: true, message: 'Url is copied' });
    } catch (error) {
      errorHandler({ error });
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'Check out this vault',
        text: 'Exclusive content – unlock now',
        url: shareUrl
      });
    } else {
      handleCopy();
    }
  };

  return (
    <Modal isOpen={!!shareModal} description="Share your vault" onClose={() => setShareModal(null)} title="Take a look">
      <div className="relative aspect-square bg-muted">
        <CreatorNextImage imageUrl={vault.preview} fill className="object-cover" />
        {/* <ExtendedBadge label={vault.types?.[0]} variant="outline" className="absolute top-2 left-2 bg-background/90 backdrop-blur" /> */}
      </div>

      <div className="p-4 space-y-3">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>
            {vault.viewCount} {formatText(vault.viewCount ?? 0, 'view')}
          </span>
          <span>
            {vault.likeCount} {formatText(vault.likeCount, 'like')}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span>
            Unlock for <b>{vault.unlockPrice ?? 0}</b>
          </span>
          <span className="font-semibold">Earned {vault.totalEarning}</span>
        </div>

        <div className="rounded-md border bg-muted px-3 py-2 text-xs truncate">{shareUrl}</div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1" onClick={handleCopy}>
            {copied ? <CopyCheck className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
            Copy Link
          </Button>

          <Button size="sm" className="flex-1" onClick={handleNativeShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>
    </Modal>
  );
};
