'use client';

import { useServerReports } from '@/hooks/server/useServerReports';
import { ReportsEntity, ReportStatus } from '@workspace/gql/generated/graphql';
import { useState } from 'react';
import { ReportsFooter } from './ReportsFooter';
import { ReportsHeader } from './ReportsHeader';
import { ReportsList } from './ReportsList';

interface ReportsProps {
  initialReports: ReportsEntity[];
}

export function Reports({ initialReports }: ReportsProps) {
  const [reportStatus, setReportStatus] = useState<ReportStatus>(ReportStatus.Pending);
  const { reports, loading, hasMore, loadMore } = useServerReports(
    {
      take: 10,
      skip: 0,
      reportStatus
    },
    initialReports
  );

  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden bg-background">
      <ReportsHeader reportStatus={reportStatus} onStatusChange={setReportStatus} />

      <ReportsList initialReports={initialReports} reports={reports} loading={loading} hasMore={hasMore} onLoadMore={loadMore} />

      <ReportsFooter totalCount={reports.length} />
    </div>
  );
}
