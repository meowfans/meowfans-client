import { useAssetsStore } from '@/zustand/assets.store';
import { useMutation } from '@apollo/client/react';
import { GET_CREATOR_ASSETS_QUERY, UPDATE_ASSETS_MUTATION } from '@workspace/gql/api/assetsAPI';
import { AssetType } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
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
import { Archive, CheckSquare, Eye, EyeOff, Lock, Menu, Square, Trash2 } from 'lucide-react';
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
        <Button
          variant="outline"
          size="icon"
          className="relative hover:bg-linear-to-r hover:from-purple-500/10 hover:to-pink-500/10 transition-all duration-300"
        >
          <Menu className="h-5 w-5" />
          {selectedAssetIds.length > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-linear-to-r from-purple-500 to-pink-500 text-white text-xs">
              {selectedAssetIds.length}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 shadow-xl border-border/50 backdrop-blur-sm" align="start">
        <DropdownMenuLabel className="text-sm font-semibold flex items-center gap-2">
          <CheckSquare className="h-4 w-4" />
          Selection Options
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={handleSelect}
            className="cursor-pointer hover:bg-linear-to-r hover:from-purple-500/10 hover:to-pink-500/10"
          >
            {canSelect ? <CheckSquare className="h-4 w-4 mr-2" /> : <Square className="h-4 w-4 mr-2" />}
            {canSelect ? 'Disable Selection' : 'Enable Selection'}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleRangeSelect}
            className="cursor-pointer hover:bg-linear-to-r hover:from-purple-500/10 hover:to-pink-500/10"
          >
            {rangeSelection ? <CheckSquare className="h-4 w-4 mr-2" /> : <Square className="h-4 w-4 mr-2" />}
            Range Selection {rangeSelection && '(Active)'}
          </DropdownMenuItem>
        </DropdownMenuGroup>

        {selectedAssetIds.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-sm font-semibold flex items-center gap-2">
              <Archive className="h-4 w-4" />
              Update Assets ({selectedAssetIds.length})
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="cursor-pointer">
                  <Eye className="h-4 w-4 mr-2" />
                  Change Type
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="shadow-xl">
                    
                    <DropdownMenuItem
                      onClick={() => handleUpdateAssets(AssetType.Archive)}
                      className="cursor-pointer hover:bg-blue-500/10"
                      disabled={loading}
                    >
                      <Archive className="h-4 w-4 mr-2" />
                      Archive {selectedAssetIds.length > 0 && `(${selectedAssetIds.length})`}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleUpdateAssets(AssetType.Hidden)}
                      className="cursor-pointer hover:bg-orange-500/10"
                      disabled={loading}
                    >
                      <EyeOff className="h-4 w-4 mr-2" />
                      Hide {selectedAssetIds.length > 0 && `(${selectedAssetIds.length})`}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleUpdateAssets(AssetType.Private)}
                      className="cursor-pointer hover:bg-purple-500/10"
                      disabled={loading}
                    >
                      <Lock className="h-4 w-4 mr-2" />
                      Private {selectedAssetIds.length > 0 && `(${selectedAssetIds.length})`}
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setDeleteModal(true)}
              className="cursor-pointer text-red-500 hover:bg-red-500/10 hover:text-red-600 focus:text-red-600"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete {selectedAssetIds.length > 0 && `${selectedAssetIds.length} selected`}
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
