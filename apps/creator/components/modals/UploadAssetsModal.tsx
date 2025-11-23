'use client';

import useAPI from '@/hooks/api/useAPI';
import { AssetType } from '@workspace/gql/generated/graphql';

import { useAssetsStore } from '@/zustand/assets.store';
import { useState } from 'react';
import { toast } from 'sonner';
import { MediaType } from '@workspace/ui/lib';
import { Modal } from '@workspace/ui/modals/Modal';
import { Dropdown } from '@workspace/ui/globals/Dropdown';
import { LoadingButton } from '@workspace/ui/globals/LoadingButton';
import { DropZone } from '@workspace/ui/globals/DropZone';
interface Props {
  onUpload: (length: number) => unknown;
}

export const UploadAssetsModal: React.FC<Props> = ({ onUpload }) => {
  const { upload } = useAPI();
  const [loading, setLoading] = useState<boolean>(false);
  const { openUploadModal, setOpenUploadModal } = useAssetsStore();
  const [files, setFiles] = useState<File[]>([]);
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
          await upload({ mediaType: MediaType.PROFILE_MEDIA, formData: formData });
        })
      );

      onUpload(files.length);
      toast.success('Uploaded');
    } catch (error) {
      console.log(error);
      toast.error('Something wrong happened!');
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
      {files.length ? (
        <div className="flex w-full flex-col gap-3">
          <div className="grid grid-cols-3 gap-2 overflow-y-scroll max-h-80">
            {files.map((file, idx) => {
              const url = URL.createObjectURL(file);
              return (
                <div key={idx} className="relative group cursor-pointer">
                  <div
                    style={{ backgroundImage: `url(${url})`, minHeight: 128, minWidth: '100%' }}
                    className="w-full h-32 bg-cover bg-center rounded-lg shadow-md group-hover:opacity-80 transition"
                    onClick={() => handleFilterFiles(file)}
                  />
                </div>
              );
            })}
          </div>

          <LoadingButton loading={loading} onClick={handleUpload} title="Upload" />
        </div>
      ) : (
        <DropZone onUpload={(files) => setFiles(files)} />
      )}
    </Modal>
  );
};
