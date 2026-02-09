import type { Metadata } from 'next';

import { NotificationsView } from './components/NotificationsView';

export const metadata: Metadata = {
  title: 'Notifications | Creator Studio',
  description: 'Manage your latest activities and fan engagements.'
};

export default function NotificationsPage() {
  return <NotificationsView />;
}
