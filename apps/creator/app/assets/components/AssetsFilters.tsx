'use client';

import { FileType } from '@workspace/gql/generated/graphql';
import { Tabs, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';

interface AssetsFiltersProps {
  activeType: string;
  onChangeType: (type: string) => void;
}

export function AssetsFilters({ activeType, onChangeType }: AssetsFiltersProps) {
  const filters = [
    { value: 'ALL', label: 'All' },
    { value: FileType.Image, label: 'Images' },
    { value: FileType.Video, label: 'Videos' },
  ];

  return (
    <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl border-b border-border/40 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-center sm:justify-start">
        <Tabs value={activeType} onValueChange={onChangeType} className="w-full sm:w-auto">
          <TabsList className="bg-muted/50 p-1 h-10 w-full sm:w-auto max-w-sm sm:max-w-none">
            {filters.map((filter) => (
              <TabsTrigger
                key={filter.value}
                value={filter.value}
                className="rounded-md px-4 py-1.5 text-xs font-medium transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                {filter.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
