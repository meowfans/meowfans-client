import { ROUTE_METADATA } from '@/lib/metadata-config';
import { ReportStatus } from '@workspace/gql/generated/graphql';
import { Metadata } from 'next';
import { getReports } from '../server/getReports';
import { Reports } from './components/Reports';

export const metadata: Metadata = {
  ...ROUTE_METADATA.reports
};

export const dynamic = 'force-dynamic';

export default async function ReportsPage() {
  const reports = await getReports({ take: 10, skip: 0, reportStatus: ReportStatus.Pending });
  return <Reports initialReports={reports} />;
}
