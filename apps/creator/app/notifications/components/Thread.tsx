'use client';

import React, { JSX } from 'react';
import { Button } from '@workspace/ui/components/button';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';
import { ExtendedCard } from '@workspace/ui/globals/ExtendedCard';
import { cn } from '@workspace/ui/lib/utils';
import { Notifications } from './Notifications';

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

const typeConfig: Record<NotificationType, { icon: JSX.Element; unreadBg: string }> = {
  info: {
    icon: <Info className="h-4 w-4 text-blue-500" />,
    unreadBg: 'bg-blue-50 dark:bg-blue-950/30'
  },
  success: {
    icon: <CheckCircle className="h-4 w-4 text-green-500" />,
    unreadBg: 'bg-green-50 dark:bg-green-950/30'
  },
  warning: {
    icon: <AlertCircle className="h-4 w-4 text-yellow-500" />,
    unreadBg: 'bg-yellow-50 dark:bg-yellow-950/30'
  },
  error: {
    icon: <XCircle className="h-4 w-4 text-red-500" />,
    unreadBg: 'bg-red-50 dark:bg-red-950/30'
  }
};

interface Props {
  notifications: Notifications[];
  onMarkRead?: (id: string) => void;
  onDismiss?: (id: string) => void;
}

export const NotificationThreads: React.FC<Props> = ({ notifications, onMarkRead, onDismiss }) => {
  return (
    <ExtendedCard title="Notifications" className="border rounded-2xl" contentClassName="space-y-3 overflow-y-auto">
      {notifications.length === 0 && <p className="py-6 text-center text-sm text-muted-foreground">No new notifications</p>}

      {notifications.map((notification) => {
        const config = typeConfig[notification.type as NotificationType];

        return (
          <div
            key={notification.id}
            className={cn('rounded-2xl border p-3 transition-shadow hover:shadow-md', !notification.isRead && config.unreadBg)}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {config.icon}
                <span className="font-medium">{notification.fullName}</span>
              </div>

              {!notification.isRead && <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />}
            </div>

            {/* Message */}
            <p className="mt-1 text-sm font-semibold">{notification.message}</p>

            {/* Meta */}
            <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="rounded-full bg-muted px-2 py-0.5">{notification.title}</span>
              <span>{notification.createdAt.toLocaleDateString()}</span>
            </div>

            {/* Actions */}
            <div className="mt-3 flex gap-2">
              {!notification.isRead && (
                <Button size="sm" variant="outline" onClick={() => onMarkRead?.(notification.id.toString())}>
                  Mark as read
                </Button>
              )}

              <Button size="sm" variant="ghost" onClick={() => onDismiss?.(notification.id.toString())}>
                Dismiss
              </Button>
            </div>
          </div>
        );
      })}
    </ExtendedCard>
  );
};
