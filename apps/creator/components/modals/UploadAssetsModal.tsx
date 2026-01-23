'use client';

import useAPI from '@/hooks/useAPI';
import { AssetType } from '@workspace/gql/generated/graphql';

import { useAssetsStore } from '@/hooks/store/assets.store';
import { Dropdown } from '@workspace/ui/globals/Dropdown';
import { DropZone } from '@workspace/ui/globals/DropZone';
import { LoadingButton } from '@workspace/ui/globals/LoadingButton';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useSuccessHandler } from '@workspace/ui/hooks/useSuccessHandler';
import { FileType, MediaType, resolveFileType } from '@workspace/ui/lib';
import { Modal } from '@workspace/ui/modals/Modal';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
interface Props {
  onUpload: (length: number) => unknown;
}

interface PreviewProps {
  type: FileType.IMAGE | FileType.VIDEO;
  file: File;
  previewUrl: string;
}

export const UploadAssetsModal: React.FC<Props> = ({ onUpload }) => {
  const { upload } = useAPI();
  const { successHandler } = useSuccessHandler();
  const { errorHandler } = useErrorHandler();
  const [loading, setLoading] = useState<boolean>(false);
  const { openUploadModal, setOpenUploadModal } = useAssetsStore();
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<PreviewProps[]>([]);
  const [mediaType, setMediaType] = useState<MediaType>(MediaType.PROFILE_MEDIA);
  const [assetType, setAssetType] = useState<AssetType>(AssetType.Private);

  const handleUpload = async () => {
    setLoading(true);
    try {
      if (!files.length) return;

      await Promise.all(
        files.map(async (file) => {
          const formData = new FormData();
          formData.append('file', file);
          await upload({
            mediaType: MediaType.PROFILE_MEDIA,
            formData: formData,
            fileType: resolveFileType(file.name)
          });
        })
      );

      onUpload(files.length);
      successHandler({ isEnabledConfetti: true, message: 'Uploaded assets successfully' });
      toast.success('Uploaded');
    } catch (error) {
      errorHandler({ error, msg: 'Unable to upload assets' });
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  const handleFilterFiles = (file: File) => {
    setFiles((prev) => prev.filter((f) => f !== file));
  };

  const handleClose = () => {
    setOpenUploadModal(false);
    setFiles([]);
  };

  useEffect(() => {
    const mapped = files.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
      type: resolveFileType(file.name)
    })) as PreviewProps[];

    setPreviews(mapped);
  }, [files]);

  return (
    <Modal isOpen={openUploadModal} onClose={handleClose} description="Upload your assets or click to remove" title="Upload">
      <div className="grid grid-cols-2">
        <Dropdown
          enumValue={MediaType}
          filterBy={mediaType}
          onFilterBy={setMediaType}
          trigger={{
            label: mediaType
              .replace(/([A-Z])/g, ' $1')
              .trim()
              .toUpperCase()
          }}
          title="Set media type"
          label="Media Type"
        />

        <Dropdown
          title="Set asset type"
          label="Asset Type"
          enumValue={AssetType}
          filterBy={assetType}
          onFilterBy={setAssetType}
          trigger={{ label: assetType }}
        />
      </div>
      {previews.length ? (
        <div className="flex w-full flex-col gap-3">
          <div className="grid grid-cols-3 gap-2 overflow-y-scroll max-h-80">
            {previews.map(({ file, previewUrl, type }, idx) => (
              <div key={idx} className="relative group cursor-pointer">
                {type === FileType.IMAGE ? (
                  <div
                    style={{ backgroundImage: `url(${previewUrl})` }}
                    className="w-full h-32 bg-cover bg-center rounded-lg shadow-md"
                    onClick={() => handleFilterFiles(file)}
                  />
                ) : (
                  <video
                    src={previewUrl}
                    muted
                    playsInline
                    className="w-full h-32 rounded-lg shadow-md object-cover"
                    onClick={() => handleFilterFiles(file)}
                  />
                )}
              </div>
            ))}
          </div>

          <LoadingButton loading={loading} onClick={handleUpload} title="Upload" />
        </div>
      ) : (
        <DropZone onUpload={(files) => setFiles(files)} />
      )}
    </Modal>
  );
};
