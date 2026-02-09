'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import { ScrollArea } from '@workspace/ui/components/scroll-area';
import { cn } from '@workspace/ui/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { Bell, Check, Heart, MessageCircle, Star, UserPlus, Zap } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

type NotificationType = 'like' | 'comment' | 'follow' | 'system' | 'subscription';

interface Notification {
  id: string;
  type: NotificationType;
  actor: {
    name: string;
    avatar?: string;
    username: string;
  };
  content?: string;
  target?: string;
  targetId?: string;
  timestamp: Date;
  isRead: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'like',
    actor: { name: 'Sarah Connor', username: 'sconnor', avatar: 'https://i.pravatar.cc/150?u=sconnor' },
    target: 'your post',
    targetId: '/posts/1',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    isRead: false
  },
  {
    id: '2',
    type: 'follow',
    actor: { name: 'John Doe', username: 'jdoe', avatar: 'https://i.pravatar.cc/150?u=jdoe' },
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    isRead: false
  },
  {
    id: '3',
    type: 'system',
    actor: { name: 'MeowFans Team', username: 'meowfans' },
    content: 'Welcome to MeowFans! Complete your profile to get started.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    isRead: true
  },
  {
    id: '4',
    type: 'subscription',
    actor: { name: 'Alice Wonderland', username: 'alice', avatar: 'https://i.pravatar.cc/150?u=alice' },
    content: 'subscribed to your vault',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    isRead: true
  },
  {
    id: '5',
    type: 'comment',
    actor: { name: 'Bob Builder', username: 'bob', avatar: 'https://i.pravatar.cc/150?u=bob' },
    content: 'Great content! Keep it up 🔥',
    target: 'your video',
    targetId: '/shorts/1',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25),
    isRead: true
  }
];

export function NotificationsView() {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'unread' | 'mentions'>('all');

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleMarkRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'unread') return !n.isRead;
    if (filter === 'mentions') return n.type === 'comment' || n.type === 'like' || n.type === 'follow';
    return true;
  });

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'like':
        return <Heart className="h-4 w-4 fill-red-500 text-red-500" />;
      case 'comment':
        return <MessageCircle className="h-4 w-4 fill-blue-500 text-blue-500" />;
      case 'follow':
        return <UserPlus className="h-4 w-4 text-purple-500" />;
      case 'subscription':
        return <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />;
      case 'system':
        return <Zap className="h-4 w-4 fill-primary text-primary" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 lg:p-12">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-4xl  flex items-center gap-3">
              <Bell className="h-8 w-8 text-primary" />
              Notifications
            </h1>
            <p className="text-muted-foreground font-medium">Stay updated with your latest activity.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleMarkAllRead}
              className="rounded-full font-bold text-xs uppercase tracking-wider"
              disabled={!notifications.some((n) => !n.isRead)}
            >
              <Check className="mr-2 h-3 w-3" />
              Mark all read
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {['all', 'unread', 'mentions'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={cn(
                'px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap',
                filter === f
                  ? 'bg-primary text-white shadow-lg shadow-primary/25 scale-105'
                  : 'bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground'
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {/* List */}
        <Card className="border-none bg-secondary/5 ring-1 ring-white/5 overflow-hidden rounded-[2rem]">
          <ScrollArea className="h-[600px] md:h-[calc(100vh-300px)]">
            <div className="p-2 space-y-1">
              <AnimatePresence mode="popLayout">
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      className={cn(
                        'group relative flex gap-4 p-4 rounded-3xl transition-all duration-300',
                        notification.isRead ? 'hover:bg-secondary/10' : 'bg-primary/5 hover:bg-primary/10'
                      )}
                      onClick={() => handleMarkRead(notification.id)}
                    >
                      {/* Unread Indicator */}
                      {!notification.isRead && (
                        <div className="absolute top-1/2 left-2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.8)]" />
                      )}

                      <div className="relative shrink-0 ml-2">
                        <Avatar className="h-12 w-12 ring-2 ring-background shadow-lg">
                          {notification.type === 'system' ? (
                            <div className="h-full w-full bg-primary/20 flex items-center justify-center">
                              <Zap className="h-6 w-6 text-primary" />
                            </div>
                          ) : (
                            <AvatarImage src={notification.actor.avatar} />
                          )}
                          <AvatarFallback className="bg-secondary font-bold text-xs">
                            {notification.actor.username.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-background flex items-center justify-center ring-2 ring-background shadow-sm">
                          {getIcon(notification.type)}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-center gap-0.5">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm">
                            <span className="font-bold">{notification.actor.name}</span>{' '}
                            <span className="text-muted-foreground">
                              {notification.type === 'like' && 'liked'}
                              {notification.type === 'comment' && 'commented on'}
                              {notification.type === 'follow' && 'started following you'}
                              {notification.type === 'subscription' && 'subscribed'}
                              {notification.type === 'system' && ''}
                            </span>{' '}
                            {notification.target && (
                              <Link
                                href={notification.targetId || '#'}
                                className="font-semibold text-primary hover:underline hover:text-primary/80 transition-colors"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {notification.target}
                              </Link>
                            )}
                          </p>
                          <span className="text-[10px] text-muted-foreground/60 font-bold whitespace-nowrap shrink-0">
                            {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                          </span>
                        </div>

                        {notification.content && (
                          <p className="text-xs text-muted-foreground font-medium line-clamp-2">&quot;{notification.content}&quot;</p>
                        )}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-4">
                    <div className="h-20 w-20 rounded-full bg-secondary/20 flex items-center justify-center">
                      <Bell className="h-10 w-10 opacity-20" />
                    </div>
                    <p className="font-medium text-lg">No notifications yet</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
}
