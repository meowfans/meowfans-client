import { useFollows } from '@/hooks/useFollow';
import { ExtendedUsersEntity } from '@workspace/gql/generated/graphql';
import { BadgeCheckIcon, Heart } from 'lucide-react';
import { AuthAwareButton } from './AuthAwareButton';
import { Badge } from '@workspace/ui/components/badge';

interface CreatorProfilesGalleryOptionsProps {
  creator: ExtendedUsersEntity;
}

export const CreatorProfilesGalleryOptions: React.FC<CreatorProfilesGalleryOptionsProps> = ({ creator }) => {
  const { creatorFollowHandler } = useFollows();
  return (
    <div className="flex flex-col justify-end h-full">
      <div className="flex justify-between items-end w-full flex-wrap p-2 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
        <Badge variant="secondary" className="z-10 bg-blue-500 text-white dark:bg-blue-600 flex items-center gap-1 text-xs">
          <BadgeCheckIcon className="w-3 h-3" />
          {creator.username}
        </Badge>
        <div className="z-10 hover:text-red-500 rounded-xl transition">
          {creator.creatorProfile.isFollowing ? (
            <Heart className="fill-red-500 z-10" />
          ) : (
            <AuthAwareButton variant="secondary" size="sm" title="Follow" onClick={() => creatorFollowHandler(creator.id)}>
              Follow
            </AuthAwareButton>
          )}
        </div>
      </div>
    </div>
  );
};
