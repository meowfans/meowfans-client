import { AssetPickerModal } from '@/components/modals/AssetPickerModal';
import { CreatorAssetsEntity } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { TriggerModal } from '@workspace/ui/modals/TriggerModal';
import { Camera, GalleryVerticalEnd } from 'lucide-react';
import { useRef, useState } from 'react';

interface EditBannerPictureProps {
  banner: string | null;
  setBanner: React.Dispatch<React.SetStateAction<string | null>>;
  setIsBannerEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditBannerPicture = ({ banner, setBanner, setIsBannerEditing }: EditBannerPictureProps) => {
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const [openAsstPickerModal, setOpenAsstPickerModal] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const bannerUrl = URL.createObjectURL(e.target.files[0]);
    setBanner((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return bannerUrl;
    });
    setIsBannerEditing(true);
    e.target.value = '';
  };

  const handleSelectFromAsset = async (creatorAsset: CreatorAssetsEntity) => {
    const proxiedUrl = `/server?url=${encodeURIComponent(creatorAsset.asset.rawUrl)}`;

    const res = await fetch(proxiedUrl);
    const blob = await res.blob();
    const objectUrl = URL.createObjectURL(blob);

    setBanner(objectUrl);
    setOpenAsstPickerModal(false);
    setIsBannerEditing(true);
  };

  return (
    <div className="relative group overflow-hidden rounded-xl border border-border">
      <div
        className="h-40 w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
        style={{ backgroundImage: banner ? `url(${banner})` : undefined }}
      />
      {!banner && <div className="h-40 w-full bg-muted" />}

      <div className="absolute inset-0 space-x-1 md:bg-black/40 md:opacity-0 md:group-hover:opacity-100 sm:opacity-100 transition-opacity flex md:items-center items-end justify-end md:justify-center">
        <Button size="sm" variant="secondary" className="gap-2" onClick={() => bannerInputRef.current?.click()}>
          <Camera size={16} />
        </Button>
        <TriggerModal
          className="gap-2"
          onChangeModalState={setOpenAsstPickerModal}
          onClick={() => setOpenAsstPickerModal(true)}
          modalIcon={{ icon: GalleryVerticalEnd, size: 'sm', variant: 'secondary' }}
        />
      </div>

      <Label className="absolute top-3 left-3 text-xs text-white/90">Profile banner</Label>
      <Input ref={bannerInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleChange(e)} />
      {openAsstPickerModal && (
        <AssetPickerModal
          open={openAsstPickerModal}
          onClose={() => setOpenAsstPickerModal(false)}
          onSelectUrls={(creatorAssets) => handleSelectFromAsset(creatorAssets[0])}
        />
      )}
    </div>
  );
};
