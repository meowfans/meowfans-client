import { ROUTE_METADATA } from '@/lib/metadata-config';
import { Metadata } from 'next';
import { Dashboard } from './components/Dashboard';

export const metadata: Metadata = {
  ...ROUTE_METADATA.dashboard
};

export default function DashboardPage() {
  return <Dashboard />;
}
