import { ImpersonateCreatorTrigger } from '@/components/ImpersonateTrigger';
import { UsersEntity } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { Edit, GalleryVertical, GalleryVerticalEnd, Vault } from 'lucide-react';
import Link from 'next/link';

interface CreatorProfilesEditOptionsProps {
  creator: UsersEntity;
}

export const CreatorProfilesEditOptions = ({ creator }: CreatorProfilesEditOptionsProps) => {
  return (
    <div className="flex justify-start gap-2">
      <Link href={`/assets/${creator.username}`}>
        <Button size="sm" variant="outline">
          <GalleryVerticalEnd className="w-2 h-2 sm:mr-1" />
          <span className="hidden text-xs sm:inline">Assets</span>
        </Button>
      </Link>

      <Link href={`/vaults/${creator.username}`}>
        <Button size="sm" variant="outline">
          <Vault className="w-2 h-2 sm:mr-1" />
          <span className="hidden text-xs sm:inline">Vaults</span>
        </Button>
      </Link>

      <Link href={`/${creator.username}`}>
        <Button size="sm" variant="outline">
          <GalleryVertical className="w-2 h-2 sm:mr-1" />
          <span className="hidden text-xs sm:inline">Posts</span>
        </Button>
      </Link>

      <Button size="sm" variant="outline">
        <Edit className="w-2 h-2 sm:mr-1" />
        <span className="hidden text-xs sm:inline">Edit</span>
      </Button>
      <ImpersonateCreatorTrigger creator={creator} />
    </div>
  );
};
