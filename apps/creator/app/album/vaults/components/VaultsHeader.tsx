import { PostTypes, SortOrder } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Dropdown } from '@workspace/ui/globals/Dropdown';

interface VaultsHeaderProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  postType: PostTypes[];
  setPostTypes: React.Dispatch<React.SetStateAction<PostTypes[]>>;
  orderBy: SortOrder;
  setOrderBy: React.Dispatch<React.SetStateAction<SortOrder>>;
}

export const VaultsHeader = ({ orderBy, postType, searchTerm, setOrderBy, setPostTypes, setSearchTerm }: VaultsHeaderProps) => {
  const handleReset = () => {
    setSearchTerm('');
    setPostTypes(Object.values(PostTypes));
    setOrderBy(SortOrder.Desc);
  };
  return (
    <div className="mb-4 flex flex-wrap items-end gap-3">
      <Input
        placeholder="Search posts…"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-60"
        title="Search posts"
      />
      <Dropdown
        enumValue={PostTypes}
        filterBy={postType[0]}
        onFilterBy={(val) => setPostTypes([val])}
        trigger={{ label: postType[0] }}
        label="Select content type"
      />
      <Dropdown
        enumValue={SortOrder}
        filterBy={orderBy}
        onFilterBy={(val) => setOrderBy(val)}
        trigger={{ label: orderBy }}
        label="Sort your contents easily"
      />
      <Button variant="ghost" onClick={handleReset}>
        Reset
      </Button>
    </div>
  );
};
