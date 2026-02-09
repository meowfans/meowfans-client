'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Check, FlipHorizontal, FlipVertical, Maximize2, Minimize2, Rotate3d, RotateCcw, Upload, X, ZoomIn, ZoomOut } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import Cropper, { Point } from 'react-easy-crop';
import { Badge } from '../components/badge';
import { Button } from '../components/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/card';
import { Input } from '../components/input';
import { Label } from '../components/label';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/tabs';
import { cn } from '../lib/utils';
import { DropZone } from './DropZone';

interface Props {
  image: string | null;
  isEditing: boolean;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  onSave: (file: File, previewUrl: string) => void;
  onCancel?: () => unknown;
  title?: string;
  description?: string;
  defaultAspectRatio?: number;
  showPreview?: boolean;
  maxZoom?: number;
  minZoom?: number;
  cropShape?: 'rect' | 'round';
  corsProxyUrl?: string; // URL to proxy images through to avoid CORS issues
}

type OutputType = 'url' | 'file';
type ImageFormat = 'image/jpeg' | 'image/png' | 'image/webp';

interface CropOptions {
  format?: ImageFormat;
  output?: OutputType;
  fileName?: string;
  quality?: number;
}

const ASPECT_RATIOS = [
  { value: 1 / 1, label: '1:1', name: 'Square' },
  { value: 16 / 9, label: '16:9', name: 'Landscape' },
  { value: 9 / 16, label: '9:16', name: 'Portrait' },
  { value: 4 / 3, label: '4:3', name: 'Standard' },
  { value: 3 / 4, label: '3:4', name: 'Portrait' },
  { value: 21 / 9, label: '21:9', name: 'Ultrawide' },
  { value: 3 / 1, label: '3:1', name: 'Banner' }
];

export const PreviewEditor = ({
  image,
  isEditing,
  setImage,
  setIsEditing,
  onSave,
  onCancel,
  title = 'Edit Image',
  description = 'Adjust your image by cropping, rotating, zooming, or changing aspect ratio. Preview changes before saving.',
  defaultAspectRatio = 1 / 1,
  showPreview = true,
  maxZoom = 3,
  minZoom = 1,
  cropShape = 'rect',
  corsProxyUrl
}: Props) => {
  // Helper to proxy image URLs through server to avoid CORS issues
  const getProxiedUrl = (url: string | null) => {
    if (!url || !corsProxyUrl) return url;
    // If URL is already a blob or data URL, don't proxy it
    if (url.startsWith('blob:') || url.startsWith('data:')) return url;
    return `${corsProxyUrl}?url=${encodeURIComponent(url)}`;
  };
  const [originalImage, setOriginalImage] = useState(getProxiedUrl(image));
  const [croppedPixels, setCroppedPixels] = useState<any>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [aspectRatio, setAspectRatio] = useState<number>(defaultAspectRatio);
  const [preview, setPreview] = useState<string | null>(null);
  const [flipHorizontal, setFlipHorizontal] = useState(false);
  const [flipVertical, setFlipVertical] = useState(false);
  const [imageFormat, setImageFormat] = useState<ImageFormat>('image/jpeg');
  const [quality, setQuality] = useState(0.92);
  const [activeTab, setActiveTab] = useState('adjust');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const onCropComplete = useCallback((_: any, croppedArea: any) => {
    setCroppedPixels(croppedArea);
  }, []);

  const getCroppedImageFile = async (options: CropOptions): Promise<string | File | null> => {
    const { format = imageFormat, output = 'url', fileName = `edited-${Date.now()}`, quality: q = quality } = options;

    if (!croppedPixels || !originalImage) return null;

    const img = new Image();
    img.src = originalImage;
    await new Promise<void>((res) => (img.onload = () => res()));

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const scaleX = flipHorizontal ? -1 : 1;
    const scaleY = flipVertical ? -1 : 1;

    canvas.width = croppedPixels.width;
    canvas.height = croppedPixels.height;

    ctx.save();

    // Apply transformations
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(scaleX, scaleY);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);

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
      canvas.toBlob(
        (blob) => {
          if (!blob) return resolve(null);

          if (output === 'file') {
            resolve(new File([blob], `${fileName}.${format.split('/')[1]}`, { type: format }));
          } else {
            resolve(URL.createObjectURL(blob));
          }
        },
        format,
        q
      );
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setPreview(null);
    resetControls();
    setImage(null);
    onCancel?.();
  };

  const handleSave = async () => {
    const file = (await getCroppedImageFile({ output: 'file' })) as File;
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    onSave(file, previewUrl);
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
    setFlipHorizontal(false);
    setFlipVertical(false);
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
  }, [croppedPixels, zoom, rotation, aspectRatio, isEditing, flipHorizontal, flipVertical]); //eslint-disable-line

  const handleDrop = (file?: File) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setOriginalImage(url);
    setImage(url);
    setIsEditing(true);
    resetControls();
  };

  const currentAspect = ASPECT_RATIOS.find((a) => a.value === aspectRatio) || ASPECT_RATIOS[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      ref={containerRef}
      className={cn('w-full', isFullscreen && 'fixed inset-0 z-50 bg-background p-4 overflow-auto')}
    >
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2">
                {title}
                {originalImage && (
                  <Badge variant="secondary" className="text-xs">
                    {currentAspect?.label}
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
            {originalImage && (
              <Button size="sm" variant="ghost" onClick={() => setIsFullscreen(!isFullscreen)}>
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Cropper Area */}
          <motion.div
            className={cn('relative w-full bg-secondary/20 rounded-lg overflow-hidden', isFullscreen ? 'h-[60vh]' : 'h-64 sm:h-80 md:h-96')}
            layout
          >
            <AnimatePresence mode="wait">
              {originalImage ? (
                <motion.div key="cropper" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full">
                  <Cropper
                    image={originalImage}
                    crop={crop}
                    zoom={zoom}
                    aspect={aspectRatio}
                    showGrid
                    restrictPosition
                    rotation={rotation}
                    cropShape={cropShape}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                  />
                  {showPreview && preview && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute right-2 top-2 border-2 border-primary rounded-lg overflow-hidden shadow-lg bg-background"
                    >
                      <img src={preview} alt="Preview" className="w-24 h-24 sm:w-32 sm:h-32 object-cover" />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 text-center">Preview</div>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="dropzone"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full"
                >
                  <DropZone onUpload={(file) => handleDrop(file[0])} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Controls */}
          {originalImage && (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="adjust">Adjust</TabsTrigger>
                <TabsTrigger value="transform">Transform</TabsTrigger>
                <TabsTrigger value="export">Export</TabsTrigger>
              </TabsList>

              {/* Adjust Tab */}
              <TabsContent value="adjust" className="space-y-4 mt-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Zoom: {zoom.toFixed(1)}x</Label>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" onClick={() => setZoom(Math.max(minZoom, zoom - 0.1))} disabled={zoom <= minZoom}>
                        <ZoomOut className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setZoom(Math.min(maxZoom, zoom + 0.1))} disabled={zoom >= maxZoom}>
                        <ZoomIn className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <Input
                    type="range"
                    value={zoom}
                    onChange={(e) => setZoom(Number(e.target.value))}
                    min={minZoom}
                    max={maxZoom}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium">Aspect Ratio</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {ASPECT_RATIOS.map((aspect) => (
                      <Button
                        key={aspect.value}
                        size="sm"
                        variant={aspectRatio === aspect.value ? 'default' : 'outline'}
                        onClick={() => setAspectRatio(aspect.value)}
                        className="flex flex-col h-auto py-2"
                      >
                        <span className="font-bold">{aspect.label}</span>
                        <span className="text-xs opacity-70">{aspect.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Transform Tab */}
              <TabsContent value="transform" className="space-y-4 mt-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Rotation: {rotation}°</Label>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" onClick={() => setRotation((r) => (r - 90 + 360) % 360)}>
                        <RotateCcw className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setRotation((r) => (r + 90) % 360)}>
                        <Rotate3d className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <Input
                    type="range"
                    value={rotation}
                    onChange={(e) => setRotation(Number(e.target.value))}
                    min={0}
                    max={360}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium">Flip</Label>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={flipHorizontal ? 'default' : 'outline'}
                      onClick={() => setFlipHorizontal(!flipHorizontal)}
                      className="flex-1"
                    >
                      <FlipHorizontal className="h-4 w-4 mr-2" />
                      Horizontal
                    </Button>
                    <Button
                      size="sm"
                      variant={flipVertical ? 'default' : 'outline'}
                      onClick={() => setFlipVertical(!flipVertical)}
                      className="flex-1"
                    >
                      <FlipVertical className="h-4 w-4 mr-2" />
                      Vertical
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Export Tab */}
              <TabsContent value="export" className="space-y-4 mt-4">
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Format</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['image/jpeg', 'image/png', 'image/webp'] as ImageFormat[]).map((format) => (
                      <Button
                        key={format}
                        size="sm"
                        variant={imageFormat === format ? 'default' : 'outline'}
                        onClick={() => setImageFormat(format)}
                      >
                        {format.split('/')[1]?.toUpperCase()}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Quality: {Math.round(quality * 100)}%</Label>
                  </div>
                  <Input
                    type="range"
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    min={0.1}
                    max={1}
                    step={0.01}
                    className="w-full"
                  />
                </div>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row gap-3">
          <div className="flex flex-wrap gap-2 flex-1">
            {originalImage ? (
              <>
                <Button size="sm" onClick={handleSave} className="gap-2">
                  <Check className="h-4 w-4" />
                  Save Changes
                </Button>
                <Button size="sm" variant="outline" onClick={handleCancel} className="gap-2">
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
                {image !== originalImage && (
                  <Button size="sm" variant="destructive" onClick={handleRevert} className="gap-2">
                    <RotateCcw className="h-4 w-4" />
                    Revert
                  </Button>
                )}
              </>
            ) : (
              <Button size="sm" variant="outline" onClick={() => fileInputRef.current?.click()} className="gap-2">
                <Upload className="h-4 w-4" />
                Upload Image
              </Button>
            )}
            {originalImage && (
              <Button size="sm" variant="outline" onClick={() => fileInputRef.current?.click()} className="gap-2">
                <Upload className="h-4 w-4" />
                Replace
              </Button>
            )}
            <Input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleUpload} />
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
