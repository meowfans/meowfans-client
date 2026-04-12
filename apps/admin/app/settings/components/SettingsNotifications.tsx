'use client';

import { useNotificationsStore } from '@/hooks/store/notifications.store';
import { Switch } from '@workspace/ui/components/switch';

export function SettingsNotifications() {
  const setAllowSystemNotification = useNotificationsStore().setAllowSystemNotification;
  const allowNotification = useNotificationsStore().allowNotification;
  const allowMessagesNotification = useNotificationsStore().allowMessagesNotification;
  const setAllowMessagesNotification = useNotificationsStore().setAllowMessagesNotification;
  const allowInteractionsNotification = useNotificationsStore().allowInteractionsNotification;
  const setAllowInteractionsNotification = useNotificationsStore().setAllowInteractionsNotification;
  const allowSystemNotification = useNotificationsStore().allowSystemNotification;
  const setAllowNotification = useNotificationsStore().setAllowNotification;

  const notificationSettings = [
    {
      title: 'Global Notifications',
      desc: 'Enable or disable all notifications across the platform',
      checked: allowNotification,
      onCheckedChange: setAllowNotification,
      isGlobal: true
    },
    {
      title: 'Messages',
      desc: 'Receive alerts for new messages',
      checked: allowMessagesNotification,
      onCheckedChange: setAllowMessagesNotification
    },
    {
      title: 'Interactions',
      desc: 'Receive alerts for new interactions',
      checked: allowInteractionsNotification,
      onCheckedChange: setAllowInteractionsNotification
    },
    {
      title: 'System',
      desc: 'Receive alerts for system notifications',
      checked: allowSystemNotification,
      onCheckedChange: setAllowSystemNotification
    }
  ];

  return (
    <div className="space-y-8">
      <header className="space-y-1">
        <h2 className="text-3xl font-black uppercase tracking-tight">Notifications</h2>
        <p className="text-muted-foreground font-medium">Manage how and when you receive alerts.</p>
      </header>

      <div className="space-y-4">
        {notificationSettings.map((notif, i) => {
          const isDisabled = !notif.isGlobal && !allowNotification;

          return (
            <div
              key={i}
              className={`flex items-center justify-between p-6 rounded-3xl bg-secondary/5 border border-white/5 transition-colors ${
                isDisabled ? 'opacity-50' : 'hover:bg-secondary/10'
              }`}
            >
              <div className="space-y-1">
                <h4 className="font-black uppercase tracking-tight text-sm">{notif.title}</h4>
                <p className="text-xs text-muted-foreground font-medium">{notif.desc}</p>
              </div>
              <Switch checked={notif.checked} onCheckedChange={notif.onCheckedChange} disabled={isDisabled} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
