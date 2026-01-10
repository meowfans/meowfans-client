import { AssetType } from '@workspace/gql/generated/graphql';
import { Dropdown } from '@workspace/ui/globals/Dropdown';
import { motion } from 'framer-motion';
import { GalleryVerticalEnd, Sparkles } from 'lucide-react';

interface Props {
  assetType: AssetType;
  setAssetType: React.Dispatch<React.SetStateAction<AssetType>>;
}

export const AssetsHeader: React.FC<Props> = ({ setAssetType, assetType }) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-background md:p-0">
      <div className="flex flex-row gap-4 content-center items-center w-full">
        <Dropdown
          enumValue={AssetType}
          label="Asset types"
          title="Select your preferred assets"
          filterBy={assetType}
          trigger={{ icon: GalleryVerticalEnd }}
          onFilterBy={(val) => setAssetType(val)}
        />
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Assets Gallery
            </h1>
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
              <Sparkles className="h-5 w-5 text-purple-500" />
            </motion.div>
          </div>
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">Your personal creative collection</p>
        </div>
      </div>
    </div>
  );
};
