import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { Camera } from 'lucide-react';
import { useRef } from 'react';

interface EditBannerPictureProps {
  banner: string | null;
  setBanner: React.Dispatch<React.SetStateAction<string | null>>;
  setIsBannerEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditBannerPicture = ({ banner, setBanner, setIsBannerEditing }: EditBannerPictureProps) => {
  const bannerInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <div className="relative group overflow-hidden rounded-xl border border-border">
      <div
        className="h-40 w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
        style={{ backgroundImage: banner ? `url(${banner})` : undefined }}
      />
      {!banner && <div className="h-40 w-full bg-muted" />}

      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <Button size="sm" variant="secondary" className="gap-2" onClick={() => bannerInputRef.current?.click()}>
          <Camera size={16} />
          Change banner
        </Button>
      </div>

      <Label className="absolute top-3 left-3 text-xs text-white/90">Profile banner</Label>
      <Input ref={bannerInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleChange(e)} />
    </div>
  );
};
