import { SidebarProvider } from '@workspace/ui/components/sidebar';
import React from 'react';
import { ChannelListBar } from './components/ChannelListBar';

interface Props {
  children: React.ReactNode;
}
const ChannelPageLayout: React.FC<Props> = ({ children }) => {
  return (
    <SidebarProvider>
      {children}
      <ChannelListBar side={'right'} />
    </SidebarProvider>
  );
};

export default ChannelPageLayout;
