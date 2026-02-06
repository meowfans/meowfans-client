import { UsersEntity } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { Edit, GalleryThumbnailsIcon, GalleryVertical } from 'lucide-react';
import Link from 'next/link';

interface AssetsEditOptionsProps {
  creator: UsersEntity;
}

export const AssetsEditOptions = ({ creator }: AssetsEditOptionsProps) => {
  return (
    <div className="flex justify-end gap-2">
      <Link href={`/assets/${creator.username}`}>
        <Button
          size="sm"
          variant="outline"
          className="h-8 rounded-full hover:border-primary/50 hover:text-primary transition-colors text-xs sm:text-sm px-2 sm:px-3"
        >
          <GalleryThumbnailsIcon className="w-3.5 h-3.5 sm:mr-1.5" />
          <span className="hidden sm:inline">Assets</span>
        </Button>
      </Link>

      <Link href={`/vaults/${creator.username}`}>
        <Button
          size="sm"
          variant="outline"
          className="h-8 rounded-full hover:border-primary/50 hover:text-primary transition-colors text-xs sm:text-sm px-2 sm:px-3"
        >
          <GalleryThumbnailsIcon className="w-3.5 h-3.5 sm:mr-1.5" />
          <span className="hidden sm:inline">Vaults</span>
        </Button>
      </Link>
      <Link href={`/${creator.username}`}>
        <Button
          size="sm"
          variant="outline"
          className="h-8 rounded-full hover:border-primary/50 hover:text-primary transition-colors text-xs sm:text-sm px-2 sm:px-3"
        >
          <GalleryVertical className="w-3.5 h-3.5 sm:mr-1.5" />
          <span className="hidden sm:inline">Posts</span>
        </Button>
      </Link>
      <Button
        size="sm"
        variant="outline"
        className="h-8 rounded-full hover:border-primary/50 hover:text-primary transition-colors text-xs sm:text-sm px-2 sm:px-3"
      >
        <Edit className="w-3.5 h-3.5 sm:mr-1.5" />
        <span className="hidden sm:inline">Edit</span>
      </Button>
    </div>
  );
};
