import { Badge } from '@workspace/ui/components/badge';
import { ExtendedUsersEntity } from '@workspace/gql/generated/graphql';

interface CreatorsGalleryOptions {
  creator: ExtendedUsersEntity;
}

export const CreatorsGalleryOptions: React.FC<CreatorsGalleryOptions> = ({ creator }) => {
  return (
    <div className="text-center justify-self-end p-1 rounded-lg ">
      <Badge className="truncate bg-blue-500 text-white text-xs md:text-base">{creator.username}</Badge>
    </div>
  );
};
