'use client';

import { ImpersonatedCreatorID } from '@/util/helpers';
import { DownloadStates, VaultObjectsEntity } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@workspace/ui/components/table';
import { cn } from '@workspace/ui/lib/utils';
import { motion } from 'framer-motion';
import { Edit, GalleryVertical, Link } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
  selectedUrls: string[];
  onToggle: (id: string) => unknown;
  isLoading: boolean;
  vaultObjects: VaultObjectsEntity[];
}

export const CreatorVaultUrls: React.FC<Props> = ({ selectedUrls, onToggle, isLoading, vaultObjects }) => {
  const [copied, setCopied] = useState(false);
  const [selectedVaultObject, setSelectedVaultObject] = useState<VaultObjectsEntity>({} as VaultObjectsEntity);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(selectedVaultObject.objectUrl);
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

  return (
    <Table>
      <TableHeader className="bg-muted/50 backdrop-blur">
        <TableRow>
          <TableHead className="text-center w-28">Status</TableHead>
          <TableHead className="text-center w-16">Select</TableHead>
          <TableHead className="text-center w-16">File</TableHead>
          <TableHead className="min-w-80">Object URL</TableHead>
          <TableHead className="text-center w-36">Created</TableHead>
          <TableHead className="bg-card">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {vaultObjects.map((vaultObject) => {
          const user = vaultObject.vault?.creatorProfile?.user;
          const status = statusVariants[vaultObject.status];

          return (
            <TableRow
              key={vaultObject.id}
              className={cn('hover:bg-muted/30 transition-colors', ImpersonatedCreatorID(vaultObject.id) && 'bg-red-400')}
            >
              <TableCell className="sticky left-0 bg-card text-center">
                <motion.span
                  key={vaultObject.status}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className={cn('inline-flex px-2 py-0.5 rounded-full text-xs font-medium', status.className)}
                >
                  {status.text}
                </motion.span>
              </TableCell>

              <TableCell className="text-center">
                {vaultObject.status !== DownloadStates.Processing && vaultObject.status !== DownloadStates.Fulfilled && (
                  <input
                    type="checkbox"
                    className="h-4 w-4"
                    checked={selectedUrls.includes(vaultObject.id)}
                    onChange={() => onToggle(vaultObject.id)}
                    disabled={selectedUrls.length >= 30}
                  />
                )}
              </TableCell>

              <TableCell className="text-center">{vaultObject.fileType}</TableCell>

              <TableCell>
                <div className="flex items-center gap-2 max-w-md">
                  <span className="truncate text-xs text-blue-600 hover:underline">{vaultObject.objectUrl}</span>

                  <Button
                    size="icon"
                    variant="outline"
                    className="h-6 w-6"
                    onClick={() => {
                      setSelectedVaultObject(vaultObject);
                      handleCopy();
                    }}
                  >
                    <Link className="h-3 w-3" />
                  </Button>

                  <Button size="icon" variant="outline" className="h-6 w-6" asChild>
                    <a href={vaultObject.objectUrl} target="_blank" rel="noopener noreferrer">
                      <GalleryVertical className="h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </TableCell>

              <TableCell className="text-center text-xs text-muted-foreground">
                {new Date(vaultObject.createdAt).toLocaleString()}
              </TableCell>

              <TableCell className="bg-card">
                <Button size="sm" variant="outline">
                  <Edit className="w-3 h-3" />
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
