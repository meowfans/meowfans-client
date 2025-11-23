'use client';

import { Footer } from '@/components/Footer';
import { Separator } from '@workspace/ui/components/separator';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { HeaderProps } from '@workspace/ui/lib';
import { Bell } from 'lucide-react';
import { HomeFeed } from './Feed';
import { HomeHeader } from './Header';
import { HomeSubscription } from './Subscriptions';
import { HomeTrending } from './Trending';

const FOOTER_MESSAGE = 'Pay only for what you unlock. No monthly fee.';
const applyButtons: HeaderProps[] = [
  { variant: 'outline' as const, title: 'Upload' },
  { variant: 'outline' as const, icon: Bell, path: '/notifications' }
];

export const Home = () => {
  return (
    <PageManager>
      <HomeHeader />
      <Separator />
      <HomeFeed />
      <HomeSubscription />
      <HomeTrending />
      <Footer message={FOOTER_MESSAGE} />
    </PageManager>
  );
};
