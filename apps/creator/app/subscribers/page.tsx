import type { Metadata } from 'next';

import { SubscribersView } from './components/SubscribersView';

export const metadata: Metadata = {
  title: 'Subscriptions | Creator Studio',
  description: 'Manage subscription tiers and subscribers'
};

export default function SubscriptionsPage() {
  return <SubscribersView />;
}
