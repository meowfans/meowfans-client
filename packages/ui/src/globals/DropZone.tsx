'use client';

import { CloudUploadIcon } from 'lucide-react';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card } from '../components/card';

interface Props {
  onUpload: (url: File[]) => unknown;
}

export const DropZone: React.FC<Props> = ({ onUpload }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (!acceptedFiles.length) return;
    onUpload(acceptedFiles);
  }, []); //eslint-disable-line

  const { getInputProps, getRootProps } = useDropzone({ onDrop });

  return (
    <Card {...getRootProps({ className: 'dropzone' })} className="border-dashed h-60 cursor-pointer">
      <input className="input-zone" {...getInputProps()} />
      <div className="text-center items-center align-middle my-auto justify-center flex flex-col">
        <CloudUploadIcon className="animate-pulse" />
        <p className="dropzone-content">Drag&apos;n&apos;drop some files here, or click to select files</p>
      </div>
    </Card>
  );
};
