import { FileType } from '@workspace/gql/generated/graphql';
import { FileAudio, FileIcon, FileText, Image as ImageIcon, Video as VideoIcon } from 'lucide-react';
import React from 'react';

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
