'use client';

import { useCreator } from '@/hooks/context/useCreator';
import { ApplyButtonTooltip } from '@workspace/ui/globals/ApplyTooltip';
import { ExtendedBadge } from '@workspace/ui/globals/ExtendedBadge';
import { GenericCard } from '@workspace/ui/globals/GenericCard';
import { SAvatar } from '@workspace/ui/globals/SAvatar';
import { BadgeCheckIcon, Edit, Heart, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const ProfileDescription = () => {
  const router = useRouter();
  const { creator } = useCreator();

  return (
    <div className="w-full flex justify-center lg:justify-end">
      <div className="w-full max-w-sm">
        <div className="relative w-full h-32 sm:h-36 md:h-44 rounded-xl overflow-hidden border border-border/50">
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{
              backgroundImage: creator.user.bannerUrl ? `url(${creator.user.bannerUrl})` : undefined
            }}
          />
          {!creator.user.bannerUrl && <div className="absolute inset-0" />}
        </div>

        <GenericCard
          title={creator.user.username}
          description={creator.bio ?? 'Add a short bio to describe your work'}
          icon={BadgeCheckIcon}
          iconClassName="bg-primary/10 text-primary"
          contentClassName="pt-0"
          className="-mt-12"
          headerExtra={
            <ExtendedBadge
              variant="secondary"
              className="bg-primary text-primary-foreground flex items-center gap-1"
              Icon={BadgeCheckIcon}
              iconClassName="w-4 h-4"
              label={creator.user.roles[0] ?? ''}
            />
          }
          footer={
            <ApplyButtonTooltip
              tootTipTitle="Edit profile"
              buttonProps={{
                icon: Edit,
                buttonText: 'Edit profile'
              }}
              className="w-full"
              onClick={() => router.push(`/${creator.user.username}/edit`)}
            />
          }
        >
          <div className="flex flex-col items-center gap-4">
            <SAvatar
              fallback="profile"
              url={creator.user.avatarUrl}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-background shadow-lg"
            />

            <div className="flex items-center gap-3">
              <ExtendedBadge
                variant="secondary"
                className="flex items-center gap-1"
                Icon={Users}
                iconClassName="w-4 h-4"
                label={creator.totalSubscriber}
              />
              <ExtendedBadge
                variant="secondary"
                className="flex items-center gap-1"
                Icon={Heart}
                iconClassName="w-4 h-4"
                label={creator.totalPost}
              />
            </div>
          </div>
        </GenericCard>
      </div>
    </div>
  );
};
