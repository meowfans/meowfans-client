import type { Metadata } from 'next';
import { DashboardView } from './components/DashboardView';

export const metadata: Metadata = {
  title: 'Creator Dashboard',
  description: 'Manage your creator profile and engagement'
};

export default function DashboardPage() {
  return <DashboardView />;
}
