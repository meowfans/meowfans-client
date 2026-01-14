'use client';

import { Rotate3d, Upload } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import Cropper, { Point } from 'react-easy-crop';
import { Button } from '../components/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/dropdown-menu';
import { Input } from '../components/input';
import { DropZone } from './DropZone';

interface Props {
  image: string | null;
  isEditing: boolean;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  onSave: (file: File, previewUrl: string) => void;
}

type OutputType = 'url' | 'file';
type ImageFormat = 'image/jpeg' | 'image/png' | 'image/webp';

interface CropOptions {
  format?: ImageFormat;
  output?: OutputType;
  fileName?: string;
}

export const PreviewEditor = ({ image, isEditing, setImage, setIsEditing, onSave }: Props) => {
  const [originalImage, setOriginalImage] = useState(image);
  const [croppedPixels, setCroppedPixels] = useState<any>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [aspectRatio, setAspectRatio] = useState<number>(1 / 1);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onCropComplete = useCallback((_: any, croppedArea: any) => {
    setCroppedPixels(croppedArea);
  }, []);

  const getCroppedImageFile = async (options: CropOptions): Promise<string | File | null> => {
    const { format = 'image/jpeg', output = 'url', fileName = `edited-${Date.now()}` } = options;
    console.log('started');

    if (!croppedPixels || !originalImage) return null;

    const img = new Image();
    img.src = originalImage;
    await new Promise<void>((res) => (img.onload = () => res()));

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    canvas.width = croppedPixels.width;
    canvas.height = croppedPixels.height;

    ctx.save();

    if (rotation !== 0) {
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);
    }

    ctx.drawImage(
      img,
      croppedPixels.x,
      croppedPixels.y,
      croppedPixels.width,
      croppedPixels.height,
      0,
      0,
      croppedPixels.width,
      croppedPixels.height
    );

    ctx.restore();

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) return resolve(null);

        if (output === 'file') {
          resolve(new File([blob], `${fileName}.${format.split('/')[1]}`, { type: format }));
        } else {
          resolve(URL.createObjectURL(blob));
        }
      }, format);
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setPreview(null);
    resetControls();
  };

  const handleSave = async () => {
    const file = (await getCroppedImageFile({ output: 'file' })) as File;
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    console.log('created object url');
    // Emit to parent
    onSave(file, previewUrl);

    // Update local preview
    setImage(previewUrl);
    handleCancel();
  };

  const handleRevert = () => {
    setImage(originalImage);
    setPreview(null);
    resetControls();
  };

  const resetControls = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setOriginalImage(url);
    setImage(url);
    setIsEditing(true);
    resetControls();
  };

  const updatePreview = async () => {
    const croppedImage = (await getCroppedImageFile({ output: 'url' })) as string;
    if (croppedImage) {
      setImage(croppedImage);
      setPreview(croppedImage);
    }
  };
  useEffect(() => {
    updatePreview();
  }, [croppedPixels, zoom, rotation, aspectRatio, isEditing]); //eslint-disable-line

  const handleDrop = (file?: File) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setOriginalImage(url);
    setImage(url);
    setIsEditing(true);
    resetControls();
  };

  const aspectLabel =
    aspectRatio === 1 / 1
      ? '1:1'
      : aspectRatio === 3 / 1
        ? '3:1'
        : aspectRatio === 4 / 3
          ? '4:3'
          : aspectRatio === 3 / 4
            ? '3:4'
            : aspectRatio === 9 / 16
              ? '9:16'
              : '16:9';

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Edit Banner</CardTitle>
        <CardDescription>
          Adjust your banner by cropping, rotating, zooming, or changing aspect ratio. You can preview changes before saving.
        </CardDescription>
      </CardHeader>

      <CardContent className="relative w-full h-64">
        {originalImage ? (
          <>
            <Cropper
              image={originalImage}
              crop={crop}
              zoom={zoom}
              aspect={aspectRatio}
              showGrid
              restrictPosition
              rotation={rotation}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
            {preview && (
              <div className="absolute right-2 top-2 border rounded-md overflow-hidden shadow-md bg-background">
                <img src={preview} alt="Preview" className="w-28 h-16 object-cover" />
              </div>
            )}
          </>
        ) : (
          <DropZone onUpload={(file) => handleDrop(file[0])} />
        )}
      </CardContent>

      <CardFooter className="flex flex-col gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <Button size="sm" variant="outline" onClick={handleSave}>
            Save
          </Button>
          <Button size="sm" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          {image !== originalImage && (
            <Button size="sm" variant="destructive" onClick={handleRevert}>
              Revert
            </Button>
          )}
          <Button size="sm" variant="outline" onClick={() => setRotation((r) => r + 90)}>
            <Rotate3d className="w-4 h-4 mr-1" /> Rotate
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline">
                Aspect: {aspectLabel}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {[1 / 1, 3 / 1, 4 / 3, 3 / 4, 9 / 16, 16 / 9].map((a) => (
                <DropdownMenuItem key={a} onClick={() => setAspectRatio(a)}>
                  {a === 1 / 1 ? '1:1' : a === 3 / 1 ? '3:1' : a === 4 / 3 ? '4:3' : a === 3 / 4 ? '3:4' : a === 9 / 16 ? '9:16' : '16:9'}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" variant="outline" onClick={() => fileInputRef.current?.click()}>
            <Upload className="w-4 h-4 mr-1" /> Upload New
          </Button>
          <Input type="file" ref={fileInputRef} className="hidden" onChange={handleUpload} />
        </div>

        <div className="w-full">
          <label className="text-sm font-medium">Zoom</label>
          <Input type="range" min={1} max={3} step={0.1} value={zoom} onChange={(e) => setZoom(Number(e.target.value))} />
        </div>
      </CardFooter>
    </Card>
  );
};
