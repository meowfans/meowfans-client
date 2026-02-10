'use client';

import { PageHandler } from '@/components/PageHandler';
import { APP_PATHS } from '@/lib/constants/feature-paths';
import { ReportsEntity } from '@workspace/gql/generated/graphql';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Loading } from '@workspace/ui/globals/Loading';
import { AnimatePresence } from 'framer-motion';
import { ReportCard } from './ReportCard';

interface ReportsListProps {
  reports: ReportsEntity[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

export const ReportsList = ({ reports, loading, hasMore, onLoadMore }: ReportsListProps) => {
  return (
    <div className="flex-1 min-h-0 overflow-y-scroll px-4 md:px-8 py-8 custom-scrollbar">
      <div className="max-w-[1200px] mx-auto">
        <PageHandler isLoading={loading && !reports.length} isEmpty={!reports.length && !loading} path={APP_PATHS.REPORTS}>
          <InfiniteScrollManager
            dataLength={reports.length}
            loading={loading}
            hasMore={hasMore}
            useWindowScroll={false}
            onLoadMore={onLoadMore}
          >
            <div className="grid gap-4">
              <AnimatePresence mode="popLayout">
                {reports.map((report, idx) => (
                  <ReportCard key={report.id} report={report} index={idx} />
                ))}
              </AnimatePresence>
            </div>

            {loading && reports.length > 0 && (
              <div className="py-20 flex flex-col items-center gap-4">
                <Loading />
                <p className="text-[10px] font-black italic text-muted-foreground/30 uppercase tracking-[0.4em]">Verifying Integrity...</p>
              </div>
            )}
          </InfiniteScrollManager>
        </PageHandler>
      </div>
    </div>
  );
};
