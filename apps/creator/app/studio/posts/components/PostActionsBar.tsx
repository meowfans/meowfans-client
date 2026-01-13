'use client';

import { Button } from '@workspace/ui/components/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@workspace/ui/components/dropdown-menu';

import { Eye, Pencil, Trash2, MessageSquare, Heart, Share2, MoreVertical } from 'lucide-react';

interface PostActionsBarProps {
  disabled?: boolean;
}

export const PostActionsBar = ({ disabled }: PostActionsBarProps) => {
  return (
    <div className="absolute top-2 right-2 z-10">
      <div
        className="
          hidden md:flex gap-1 rounded-md
          bg-background/90 backdrop-blur
          border p-1 shadow-sm
          group-hover:flex
        "
      >
        <Button size="icon" variant="ghost" disabled={disabled}>
          <Eye className="h-4 w-4" />
        </Button>

        <Button size="icon" variant="ghost" disabled={disabled}>
          <Pencil className="h-4 w-4" />
        </Button>

        <Button size="icon" variant="ghost" disabled={disabled}>
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>

        <Button size="icon" variant="ghost">
          <MessageSquare className="h-4 w-4" />
        </Button>

        <Button size="icon" variant="ghost">
          <Heart className="h-4 w-4" />
        </Button>

        <Button size="icon" variant="ghost">
          <Share2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem disabled={disabled}>
              <Eye className="mr-2 h-4 w-4" />
              View post
            </DropdownMenuItem>

            <DropdownMenuItem disabled={disabled}>
              <Pencil className="mr-2 h-4 w-4" />
              Update post
            </DropdownMenuItem>

            <DropdownMenuItem disabled={disabled} className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete post
            </DropdownMenuItem>

            <DropdownMenuItem>
              <MessageSquare className="mr-2 h-4 w-4" />
              View comments
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Heart className="mr-2 h-4 w-4" />
              View likes
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Share2 className="mr-2 h-4 w-4" />
              View shares
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
