'use client';

import { useCreator } from '@/hooks/context/useCreator';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Edit } from 'lucide-react';
import Link from 'next/link';

export function ProfileHeader() {
  const { creator } = useCreator();

  // Safely access nested properties
  const user = (creator as any)?.user;
  const username = user?.username || 'Creator';
  const avatarUrl = user?.avatarUrl;

  return (
    <Card className="mb-4 sm:mb-6">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 sm:p-6">
        <Avatar className="h-16 w-16 sm:h-20 sm:w-20 shrink-0">
          <AvatarImage src={avatarUrl} alt={username} />
          <AvatarFallback className="text-lg sm:text-xl">{username.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <CardTitle className="text-xl sm:text-2xl truncate">{username}</CardTitle>
          <CardDescription className="text-sm line-clamp-2">{creator?.bio || 'No bio yet.'}</CardDescription>
        </div>
        <Button asChild variant="outline" size="sm" className="w-full sm:w-auto shrink-0">
          <Link href={`/${username}/edit`}>
            <Edit className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-xs sm:text-sm">Edit Profile</span>
          </Link>
        </Button>
      </CardHeader>
    </Card>
  );
}
