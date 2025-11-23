'use client';

import { DownloadStates, FileType, VaultObjectsEntity } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Checkbox } from '@workspace/ui/components/checkbox';
import { LoadingButton } from '@workspace/ui/globals/LoadingButton';
import { SAvatar } from '@workspace/ui/globals/SAvatar';
import { motion } from 'framer-motion';
import { Copy, Download, ExternalLink, ImageDown, SquarePlay } from 'lucide-react';
import moment from 'moment';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
  idx: number;
  vaultObject: VaultObjectsEntity;
  selectedUrls: string[];
  onToggle: (url: string) => unknown;
  isLoading: boolean;
}

export const CreatorVaultUrls: React.FC<Props> = ({ idx, vaultObject, selectedUrls, onToggle, isLoading }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(vaultObject.objectUrl);
      setCopied(true);
      toast.success('Copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy link');
    }
  };

  const statusVariants = {
    [DownloadStates.Pending]: {
      text: 'Pending',
      className: 'bg-gray-300 text-gray-800 dark:bg-gray-600 animate-pulse'
    },
    [DownloadStates.Fulfilled]: {
      text: 'Fulfilled',
      className: 'bg-blue-500 text-white dark:bg-blue-600'
    },
    [DownloadStates.Processing]: {
      text: 'Processing',
      className: 'bg-orange-500 text-white dark:bg-orange-600 animate-pulse'
    },
    [DownloadStates.Rejected]: {
      text: 'Failed',
      className: 'bg-red-500 text-white dark:bg-red-600'
    }
  };

  const status = statusVariants[vaultObject.status];

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="h-full rounded-xl border p-3 shadow-sm bg-white dark:bg-neutral-900 hover:shadow-md transition-all flex flex-col space-y-2"
      >
        <div className="flex flex-row justify-between items-center gap-2">
          <div className="flex flex-row items-center gap-2">
            <Badge variant="secondary">{idx + 1}</Badge>
            {vaultObject.vault && <SAvatar url={vaultObject.vault.creatorProfile.user.avatarUrl} />}
          </div>

          <div className="flex items-center gap-2">
            <motion.div
              key={vaultObject.status}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Badge className={status.className}>{status.text}</Badge>
            </motion.div>

            {vaultObject.status !== DownloadStates.Processing && vaultObject.status !== DownloadStates.Fulfilled && (
              <Checkbox
                className="h-5 w-5"
                checked={selectedUrls.includes(vaultObject.id)}
                onCheckedChange={() => onToggle(vaultObject.id)}
                disabled={selectedUrls.length >= 30}
              />
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-1">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="h-12 w-12 rounded-md border flex items-center justify-center bg-gray-100 dark:bg-neutral-800">
              {vaultObject.fileType === FileType.Image ? (
                <ImageDown size={18} className="text-gray-500" />
              ) : (
                <SquarePlay size={18} className="text-gray-500" />
              )}
            </div>
            <span className="truncate max-w-[200px] text-xs text-blue-600 hover:underline">{vaultObject.objectUrl}</span>
          </div>

          <div className="flex flex-row gap-2">
            <Button size="icon" variant="outline" onClick={handleCopy} className="h-7 w-7" title="Copy URL">
              {copied ? <span className="text-xs">✅</span> : <Copy size={14} />}
            </Button>
            <Button size="icon" variant="outline" asChild className="h-7 w-7" title="Open in new tab">
              <a href={vaultObject.objectUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={14} />
              </a>
            </Button>
          </div>
        </div>

        <div className="flex flex-row justify-between items-center text-xs px-1">
          <p className="text-gray-500 dark:text-gray-400">{moment(vaultObject.createdAt).format('LT L')}</p>
          {vaultObject.status === DownloadStates.Processing && (
            <LoadingButton size="icon" variant={'outline'} className="cursor-pointer animate-bounce h-7 w-7" Icon={Download} loading />
          )}
        </div>
      </motion.div>
    </>
  );
};
