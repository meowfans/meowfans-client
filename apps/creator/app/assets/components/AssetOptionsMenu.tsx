import { Button } from '@workspace/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@workspace/ui/components/dropdown-menu';
import { GET_CREATOR_ASSETS_QUERY, UPDATE_ASSETS_MUTATION } from '@workspace/gql/api/assetsAPI';
import { AssetType } from '@workspace/gql/generated/graphql';
import { useAssetsStore } from '@/zustand/assets.store';
import { useMutation } from '@apollo/client/react';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export const AssetOptionsMenu = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [updateAssets] = useMutation(UPDATE_ASSETS_MUTATION, {
    refetchQueries() {
      return [{ query: GET_CREATOR_ASSETS_QUERY, variables: { input: { limit: 30 } } }];
    }
  });
  const {
    canSelect,
    rangeSelection,
    setRangeSelection,
    setDeleteModal,
    selectedAssets: selectedAssetIds,
    setSelectedAssets,
    setCanSelect,
    setUpdated,
    assets: creatorAssets,
    setAssets
  } = useAssetsStore();

  const handleUpdateAssets = async (assetType: AssetType) => {
    if (!selectedAssetIds.length) return;
    setLoading(true);
    try {
      await updateAssets({ variables: { input: { assetIds: selectedAssetIds, assetType } } });
      setUpdated(true);
      setAssets(
        creatorAssets
          .map((c) => (selectedAssetIds.includes(c.assetId) ? { ...c, type: assetType } : c))
          .filter((c) => !selectedAssetIds.includes(c.assetId))
      );

      toast.success('Updated assets');
    } catch {
      toast.error('Something wrong happened!');
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  const handleRangeSelect = () => {
    setSelectedAssets([]);
    setCanSelect(rangeSelection ? true : false);
    setRangeSelection(!rangeSelection);
  };

  const handleSelect = () => {
    setSelectedAssets([]);
    setCanSelect(!canSelect);
  };

  const handleClose = () => {
    setDeleteModal(false);
    setSelectedAssets([]);
    setCanSelect(false);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={'icon'}>
          <Menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>Select</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleSelect}>Select</DropdownMenuItem>
          <DropdownMenuItem onClick={handleRangeSelect}>Range select</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Update</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Type</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => handleUpdateAssets(AssetType.Archive)}>
                  Archive {selectedAssetIds.length || ''}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleUpdateAssets(AssetType.Hidden)}>
                  Hide {selectedAssetIds.length || ''}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleUpdateAssets(AssetType.Private)}>
                  Private {selectedAssetIds.length || ''}
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuLabel>Delete selected assets</DropdownMenuLabel>
          <DropdownMenuSeparator />
        </DropdownMenuGroup>
        <DropdownMenuItem onClick={() => setDeleteModal(true)}>Delete {selectedAssetIds.length}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
