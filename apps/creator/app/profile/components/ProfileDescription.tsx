import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { useCreator } from '@/hooks/useCreator';
import { BadgeCheckIcon, Heart } from 'lucide-react';
import { SAvatar } from '@workspace/ui/globals/SAvatar';

export const ProfileDescription = () => {
  const { creator } = useCreator();
  return (
    <div className="w-full flex justify-end relative">
      <Card className="w-full max-w-sm mt-1 overflow-hidden">
        <CardHeader>
          <CardTitle>{creator.user.username}</CardTitle>
          <CardDescription>{creator.bio ?? 'Add your bio'}</CardDescription>
          <CardAction>
            <Badge variant="secondary" className="bg-blue-500 text-white dark:bg-blue-600 flex items-center gap-1">
              <BadgeCheckIcon className="w-4 h-4" />
              {creator.user.roles}
            </Badge>
          </CardAction>
        </CardHeader>

        <div
          className={`relative w-full md:h-40 h-20 bg-[url(${creator.user.avatarUrl})] bg-center bg-cover rounded-md`}
        />

        <CardContent className="relative flex justify-between md:justify-center">
          <SAvatar
            fallback="profile"
            url={creator.user.avatarUrl}
            className="md:w-40 md:h-40 w-20 h-20 rounded-full border-4shadow-md -mt-16"
          />
          <div className="flex flex-row justify-end md:hidden gap-1">
            <Badge variant="secondary" className="bg-blue-500 text-white dark:bg-blue-600 flex items-center gap-1">
              <BadgeCheckIcon className="w-3 h-3" />
              {creator.totalSubscriber}
            </Badge>
            <Badge variant="secondary" className="bg-blue-500 text-white dark:bg-blue-600 flex items-center gap-1">
              <Heart className="w-3 h-3" />
              {creator.totalPost}
            </Badge>
          </div>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Edit profile information
          </Button>
          <div className="flex gap-3 justify-center">
            <Button className="flex-1">Follow</Button>
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
