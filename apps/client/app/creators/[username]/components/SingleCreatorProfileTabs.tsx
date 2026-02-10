import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { Grid3x3, ImageIcon, Lock } from 'lucide-react';
import { PicturesTab } from './PicturesTab';
import { PostsTab } from './PostsTab';
import { VaultsTab } from './VaultsTab';
import { TabProps } from './SingleCreatorProfile';

interface SingleCreatorProfileTabsProps {
  username: string;
  onTabChange: (tab: TabProps) => void;
  currentTab: TabProps;
}

export const SingleCreatorProfileTabs = ({ username, onTabChange, currentTab }: SingleCreatorProfileTabsProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <Tabs value={currentTab} onValueChange={(val) => onTabChange(val as TabProps)} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="posts" className="gap-2">
            <Grid3x3 className="h-4 w-4" />
            Posts
          </TabsTrigger>
          <TabsTrigger value="pictures" className="gap-2">
            <ImageIcon className="h-4 w-4" />
            Pictures
          </TabsTrigger>
          <TabsTrigger value="vaults" className="gap-2">
            <Lock className="h-4 w-4" />
            Vaults
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="mt-6">
          <PostsTab username={username} />
        </TabsContent>

        <TabsContent value="pictures" className="mt-6">
          <PicturesTab username={username} />
        </TabsContent>

        <TabsContent value="vaults" className="mt-6">
          <VaultsTab username={username} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
