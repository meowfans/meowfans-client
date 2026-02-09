'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import { cn } from '@workspace/ui/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Bell, CheckCheck, Clock, ExternalLink, Heart, MessageSquare, Star, Trash2, UserPlus, Zap } from 'lucide-react';
import { useState } from 'react';

type NotificationType = 'subscription' | 'like' | 'comment' | 'mention' | 'tip' | 'system';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  user?: {
    name: string;
    username: string;
    avatarUrl?: string;
  };
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'subscription',
    title: 'New Subscriber!',
    message: 'Alex99 just subscribed to your Bronze Tier.',
    time: '2m ago',
    isRead: false,
    user: {
      name: 'Alex Rivera',
      username: 'Alex99',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
    }
  },
  {
    id: '2',
    type: 'tip',
    title: 'Received a Tip!',
    message: 'SarahJ sent you a $50.00 tip. "Keep up the great work!"',
    time: '15m ago',
    isRead: false,
    user: {
      name: 'Sarah Johnson',
      username: 'SarahJ',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
    }
  },
  {
    id: '3',
    type: 'mention',
    title: 'New Mention',
    message: 'CreatorX mentioned you in a new post.',
    time: '1h ago',
    isRead: true,
    user: {
      name: 'Creative Soul',
      username: 'CreatorX',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Creator'
    }
  },
  {
    id: '4',
    type: 'comment',
    title: 'New Comment',
    message: 'Marcus left a comment on your latest Vault item.',
    time: '3h ago',
    isRead: true,
    user: {
      name: 'Marcus Chen',
      username: 'MarcusC',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus'
    }
  },
  {
    id: '5',
    type: 'system',
    title: 'Payout Successful',
    message: 'Your payout of $1,240.00 has been processed successfully.',
    time: '5h ago',
    isRead: true
  },
  {
    id: '6',
    type: 'like',
    title: 'New Like',
    message: 'Elena liked your post "Behind the scenes".',
    time: 'Yesterday',
    isRead: true,
    user: {
      name: 'Elena Gilbert',
      username: 'ElenaG',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena'
    }
  }
];

export function NotificationsView() {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredNotifications = notifications.filter((n) => (filter === 'all' ? true : !n.isRead));

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const toggleRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n)));
  };

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'subscription':
        return <UserPlus className="h-4 w-4 text-blue-500" />;
      case 'tip':
        return <Zap className="h-4 w-4 text-yellow-500" />;
      case 'comment':
        return <MessageSquare className="h-4 w-4 text-green-500" />;
      case 'like':
        return <Heart className="h-4 w-4 text-pink-500" />;
      case 'mention':
        return <Star className="h-4 w-4 text-purple-500" />;
      case 'system':
        return <Bell className="h-4 w-4 text-orange-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8 lg:p-10 space-y-10 overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-primary mb-1">
            <Bell className="h-5 w-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Activity Hub</span>
          </div>
          <h1 className="text-4xl md:text-5xl  leading-none">Notifications</h1>
          <p className="text-muted-foreground text-sm font-medium">Stay updated with everything happening in your creator domain.</p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full font-bold uppercase tracking-widest text-[10px] h-10 px-6 gap-2 border-primary/20 hover:bg-primary/5 transition-all"
            onClick={markAllAsRead}
          >
            <CheckCheck className="h-4 w-4" /> Mark All Read
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 p-1 bg-muted/50 w-fit rounded-2xl border border-white/5">
        <button
          onClick={() => setFilter('all')}
          className={cn(
            'px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all',
            filter === 'all' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'
          )}
        >
          All
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={cn(
            'px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all relative',
            filter === 'unread' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'
          )}
        >
          Unread
          {notifications.some((n) => !n.isRead) && (
            <span className="absolute top-2 right-4 h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
          )}
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <motion.div
                key={notification.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  className={cn(
                    'group relative border-none transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 cursor-pointer overflow-hidden',
                    notification.isRead ? 'bg-secondary/10' : 'bg-primary/5 ring-1 ring-primary/20'
                  )}
                >
                  {!notification.isRead && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />}

                  <div className="p-4 md:p-6 flex items-start gap-4 md:gap-6">
                    {/* Icon/Avatar Container */}
                    <div className="relative shrink-0">
                      {notification.user ? (
                        <Avatar className="h-12 w-12 border-2 border-background shadow-lg">
                          <AvatarImage src={notification.user.avatarUrl} />
                          <AvatarFallback className="font-bold">{notification.user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center shadow-inner">
                          {getIcon(notification.type)}
                        </div>
                      )}
                      <div
                        className={cn(
                          'absolute -right-1 -bottom-1 h-6 w-6 rounded-full border-4 border-background flex items-center justify-center bg-white shadow-sm',
                          notification.user ? 'bg-white' : 'hidden'
                        )}
                      >
                        {getIcon(notification.type)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-4">
                        <h3
                          className={cn(
                            'font-black italic uppercase tracking-tight truncate',
                            notification.isRead ? 'text-foreground/80' : 'text-foreground'
                          )}
                        >
                          {notification.title}
                        </h3>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-[10px] font-mono font-medium text-muted-foreground uppercase flex items-center gap-1.5">
                            <Clock className="h-3 w-3" /> {notification.time}
                          </span>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-full hover:bg-red-500/10 hover:text-red-500"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-full"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleRead(notification.id);
                              }}
                            >
                              <CheckCheck className={cn('h-4 w-4', notification.isRead ? 'text-muted-foreground' : 'text-primary')} />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <p
                        className={cn(
                          'text-sm font-medium leading-relaxed max-w-2xl',
                          notification.isRead ? 'text-muted-foreground' : 'text-foreground/90'
                        )}
                      >
                        {notification.user && <span className="text-primary font-bold italic mr-1">@{notification.user.username}</span>}
                        {notification.message}
                      </p>
                    </div>

                    {/* Action Arrow (Optional) */}
                    <div className="hidden md:flex items-center opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-500">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center space-y-6">
              <div className="h-20 w-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto ring-1 ring-white/5">
                <Bell className="h-10 w-10 text-muted-foreground opacity-20" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black italic uppercase tracking-tight text-muted-foreground">All Clear!</h3>
                <p className="text-muted-foreground/60 text-sm font-medium">No new notifications to display right now.</p>
              </div>
              <Button
                variant="outline"
                onClick={() => setFilter('all')}
                className="rounded-full font-bold uppercase tracking-widest text-[10px] h-10 px-8"
              >
                View History
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Info */}
      <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Syncing with domain activity...</p>
        <div className="flex items-center gap-6">
          <button className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
            Notification Settings
          </button>
          <button className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
            Help Center
          </button>
        </div>
      </div>
    </div>
  );
}
