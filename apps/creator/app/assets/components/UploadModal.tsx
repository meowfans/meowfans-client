'use client';

import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import { Modal } from '@workspace/ui/modals/Modal';
import { AnimatePresence, motion } from 'framer-motion';
import { FileVideo, Upload, X } from 'lucide-react';
import NextImage from 'next/image';
import { useCallback, useRef, useState } from 'react';
import { toast } from 'sonner';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (files: File[]) => Promise<void>;
  isUploading: boolean;
}

interface FilePreview {
  file: File;
  preview: string;
  type: 'image' | 'video';
}

export function UploadModal({ isOpen, onClose, onUpload, isUploading }: UploadModalProps) {
  const [files, setFiles] = useState<FilePreview[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((newFiles: FileList | null) => {
    if (!newFiles) return;

    const validFiles: FilePreview[] = [];
    Array.from(newFiles).forEach((file) => {
      if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
        validFiles.push({
          file,
          preview: URL.createObjectURL(file),
          type: file.type.startsWith('image/') ? 'image' : 'video'
        });
      } else {
        toast.error(`File type not supported: ${file.name}`);
      }
    });

    setFiles((prev) => [...prev, ...validFiles]);
  }, []);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [handleFiles]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const handleUploadClick = async () => {
    if (files.length === 0) return;

    try {
      await onUpload(files.map((f) => f.file));
      // Cleanup previews
      files.forEach((f) => URL.revokeObjectURL(f.preview));
      setFiles([]);
      onClose();
    } catch (error) {
      // Error handled by parent usually, but keep files if failed?
      // For now assume parent handles toast
    }
  };

  const handleClose = () => {
    setFiles([]);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={isUploading ? () => {} : handleClose}
      title="Upload Assets"
      description="Drag and drop images or videos here, or click to select files"
    >
      <div className="space-y-4">
        {/* Drop Zone */}
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 transition-colors text-center cursor-pointer ${
            dragActive ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50 hover:bg-muted/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/*,video/*"
            className="hidden"
            onChange={handleChange}
            disabled={isUploading}
          />
          <div className="flex flex-col items-center gap-2">
            <div className="p-4 bg-muted rounded-full">
              <Upload className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <p className="font-medium">Click to upload or drag and drop</p>
              <p className="text-xs text-muted-foreground">SVG, PNG, JPG or MP4 (max. 800x400px)</p>
            </div>
          </div>
        </div>

        {/* File List */}
        <AnimatePresence>
          {files.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2 max-h-[300px] overflow-y-auto pr-1"
            >
              {files.map((file, index) => (
                <motion.div
                  key={`${file.file.name}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="p-2 flex items-center gap-3 relative group">
                    <div className="relative h-12 w-12 rounded-md overflow-hidden bg-black shrink-0">
                      {file.type === 'video' ? (
                        <div className="flex items-center justify-center h-full text-white">
                          <FileVideo className="h-6 w-6" />
                        </div>
                      ) : (
                        <NextImage src={file.preview} alt="Preview" fill className="object-cover" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{file.file.name}</p>
                      <p className="text-xs text-muted-foreground">{(file.file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>

                    {!isUploading && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Actions */}
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={handleClose} disabled={isUploading}>
            Cancel
          </Button>
          <Button onClick={handleUploadClick} disabled={files.length === 0 || isUploading}>
            {isUploading ? 'Uploading...' : `Upload ${files.length > 0 ? `(${files.length})` : ''}`}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
