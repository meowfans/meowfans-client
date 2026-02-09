'use client';

import { CardHeader } from '@workspace/ui/components/card';
import { Tabs, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';

interface AssetsFiltersProps {
  activeType: string;
  onChangeType: (type: string) => void;
}

export function AssetsFilters({ activeType, onChangeType }: AssetsFiltersProps) {
  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <Tabs value={activeType} onValueChange={onChangeType} className="w-full sm:w-auto">
          <TabsList className="grid w-full grid-cols-3 sm:w-[400px]">
            <TabsTrigger value="ALL">All Files</TabsTrigger>
            <TabsTrigger value="IMAGE">Images</TabsTrigger>
            <TabsTrigger value="VIDEO">Videos</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </CardHeader>
  );
}
