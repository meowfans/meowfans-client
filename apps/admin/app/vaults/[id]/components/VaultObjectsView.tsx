'use client';

import { useVaultObjects } from '@/hooks/useVaults';
import { useVaultsActions } from '@workspace/gql/actions';
import { DataFetchType, DownloadStates, FileType, UploadVaultQueueInput } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Checkbox } from '@workspace/ui/components/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@workspace/ui/components/dropdown-menu';
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '@workspace/ui/components/table';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Loading } from '@workspace/ui/globals/Loading';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useSuccessHandler } from '@workspace/ui/hooks/useSuccessHandler';
import {
  CheckCircle2,
  Clock,
  Download,
  FileAudio,
  FileIcon,
  FileText,
  Filter,
  ImageIcon,
  Loader2,
  ShieldCheck,
  VideoIcon,
  XCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface VaultObjectsViewProps {
  id: string;
}

export function VaultObjectsView({ id }: VaultObjectsViewProps) {
  const router = useRouter();
  const [status, setStatus] = useState<DownloadStates[]>(Object.values(DownloadStates));
  const [fileTypes, setFileTypes] = useState<FileType[]>(Object.values(FileType)); // Empty array means all types in some APIs, or we might need to send all. Let's send all if empty.
  const [selectedObjects, setSelectedObjects] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { downloadCreatorObjectsAsBatchMutation } = useVaultsActions();
  const { errorHandler } = useErrorHandler();
  const { successHandler } = useSuccessHandler();

  const { vaultObjects, loading, hasNext, handleLoadMore } = useVaultObjects({
    relatedUserId: id,
    take: 20,
    dataFetchType: DataFetchType.InfiniteScroll,
    fileType: fileTypes.length > 0 ? fileTypes : undefined,
    status: status.length > 0 ? status : undefined
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case DownloadStates.Pending:
        return <Clock className="h-4 w-4 text-amber-500" />;
      case DownloadStates.Processing:
        return <ShieldCheck className="h-4 w-4 text-blue-500" />;
      case DownloadStates.Fulfilled:
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case DownloadStates.Rejected:
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getFileTypeIcon = (type: FileType) => {
    switch (type) {
      case FileType.Image:
        return <ImageIcon className="h-4 w-4" />;
      case FileType.Video:
        return <VideoIcon className="h-4 w-4" />;
      case FileType.Audio:
        return <FileAudio className="h-4 w-4" />;
      case FileType.Document:
        return <FileText className="h-4 w-4" />;
      default:
        return <FileIcon className="h-4 w-4" />;
    }
  };

  const toggleFileType = (type: FileType) => {
    setFileTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]));
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedObjects(vaultObjects.map((obj) => obj.id));
    } else {
      setSelectedObjects([]);
    }
  };

  const handleSelectObject = (objectId: string, checked: boolean) => {
    if (checked) {
      setSelectedObjects((prev) => [...prev, objectId]);
    } else {
      setSelectedObjects((prev) => prev.filter((id) => id !== objectId));
    }
  };

  const handleBatchDownload = async () => {
    if (selectedObjects.length === 0) return;
    setIsProcessing(true);
    try {
      const input: UploadVaultQueueInput = {
        creatorId: id,
        vaultObjectIds: selectedObjects
      };
      await downloadCreatorObjectsAsBatchMutation(input);
      successHandler({ message: 'Batch download initiated for selected objects.' });
      setSelectedObjects([]);
    } catch (error) {
      errorHandler({ error });
    } finally {
      setIsProcessing(false);
    }
  };

  const isAllSelected = vaultObjects.length > 0 && selectedObjects.length === vaultObjects.length;
  const isIndeterminate = selectedObjects.length > 0 && selectedObjects.length < vaultObjects.length;

  return (
    <div className="space-y-6 p-4 md:p-8 pt-6 max-w-6xl mx-auto flex flex-col h-full w-full min-w-0 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="min-w-0">
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2 truncate">
              Vault Objects
              <Badge variant="outline" className="text-sm md:text-lg px-2 md:px-3 py-0.5 md:py-1 ml-2 font-mono shrink-0">
                @{id.slice(0, 8)}...
              </Badge>
            </h1>
            <p className="text-sm text-muted-foreground mt-1 truncate">Manage content objects for this creator</p>
          </div>
        </div>

        {selectedObjects.length > 0 && (
          <Button onClick={handleBatchDownload} disabled={isProcessing} className="gap-2 shrink-0">
            {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            Download Selected ({selectedObjects.length})
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto justify-between sm:justify-start gap-2">
              <Filter className="h-4 w-4" />
              Status {status.length > 0 && status.length < Object.values(DownloadStates).length && `(${status.length})`}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {Object.values(DownloadStates).map((s) => (
              <DropdownMenuCheckboxItem
                key={s}
                checked={status.includes(s)}
                onCheckedChange={() => {
                  setStatus((prev) => (prev.includes(s) ? prev.filter((item) => item !== s) : [...prev, s]));
                }}
              >
                <div className="flex items-center gap-2">
                  {getStatusIcon(s)}
                  <span className="capitalize">{s.toLowerCase()}</span>
                </div>
              </DropdownMenuCheckboxItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={status.length === Object.values(DownloadStates).length}
              onCheckedChange={(checked) => {
                if (checked) {
                  setStatus(Object.values(DownloadStates));
                } else {
                  setStatus([]);
                }
              }}
              className="justify-center text-muted-foreground"
            >
              Select All
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={status.length === 0}
              onCheckedChange={() => setStatus([])}
              className="justify-center text-muted-foreground"
            >
              Clear Filters
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto justify-between sm:justify-start gap-2">
              <Filter className="h-4 w-4" />
              File Types {fileTypes.length > 0 && `(${fileTypes.length})`}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {Object.values(FileType).map((type) => (
              <DropdownMenuCheckboxItem key={type} checked={fileTypes.includes(type)} onCheckedChange={() => toggleFileType(type)}>
                <div className="flex items-center gap-2">
                  {getFileTypeIcon(type)}
                  <span className="capitalize">{type.toLowerCase()}</span>
                </div>
              </DropdownMenuCheckboxItem>
            ))}
            {fileTypes.length > 0 && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={false}
                  onCheckedChange={() => setFileTypes([])}
                  className="justify-center text-muted-foreground"
                >
                  Clear Filters
                </DropdownMenuCheckboxItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0 relative border rounded-md bg-card overflow-hidden">
        {loading && vaultObjects.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          <div className="h-full overflow-auto" id="vault-objects-container">
            <InfiniteScrollManager
              dataLength={vaultObjects.length}
              hasMore={hasNext}
              onLoadMore={handleLoadMore}
              loading={loading}
              useWindowScroll={false}
              scrollableDiv="vault-objects-container"
            >
              <div className="overflow-x-auto">
                <table className="w-full caption-bottom text-sm">
                  {/* ... table content ... */}
                  <TableHeader className="sticky top-0 bg-card z-10 shadow-sm">
                    <TableRow>
                      <TableHead className="w-[50px] px-3">
                        <Checkbox
                          checked={isAllSelected || (isIndeterminate ? 'indeterminate' : false)}
                          onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
                          aria-label="Select all"
                        />
                      </TableHead>
                      <TableHead className="w-[80px] md:w-[100px]">Preview</TableHead>
                      <TableHead className="w-[80px] md:w-[100px] text-center">Type</TableHead>
                      <TableHead className="w-[100px] md:w-[150px] text-center">Status</TableHead>
                      <TableHead className="min-w-[150px]">Object URL</TableHead>
                      <TableHead className="text-right whitespace-nowrap">Created At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vaultObjects.map((obj) => (
                      <TableRow key={obj.id} className="hover:bg-muted/50" data-state={selectedObjects.includes(obj.id) && 'selected'}>
                        <TableCell className="w-[50px] px-3">
                          <Checkbox
                            checked={selectedObjects.includes(obj.id)}
                            onCheckedChange={(checked) => handleSelectObject(obj.id, checked as boolean)}
                            aria-label="Select row"
                          />
                        </TableCell>
                        <TableCell>
                          <div className="relative h-10 w-10 md:h-12 md:w-12 rounded-md overflow-hidden bg-muted border">
                            {obj.objectUrl && (
                              <div className="h-full w-full flex items-center justify-center bg-secondary">
                                {getFileTypeIcon(obj.fileType)}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center">
                            <Badge variant="secondary" className="gap-1 hidden sm:flex">
                              {getFileTypeIcon(obj.fileType)}
                              <span className="capitalize">{obj.fileType.toLowerCase()}</span>
                            </Badge>
                            <div className="sm:hidden text-muted-foreground">{getFileTypeIcon(obj.fileType)}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            {getStatusIcon(obj.status)}
                            <span className="font-medium text-xs uppercase hidden sm:inline">{obj.status}</span>
                          </div>
                        </TableCell>
                        <TableCell
                          className="font-mono text-xs text-muted-foreground max-w-[150px] md:max-w-[300px] truncate"
                          title={obj.objectUrl}
                        >
                          {obj.objectUrl || '-'}
                        </TableCell>
                        <TableCell className="text-right text-xs text-muted-foreground whitespace-nowrap">
                          {new Date(obj.createdAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                    {vaultObjects.length === 0 && !loading && (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No results found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </table>
              </div>
            </InfiniteScrollManager>
          </div>
        )}
      </div>
    </div>
  );
}
