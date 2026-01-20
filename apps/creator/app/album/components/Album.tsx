'use client';

import { useVaults } from '@/hooks/useVaults';
import { Separator } from '@workspace/ui/components/separator';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { ShadCnChartTypes } from '@workspace/ui/lib/enums';
import { useState } from 'react';
import { AlbumAnalytics } from './AlbumAnalytics';
import { AlbumDetails } from './AlbumDetails';
import { AlbumHeader } from './AlbumHeader';
import { RecentAlbums } from './RecentAlbums';

export const Album = () => {
  const [chartType, setChartType] = useState<ShadCnChartTypes>(ShadCnChartTypes.AREA_CHART);
  const { loading, vaults } = useVaults({ take: 30 });

  return (
    <PageManager>
      <div className="relative">
        <div className="px-4 py-6 pb-24">
          <AlbumHeader />
          <Separator className="my-6" />
          <AlbumDetails loading={loading} vaults={vaults} />
          <div className="grid grid-cols-1 gap-4 mt-6 lg:grid-cols-2">
            <AlbumAnalytics chartType={chartType} loading={loading} vaults={vaults} setChartType={setChartType} />
            <RecentAlbums loading={loading} vaults={vaults} />
          </div>
        </div>
      </div>
    </PageManager>
  );
};
