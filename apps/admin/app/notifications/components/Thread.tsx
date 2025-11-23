'use client';

import { Button } from '@workspace/ui/components/button';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';
import React, { JSX } from 'react';
import { Notifications } from './Notifications';

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

const typeConfig: Record<NotificationType, { icon: JSX.Element; color: string }> = {
  info: { icon: <Info className="w-4 h-4 text-blue-500" />, color: 'bg-gray-300 dark:bg-gray-800' },
  success: { icon: <CheckCircle className="w-4 h-4 text-green-500" />, color: 'bg-gray-300 dark:bg-gray-800' },
  warning: { icon: <AlertCircle className="w-4 h-4 text-yellow-500" />, color: 'bg-gray-300 dark:bg-gray-800' },
  error: { icon: <XCircle className="w-4 h-4 text-red-500" />, color: 'bg-gray-300 dark:bg-gray-800' }
};

interface Props {
  notifications: Notifications[];
}

export const NotificationThreads: React.FC<Props> = ({ notifications }) => {
  return (
    <div className="w-full">
      <div className="border rounded-2xl bg-neutral-50 dark:bg-black overflow-y-auto p-3 space-y-2">
        {notifications.map((notification) => {
          const config = typeConfig[notification.type as NotificationType];
          return (
            <div
              key={notification.id}
              className={`flex flex-col p-3 rounded-2xl shadow-sm border transition hover:shadow-md bg-[var(--background)] ${
                notification.isRead ? '' : config.color
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {config.icon}
                  <p className={'font-bold'}>{notification.fullName}</p>
                </div>
                <span className="w-3 h-3 bg-indigo-500 rounded-full" />
              </div>

              <p className="text-lg font-semibold">{notification.message}</p>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <span className="bg-white px-2 py-0.5 rounded-full">{notification.title}</span>
                <span>{notification.createdAt.getDate()}</span>
              </div>

              <div className="flex gap-2 mt-2">
                <Button className="text-xs" variant={'outline'}>
                  Mark as Read
                </Button>
                <Button className="text-xs" variant={'default'}>
                  Dismiss
                </Button>
              </div>
            </div>
          );
        })}
        {notifications.length === 0 && <p className="text-center text-gray-500 py-4">No new notifications 🎉</p>}
      </div>
    </div>
  );
};
