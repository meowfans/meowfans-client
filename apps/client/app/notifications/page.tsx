import { ROUTE_METADATA } from '@/lib/metadata-config';
import { Metadata } from 'next';
import { NotificationsView } from './components/NotificationsView';

export const metadata: Metadata = {
  ...ROUTE_METADATA.notifications
};

export default function NotificationsPage() {
  return <NotificationsView />;
}
