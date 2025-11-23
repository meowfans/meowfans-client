import { Badge } from '@workspace/ui/components/badge';

export const FanAssetsGalleryOptions = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-wrap justify-end p-1">
        <Badge variant="secondary" className="flex justify-end items-end p-1 shadow-accent-foreground shadow-2xs" title="Created at">
          PURCHASED
        </Badge>
      </div>
      <div className="flex flex-col justify-end h-full">
        <div className="flex justify-between items-end w-full p-2 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
          <div className="flex gap-2 items-center"></div>
        </div>
      </div>
    </div>
  );
};
