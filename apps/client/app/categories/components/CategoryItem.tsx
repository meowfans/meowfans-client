import { TagsEntity } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { Card, CardContent } from '@workspace/ui/components/card';
import { Hash, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface CategoryItemProps {
  tag: TagsEntity;
  index: number;
}

export const CategoryItem: React.FC<CategoryItemProps> = ({ index, tag }) => {
  return (
    <Link href={`/categories/${encodeURIComponent(tag.label)}`}>
      <Card className="group overflow-hidden border-none bg-secondary/20 shadow-none transition-all hover:bg-secondary/40 hover:shadow-lg hover:shadow-primary/5">
        <CardContent className="flex aspect-square flex-col items-center justify-center p-6 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-primary/20 to-primary/5 transition-transform group-hover:scale-110">
            <Hash className="h-6 w-6 text-primary" />
          </div>

          <h3 className="line-clamp-2 text-sm font-semibold tracking-tight">{tag.label}</h3>

          {index < 6 && (
            <Badge variant="secondary" className="mt-2 gap-1 text-[10px]">
              <TrendingUp className="h-2.5 w-2.5" />
              Trending
            </Badge>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};
