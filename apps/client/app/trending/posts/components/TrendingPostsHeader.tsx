import { TrendingUp } from 'lucide-react';

export const TrendingPostsHeader = () => {
  return (
    <div className="flex items-center justify-between mb-2">
      <h3 className="flex items-center gap-1 text-lg font-semibold m-3">
        <TrendingUp className="w-5 h-5 text-pink-500" /> Top liked Posts
      </h3>
    </div>
  );
};
