'use client';

import { useUtilsStore } from '@/hooks/store/utils.store';
import { usePostsInfo } from '@/hooks/usePosts';
import { PostTypes, SortOrder } from '@workspace/gql/generated/graphql';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@workspace/ui/components/table';
import { EmptyElement } from '@workspace/ui/globals/EmptyElement';
import { ExtendedBadge } from '@workspace/ui/globals/ExtendedBadge';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { MEOW_FANS_AVATAR } from '@workspace/ui/lib/constants';
import { cn } from '@workspace/ui/lib/utils';
import moment from 'moment';
import { useState } from 'react';
import { PostActionsBar } from './PostActionsBar';
import { PostHeader } from './PostHeader';
import { PostShareCard } from './PostShareCard';

export const Posts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState<SortOrder>(SortOrder.Desc);
  const [postType, setPostType] = useState<PostTypes[]>(Object.values(PostTypes));
  const { shareModal } = useUtilsStore();

  const { postsInfo, hasMore, loading, handleLoadMore } = usePostsInfo({
    take: 30,
    searchTerm: searchTerm || undefined,
    postTypes: postType,
    orderBy
  });

  return (
    <PageManager>
      <PostHeader
        orderBy={orderBy}
        postType={postType}
        searchTerm={searchTerm}
        setOrderBy={setOrderBy}
        setPostTypes={setPostType}
        setSearchTerm={setSearchTerm}
      />
      {postsInfo.length ? (
        <InfiniteScrollManager dataLength={postsInfo.length} hasMore={hasMore} loading={loading} onLoadMore={handleLoadMore}>
          <Table>
            <TableHeader className="z-30 bg-muted/50 backdrop-blur">
              <TableRow>
                <TableHead className="sticky left-0 z-20 bg-card min-w-20">Preview</TableHead>
                <TableHead className="text-center min-w-27.5">Views</TableHead>
                <TableHead className="text-center min-w-27.5">Likes</TableHead>
                <TableHead className="text-center min-w-27.5">Comments</TableHead>
                <TableHead className="text-center min-w-27.5">Unlock price</TableHead>
                <TableHead className="text-center min-w-27.5">Total revenue</TableHead>
                <TableHead className="text-center min-w-27.5">Saves</TableHead>
                <TableHead className="text-center min-w-27.5">Shares</TableHead>
                <TableHead className="text-center min-w-27.5">Type</TableHead>
                <TableHead className="text-center min-w-27.5">Top comment</TableHead>
                <TableHead className="text-center bg-card">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {postsInfo.map((postInfo) => (
                <TableRow key={postInfo.id} className={cn('hover:bg-muted/30 transition-colors')}>
                  <TableCell className="sticky left-0 z-10 bg-card" id="name-cell">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-4 w-4 sm:h-10 sm:w-10">
                        <AvatarImage src={postInfo.preview ?? MEOW_FANS_AVATAR} />
                        <AvatarFallback>{'?'}</AvatarFallback>
                      </Avatar>

                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground truncate tracking-tight">{postInfo.caption?.slice(0, 10)}...</p>
                        <p className="text-xs text-muted-foreground truncate">{moment(postInfo.createdAt).fromNow()}</p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="text-center font-medium">{postInfo.viewCount ?? 0}</TableCell>
                  <TableCell className="text-center table-cell">{postInfo.likeCount ?? 0}</TableCell>
                  <TableCell className="text-center table-cell">{postInfo.commentCount ?? 0}</TableCell>
                  <TableCell className="text-center table-cell">{postInfo.unlockPrice ?? 0}</TableCell>
                  <TableCell className="text-center table-cell">{postInfo.totalEarning ?? 0}</TableCell>
                  <TableCell className="text-center table-cell">{postInfo.saveCount ?? 0}</TableCell>
                  <TableCell className="text-center table-cell">{postInfo.shareCount ?? 0}</TableCell>
                  <TableCell className="text-center table-cell">
                    <ExtendedBadge variant="outline" label={postInfo.types?.[0]} className="rounded-none px-1 py-0 bg-background/90" />
                  </TableCell>
                  <TableCell className="text-start tracking-tight truncate text-xs table-cell">
                    {postInfo.latestComment ?? 'No comments yet'}
                  </TableCell>
                  <TableCell className="bg-card table-cell">
                    <div className="flex justify-start gap-2">
                      <PostActionsBar disabled={Boolean(postInfo.deletedAt)} post={postInfo} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {shareModal && <PostShareCard post={shareModal} shareUrl={`https://meowfans.app/posts/${shareModal.id}`} />}
        </InfiniteScrollManager>
      ) : (
        <EmptyElement description="No posts yet" title="You will find your posts here" />
      )}
    </PageManager>
  );
};
