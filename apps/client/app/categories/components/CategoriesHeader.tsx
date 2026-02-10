import { TagsEntity } from '@workspace/gql/generated/graphql';
import { Input } from '@workspace/ui/components/input';
import { Search, TrendingUp } from 'lucide-react';

interface CategoryHeaderProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  tags: TagsEntity[];
  filteredTags: TagsEntity[];
}

export const CategoriesHeader = ({ searchQuery, setSearchQuery, tags, filteredTags }: CategoryHeaderProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
        <p className="text-muted-foreground">Explore content by popular tags and categories</p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Stats */}
      {tags.length > 0 && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <TrendingUp className="h-4 w-4" />
          <span>
            {filteredTags.length} {filteredTags.length === 1 ? 'category' : 'categories'} available
          </span>
        </div>
      )}
    </div>
  );
};
