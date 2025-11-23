import { Badge } from '@workspace/ui/components/badge';
import { TagsEntity } from '@workspace/gql/generated/graphql';
import Link from 'next/link';
import { useMemo } from 'react';

interface BricksProps {
  tags: TagsEntity[];
}

export const Bricks: React.FC<BricksProps> = ({ tags }) => {
  const groupedTags = useMemo(() => {
    const groups: Record<string, TagsEntity[]> = {};
    tags.forEach((tag) => {
      const firstLetter = tag.label[0].toUpperCase() ?? '#';
      const alphaKey = /^[A-Z]$/.test(firstLetter) ? firstLetter : '#';
      groups[alphaKey] ??= [];
      groups[alphaKey].push(tag);
    });
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [tags]);

  return groupedTags.map(([alphabetKey, tags]) => (
    <div key={alphabetKey} className="mb-8 container relative mx-auto px-4">
      <h2 className="text-xl font-semibold mb-4">{alphabetKey}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
        {tags.map((tag) => (
          <Link key={tag.id} href={`/categories/${encodeURIComponent(tag.label.trim())}`}>
            <Badge variant="secondary" className="flex justify-center py-2 text-sm cursor-pointer hover:bg-secondary/80 transition">
              {tag.label}
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  ));
};
