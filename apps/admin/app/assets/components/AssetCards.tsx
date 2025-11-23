import { Button } from '@workspace/ui/components/button';
import { ExtendedUsersEntity } from '@workspace/gql/generated/graphql';
import { Eye, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  creator: ExtendedUsersEntity;
  pageNumber: number;
}

export const AssetCards: React.FC<Props> = ({ creator, pageNumber }) => {
  return (
    <div className="group rounded-xl border shadow-sm hover:shadow-md bg-card transition-all overflow-hidden">
      <div className="relative h-36 w-full overflow-hidden">
        <Image
          unoptimized
          fill
          src={creator.bannerUrl || '/assets/1.jpg'}
          alt={`${creator.username} banner`}
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2">
          <span className="px-2 py-1 text-xs rounded-full bg-background/80 backdrop-blur border shadow">
            {creator.creatorProfile.assetCount ?? 0} Assets
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center -mt-10 z-10 relative">
        <Image
          unoptimized
          src={creator.avatarUrl || '/assets/1.jpg'}
          alt={creator.username}
          width={80}
          height={80}
          className="h-20 w-20 rounded-full border-4 border-background shadow-md group-hover:scale-105 transition-transform duration-500"
        />
        <p className="mt-2 text-lg font-semibold tracking-tight text-foreground">{creator.username}</p>
        <p className="text-sm text-muted-foreground">
          {creator.firstName ?? ''} {creator.lastName ?? ''}
        </p>
      </div>

      <div className="flex justify-center gap-2 mt-4 pb-4 opacity-100">
        <Link href={`/assets/${creator.username}?p=${pageNumber}`}>
          <Button size="sm" variant="outline" className="rounded-full">
            <Eye className="h-4 w-4 mr-1" /> Details
          </Button>
        </Link>
        <Button size="sm" variant="secondary" className="rounded-full">
          <ShieldCheck className="h-4 w-4 mr-1" /> Freeze
        </Button>
      </div>
    </div>
  );
};
