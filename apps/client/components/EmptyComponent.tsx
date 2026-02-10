'use client';

import { EMPTY_TEXTS } from '@/lib/constants/empty-texts';
import { APP_PATHS } from '@/lib/constants/feature-paths';
import { Button } from '@workspace/ui/components/button';
import { motion } from 'framer-motion';
import { Hash, Heart, Lock, MessageSquare, Search, ShoppingCart, Users } from 'lucide-react';
import Link from 'next/link';

interface EmptyComponentProps {
  path: APP_PATHS;
  customMessage?: string;
  customAction?: {
    label: string;
    href: string;
  };
}

const EmptyStateWrapper = ({
  children,
  icon: Icon,
  title,
  description,
  action
}: {
  children?: React.ReactNode;
  icon: any;
  title: string;
  description: string;
  action?: { label: string; href: string };
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex flex-col items-center justify-center py-20 px-6 text-center min-h-[50vh]"
  >
    <div className="relative mb-6">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-secondary/30 backdrop-blur-md border border-border/50 rotate-3 group-hover:rotate-6 transition-transform">
        <Icon className="h-10 w-10 text-muted-foreground/60" />
      </div>
      <motion.div
        animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute -inset-4 bg-primary/5 rounded-full blur-2xl -z-10"
      />
    </div>
    <h2 className="text-2xl font-black tracking-tight mb-2">{title}</h2>
    <p className="text-sm text-muted-foreground max-w-[280px] mx-auto leading-relaxed mb-8">{description}</p>
    {action && (
      <Button asChild className="rounded-2xl px-8 h-12 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all font-bold">
        <Link href={action.href}>{action.label}</Link>
      </Button>
    )}
    {children}
  </motion.div>
);

export const EmptyComponent = ({ path, customMessage, customAction }: EmptyComponentProps) => {
  const genericMessage = customMessage || EMPTY_TEXTS[path] || 'Nothing here yet';

  switch (path) {
    case APP_PATHS.CHANNELS:
      return (
        <EmptyStateWrapper
          icon={MessageSquare}
          title="No messages yet"
          description="Your conversations with creators will appear here once you start chatting."
          action={{ label: 'Find Creators', href: '/creators' }}
        />
      );
    case APP_PATHS.CATEGORIES:
      return (
        <EmptyStateWrapper
          icon={Hash}
          title="No categories"
          description="We're still organizing our content. Check back soon for new tags and categories."
        />
      );
    case APP_PATHS.FOLLOWING:
      return (
        <EmptyStateWrapper
          icon={Users}
          title="Feed is empty"
          description="Follow some creators to see their latest posts and updates in your personal feed."
          action={{ label: 'Discover Creators', href: '/creators' }}
        />
      );
    case APP_PATHS.VAULTS:
    case APP_PATHS.LIKED_VAULTS:
      return (
        <EmptyStateWrapper
          icon={Lock}
          title="Vault collection empty"
          description="Exclusive content locked in vaults will show up here once purchased or liked."
          action={{ label: 'Explore Vaults', href: '/vaults' }}
        />
      );
    case APP_PATHS.PURCHASED:
      return (
        <EmptyStateWrapper
          icon={ShoppingCart}
          title="Your collection is empty"
          description="Unlock exclusive content and support your favorite creators to build your collection."
          action={{ label: 'Browse Creators', href: '/creators' }}
        />
      );
    case APP_PATHS.LIKED:
    case APP_PATHS.LIKED_POSTS:
    case APP_PATHS.LIKED_PICTURES:
      return (
        <EmptyStateWrapper
          icon={Heart}
          title="Your collection is empty"
          description="Items you heart across the platform will be compiled here for easy access."
          action={{ label: 'Start Exploring', href: '/posts' }}
        />
      );
    default:
      return (
        <EmptyStateWrapper
          icon={Search}
          title="Nothing found"
          description={genericMessage}
          action={customAction || { label: 'Return Home', href: '/' }}
        />
      );
  }
};
