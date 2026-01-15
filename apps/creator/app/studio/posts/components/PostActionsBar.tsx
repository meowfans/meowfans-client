'use client';

import { useUtilsStore } from '@/hooks/store/utils.store';
import { GetPostsInfoOutput } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@workspace/ui/components/dropdown-menu';

import { Eye, Pencil, Trash2, MessageSquare, Heart, Share2, MoreVertical } from 'lucide-react';

interface PostActionsBarProps {
  disabled?: boolean;
  post: GetPostsInfoOutput;
}

export const PostActionsBar = ({ disabled, post }: PostActionsBarProps) => {
  const { setShareModal } = useUtilsStore();

  const buttons = [
    { label: 'View', icon: <Eye className="h-4 w-4" />, disabled: disabled, onClick: () => null },
    { label: 'Edit', icon: <Pencil className="h-4 w-4" />, disabled: disabled, onClick: () => null },
    { label: 'Delete', icon: <Trash2 className="h-4 w-4" />, disabled: disabled, onClick: () => null },
    { label: 'Comments', icon: <MessageSquare className="h-4 w-4" />, disabled: false, onClick: () => null },
    { label: 'Likes', icon: <Heart className="h-4 w-4" />, disabled: false, onClick: () => null },
    { label: 'Share', icon: <Share2 className="h-4 w-4" />, disabled: false, onClick: () => setShareModal(post) }
  ];

  return (
    <div className="absolute top-1 right-1 z-20">
      <div className="hidden md:flex gap-1">
        {buttons.map((button, idx) => (
          <Button size="icon" key={idx} variant="ghost" disabled={button.disabled} onClick={button.onClick}>
            {button.icon}
          </Button>
        ))}
      </div>

      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {buttons.map((button, idx) => (
              <DropdownMenuItem disabled={disabled} key={idx} onClick={button.onClick}>
                {button.icon}
                {button.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
