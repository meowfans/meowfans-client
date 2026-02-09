import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { DollarSign, Eye, Heart, Layers } from 'lucide-react';

interface VaultsStatsProps {
  totalVaults: number;
  totalLikes: number;
  totalViews: number;
  totalEarnings: number;
}

export function VaultsStats({ totalVaults, totalLikes, totalViews, totalEarnings }: VaultsStatsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <Card>
        <CardHeader className="pb-2 sm:pb-3">
          <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Total Vaults</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl sm:text-3xl font-black flex items-center gap-2">
            <Layers className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            {totalVaults}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Collections created</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2 sm:pb-3">
          <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Total Likes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl sm:text-3xl font-black flex items-center gap-2">
            <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-red-500" />
            {totalLikes}
          </div>
          <p className="text-xs text-muted-foreground mt-1 hidden sm:block">Across all vaults</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2 sm:pb-3">
          <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Total Views</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl sm:text-3xl font-black flex items-center gap-2">
            <Eye className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
            {totalViews}
          </div>
          <p className="text-xs text-muted-foreground mt-1 hidden sm:block">Visibility</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2 sm:pb-3">
          <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Earnings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl sm:text-3xl font-black flex items-center gap-2">
            <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-green-500" />
            {totalEarnings.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground mt-1 hidden sm:block">Vault sales</p>
        </CardContent>
      </Card>
    </div>
  );
}
