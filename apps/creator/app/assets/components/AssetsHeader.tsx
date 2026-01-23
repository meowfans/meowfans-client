import { SectionHeader } from '@/components/SectionHeader';
import { AssetType, FileType, SortOrder } from '@workspace/gql/generated/graphql';
import { Dropdown } from '@workspace/ui/globals/Dropdown';
import { MultiEnumDropdown } from '@workspace/ui/globals/MultiEnumDropdown';
import { File, GalleryVerticalEnd, Sparkles, Star } from 'lucide-react';

interface Props {
  assetType: AssetType;
  orderBy: SortOrder;
  fileType: FileType[];
  setFileType: React.Dispatch<React.SetStateAction<FileType[]>>;
  setOrderBy: React.Dispatch<React.SetStateAction<SortOrder>>;
  setAssetType: React.Dispatch<React.SetStateAction<AssetType>>;
}

export const AssetsHeader: React.FC<Props> = ({ setAssetType, assetType, orderBy, setOrderBy, fileType, setFileType }) => {
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

          <MultiEnumDropdown enumValue={FileType} value={fileType} onChange={setFileType} trigger={{ icon: File }} label="File Type" />
        </div>
      }
    />
  );
};
