import { AssetsGrid } from '@/app/assets/components/AssetsGrid';
import { GetCreatorAssetsOutput } from '@workspace/gql/generated/graphql';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';

interface PostStudioAssetsProps {
  assets: GetCreatorAssetsOutput[];
  hasMore: boolean;
  loading: boolean;
  onToggleSelect: (id: string) => void;
  onLoadMore: () => void;
  selectedAssets: string[];
}

export const PostStudioAssets = ({ assets, hasMore, loading, onToggleSelect, onLoadMore, selectedAssets }: PostStudioAssetsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Assets</CardTitle>
        <CardDescription>Choose images or videos for your post</CardDescription>
      </CardHeader>
      <CardContent className="h-[calc(100vh-280px)] overflow-y-auto">
        <AssetsGrid
          assets={assets}
          hasMore={hasMore}
          loading={loading}
          onToggleSelect={onToggleSelect}
          onLoadMore={onLoadMore}
          selectedAssets={selectedAssets}
          onDelete={() => null}
          useWindowScroll={false}
        />
      </CardContent>
    </Card>
  );
};
