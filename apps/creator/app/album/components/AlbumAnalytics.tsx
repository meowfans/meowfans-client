import { VaultsEntity } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Skeleton } from '@workspace/ui/components/skeleton';
import { ApplyShadCnChart } from '@workspace/ui/globals/ApplyShadCnChart';
import { Dropdown } from '@workspace/ui/globals/Dropdown';
import { ShadCnChartTypes } from '@workspace/ui/lib/enums';
import { BarChart3 } from 'lucide-react';
import { useMemo } from 'react';

interface AlbumAnalyticsProps {
  vaults: VaultsEntity[];
  loading: boolean;
  chartType: ShadCnChartTypes;
  setChartType: React.Dispatch<React.SetStateAction<ShadCnChartTypes>>;
}

export const AlbumAnalytics = ({ chartType, loading, vaults, setChartType }: AlbumAnalyticsProps) => {
  const topVaultsData = useMemo(() => {
    return [...vaults]
      .filter((p) => !p.deletedAt)
      .sort((a, b) => (b.viewCount ?? 0) - (a.viewCount ?? 0))
      .slice(0, 30)
      .map((p, idx) => ({
        name: p.description ? p.description.slice(0, 16) : `Vault ${idx + 1}`,
        views: p.viewCount ?? 0,
        earned: p.totalEarning ?? 0
      }));
  }, [vaults]);

  return (
    <Card className="bg-background/70 backdrop-blur">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Top vaults
            </CardTitle>
            <CardDescription>Highest views (and earnings) in your recent set</CardDescription>
          </div>
          <Badge variant="outline">Latest {topVaultsData.length}</Badge>
          <Dropdown
            enumValue={ShadCnChartTypes}
            onFilterBy={(val) => setChartType(val)}
            trigger={{ label: chartType.replace(/_/, ' ') }}
            label="Select your preferred chart"
            title="Apply chart diagram"
            filterBy={chartType}
          />
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-56 w-full" />
        ) : topVaultsData.length ? (
          <ApplyShadCnChart
            chartType={chartType}
            XDataLabel="Views"
            yDataLabel="Earned"
            dataTable={topVaultsData}
            xDataKey={'views'}
            yDataKey={'earned'}
          />
        ) : (
          <div className="text-sm text-muted-foreground">No vault analytics to show yet.</div>
        )}
      </CardContent>
    </Card>
  );
};
