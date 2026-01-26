'use client';

import { useMessagesStore } from '@/hooks/store/message.store';
import { useMessageMutations } from '@/hooks/useMessages';
import { Button } from '@workspace/ui/components/button';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@workspace/ui/components/menubar';
import { ChevronDown } from 'lucide-react';

export const MessageOptionsMenu = () => {
  const { deleteMessage, updateMessage, sendReply, loading } = useMessageMutations();
  const { messageOptionsMenu, setMessageOptionsMenu } = useMessagesStore();

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger asChild>
          <Button variant={"outline"} size={"icon-sm"}>
            <ChevronDown />
          </Button>
        </MenubarTrigger>
        <MenubarContent className="w-64">
          <MenubarItem inset>Edit</MenubarItem>
          <MenubarItem inset>Reply</MenubarItem>
          <MenubarItem inset>Delete</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};
