import { useVaultsAnalytics } from '@/hooks/useVaults';
import { DateTrunc, VaultsEntity, VaultStats } from '@workspace/gql/generated/graphql';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Skeleton } from '@workspace/ui/components/skeleton';
import { handleFormatNumberToKAndM } from '@workspace/ui/lib/formatters';
import { useMemo } from 'react';

interface AlbumDetailsProps {
  loading: boolean;
  vaults: VaultsEntity[];
}

export const AlbumDetails = ({ loading, vaults }: AlbumDetailsProps) => {
  const { vaultAnalytics, loading: analyticsLoading } = useVaultsAnalytics({
    vaultStats: [VaultStats.ViewCount, VaultStats.LikeCount, VaultStats.TotalEarning],
    field: DateTrunc.Month,
    addId: false
  });

  const summary = useMemo(() => {
    if (!vaultAnalytics?.length) {
      return {
        views: 0,
        likes: 0,
        comments: 0,
        saves: 0,
        shares: 0,
        earnings: 0
      };
    }

    return vaultAnalytics.reduce(
      (acc, row) => {
        acc.views += row.viewCount ?? 0;
        acc.likes += row.likeCount ?? 0;
        acc.earnings += row.totalEarning ?? 0;
        return acc;
      },
      {
        views: 0,
        likes: 0,
        comments: 0,
        saves: 0,
        shares: 0,
        earnings: 0
      }
    );
  }, [vaultAnalytics]);

  const isLoading = loading || analyticsLoading;

  const details = [
    {
      description: 'Total vaults',
      title: vaults.length,
      content: 'Fetched vaults'
    },
    {
      description: 'Views',
      title: summary.views.toLocaleString(),
      content: 'Backend aggregated'
    },
    {
      description: 'Earnings',
      title: handleFormatNumberToKAndM(summary.earnings),
      content: 'From completed unlocks'
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {details.map((detail, idx) => (
        <Card key={idx} className="bg-background/70 backdrop-blur">
          <CardHeader className="pb-2">
            <CardDescription>{detail.description}</CardDescription>
            <CardTitle className="text-2xl">{isLoading ? <Skeleton className="h-7 w-20" /> : detail.title}</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">{detail.content}</CardContent>
        </Card>
      ))}
    </div>
  );
};
