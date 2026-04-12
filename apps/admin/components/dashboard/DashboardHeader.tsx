import { CreatorProfilesEntity } from"@workspace/gql/generated/graphql";
import { ImportCreatorsSheet } from"../ImportCreatorsSheet";
import { TerminateModal } from"../TerminateModal";

interface DashboardHeaderProps {
 admin: CreatorProfilesEntity;
}

export const DashboardHeader = ({ admin }: DashboardHeaderProps) => {
 return (
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
  <div>
  <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h2>
  <p className="text-sm text-muted-foreground">
   Welcome back, <span className="font-semibold text-foreground">@{admin?.user?.username}</span>
  </p>
  </div>
  <div className="flex flex-row gap-2">
  <TerminateModal />
  <ImportCreatorsSheet />
  </div>
 </div>
 );
};
