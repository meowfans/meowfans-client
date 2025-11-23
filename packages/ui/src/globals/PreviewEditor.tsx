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
}

export const PreviewEditor = ({ image, isEditing, setImage, setIsEditing }: Props) => {
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

  const getCroppedImage = async (format: 'jpg' | 'png' | 'webp' = 'jpg') => {
    if (!croppedPixels) return;

    const img = new Image();
    if (originalImage) img.src = originalImage;
    await new Promise((res) => (img.onload = res));

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    canvas.width = croppedPixels.width;
    canvas.height = croppedPixels.height;

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

    return new Promise<string>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(URL.createObjectURL(blob));
        }
      }, `image/${format}`);
    });
  };

  const handleSave = async () => {
    const croppedImage = await getCroppedImage('jpg');
    if (croppedImage) {
      setImage(croppedImage);
      setPreview(null);
      setIsEditing(false);
    }
  };

  const handleRevert = () => {
    setImage(originalImage);
    setPreview(null);
    resetControls();
  };

  const handleCancel = () => {
    setIsEditing(false);
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
    const croppedImage = await getCroppedImage('jpg');
    if (croppedImage) {
      setImage(croppedImage);
      setPreview(croppedImage);
    }
  };
  useEffect(() => {
    updatePreview();
  }, [croppedPixels, zoom, rotation, aspectRatio, isEditing]); //eslint-disable-line

  const getAspectLabel = () => {
    if (aspectRatio === 1 / 1) return '1:1';
    if (aspectRatio === 4 / 3) return '4:3';
    if (aspectRatio === 3 / 4) return '3:4';
    if (aspectRatio === 9 / 16) return '9:16';
    if (aspectRatio === 16 / 9) return '16:9';
    return '3:1';
  };

  const handleDrop = (file?: File) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setOriginalImage(url);
    setImage(url);
    setIsEditing(true);
    resetControls();
  };

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
                {'Aspect: '.concat(getAspectLabel())}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setAspectRatio(1 / 1)}>1:1</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setAspectRatio(3 / 1)}>3:1</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setAspectRatio(4 / 3)}>4:3</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setAspectRatio(3 / 4)}>3:4</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setAspectRatio(9 / 16)}>9:16</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setAspectRatio(16 / 9)}>16:9</DropdownMenuItem>
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
