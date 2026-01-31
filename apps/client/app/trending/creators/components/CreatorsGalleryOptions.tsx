import { GetDefaultCreatorsOutput } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';

interface CreatorsGalleryOptions {
  user: GetDefaultCreatorsOutput;
}

export const CreatorsGalleryOptions: React.FC<CreatorsGalleryOptions> = ({ user }) => {
  return (
    <div className="text-center justify-self-end p-1 rounded-lg ">
      <Badge className="truncate bg-blue-500 text-white text-xs md:text-base">{user.username}</Badge>
    </div>
  );
};
