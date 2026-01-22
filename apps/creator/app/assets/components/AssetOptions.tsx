import { CreatorAssetsEntity } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { FullScreenButton } from '@workspace/ui/globals/FullScreenButton';
import { cn } from '@workspace/ui/lib/utils';
import { motion } from 'framer-motion';
import { CheckCircle2, LassoIcon } from 'lucide-react';

interface AssetOptions {
  idx: number;
  isSelectedAsset: boolean;
  creatorAssets: CreatorAssetsEntity[];
  onToggle: (id: string, e: React.MouseEvent<HTMLButtonElement>) => void;
  canSelect: boolean;
  creatorAsset: CreatorAssetsEntity;
}

export const AssetOptions: React.FC<AssetOptions> = ({ canSelect, creatorAsset, creatorAssets, onToggle, idx, isSelectedAsset }) => {
  return (
    <div className="absolute inset-0 pointer-events-none group">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="absolute top-2 left-2 pointer-events-auto z-30"
      >
        {canSelect ? (
          <Button
            size="icon"
            variant="ghost"
            className={cn(
              'backdrop-blur-md rounded-lg text-white transition-all duration-300 hover:scale-110 shadow-lg',
              isSelectedAsset ? 'bg-green-500/90 hover:bg-green-500' : 'bg-black/40 hover:bg-black/60'
            )}
            onClick={(e) => onToggle(creatorAsset.assetId, e)}
          >
            {isSelectedAsset ? <CheckCircle2 size={18} /> : <LassoIcon size={18} />}
          </Button>
        ) : (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <FullScreenButton
              urls={creatorAssets.map(({ asset }) => asset.rawUrl)}
              currentIdx={idx}
              currentUrl={creatorAsset.asset.rawUrl}
            />
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-2 right-2 pointer-events-auto z-30"
      >
        <Badge className='text-xs tracking-tight' variant={creatorAsset.asset.isPosted ? 'destructive' : 'default'}>{creatorAsset.asset.isPosted ? 'POSTED' : 'QUEUE'}</Badge>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-2 left-2 pointer-events-auto z-30"
      >
        <Badge className="text-xs bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-xl backdrop-blur-md transition-all duration-300 font-medium px-3 py-1 border-0">
          {creatorAsset.type}
        </Badge>
      </motion.div>

      {/* Hover overlay linear */}
      <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};
