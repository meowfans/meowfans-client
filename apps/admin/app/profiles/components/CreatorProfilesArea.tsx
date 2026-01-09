import { UserRoles, UsersEntity } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { SAvatar } from '@workspace/ui/globals/SAvatar';
import { BadgeCheckIcon, Ban, BarChart3, GalleryHorizontalEnd, GalleryVertical, Pencil, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  creator: UsersEntity;
}

export const CreatorProfilesArea: React.FC<Props> = ({ creator }) => {
  return (
    <Card className="w-full max-w-sm overflow-hidden border shadow-sm hover:shadow-md transition-all duration-300">
      <div className="relative w-full h-32 md:h-40">
        <Image unoptimized fill src={creator?.bannerUrl || '/assets/1.jpg'} alt={creator?.username || ''} className="object-cover" />
        <div className="absolute top-2 right-2">
          <Badge
            variant="secondary"
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              creator.roles?.includes(UserRoles.Creator) ? 'bg-green-600 text-white' : 'bg-blue-500 text-white'
            }`}
          >
            <BadgeCheckIcon className="w-3 h-3 mr-1" />
            {creator?.roles}
          </Badge>
        </div>
      </div>

      <CardHeader className="flex flex-col items-center -mt-12">
        <SAvatar
          fallback="profile"
          url={creator?.avatarUrl}
          className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-background shadow-md"
        />
        <CardTitle className="mt-3 text-lg font-semibold">{creator?.username}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {creator?.firstName} {creator?.lastName}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex justify-around py-2 text-sm text-muted-foreground">
        <div className="flex flex-col items-center">
          <span className="font-semibold">{creator?.creatorProfile.assetCount ?? 0}</span>
          <span>Assets</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-semibold">{creator?.creatorProfile.vaultCount ?? 0}</span>
          <span>Vaults</span>
        </div>
      </CardContent>

      <CardFooter className="flex flex-row gap-2 p-4">
        <div className="flex flex-col justify-around gap-2 w-full">
          <Link href={`/vaults/${creator.username}`}>
            <Button className="flex-1">
              <GalleryVertical className="w-4 h-4 mr-1" />
              Vaults
            </Button>
          </Link>
          <Button size="sm" variant="outline" className="w-full">
            <Pencil className="w-4 h-4 mr-1" /> Edit
          </Button>
          <Button size="sm" variant="secondary" className="w-full">
            <ShieldCheck className="w-4 h-4 mr-1" /> Authorize
          </Button>
        </div>
        <div className="flex flex-col justify-around gap-2 w-full">
          <Link href={`/assets/${creator.username}`}>
            <Button className="w-full">
              <GalleryHorizontalEnd className="w-4 h-4 mr-1" />
              Assets
            </Button>
          </Link>
          <Button size="sm" variant="outline" className="w-full">
            <BarChart3 className="w-4 h-4 mr-1" /> Analytics
          </Button>
          <Button size="sm" variant="destructive" className="w-full">
            <Ban className="w-4 h-4 mr-1" /> Suspend
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
