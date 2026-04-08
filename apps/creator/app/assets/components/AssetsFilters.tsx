'use client';

import { FileType } from '@workspace/gql/generated/graphql';
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
          <TabsList className="grid w-full grid-cols-5 sm:w-100">
            <TabsTrigger value="ALL">All Files</TabsTrigger>
            <TabsTrigger value={FileType.Image}>Images</TabsTrigger>
            <TabsTrigger value={FileType.Video}>Videos</TabsTrigger>
            <TabsTrigger value={FileType.Audio}>Audio</TabsTrigger>
            <TabsTrigger value={FileType.Document}>Document</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </CardHeader>
  );
}
