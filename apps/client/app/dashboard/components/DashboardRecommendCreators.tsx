import { CreatorCard } from '@/app/creators/components/CreatorCard';
import Loading from '@/app/loading';
import { GetDefaultCreatorsOutput } from '@workspace/gql/generated/graphql';
import { Sparkles } from 'lucide-react';

interface DashboardRecommendCreatorsProps {
  creatorsLoading: boolean;
  recommendedCreators: GetDefaultCreatorsOutput[];
}

export const DashboardRecommendCreators = ({ creatorsLoading, recommendedCreators }: DashboardRecommendCreatorsProps) => {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-500" />
          <h2 className="text-xl font-semibold">Recommended for You</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {creatorsLoading ? <Loading /> : recommendedCreators.map((creator) => <CreatorCard key={creator.id} creator={creator} />)}
      </div>
    </section>
  );
};
