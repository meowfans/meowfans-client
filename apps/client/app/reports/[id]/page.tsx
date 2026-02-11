import { getSingleReport } from '@/app/server/getSingleReport';
import { ReportDetail } from './components/ReportDetail';

export const metadata = {
  title: 'Report Details'
};

interface ReportDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ReportDetailPage({ params }: ReportDetailPageProps) {
  const report = await getSingleReport((await params).id);
  return <ReportDetail initialReport={report} />;
}
