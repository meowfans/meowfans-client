'use client';

import { useUtilsStore } from '@/hooks/store/utils.store';
import { GetPostsInfoOutput } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { normalizePath } from '@workspace/ui/lib/helpers';
import { Eye, Heart, MessageSquare, Pencil, Share2, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PostActionsBarProps {
  disabled?: boolean;
  post: GetPostsInfoOutput;
}

export const PostActionsBar = ({ disabled, post }: PostActionsBarProps) => {
  const router = useRouter();
  const { setShareModal } = useUtilsStore();

  const buttons = [
    {
      label: 'View',
      icon: <Eye className="h-4 w-4" />,
      disabled: disabled,
      onClick: () => {
        router.push(normalizePath('studio', 'posts', post.id));
      }
    },
    { label: 'Edit', icon: <Pencil className="h-4 w-4" />, disabled: disabled, onClick: () => null },
    { label: 'Delete', icon: <Trash2 className="h-4 w-4" />, disabled: disabled, onClick: () => null },
    { label: 'Comments', icon: <MessageSquare className="h-4 w-4" />, disabled: false, onClick: () => null },
    { label: 'Likes', icon: <Heart className="h-4 w-4" />, disabled: false, onClick: () => null },
    { label: 'Share', icon: <Share2 className="h-4 w-4" />, disabled: false, onClick: () => setShareModal(post) }
  ];

  return (
    <div className="flex gap-1">
      {buttons.map((button, idx) => (
        <Button size="icon" key={idx} variant="ghost" disabled={button.disabled} onClick={button.onClick}>
          {button.icon}
        </Button>
      ))}
    </div>
  );
};
