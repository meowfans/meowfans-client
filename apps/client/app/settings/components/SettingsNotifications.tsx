'use client';

export function SettingsNotifications() {
  const notifications = [
    { title: 'Push Notifications', desc: 'Receive alerts on your device', type: 'System' },
    { title: 'Email Updates', desc: 'Digests and important announcements', type: 'Email' },
    { title: 'Sound Effects', desc: 'Play sounds for in-app interactions', type: 'App' }
  ];

  return (
    <div className="space-y-8">
      <header className="space-y-1">
        <h2 className="text-3xl font-black italic uppercase tracking-tight">Notifications</h2>
        <p className="text-muted-foreground font-medium">Manage how and when you receive alerts.</p>
      </header>

      <div className="space-y-4">
        {notifications.map((notif, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-6 rounded-[1.5rem] bg-secondary/5 border border-white/5 hover:bg-secondary/10 transition-colors"
          >
            <div className="space-y-1">
              <h4 className="font-black italic uppercase tracking-tight text-sm">{notif.title}</h4>
              <p className="text-xs text-muted-foreground font-medium">{notif.desc}</p>
            </div>
            <div className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked={true} />
              <div className="w-11 h-6 bg-secondary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
