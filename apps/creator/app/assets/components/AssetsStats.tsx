import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Film, Image as ImageIcon, Layers } from 'lucide-react';

interface AssetsStatsProps {
  totalAssets: number;
  imageCount: number;
  videoCount: number;
}

export function AssetsStats({ totalAssets, imageCount, videoCount }: AssetsStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
      <Card>
        <CardHeader className="pb-2 sm:pb-3">
          <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Total Assets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl sm:text-3xl font-black flex items-center gap-2">
            <Layers className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            {totalAssets}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Uploaded files</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2 sm:pb-3">
          <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Images</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl sm:text-3xl font-black flex items-center gap-2">
            <ImageIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
            {imageCount}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Photos & Graphics</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2 sm:pb-3">
          <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Videos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl sm:text-3xl font-black flex items-center gap-2">
            <Film className="h-5 w-5 sm:h-6 sm:w-6 text-red-500" />
            {videoCount}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Clips & Recordings</p>
        </CardContent>
      </Card>
    </div>
  );
}
