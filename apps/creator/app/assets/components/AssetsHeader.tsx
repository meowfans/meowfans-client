import { SectionHeader } from '@/components/SectionHeader';
import { AssetType, SortOrder } from '@workspace/gql/generated/graphql';
import { Dropdown } from '@workspace/ui/globals/Dropdown';
import { GalleryVerticalEnd, Sparkles, Star } from 'lucide-react';

interface Props {
  assetType: AssetType;
  orderBy: SortOrder;
  setOrderBy: React.Dispatch<React.SetStateAction<SortOrder>>;
  setAssetType: React.Dispatch<React.SetStateAction<AssetType>>;
}

export const AssetsHeader: React.FC<Props> = ({ setAssetType, assetType, orderBy, setOrderBy }) => {
  return (
    <SectionHeader
      title="Assets Gallery"
      description="Your personal creative collection"
      icon={Sparkles}
      actions={
        <div className="flex flex-row space-x-1">
          <Dropdown
            enumValue={AssetType}
            label="Asset types"
            title="Select your preferred assets"
            filterBy={assetType}
            trigger={{ icon: GalleryVerticalEnd }}
            onFilterBy={(val) => setAssetType(val)}
          />
          <Dropdown
            enumValue={SortOrder}
            label="Order"
            title="Change order"
            filterBy={orderBy}
            trigger={{ icon: Star }}
            onFilterBy={(val) => setOrderBy(val)}
          />
        </div>
      }
    />
  );
};
