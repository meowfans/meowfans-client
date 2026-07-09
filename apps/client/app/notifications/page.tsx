import { ROUTE_METADATA } from '@/lib/metadata-config';
import { Metadata } from 'next';
import { Notifications } from './components/Notifications';

export const metadata: Metadata = {
  ...ROUTE_METADATA.notifications
};

export default function NotificationsPage() {
  return <Notifications />;
}
