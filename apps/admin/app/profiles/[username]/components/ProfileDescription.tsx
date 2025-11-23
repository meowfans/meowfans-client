import { GetCreatorProfileByAdminQuery } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { SAvatar } from '@workspace/ui/globals/SAvatar';
import { BadgeCheckIcon, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  creatorInfo?: GetCreatorProfileByAdminQuery;
}

export const ProfileDescription: React.FC<Props> = ({ creatorInfo }) => {
  return (
    <div className="w-full flex justify-end relative">
      <Card className="w-full max-w-sm mt-1 overflow-hidden">
        <CardHeader>
          <CardTitle>{creatorInfo?.getCreatorProfileByAdmin.user.username}</CardTitle>
          <CardDescription>{creatorInfo?.getCreatorProfileByAdmin.bio}</CardDescription>
          <CardAction>
            <Badge variant="secondary" className="bg-blue-500 text-white dark:bg-blue-600 flex items-center gap-1">
              <BadgeCheckIcon className="w-4 h-4" />
              {creatorInfo?.getCreatorProfileByAdmin.user.roles}
            </Badge>
          </CardAction>
        </CardHeader>

        <Image
          unoptimized
          src={creatorInfo?.getCreatorProfileByAdmin.user.bannerUrl || './assets/1/jpg'}
          alt={creatorInfo?.getCreatorProfileByAdmin.user.username || ''}
          width={'100'}
          height={300}
          className="relative w-full md:h-40 h-20 bg-center bg-cover rounded-md"
        />

        <CardContent className="relative flex justify-between md:justify-center">
          <SAvatar
            fallback="profile"
            url={creatorInfo?.getCreatorProfileByAdmin.user.avatarUrl}
            className="md:w-40 md:h-40 w-20 h-20 rounded-full border-4shadow-md -mt-16"
          />
          <div className="flex flex-row justify-end md:hidden gap-1">
            <Badge variant="secondary" className="bg-blue-500 text-white dark:bg-blue-600 flex items-center gap-1">
              <BadgeCheckIcon className="w-3 h-3" />
              {creatorInfo?.getCreatorProfileByAdmin.totalSubscriber}
            </Badge>
            <Badge variant="secondary" className="bg-blue-500 text-white dark:bg-blue-600 flex items-center gap-1">
              <Heart className="w-3 h-3" />
              {creatorInfo?.getCreatorProfileByAdmin.totalPost}
            </Badge>
          </div>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Link href={`/assets/${creatorInfo?.getCreatorProfileByAdmin.user.username}`}>
            <Button className="w-full">Assets</Button>
          </Link>
          <div className="flex gap-3 justify-center">
            <Link href={`/vaults/${creatorInfo?.getCreatorProfileByAdmin.user.username}`}>
              <Button className="flex-1">Vaults</Button>
            </Link>
            <Button variant="outline" className="flex-1">
              Message
            </Button>
            <Button variant="outline" className="flex-1">
              Subscribe
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
