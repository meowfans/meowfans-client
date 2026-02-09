'use client';

import { InteractionButton } from '@/components/InteractionButton';
import { useFollowingMutations } from '@/hooks/useFollow';
import { GetDefaultCreatorsOutput } from '@workspace/gql/generated/graphql';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Card, CardContent } from '@workspace/ui/components/card';
import { IconLabel } from '@workspace/ui/components/icon-label';
import { motion } from 'framer-motion';
import { Check, UserPlus } from 'lucide-react';
import Link from 'next/link';

interface CreatorCardProps {
  creator: GetDefaultCreatorsOutput;
}

export function CreatorCard({ creator }: CreatorCardProps) {
  const { followCreator, unfollowCreator, loading } = useFollowingMutations();

  const handleFollow = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (creator.isFollowing) {
      await unfollowCreator(creator.id);
    } else {
      await followCreator(creator.id);
    }
  };

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
      <Card className="bg-secondary/20 hover:bg-secondary/40 hover:shadow-primary/5 h-full overflow-hidden border-none shadow-none transition-all hover:shadow-lg">
        <Link href={`/creators/${creator.username}`} className="block">
          <CardContent className="flex flex-col items-center p-6 pb-4 text-center">
            <Avatar className="mb-4 h-24 w-24 border-4 border-background shadow-xl">
              <AvatarImage src={creator.avatarUrl} alt={creator.username} className="object-cover" />
              <AvatarFallback className="bg-primary/10 text-xl font-bold text-primary">
                {creator.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <h3 className="mb-1 w-full truncate text-lg font-semibold tracking-tight">@{creator.username}</h3>
            <p className="mb-2 min-h-[1.5em] w-full truncate text-xs text-muted-foreground">
              {/* Subtitle or niche could go here if available */}
            </p>
          </CardContent>
        </Link>

        <CardContent className="px-6 pb-6 pt-0">
          <InteractionButton
            variant={creator.isFollowing ? 'outline' : 'default'}
            size="sm"
            className="w-full rounded-full font-medium"
            onClick={handleFollow}
            isLoading={loading}
            actionName="follow this creator"
            loadingText={creator.isFollowing ? 'Unfollowing...' : 'Following...'}
          >
            {creator.isFollowing ? <IconLabel icon={Check} label="Following" /> : <IconLabel icon={UserPlus} label="Follow" />}
          </InteractionButton>
        </CardContent>
      </Card>
    </motion.div>
  );
}
