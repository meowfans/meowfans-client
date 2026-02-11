'use client';

import { PostsEntity, PostTypes } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Checkbox } from '@workspace/ui/components/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@workspace/ui/components/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@workspace/ui/components/table';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { AnimatePresence } from 'framer-motion';
import { Eye, Heart, MessageCircle, MoreVertical, Share2, Trash2, TrendingUp } from 'lucide-react';
import NextImage from 'next/image';

interface PostsTableProps {
  posts: PostsEntity[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  selectedPosts: string[];
  onToggleSelect: (postId: string) => void;
  onDelete: (postId: string) => void;
  onShare: (post: PostsEntity) => void;
  onToggleType: (post: PostsEntity, type: PostTypes) => void;
  deleting: boolean;
  updating: boolean;
}

export function PostsTable({
  posts,
  loading,
  hasMore,
  onLoadMore,
  selectedPosts,
  onToggleSelect,
  onDelete,
  onShare,
  onToggleType,
  deleting,
  updating
}: PostsTableProps) {
  return (
    <div className="border rounded-md">
      <InfiniteScrollManager dataLength={posts.length} loading={loading} hasMore={hasMore} onLoadMore={onLoadMore}>
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-card">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[50px]"></TableHead>
              <TableHead className="w-[100px]">Preview</TableHead>
              <TableHead>Caption</TableHead>
              <TableHead>Stats</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence mode="popLayout">
              {posts.map((post) => (
                <PostTableRow
                  key={post.id}
                  post={post}
                  isSelected={selectedPosts.includes(post.id)}
                  onToggleSelect={onToggleSelect}
                  onDelete={onDelete}
                  onShare={onShare}
                  onToggleType={onToggleType}
                  deleting={deleting}
                  updating={updating}
                />
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </InfiniteScrollManager>
    </div>
  );
}

interface PostTableRowProps {
  post: PostsEntity;
  isSelected: boolean;
  onToggleSelect: (postId: string) => void;
  onDelete: (postId: string) => void;
  onShare: (post: PostsEntity) => void;
  onToggleType: (post: PostsEntity, type: PostTypes) => void;
  deleting: boolean;
  updating: boolean;
}

function PostTableRow({ post, isSelected, onToggleSelect, onDelete, onShare, onToggleType, deleting, updating }: PostTableRowProps) {
  const previewAsset = post.postAssets?.[0];
  const postType = post.type;

  return (
    <TableRow className={isSelected ? 'bg-muted/50' : ''}>
      <TableCell>
        <Checkbox checked={isSelected} onCheckedChange={() => onToggleSelect(post.id)} />
      </TableCell>
      <TableCell>
        {previewAsset && (
          <div className="relative w-16 h-16 rounded-md overflow-hidden bg-secondary">
            <NextImage src={post.preview} alt="Preview" fill className="object-cover" />
          </div>
        )}
      </TableCell>
      <TableCell className="max-w-[200px]">
        <p className="text-sm px-1 line-clamp-2">{post.caption || 'No caption'}</p>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Heart className="h-3 w-3" />
            {post.likeCount}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="h-3 w-3" />
            {post.commentCount}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            {post.saveCount}
          </span>
        </div>
      </TableCell>
      <TableCell>
        <Badge
          variant={postType === PostTypes.Public ? 'default' : postType === PostTypes.Exclusive ? 'secondary' : 'outline'}
          className="text-xs"
        >
          {postType}
        </Badge>
      </TableCell>
      <TableCell>
        <span className="text-xs text-muted-foreground">
          {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
      </TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8" disabled={deleting || updating}>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onShare(post)}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onToggleType(post, PostTypes.Public)} disabled={postType === PostTypes.Public}>
              <Eye className="h-4 w-4 mr-2" />
              Make Public
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onToggleType(post, PostTypes.Exclusive)} disabled={postType === PostTypes.Exclusive}>
              <TrendingUp className="h-4 w-4 mr-2" />
              Make Exclusive
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onToggleType(post, PostTypes.Private)} disabled={postType === PostTypes.Private}>
              <Eye className="h-4 w-4 mr-2" />
              Make Private
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onDelete(post.id)} className="text-destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
