import { SectionHeader } from '@/components/SectionHeader';
import { AssetType } from '@workspace/gql/generated/graphql';
import { Dropdown } from '@workspace/ui/globals/Dropdown';
import { GalleryVerticalEnd, Sparkles } from 'lucide-react';

interface Props {
  assetType: AssetType;
  setAssetType: React.Dispatch<React.SetStateAction<AssetType>>;
}

export const AssetsHeader: React.FC<Props> = ({ setAssetType, assetType }) => {
  return (
    <SectionHeader
      title="Assets Gallery"
      description="Your personal creative collection"
      icon={Sparkles}
      actions={
        <Dropdown
          enumValue={AssetType}
          label="Asset types"
          title="Select your preferred assets"
          filterBy={assetType}
          trigger={{ icon: GalleryVerticalEnd }}
          onFilterBy={(val) => setAssetType(val)}
        />
      }
    />
  );
};
