import { AssetsGrid } from '@/app/assets/components/AssetsGrid';
import { FileType, GetCreatorAssetsOutput } from '@workspace/gql/generated/graphql';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { MultiEnumDropdown } from '@workspace/ui/globals/MultiEnumDropdown';
import { File } from 'lucide-react';

interface VaultStudioAssetsProps {
  assets: GetCreatorAssetsOutput[];
  hasMore: boolean;
  loading: boolean;
  onToggleSelect: (id: string) => void;
  onLoadMore: () => void;
  selectedAssets: string[];
  fileType: FileType[];
  onSetFileType: (fileType: FileType[]) => void;
}

export const VaultStudioAssets = ({
  assets,
  hasMore,
  loading,
  onToggleSelect,
  onLoadMore,
  selectedAssets,
  fileType,
  onSetFileType
}: VaultStudioAssetsProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col space-y-1">
            <CardTitle>Select Content</CardTitle>
            <CardDescription>Choose assets to include in this vault</CardDescription>
          </div>
          <MultiEnumDropdown enumValue={FileType} value={fileType} onChange={onSetFileType} trigger={{ icon: File }} label="File Type" />
        </div>
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
