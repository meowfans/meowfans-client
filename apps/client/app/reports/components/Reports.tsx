'use client';

import { useReports } from '@/hooks/useReports';
import { ReportStatus } from '@workspace/gql/generated/graphql';
import { useState } from 'react';
import { ReportsFooter } from './ReportsFooter';
import { ReportsHeader } from './ReportsHeader';
import { ReportsList } from './ReportsList';

export function Reports() {
  const [reportStatus, setReportStatus] = useState<ReportStatus>(ReportStatus.Pending);

  const { reports, loading, hasMore, loadMore } = useReports({
    take: 10,
    skip: 0,
    reportStatus
  });

  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden bg-background">
      <ReportsHeader reportStatus={reportStatus} onStatusChange={setReportStatus} />

      <ReportsList reports={reports} loading={loading} hasMore={hasMore} onLoadMore={loadMore} />

      <ReportsFooter totalCount={reports.length} />
    </div>
  );
}
