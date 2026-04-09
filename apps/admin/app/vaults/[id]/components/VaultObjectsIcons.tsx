import { DownloadStates, FileType } from '@workspace/gql/generated/graphql';
import {
  CheckCircle2,
  Clock,
  FileAudio,
  FileIcon,
  FileText,
  ImageIcon,
  ShieldCheck,
  VideoIcon,
  XCircle
} from 'lucide-react';
import React from 'react';

export const getStatusIcon = (status: string) => {
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

export const getFileTypeIcon = (type: FileType) => {
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
