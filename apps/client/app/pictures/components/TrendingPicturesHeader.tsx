import { TrendingUp } from 'lucide-react';

export const TrendingCreatorsHeader = () => {
  return (
    <div className="flex items-center justify-between mb-2">
      <h3 className="flex items-center gap-1 text-lg font-semibold m-3">
        <TrendingUp className="w-5 h-5 text-pink-500" /> Top liked Pictures
      </h3>
    </div>
  );
};
