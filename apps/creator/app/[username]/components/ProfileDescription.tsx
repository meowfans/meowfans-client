'use client';

import { useCreator } from '@/hooks/context/useCreator';
import { ApplyButtonTooltip } from '@workspace/ui/globals/ApplyTooltip';
import { ExtendedBadge } from '@workspace/ui/globals/ExtendedBadge';
import { GenericCard } from '@workspace/ui/globals/GenericCard';
import { SAvatar } from '@workspace/ui/globals/SAvatar';
import { BadgeCheckIcon, Edit, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const ProfileDescription = () => {
  const router = useRouter();
  const { creator } = useCreator();

  return (
    <div className="w-full flex justify-end relative">
      <div className="w-full max-w-sm mt-1 overflow-hidden">
        <div className="relative w-full md:h-40 h-24 rounded-xl overflow-hidden mb-6 border border-border/50">
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{
              backgroundImage: creator.user.bannerUrl ? `url(${creator.user.bannerUrl})` : 'none'
            }}
          />
          {!creator.user.bannerUrl && <div className="absolute inset-0 bg-muted" />}
          <div className="absolute inset-0 bg-background/20" />
        </div>

        <GenericCard
          title={creator.user.username}
          description={creator.bio ?? 'Add your bio'}
          icon={BadgeCheckIcon}
          iconClassName="bg-primary/10 text-primary"
          contentClassName="pt-0"
          className="mt-0"
          headerExtra={
            <ExtendedBadge
              variant={'secondary'}
              className="bg-primary text-primary-foreground flex items-center gap-1"
              Icon={BadgeCheckIcon}
              iconClassName="w-4 h-4"
              label={creator.user.roles[0] ?? ''}
            />
          }
          footer={
            <ApplyButtonTooltip
              tootTipTitle="Edit profile information"
              buttonProps={{ icon: Edit, buttonText: 'Edit profile information' }}
              className="w-full"
              onClick={() => router.push(`/${creator.user.username}/edit`)}
            />
          }
        >
          <div className="relative flex justify-between md:justify-center items-center gap-3">
            <SAvatar
              fallback="profile"
              url={creator.user.avatarUrl}
              className="md:w-32 md:h-32 w-20 h-20 rounded-full border-4 border-background shadow-md -mt-16"
            />
            <div className="flex flex-row justify-end md:hidden gap-1">
              <ExtendedBadge
                variant={'secondary'}
                className="bg-primary text-primary-foreground flex items-center gap-1"
                Icon={BadgeCheckIcon}
                iconClassName="w-3 h-3"
                label={creator.totalSubscriber}
              />
              <ExtendedBadge
                variant={'secondary'}
                className="bg-primary text-primary-foreground flex items-center gap-1"
                Icon={Heart}
                iconClassName="w-3 h-3"
                label={creator.totalPost}
              />
            </div>
          </div>
        </GenericCard>
      </div>
    </div>
  );
};
