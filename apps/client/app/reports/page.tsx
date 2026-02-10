import { ROUTE_METADATA } from '@/lib/metadata-config';
import { Metadata } from 'next';
import { Reports } from './components/Reports';

export const metadata: Metadata = {
  ...ROUTE_METADATA.reports
};

export default function ReportsPage() {
  return <Reports />;
}
