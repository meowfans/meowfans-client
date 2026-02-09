import type { Metadata } from 'next';
import { AnalyticsView } from './components/AnalyticsView';

export const metadata: Metadata = {
  title: 'Analytics | Creator Dashboard',
  description: 'View your performance insights and revenue growth'
};

export default function AnalyticsPage() {
  return <AnalyticsView />;
}
