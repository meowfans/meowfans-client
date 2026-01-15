import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent } from '@workspace/ui/components/card';
import { MapPin } from 'lucide-react';

interface FollowerCardProps {
  username: string;
  avatarUrl: string;
  location?: string;
}

export const FollowerCard = ({ username, avatarUrl, location }: FollowerCardProps) => {
  return (
    <Card className="py-0 gap-0">
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <Avatar className="size-10">
              <AvatarImage src={avatarUrl} alt={username} />
              <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{username}</p>
              {location ? (
                <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate">{location}</span>
                </p>
              ) : null}
            </div>
          </div>

          <div className="shrink-0">
            <FollowButton />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

function FollowButton() {
  return (
    <Button variant="outline" size="sm" className="rounded-full px-5">
      Follow
    </Button>
  );
}
